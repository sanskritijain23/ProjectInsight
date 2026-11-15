import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Shield,
  FileCheck,
  User,
  Filter
} from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';
import { activityService } from '../../services/activityService';
import { useToast } from '../../context/ToastContext';
import DomainBadge from '../../components/common/DomainBadge';
import SimilarityScore from '../../components/common/SimilarityScore';
import Modal from '../../components/common/Modal';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';

export default function AnalysisReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'reviewed'
  const { addToast } = useToast();

  // Review modal state
  const [selectedReview, setSelectedReview] = useState(null);
  const [facultyNotes, setFacultyNotes] = useState('');
  const [actionChoice, setActionChoice] = useState('Approved for Implementation');
  const [isUpdating, setIsUpdating] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await analyticsService.getReviews(activeTab);
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [activeTab]);

  const openReviewModal = (rev) => {
    setSelectedReview(rev);
    setFacultyNotes(rev.facultyNotes || '');
    setActionChoice(rev.recommendedAction || 'Approved for Implementation');
  };

  const handleSaveReview = async (newStatus) => {
    if (!selectedReview) return;
    setIsUpdating(true);
    try {
      await analyticsService.updateReview(selectedReview.id, {
        status: newStatus,
        facultyNotes,
        recommendedAction: actionChoice
      });

      // Log both faculty and student activity
      activityService.logActivity({
        role: 'faculty',
        type: 'evaluation',
        title: 'Proposal Evaluated',
        description: `Evaluated "${selectedReview.projectIdea}" for ${selectedReview.studentName} (${actionChoice}).`,
        targetLink: '/faculty/reviews'
      });

      activityService.logActivity({
        role: 'student',
        type: 'review_update',
        title: 'Faculty Committee Decision',
        description: `Faculty evaluated your proposal "${selectedReview.projectIdea}": ${actionChoice}.`,
        targetLink: '/student/analyses'
      });

      addToast(`Evaluation recorded as "${newStatus}" for ${selectedReview.studentName}`, 'success');
      setSelectedReview(null);
      await loadReviews();
    } catch (err) {
      addToast('Error saving review status', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink-primary">
            Capstone Proposal Evaluation Queue
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-1">
            Review submitted student proposition dossiers, evaluate prior art similarity scores, and authorize Phase 1 engineering implementation.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="p-1 rounded-lg bg-ivory-card border border-border flex items-center space-x-1 shadow-soft self-start sm:self-auto">
          {['all', 'pending', 'reviewed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all focus:outline-none ${
                activeTab === tab
                  ? 'bg-burgundy text-ivory shadow-soft'
                  : 'text-ink-secondary hover:text-ink-primary hover:bg-beige/40'
              }`}
            >
              {tab === 'all' ? 'All Submissions' : tab === 'pending' ? 'Pending Review' : 'Reviewed'}
            </button>
          ))}
        </div>
      </div>

      {/* Review items */}
      {loading ? (
        <LoadingState message="Retrieving faculty review queue..." />
      ) : reviews.length === 0 ? (
        <EmptyState
          title="No reviews in this queue"
          description="All student capstone idea propositions have been cleared."
          icon={ClipboardCheck}
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-ivory-card border border-border rounded-card p-5 sm:p-6 shadow-card hover:border-burgundy/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs px-2.5 py-0.5 rounded font-semibold border ${
                    rev.status === 'Pending Review'
                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {rev.status}
                  </span>
                  <DomainBadge domain={rev.domain} size="xs" />
                  <span className="text-xs text-ink-muted">
                    Submitted on {rev.submissionDate}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-ink-primary">
                  {rev.projectIdea}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-ink-secondary">
                  <span className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-ink-muted" />
                    <strong>{rev.studentName}</strong> ({rev.studentRoll})
                  </span>
                  <span>•</span>
                  <span>
                    Highest Prior Art Overlap: <strong className="text-burgundy font-mono">{rev.similarityScore}%</strong>
                  </span>
                  {rev.reviewerName && (
                    <>
                      <span>•</span>
                      <span className="text-ink-muted">Supervisor: {rev.reviewerName}</span>
                    </>
                  )}
                </div>

                {rev.facultyNotes && (
                  <div className="p-3 rounded-lg bg-ivory border border-border text-xs text-ink-secondary mt-2">
                    <strong className="text-ink-primary">Committee Guidance:</strong> "{rev.facultyNotes}"
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2.5 self-end md:self-center flex-shrink-0">
                <Link
                  to={`/student/analysis/${rev.analysisId}`}
                  className="px-3.5 py-2 rounded-lg border border-border bg-ivory hover:bg-beige/40 text-xs font-semibold text-burgundy transition-colors shadow-soft flex items-center space-x-1 focus:outline-none"
                >
                  <span>Open Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Link>

                <button
                  onClick={() => openReviewModal(rev)}
                  className="px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all focus:outline-none"
                >
                  {rev.status === 'Reviewed' ? 'Update Guidance' : 'Evaluate & Guide'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        title="Capstone Proposal Evaluation"
        maxWidth="max-w-xl"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-lg bg-ivory border border-border text-xs space-y-1">
              <div className="font-serif text-base font-bold text-ink-primary">
                {selectedReview.projectIdea}
              </div>
              <div className="text-ink-secondary">
                Candidate: <strong>{selectedReview.studentName}</strong> ({selectedReview.studentRoll}) • Prior Art Overlap: <strong className="text-burgundy font-mono">{selectedReview.similarityScore}%</strong>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                Committee Decision / Action
              </label>
              <select
                value={actionChoice}
                onChange={(e) => setActionChoice(e.target.value)}
                className="w-full px-3 py-2 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              >
                <option value="Approved for Implementation">Approved for Phase 1 Prototype</option>
                <option value="Request Technical Clarification">Request Technical Clarification on Architecture</option>
                <option value="Needs Methodology Review">Needs Methodology Revision (High Domain Overlap)</option>
                <option value="Reject Duplicate Proposition">Disallowed (Critical Saturation / Derivative)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                Faculty Guidance & Improvement Notes
              </label>
              <textarea
                rows={4}
                value={facultyNotes}
                onChange={(e) => setFacultyNotes(e.target.value)}
                placeholder="Detail technical instructions, recommended datasets, or architectural suggestions..."
                className="w-full px-3 py-2 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-ink-secondary hover:bg-beige/40 transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => handleSaveReview('Reviewed')}
                className="px-5 py-2 rounded-lg bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft focus:outline-none"
              >
                {isUpdating ? 'Saving...' : 'Submit Evaluation'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
