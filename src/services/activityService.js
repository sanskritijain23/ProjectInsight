const ACTIVITY_STORAGE_KEY = 'projectdna_recent_activity_v2';

const INITIAL_ACTIVITIES = [
  // Nitya Arya
  {
    id: 'act-nitya-01',
    userEmail: 'nitya.arya@college.edu',
    role: 'student',
    type: 'analysis',
    title: 'Completed Feasibility Analysis',
    description: 'Generated novelty report for "OmniScribe: Real-Time Handwritten Equation Solving" (72% prior art overlap).',
    timestamp: '2 hours ago',
    date: 'Today, 2:15 PM',
    status: 'High Overlap (72%)',
    targetLink: '/student/analysis/ana-101'
  },
  {
    id: 'act-nitya-02',
    userEmail: 'nitya.arya@college.edu',
    role: 'student',
    type: 'bookmark',
    title: 'Saved Literature Reference',
    description: 'Bookmarked "NeuroScan: Automated Brain MRI Tumor Segmentation" for medical vision background review.',
    timestamp: 'Yesterday',
    date: 'Yesterday, 4:40 PM',
    status: 'Bookmarked',
    targetLink: '/student/projects/proj-001'
  },
  {
    id: 'act-nitya-03',
    userEmail: 'nitya.arya@college.edu',
    role: 'student',
    type: 'analysis',
    title: 'Analyzed Medical Vision Benchmark',
    description: 'Evaluated "RetinoScan: Swin Transformer for Diabetic Retinopathy" with epistemic uncertainty estimation.',
    timestamp: '3 days ago',
    date: 'Nov 12, 2024',
    status: 'Moderate Overlap (46%)',
    targetLink: '/student/analysis/ana-105'
  },

  // Sanskriti Jain
  {
    id: 'act-sanskriti-01',
    userEmail: 'sanskriti.jain@college.edu',
    role: 'student',
    type: 'analysis',
    title: 'Completed Feasibility Analysis',
    description: 'Generated novelty report for "CryptoBadge: Zero-Knowledge Hackathon Verification" (68% overlap with AegisChain).',
    timestamp: '1 hour ago',
    date: 'Today, 3:10 PM',
    status: 'Moderate Overlap (68%)',
    targetLink: '/student/analysis/ana-102'
  },
  {
    id: 'act-sanskriti-02',
    userEmail: 'sanskriti.jain@college.edu',
    role: 'student',
    type: 'review_update',
    title: 'Faculty Evaluation Feedback Received',
    description: 'Prof. Rajeshwari Sengupta marked "CryptoBadge" as Approved for Phase 1 Prototype with Polygon zkEVM guidance.',
    timestamp: 'Yesterday',
    date: 'Yesterday, 11:20 AM',
    status: 'Approved',
    targetLink: '/student/analyses'
  },
  {
    id: 'act-sanskriti-03',
    userEmail: 'sanskriti.jain@college.edu',
    role: 'student',
    type: 'bookmark',
    title: 'Saved Literature Reference',
    description: 'Bookmarked "AegisChain: Decentralized Zero-Knowledge Academic Credential Ledger".',
    timestamp: '4 days ago',
    date: 'Nov 11, 2024',
    status: 'Bookmarked',
    targetLink: '/student/projects/proj-002'
  },

  // Aradhya Jain
  {
    id: 'act-aradhya-01',
    userEmail: 'aradhya.jain@college.edu',
    role: 'student',
    type: 'analysis',
    title: 'Completed Feasibility Analysis',
    description: 'Generated novelty report for "ThermalGrid: LoRaWAN Urban Heat Island Mapping" (54% overlap with CampusFlow).',
    timestamp: '3 hours ago',
    date: 'Today, 1:45 PM',
    status: 'Novel Scope (54%)',
    targetLink: '/student/analysis/ana-103'
  },
  {
    id: 'act-aradhya-02',
    userEmail: 'aradhya.jain@college.edu',
    role: 'student',
    type: 'bookmark',
    title: 'Saved Literature Reference',
    description: 'Bookmarked "CampusFlow: Edge-AI Distributed Energy & Occupancy Optimization".',
    timestamp: '2 days ago',
    date: 'Nov 13, 2024',
    status: 'Bookmarked',
    targetLink: '/student/projects/proj-003'
  },
  {
    id: 'act-aradhya-03',
    userEmail: 'aradhya.jain@college.edu',
    role: 'student',
    type: 'review_update',
    title: 'Hardware Budget Approved',
    description: 'Dr. B. Ramanathan approved Stevenson screen enclosure allocation for outdoor perimeter deployment.',
    timestamp: '4 days ago',
    date: 'Nov 11, 2024',
    status: 'Approved',
    targetLink: '/student/analyses'
  },

  // Hemant Dangi
  {
    id: 'act-hemant-01',
    userEmail: 'hemant.dangi@college.edu',
    role: 'student',
    type: 'analysis',
    title: 'Completed Feasibility Analysis',
    description: 'Generated novelty report for "JurisSense: Indic Statutory Compliance & High Court Judgment Retrieval".',
    timestamp: '30 mins ago',
    date: 'Today, 3:45 PM',
    status: 'Novel Scope (41%)',
    targetLink: '/student/analysis/ana-104'
  },
  {
    id: 'act-hemant-02',
    userEmail: 'hemant.dangi@college.edu',
    role: 'student',
    type: 'bookmark',
    title: 'Saved Literature Reference',
    description: 'Bookmarked "Dialectica: Peer Review Calibration & Argumentation Quality Evaluator".',
    timestamp: 'Yesterday',
    date: 'Yesterday, 6:00 PM',
    status: 'Bookmarked',
    targetLink: '/student/projects/proj-006'
  },
  {
    id: 'act-hemant-03',
    userEmail: 'hemant.dangi@college.edu',
    role: 'student',
    type: 'analysis',
    title: 'Evaluated Multi-Document Auditing',
    description: 'Checked "DocuCalibrate: Engineering Contract Discrepancy Auditing" with cross-clause verification.',
    timestamp: '3 days ago',
    date: 'Nov 12, 2024',
    status: 'Novel Scope (48%)',
    targetLink: '/student/analysis/ana-108'
  },

  // Faculty activities
  {
    id: 'act-fac-01',
    role: 'faculty',
    type: 'submission',
    title: 'New Student Proposal Submitted',
    description: 'Nitya Arya (21BCE1001) submitted "OmniScribe" in Artificial Intelligence domain for review.',
    timestamp: '2 hours ago',
    date: 'Today, 2:15 PM',
    status: 'Pending Review',
    targetLink: '/faculty/reviews'
  },
  {
    id: 'act-fac-02',
    role: 'faculty',
    type: 'evaluation',
    title: 'Proposal Evaluated',
    description: 'Dr. K. S. Venkatesh evaluated "CryptoBadge" (Sanskriti Jain) and recommended L2 deployment.',
    timestamp: 'Yesterday',
    date: 'Yesterday, 5:10 PM',
    status: 'Approved',
    targetLink: '/faculty/reviews'
  },
  {
    id: 'act-fac-03',
    role: 'faculty',
    type: 'evaluation',
    title: 'Proposal Evaluated',
    description: 'Dr. B. Ramanathan approved hardware deployment budget for "ThermalGrid" (Aradhya Jain).',
    timestamp: '2 days ago',
    date: 'Nov 13, 2024',
    status: 'Approved',
    targetLink: '/faculty/reviews'
  },
  {
    id: 'act-fac-04',
    role: 'faculty',
    type: 'submission',
    title: 'New Student Proposal Submitted',
    description: 'Hemant Dangi (21BCE1004) submitted "JurisSense" in NLP/Education domain for committee review.',
    timestamp: '3 days ago',
    date: 'Nov 12, 2024',
    status: 'Pending Review',
    targetLink: '/faculty/reviews'
  }
];

function getStoredActivities() {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading activities from localStorage:', err);
  }
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(INITIAL_ACTIVITIES));
  } catch (e) {
    console.error('Error seeding activities:', e);
  }
  return [...INITIAL_ACTIVITIES];
}

export const activityService = {
  getStudentActivities(userEmail = null) {
    const all = getStoredActivities();
    if (userEmail) {
      const match = all.filter(a => a.userEmail === userEmail);
      if (match.length > 0) return match;
    }
    return all.filter(a => a.role === 'student');
  },

  getFacultyActivities() {
    const all = getStoredActivities();
    return all.filter(a => a.role === 'faculty');
  },

  logActivity(activity) {
    const all = getStoredActivities();
    const newAct = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...activity
    };
    all.unshift(newAct);
    try {
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Error persisting new activity:', e);
    }
    return newAct;
  }
};
