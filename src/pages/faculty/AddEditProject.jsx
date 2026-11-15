import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { projectService } from '../../services/projectService';
import { useToast } from '../../context/ToastContext';
import FeatureList from '../../components/analysis/FeatureList';
import TechnologyTag from '../../components/common/TechnologyTag';
import LoadingState from '../../components/common/LoadingState';

const DOMAINS = [
  'Artificial Intelligence',
  'Healthcare',
  'Cybersecurity',
  'IoT',
  'Web Development',
  'Education'
];

export default function AddEditProject() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('Artificial Intelligence');
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [author, setAuthor] = useState('');
  const [advisor, setAdvisor] = useState('Dr. K. S. Venkatesh');
  const [githubUrl, setGithubUrl] = useState('');
  const [features, setFeatures] = useState([]);
  const [limitations, setLimitations] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    async function loadExisting() {
      if (!isEdit) return;
      try {
        const proj = await projectService.getProjectById(id);
        if (!proj) {
          addToast('Project not found', 'error');
          navigate('/faculty/projects');
          return;
        }
        setTitle(proj.title || '');
        setAbstract(proj.abstract || '');
        setDescription(proj.description || '');
        setDomain(proj.domain || 'Artificial Intelligence');
        setAcademicYear(proj.academicYear || '2024-2025');
        setAuthor(proj.author || '');
        setAdvisor(proj.advisor || '');
        setGithubUrl(proj.githubUrl || '');
        setFeatures(proj.features || []);
        setLimitations(proj.limitations || []);
        setTechnologies(proj.technologies || []);
      } catch (err) {
        addToast('Failed to load project details', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadExisting();
  }, [id, isEdit, navigate, addToast]);

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const clean = techInput.trim();
    if (!technologies.includes(clean)) {
      setTechnologies([...technologies, clean]);
    }
    setTechInput('');
  };

  const handleRemoveTech = (t) => {
    setTechnologies(technologies.filter(item => item !== t));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !abstract.trim()) {
      addToast('Project title and abstract are required.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title,
        abstract,
        description,
        domain,
        academicYear,
        author: author || 'Student Capstone Cohort',
        advisor: advisor || 'Faculty Evaluator',
        githubUrl,
        features,
        limitations,
        technologies
      };

      if (isEdit) {
        await projectService.updateProject(id, payload);
        addToast(`Project "${title}" updated successfully`, 'success');
      } else {
        await projectService.createProject(payload);
        addToast(`New project "${title}" indexed into collegiate archive`, 'success');
      }

      navigate('/faculty/projects');
    } catch (err) {
      addToast('Error saving project record', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading project record for editing..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          to="/faculty/projects"
          className="inline-flex items-center text-xs font-semibold text-ink-secondary hover:text-burgundy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to Manage Projects</span>
        </Link>

        <span className="text-xs uppercase font-bold tracking-wider text-antique">
          {isEdit ? 'Editing Existing Record' : 'Index New Record'}
        </span>
      </div>

      <div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark">
          {isEdit ? 'Update Project Archive Record' : 'Index New College Project Deliverable'}
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary mt-1">
          Provide comprehensive structural metadata to power vector searches and semantic similarity matching.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Metadata */}
        <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
          <h3 className="font-serif text-lg font-bold text-ink-primary border-b border-border pb-2">
            1. Core Identification
          </h3>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NeuroScan: Automated Brain MRI Tumor Segmentation & Grading"
              className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary focus:outline-none focus:border-burgundy"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Academic Domain *
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary focus:outline-none focus:border-burgundy cursor-pointer"
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Academic Year *
              </label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2024-2025"
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary focus:outline-none focus:border-burgundy font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Author(s) / Student Cohort
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Rohan Varma, Sneha Mukherjee"
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
                Faculty Advisor
              </label>
              <input
                type="text"
                value={advisor}
                onChange={(e) => setAdvisor(e.target.value)}
                placeholder="e.g. Dr. K. S. Venkatesh"
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
              Project Abstract *
            </label>
            <textarea
              required
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="High-level technical abstract summarizing problem, methodology, and primary metrics..."
              className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy font-serif"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
              Detailed Description & Architectural Blueprint
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed explanation of system components, pipeline, and hardware/software design..."
              className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/projectinsight-archive/your-project"
              className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-xs font-mono text-ink-primary focus:outline-none focus:border-burgundy"
            />
          </div>
        </div>

        {/* Section 2: Features & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Features */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <FeatureList
              items={features}
              onChange={setFeatures}
              label="Demonstrated Project Features"
              placeholder="Add key feature..."
              type="positive"
            />
          </div>

          {/* Limitations */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <FeatureList
              items={limitations}
              onChange={setLimitations}
              label="Documented Project Limitations"
              placeholder="Add acknowledged limitation..."
              type="limitation"
            />
          </div>
        </div>

        {/* Section 3: Technologies */}
        <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
          <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1">
            Technologies & Frameworks
          </label>

          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTech();
                }
              }}
              placeholder="Add technology (e.g. PyTorch, React, Docker)..."
              className="flex-1 px-3 py-2 bg-ivory border border-border rounded-lg text-xs text-ink-primary focus:outline-none focus:border-burgundy"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-3.5 py-2 bg-beige/60 hover:bg-beige text-ink-primary hover:text-burgundy text-xs font-medium rounded-lg border border-border transition-colors"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-ivory border border-border min-h-[50px]">
            {technologies.length === 0 ? (
              <span className="text-xs text-ink-muted italic">No technologies added.</span>
            ) : (
              technologies.map((t) => (
                <TechnologyTag key={t} name={t} onRemove={handleRemoveTech} />
              ))
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <Link
            to="/faculty/projects"
            className="px-5 py-2.5 rounded-lg border border-border bg-ivory-card hover:bg-beige/40 text-xs font-semibold text-ink-secondary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-card hover:shadow-elevated transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Index Deliverable'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
