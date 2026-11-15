import { INITIAL_ANALYSES } from '../data/mockAnalyses';
import { projectService } from './projectService';
import { authService } from './authService';

const ANALYSES_STORAGE_KEY = 'projectdna_analyses_v2';

function getStoredAnalyses() {
  try {
    const raw = localStorage.getItem(ANALYSES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading analyses from storage:', err);
  }
  // Initialize initial mock analyses
  try {
    localStorage.setItem(ANALYSES_STORAGE_KEY, JSON.stringify(INITIAL_ANALYSES));
  } catch (e) {
    console.error('Error seeding analyses:', e);
  }
  return [...INITIAL_ANALYSES];
}

function saveStoredAnalyses(analyses) {
  try {
    localStorage.setItem(ANALYSES_STORAGE_KEY, JSON.stringify(analyses));
  } catch (err) {
    console.error('Error saving analyses:', err);
  }
}

export const analysisService = {
  async getAnalyses(search = '', userEmail = null) {
    const list = getStoredAnalyses();
    let result = list;

    if (userEmail) {
      const studentOnly = list.filter(a => a.authorEmail === userEmail);
      if (studentOnly.length > 0) {
        result = studentOnly;
      }
    }

    if (!search.trim()) return result;
    const q = search.toLowerCase();
    return result.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.domain.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  },

  async getAnalysisById(id) {
    const list = getStoredAnalyses();
    return list.find(a => a.id === id) || null;
  },

  /**
   * Simulates multi-stage AI analysis pipeline with progress reporting
   */
  async runAnalysis(ideaData, onStageChange = () => {}) {
    const STAGES = [
      { step: 1, label: "Understanding project description & semantic intent..." },
      { step: 2, label: "Querying vector embeddings against project repository..." },
      { step: 3, label: "Computing semantic overlap & identifying feature gaps..." },
      { step: 4, label: "Synthesizing architectural recommendations & final report..." }
    ];

    for (const stage of STAGES) {
      onStageChange(stage);
      await new Promise(r => setTimeout(r, 650));
    }

    // Load available projects to compute realistic similarity
    const existingProjects = await projectService.getProjects();
    
    // Compute semantic match scores
    const userTokens = [
      ...ideaData.title.toLowerCase().split(/\W+/),
      ...ideaData.description.toLowerCase().split(/\W+/),
      ...(ideaData.technologies || []).map(t => t.toLowerCase())
    ].filter(t => t.length > 3);

    const scoredProjects = existingProjects.map(proj => {
      let score = 15; // baseline academic context overlap

      // Domain match bonus
      if (proj.domain.toLowerCase() === (ideaData.domain || '').toLowerCase()) {
        score += 25;
      }

      // Technology overlap
      const sharedTech = proj.technologies.filter(t => 
        (ideaData.technologies || []).some(ut => ut.toLowerCase() === t.toLowerCase())
      );
      score += Math.min(sharedTech.length * 8, 24);

      // Token overlap in abstract / title
      const projText = (proj.title + ' ' + proj.abstract).toLowerCase();
      let matchCount = 0;
      userTokens.forEach(token => {
        if (projText.includes(token)) matchCount++;
      });
      score += Math.min(matchCount * 3, 22);

      // Cap at 88% to maintain academic realism (never 100% unless exact clone)
      score = Math.min(Math.max(Math.round(score), 18), 84);

      return {
        projectId: proj.id,
        projectTitle: proj.title,
        similarity: score,
        domain: proj.domain,
        technologies: proj.technologies,
        matchingConcepts: [
          ...sharedTech.map(t => `Shared stack: ${t}`),
          ...(proj.features || []).slice(0, 2)
        ],
        differentiatingFactors: [
          `Proposed solution introduces distinctive feature architecture in ${ideaData.domain}`,
          `Archived repository focuses on: ${proj.abstract.slice(0, 100)}...`
        ],
        rawProject: proj
      };
    });

    // Sort by highest similarity
    scoredProjects.sort((a, b) => b.similarity - a.similarity);
    const topMatches = scoredProjects.slice(0, 5);
    const highestScore = topMatches[0]?.similarity || 58;
    const topMatchProject = topMatches[0]?.rawProject;

    // Build common features & new features
    const proposedFeatures = ideaData.features || [];
    const existingFeatures = topMatchProject?.features || [];

    const commonFeatures = existingFeatures.slice(0, 2).map((feat, idx) => ({
      name: feat,
      context: `Conceptual parity with ${topMatchProject?.title || 'archived project'}. Demonstrates foundational functional capability.`
    }));

    const newlyProposedFeatures = proposedFeatures.map((feat, idx) => ({
      name: feat,
      impact: idx === 0 ? "High Technical Novelty" : "Differentiating Value",
      rationale: `Not present in ${topMatchProject?.title || 'matched archive records'}. Establishes unique project contribution.`
    }));

    // Documented limitations from top matches
    const limitationsFromTop = topMatches
      .flatMap(m => m.rawProject?.limitations || [])
      .slice(0, 3);

    const currentUser = authService.getCurrentUser();
    const newAnalysisRecord = {
      id: `ana-${Date.now()}`,
      authorEmail: ideaData.authorEmail || currentUser?.email || 'nitya.arya@college.edu',
      authorName: ideaData.authorName || currentUser?.name || 'Nitya Arya',
      authorRoll: ideaData.authorRoll || currentUser?.rollNumber || '21BCE1001',
      title: ideaData.title,
      domain: ideaData.domain,
      date: new Date().toISOString().split('T')[0],
      status: "Completed",
      highestSimilarity: highestScore,
      description: ideaData.description,
      features: proposedFeatures,
      technologies: ideaData.technologies,
      summary: `Analysis identifies ${highestScore}% highest semantic alignment with "${topMatches[0]?.projectTitle}". Notable innovation opportunities exist in feature gap coverage and limitation addressing.`,
      topMatches: topMatches.map(({ rawProject, ...rest }) => rest),
      comparison: {
        commonFeatures: commonFeatures.length > 0 ? commonFeatures : [
          { name: "Core domain workflow", context: "Shared baseline problem formulation." }
        ],
        newlyProposedFeatures: newlyProposedFeatures.length > 0 ? newlyProposedFeatures : [
          { name: "Custom architectural design", impact: "High Technical Novelty", rationale: "Novel implementation." }
        ]
      },
      opportunities: {
        documentedLimitationsInArchive: limitationsFromTop.length > 0 ? limitationsFromTop : [
          "Prior archived projects reported high inference latency and compute overhead.",
          "Prior implementations lacked adaptive user-facing verification interfaces."
        ],
        unaddressedFeatureGaps: [
          `No existing ${ideaData.domain} project in the repository provides autonomous validation loops.`,
          "Prior student cohorts did not benchmark offline/edge deployment resilience."
        ],
        recommendedDirections: [
          `Formulate a rigorous evaluation benchmark comparing this approach against ${topMatches[0]?.projectTitle}.`,
          "Document ablation experiments isolating the performance contribution of each proposed custom feature."
        ]
      }
    };

    // Save to storage
    const all = getStoredAnalyses();
    all.unshift(newAnalysisRecord);
    saveStoredAnalyses(all);

    return newAnalysisRecord;
  }
};
