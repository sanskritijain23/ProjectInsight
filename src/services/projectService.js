import { INITIAL_PROJECTS } from '../data/mockProjects';
import { authService } from './authService';

const PROJECTS_STORAGE_KEY = 'projectdna_projects';
const BOOKMARKS_STORAGE_KEY = 'projectdna_bookmarks_v2';

const DEFAULT_BOOKMARKS_BY_STUDENT = {
  'nitya.arya@college.edu': ["proj-001", "proj-004"],
  'sanskriti.jain@college.edu': ["proj-002", "proj-005"],
  'aradhya.jain@college.edu': ["proj-003", "proj-008"],
  'hemant.dangi@college.edu': ["proj-006", "proj-009"]
};

function getEffectiveUserEmail(userEmail = null) {
  if (userEmail) return userEmail;
  const curr = authService.getCurrentUser();
  return curr?.email || null;
}

function getStoredProjects() {
  try {
    const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading projects from localStorage:', err);
  }
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  } catch (e) {
    console.error('Error seeding projects:', e);
  }
  return [...INITIAL_PROJECTS];
}

function saveStoredProjects(projects) {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Error writing projects to localStorage:', err);
  }
}

function getStoredBookmarks(userEmail = null) {
  const email = getEffectiveUserEmail(userEmail);
  const key = email ? `${BOOKMARKS_STORAGE_KEY}_${email}` : BOOKMARKS_STORAGE_KEY;
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading bookmarks:', err);
  }
  
  const initial = (email && DEFAULT_BOOKMARKS_BY_STUDENT[email]) || ["proj-001", "proj-004"];
  try {
    localStorage.setItem(key, JSON.stringify(initial));
  } catch (e) {}
  return initial;
}

function saveStoredBookmarks(bookmarks, userEmail = null) {
  const email = getEffectiveUserEmail(userEmail);
  const key = email ? `${BOOKMARKS_STORAGE_KEY}_${email}` : BOOKMARKS_STORAGE_KEY;
  try {
    localStorage.setItem(key, JSON.stringify(bookmarks));
  } catch (err) {
    console.error('Error saving bookmarks:', err);
  }
}

export const projectService = {
  async getProjects({ search = '', domain = 'All', technology = 'All', sort = 'newest' } = {}, userEmail = null) {
    const all = getStoredProjects();
    const bookmarks = getStoredBookmarks(userEmail);

    let filtered = all.map(p => ({
      ...p,
      isBookmarked: bookmarks.includes(p.id)
    }));

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.authors.some(a => a.toLowerCase().includes(q)) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    if (domain !== 'All') {
      filtered = filtered.filter(p => p.domain === domain);
    }

    if (technology !== 'All') {
      filtered = filtered.filter(p => p.technologies.includes(technology));
    }

    if (sort === 'newest') {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sort === 'oldest') {
      filtered.sort((a, b) => a.year - b.year);
    } else if (sort === 'citations') {
      filtered.sort((a, b) => b.citations - a.citations);
    } else if (sort === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  },

  async getProjectById(id, userEmail = null) {
    const all = getStoredProjects();
    const bookmarks = getStoredBookmarks(userEmail);
    const project = all.find(p => p.id === id);
    if (!project) return null;

    const related = all
      .filter(p => p.id !== id && (p.domain === project.domain || p.technologies.some(t => project.technologies.includes(t))))
      .slice(0, 3);

    return {
      ...project,
      isBookmarked: bookmarks.includes(project.id),
      relatedProjects: related
    };
  },

  async createProject(projectData) {
    const all = getStoredProjects();
    const newProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      submissionDate: new Date().toISOString().split('T')[0],
      citations: 0,
      status: projectData.status || "Verified"
    };
    all.unshift(newProject);
    saveStoredProjects(all);
    return newProject;
  },

  async updateProject(id, updatedData) {
    const all = getStoredProjects();
    const index = all.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Project ${id} not found`);
    }
    all[index] = { ...all[index], ...updatedData };
    saveStoredProjects(all);
    return all[index];
  },

  async deleteProject(id, userEmail = null) {
    const all = getStoredProjects();
    const filtered = all.filter(p => p.id !== id);
    saveStoredProjects(filtered);
    const bookmarks = getStoredBookmarks(userEmail);
    saveStoredBookmarks(bookmarks.filter(bId => bId !== id), userEmail);
    return true;
  },

  async toggleBookmark(id, userEmail = null) {
    const bookmarks = getStoredBookmarks(userEmail);
    let updated;
    const isSaved = bookmarks.includes(id);
    if (isSaved) {
      updated = bookmarks.filter(bId => bId !== id);
    } else {
      updated = [...bookmarks, id];
    }
    saveStoredBookmarks(updated, userEmail);
    return !isSaved;
  },

  async getSavedProjects(userEmail = null) {
    const all = getStoredProjects();
    const bookmarks = getStoredBookmarks(userEmail);
    return all
      .filter(p => bookmarks.includes(p.id))
      .map(p => ({ ...p, isBookmarked: true }));
  },

  async getAvailableDomains() {
    const all = getStoredProjects();
    const set = new Set(all.map(p => p.domain));
    return Array.from(set);
  },

  async getAvailableTechnologies() {
    const all = getStoredProjects();
    const set = new Set();
    all.forEach(p => p.technologies.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }
};
