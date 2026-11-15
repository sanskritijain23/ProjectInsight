import { ANALYTICS_DATA } from '../data/mockAnalytics';
import { INITIAL_REVIEWS } from '../data/mockReviews';
import { projectService } from './projectService';
import { analysisService } from './analysisService';

const REVIEWS_STORAGE_KEY = 'projectdna_reviews_v2';

function getStoredReviews() {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading reviews from storage:', err);
  }
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
  } catch (e) {
    console.error('Error seeding reviews:', e);
  }
  return [...INITIAL_REVIEWS];
}

function saveStoredReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Error saving reviews:', err);
  }
}

export const analyticsService = {
  async getFacultyAnalytics() {
    return ANALYTICS_DATA;
  },

  async getReviews(filter = 'all') {
    const reviews = getStoredReviews();
    if (filter === 'pending') {
      return reviews.filter(r => r.status === 'Pending Review');
    }
    if (filter === 'reviewed') {
      return reviews.filter(r => r.status === 'Reviewed');
    }
    return reviews;
  },

  async updateReview(id, { status, facultyNotes, recommendedAction }) {
    const reviews = getStoredReviews();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx !== -1) {
      reviews[idx] = {
        ...reviews[idx],
        status: status || reviews[idx].status,
        facultyNotes: facultyNotes !== undefined ? facultyNotes : reviews[idx].facultyNotes,
        recommendedAction: recommendedAction || reviews[idx].recommendedAction,
        reviewedAt: new Date().toISOString().split('T')[0]
      };
      saveStoredReviews(reviews);
      return reviews[idx];
    }
    return null;
  },

  async getStudentStats(userEmail = null) {
    const projects = await projectService.getProjects({}, userEmail);
    const analyses = await analysisService.getAnalyses('', userEmail);
    const saved = await projectService.getSavedProjects(userEmail);

    const totalGaps = analyses.reduce((acc, curr) => {
      const gaps = curr.opportunities?.unaddressedFeatureGaps?.length || 0;
      const limitations = curr.opportunities?.documentedLimitationsInArchive?.length || 0;
      return acc + gaps + limitations;
    }, 0);

    return {
      archivedProjectsCount: projects.length,
      proposalsAnalysed: analyses.length,
      savedReferencesCount: saved.length,
      researchGapsIdentified: totalGaps || 6,
      dataSourceLabel: "Live Local Data (Sample Engineering Archive)"
    };
  },

  async getFacultyStats() {
    const projects = await projectService.getProjects();
    const analyses = await analysisService.getAnalyses();
    const reviews = getStoredReviews();
    const pendingCount = reviews.filter(r => r.status === 'Pending Review').length;
    const reviewedCount = reviews.filter(r => r.status === 'Reviewed').length;

    return {
      totalProjects: projects.length,
      activeStudentCohort: 48, // Clearly noted as sample 2024-25 cohort size
      totalEvaluations: reviews.length + analyses.length,
      projectsAwaitingReview: pendingCount,
      completedReviews: reviewedCount,
      dataSourceLabel: "Demo Cohort: 2024–2025 Capstone Cycle (Computer Science)"
    };
  }
};
