import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileSearch,
  Layers,
  Code2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  RotateCcw
} from 'lucide-react';
import { analysisService } from '../../services/analysisService';
import { activityService } from '../../services/activityService';
import { useToast } from '../../context/ToastContext';
import FeatureList from '../../components/analysis/FeatureList';
import TechnologyTag from '../../components/common/TechnologyTag';

const DOMAINS = [
  'Artificial Intelligence',
  'Healthcare',
  'Cybersecurity',
  'IoT',
  'Web Development',
  'Education'
];

const PRESETS = [
  {
    label: 'Vision & Speech Capstone Proposal',
    title: 'OmniScribe: Edge Vision-Language Assistant for Real-Time Handwritten Equation Solving with Audio Explanations',
    domain: 'Artificial Intelligence',
    description: 'A compact on-device vision-language model deployed on mobile hardware to parse complex multi-step handwritten algebra and calculus equations, generate step-by-step LaTeX transcriptions, and synthesize interactive voice explanations in multilingual regional languages for remote learners.',
    features: [
      'Real-time camera feed stroke recognition and continuous noise cancellation',
      'Vernacular audio narration explaining why each algebraic transformation occurred',
      'Interactive step-by-step canvas highlighting errors in student derivations',
      'Offline inference quantized for low-tier Android smartphones (<2GB RAM)',
      'Automated practice worksheet generation based on detected student weakness patterns'
    ],
    technologies: ['PyTorch', 'ONNX Runtime', 'Flutter', 'FastAPI', 'SymPy', 'Whisper']
  },
  {
    label: 'Zero-Knowledge Security Proposal',
    title: 'CryptoBadge: Zero-Knowledge Verification for Extracurricular Hackathon Certifications',
    domain: 'Cybersecurity',
    description: 'A decentralized application that issues cryptographic verifiable credentials for competitive hackathons using zk-SNARKs to prove competition placement without exposing student personal IDs.',
    features: [
      'Soulbound NFT badge minting with customizable SVG metadata',
      'zk-SNARK verification proving Top 3 Finisher status without revealing student identity',
      'Gasless student claim transactions via ERC-4337 account abstraction',
      'Integration with GitHub API to verify commit histories during competition hours'
    ],
    technologies: ['Solidity', 'Circom', 'Ethers.js', 'Polygon', 'Next.js']
  }
];

export default function NewIdeaAnalysis() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Artificial Intelligence');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState([
    'Real-time automated edge inference without continuous server latency',
    'Interactive student feedback dashboard with verified references'
  ]);
  const [technologies, setTechnologies] = useState(['Python', 'PyTorch', 'FastAPI']);
  const [techInput, setTechInput] = useState('');

  // Loading state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

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

  const loadPreset = (preset) => {
    setTitle(preset.title);
    setDomain(preset.domain);
    setDescription(preset.description);
    setFeatures(preset.features);
    setTechnologies(preset.technologies);
    addToast(`Loaded sample proposal: ${preset.label}`, 'info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      addToast('Please provide both a proposal title and a detailed technical description.', 'error');
      return;
    }
    if (features.length === 0) {
      addToast('Please specify at least 1 proposed technical feature or module.', 'error');
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await analysisService.runAnalysis(
        {
          title,
          domain,
          description,
          features,
          technologies
        },
        (stage) => {
          setCurrentStage(stage);
        }
      );

      // Log student activity
      activityService.logActivity({
        role: 'student',
        type: 'analysis',
        title: 'Completed Feasibility Analysis',
        description: `Generated prior art report for "${title}" (${result.highestSimilarity}% overlap).`,
        targetLink: `/student/analysis/${result.id}`
      });

      addToast('Feasibility and prior art analysis completed successfully!', 'success');
      navigate(`/student/analysis/${result.id}`);
    } catch (err) {
      console.error(err);
      addToast('Error during feasibility analysis. Please try again.', 'error');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Editorial Header with Clean Academic Terminology */}
      <div className="border-b border-border pb-5 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-antique font-bold">
          <BookOpen className="w-3.5 h-3.5 text-burgundy" />
          <span>Capstone Proposal Formulation</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-burgundy-dark tracking-tight">
          Project Feasibility & Prior Art Analysis
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-2xl">
          Submit your proposed capstone project topic to evaluate conceptual overlap with past department deliverables, extract known technical limitations, and establish a substantiated research gap.
        </p>

        {/* Preset quick-load pills */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-ink-secondary">
            Sample Proposals (Demo Data):
          </span>
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadPreset(preset)}
              className="text-xs px-2.5 py-1 rounded bg-beige-light hover:bg-beige text-ink-primary border border-border hover:border-burgundy/40 transition-colors focus:outline-none"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form or Multi-Stage Loading State */}
      {isAnalyzing ? (
        <div className="bg-ivory-card border border-border rounded-card p-8 sm:p-12 shadow-card text-center space-y-7 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-14 h-14 rounded-full border-3 border-beige border-t-burgundy animate-spin" />
            <FileSearch className="w-5 h-5 text-burgundy absolute inset-0 m-auto" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-antique">
              Cross-Referencing Repository Archive
            </span>
            <h3 className="font-serif text-2xl font-bold text-burgundy-dark">
              Evaluating Prior Art & Lineage Overlap
            </h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Querying verified project records, computing architectural convergence, and extracting limitation gaps for novelty assessment.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="max-w-lg mx-auto bg-ivory/60 p-5 rounded-xl border border-border text-left space-y-3.5">
            {[
              { step: 1, label: 'Analyzing project description & problem statement formulation...' },
              { step: 2, label: 'Cross-referencing repository archives & domain literature...' },
              { step: 3, label: 'Evaluating conceptual overlap & extracting limitation gaps...' },
              { step: 4, label: 'Synthesizing prior art findings & novelty recommendations...' },
            ].map((s) => {
              const isDone = (currentStage?.step || 1) > s.step;
              const isCurrent = (currentStage?.step || 1) === s.step;
              return (
                <div key={s.step} className="flex items-center space-x-3 text-xs">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] flex-shrink-0 transition-colors ${
                      isDone
                        ? 'bg-burgundy text-ivory'
                        : isCurrent
                        ? 'bg-burgundy/20 text-burgundy border border-burgundy animate-pulse'
                        : 'bg-beige/60 text-ink-muted'
                    }`}
                  >
                    {isDone ? '✓' : s.step}
                  </div>
                  <span
                    className={`font-medium ${
                      isCurrent
                        ? 'text-burgundy-dark font-bold'
                        : isDone
                        ? 'text-ink-primary'
                        : 'text-ink-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-ink-muted">
            Executing simulated local embedding extraction. In production, this proxies to FastAPI + SentenceTransformers.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Title & Domain */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                Proposed Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ScribeSense: Vernacular Handwritten Mathematical OCR with Audio Step Explanations"
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy transition-all shadow-soft"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                  Academic Domain *
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary focus:outline-none focus:border-burgundy transition-all shadow-soft cursor-pointer"
                >
                  {DOMAINS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                  Repository Reference Set
                </label>
                <div className="px-3.5 py-2.5 bg-ivory/60 border border-border rounded-lg text-xs text-ink-secondary flex items-center justify-between">
                  <span>Department Capstone Archive (2021–2025)</span>
                  <span className="font-mono text-[11px] text-burgundy font-semibold">Indexed</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-1.5">
                Detailed Technical Description & Problem Statement *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the technical methodology, algorithms, datasets, hardware constraints, and primary intended outcomes of your proposed solution..."
                className="w-full px-3.5 py-2.5 bg-ivory border border-border rounded-lg text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy transition-all shadow-soft"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">
                Provide substantive context regarding your proposed algorithms, target deployment platform, and functional scope.
              </span>
            </div>
          </div>

          {/* Section 2: Features & Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proposed Features List */}
            <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
              <FeatureList
                items={features}
                onChange={setFeatures}
                label="Proposed Key Features & Modules *"
                placeholder="e.g. On-device INT4 quantization for low-end mobile devices"
                type="positive"
              />
            </div>

            {/* Technologies */}
            <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-ink-secondary mb-2">
                  Proposed Technologies & Tools ({technologies.length})
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
                    placeholder="Add technology (e.g. PyTorch, Docker, LoRaWAN)..."
                    className="flex-1 px-3 py-2 bg-ivory border border-border rounded-lg text-xs text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-burgundy transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3.5 py-2 bg-beige/60 hover:bg-beige text-ink-primary hover:text-burgundy text-xs font-semibold rounded-lg border border-border transition-colors focus:outline-none"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[50px] p-2.5 rounded-lg bg-ivory border border-border">
                  {technologies.length === 0 ? (
                    <span className="text-xs text-ink-muted italic">No technologies added yet.</span>
                  ) : (
                    technologies.map((t) => (
                      <TechnologyTag key={t} name={t} onRemove={handleRemoveTech} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Academic Integrity Policy */}
          <div className="p-4 rounded-xl bg-beige/40 border border-border flex items-start space-x-3 text-xs text-ink-secondary">
            <ShieldCheck className="w-5 h-5 text-burgundy flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-ink-primary">Academic Novelty & Citation Standard:</strong> Analysis scores measure conceptual and architectural alignment against archived projects. Findings identify prior art to help you cite relevant predecessors and substantiate genuine novel engineering contributions.
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-card hover:shadow-elevated transition-all flex items-center justify-center space-x-2 focus:outline-none"
            >
              <FileSearch className="w-4 h-4" />
              <span>Evaluate Project Feasibility</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
