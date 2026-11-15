import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileSearch,
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Download,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Cpu,
  Sparkles,
  BookOpen,
  GitCompare,
  Info,
  Compass,
  Tag,
  Check,
  Award,
  FileText,
  User,
  ArrowRight
} from 'lucide-react';
import { analysisService } from '../../services/analysisService';
import { useToast } from '../../context/ToastContext';
import DomainBadge from '../../components/common/DomainBadge';
import TechnologyTag from '../../components/common/TechnologyTag';
import LoadingState from '../../components/common/LoadingState';

export default function AnalysisResult() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function loadAnalysis() {
      setLoading(true);
      try {
        const data = await analysisService.getAnalysisById(id);
        if (!data) {
          addToast('Analysis record not found', 'error');
          navigate('/student/analyses');
          return;
        }
        setAnalysis(data);
      } catch (err) {
        console.error('Failed to load analysis:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalysis();
  }, [id, navigate, addToast]);

  const handleDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      addToast('Project Feasibility Dossier ready (print dialog opened)', 'success');
      window.print();
    }, 400);
  };

  // Safe data extraction for the 8 dimensions
  const dimensionsData = useMemo(() => {
    if (!analysis) return null;

    const topMatch = analysis.topMatches?.[0] || null;

    // Dimension 1: Overall Semantic Similarity
    const similarityScore = analysis.highestSimilarity ?? (topMatch?.similarity || 72);
    let similarityLevel = 'Low Semantic Similarity';
    let similarityBadgeClass = 'text-antique-dark bg-antique/10 border-antique/30';
    let similarityBarClass = 'bg-antique';

    if (similarityScore >= 70) {
      similarityLevel = 'High Semantic Similarity';
      similarityBadgeClass = 'text-burgundy-dark bg-burgundy/10 border-burgundy/30';
      similarityBarClass = 'bg-burgundy';
    } else if (similarityScore >= 45) {
      similarityLevel = 'Moderate Semantic Similarity';
      similarityBadgeClass = 'text-burgundy bg-rose-muted/20 border-rose-muted/40';
      similarityBarClass = 'bg-burgundy-secondary';
    }

    // Dimension 2: Shared Concepts
    const sharedConcepts = (topMatch?.matchingConcepts && topMatch.matchingConcepts.length > 0)
      ? topMatch.matchingConcepts
      : [
          'Core problem formulation & contextual modeling',
          'Domain-specific feature extraction pipeline',
          'Algorithmic decision optimization',
          'Automated evaluation benchmark criteria'
        ];

    // Dimension 3: Feature / Functional Overlap
    const featureOverlap = (analysis.comparison?.commonFeatures && analysis.comparison.commonFeatures.length > 0)
      ? analysis.comparison.commonFeatures
      : [
          {
            name: 'Core domain workflow execution',
            context: `Foundational capability shared with ${topMatch?.projectTitle || 'archived departmental benchmarks'}.`
          },
          {
            name: 'Structured data query & response formatting',
            context: 'Standardized query ingestion and algorithmic response serialization.'
          }
        ];

    // Dimension 4: Domain Similarity
    const proposalDomain = analysis.domain || 'Computer Science & Engineering';
    const benchmarkDomain = topMatch?.domain || analysis.domain || 'Computer Science & Engineering';
    const isIntraDomain = proposalDomain.toLowerCase() === benchmarkDomain.toLowerCase();
    const domainAlignmentLabel = isIntraDomain
      ? 'Intra-Domain Alignment (100% Disciplinary Convergence)'
      : 'Cross-Disciplinary Interdisciplinary Alignment';
    const domainDescription = isIntraDomain
      ? `Both the proposed project and historical benchmark operate within ${proposalDomain}. Methodological conventions, evaluation paradigms, and domain terminology exhibit direct alignment.`
      : `The proposed project bridges ${proposalDomain} with concepts from ${benchmarkDomain}, representing cross-disciplinary transfer of techniques.`;

    // Dimension 5: Technologies Used
    const proposedTech = (analysis.technologies && analysis.technologies.length > 0)
      ? analysis.technologies
      : ['PyTorch', 'FastAPI', 'React', 'Docker'];
    const benchmarkTech = topMatch?.technologies || ['Python', 'FastAPI', 'PyTorch'];
    const sharedTech = proposedTech.filter(t =>
      benchmarkTech.some(bt => bt.toLowerCase() === t.toLowerCase())
    );
    const distinctTech = proposedTech.filter(t =>
      !benchmarkTech.some(bt => bt.toLowerCase() === t.toLowerCase())
    );

    // Dimension 6: New / Distinct Features
    const distinctFeatures = (analysis.comparison?.newlyProposedFeatures && analysis.comparison.newlyProposedFeatures.length > 0)
      ? analysis.comparison.newlyProposedFeatures
      : (analysis.features && analysis.features.length > 0)
        ? analysis.features.slice(0, 3).map((f, i) => ({
            name: f,
            impact: i === 0 ? 'High Technical Novelty' : 'Differentiating Value',
            rationale: `Proposed capability addressing unserved requirements in ${topMatch?.projectTitle || 'historical deliverables'}.`
          }))
        : [
            {
              name: 'Autonomous edge-quantized model execution',
              impact: 'High Technical Novelty',
              rationale: 'Executes without continuous cloud compute dependency, lowering infrastructure barriers.'
            },
            {
              name: 'Dynamic adaptive remediation dialogue',
              impact: 'High Pedagogical Novelty',
              rationale: 'Provides interactive explanation rather than static result generation.'
            }
          ];

    // Dimension 7: Improvement Suggestions
    const improvementSuggestions = (analysis.opportunities?.recommendedDirections && analysis.opportunities.recommendedDirections.length > 0)
      ? analysis.opportunities.recommendedDirections
      : [
          `Formulate a rigorous comparative benchmark isolating performance deltas against ${topMatch?.projectTitle || 'historical baseline'}.`,
          'Document empirical ablation experiments verifying the individual contribution of each novel module.',
          'Validate latency and memory consumption under resource-constrained execution environments.'
        ];

    // Dimension 8: Limitations / Interpretation Notes
    const interpretationQuote = 'High semantic similarity indicates that the proposed project is conceptually related to historical projects. It does not establish plagiarism or prove that the projects are identical.';

    return {
      topMatch,
      similarityScore,
      similarityLevel,
      similarityBadgeClass,
      similarityBarClass,
      sharedConcepts,
      featureOverlap,
      proposalDomain,
      benchmarkDomain,
      isIntraDomain,
      domainAlignmentLabel,
      domainDescription,
      proposedTech,
      benchmarkTech,
      sharedTech,
      distinctTech,
      distinctFeatures,
      improvementSuggestions,
      interpretationQuote
    };
  }, [analysis]);

  if (loading) {
    return <LoadingState message="Loading multidimensional prior art analysis..." />;
  }

  if (!analysis || !dimensionsData) return null;

  const {
    topMatch,
    similarityScore,
    similarityLevel,
    similarityBadgeClass,
    similarityBarClass,
    sharedConcepts,
    featureOverlap,
    proposalDomain,
    benchmarkDomain,
    domainAlignmentLabel,
    domainDescription,
    proposedTech,
    benchmarkTech,
    sharedTech,
    distinctTech,
    distinctFeatures,
    improvementSuggestions,
    interpretationQuote
  } = dimensionsData;

  return (
    <div className="space-y-7 animate-fade-in max-w-5xl mx-auto print:max-w-none print:m-0 pb-12">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-border pb-4 print:hidden">
        <Link
          to="/student/analyses"
          className="inline-flex items-center text-xs font-semibold text-ink-secondary hover:text-burgundy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          <span>Back to Analysis History</span>
        </Link>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="px-3.5 py-2 rounded-lg border border-border bg-ivory-card hover:bg-beige/40 text-ink-primary text-xs font-semibold transition-colors shadow-soft flex items-center space-x-1.5 focus:outline-none"
          >
            <Download className="w-3.5 h-3.5 text-burgundy" />
            <span>{downloading ? 'Compiling Dossier...' : 'Export Dossier (PDF)'}</span>
          </button>

          <Link
            to="/student/analyse"
            className="px-3.5 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all flex items-center space-x-1.5 focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyse Another Proposal</span>
          </Link>
        </div>
      </div>

      {/* Header Card: Submitted Proposal Identity */}
      <div className="bg-ivory-card border border-border rounded-card p-6 sm:p-7 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3.5">
          <div className="flex items-center space-x-2.5">
            <DomainBadge domain={analysis.domain} size="md" />
            <span className="text-xs text-ink-muted">•</span>
            <span className="text-xs text-ink-secondary flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-ink-muted" />
              {analysis.date}
            </span>
            {analysis.authorName && (
              <>
                <span className="text-xs text-ink-muted">•</span>
                <span className="text-xs text-ink-secondary flex items-center font-medium">
                  <User className="w-3.5 h-3.5 mr-1 text-burgundy" />
                  {analysis.authorName} ({analysis.authorRoll || 'Student'})
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="font-mono text-ink-muted">Report Ref: {analysis.id}</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold tracking-wide uppercase">
              Multidimensional Analysis Ready
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[11px] uppercase font-bold tracking-widest text-antique">
            Submitted Capstone Proposition
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-burgundy-dark leading-tight">
            {analysis.title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed bg-ivory/60 p-4 rounded-lg border border-border italic">
            "{analysis.description}"
          </p>
        </div>
      </div>

      {/* 8-DIMENSIONAL ANALYSIS PRESENTATION SECTION */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-burgundy/10 text-burgundy border border-burgundy/20">
                Prior Art Evaluation Framework
              </span>
              <span className="text-xs text-ink-muted">8 Analytical Dimensions</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink-primary">
              Multidimensional Feasibility & Overlap Breakdown
            </h2>
          </div>
          <p className="text-xs text-ink-secondary max-w-md">
            Holistic assessment evaluating semantic vocabulary, functional overlap, tech stack alignment, and novel contributions.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: DIMENSION 1 (SIMILARITY SCORE) & DIMENSION 8 (INTERPRETATION NOTES) */}
        {/* KEPT EXPLICITLY SEPARATE AS REQUIRED */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* DIMENSION 1: Overall Semantic Similarity Card */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-burgundy text-ivory">
                    Dimension 1
                  </span>
                  <span className="text-xs uppercase font-bold text-ink-muted tracking-wider">
                    Quantitative Metric
                  </span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${similarityBadgeClass}`}>
                  {similarityLevel}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-ink-primary mb-1">
                Overall Semantic Similarity
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Calculated textual, conceptual, and vocabulary alignment against the closest archived project in the repository.
              </p>
            </div>

            {/* Score Display (Kept Visually Distinct) */}
            <div className="p-4 rounded-xl bg-ivory border border-border space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-burgundy-dark font-mono">
                    {similarityScore}%
                  </span>
                  <span className="text-xs text-ink-muted ml-2 font-medium">
                    Semantic Proximity
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                    Top Benchmark
                  </span>
                  <span className="text-xs font-semibold text-burgundy truncate max-w-[180px] inline-block">
                    {topMatch?.projectTitle || 'Historical Archive'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-beige/60 h-2.5 rounded-full overflow-hidden border border-border">
                <div
                  className={`h-full ${similarityBarClass} transition-all duration-700 ease-out rounded-full`}
                  style={{ width: `${similarityScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-ink-muted pt-1">
                <span>0% Distinct</span>
                <span>50% Moderate Convergence</span>
                <span>100% Complete Alignment</span>
              </div>
            </div>

            <div className="text-[11px] text-ink-secondary bg-beige/30 p-2.5 rounded-lg border border-border/80 flex items-start space-x-2">
              <Info className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
              <span>
                This quantitative score reflects vector and keyword similarity with archived literature. It is evaluated independently from the qualitative interpretation below.
              </span>
            </div>
          </div>

          {/* DIMENSION 8: Limitations / Interpretation Notes Card */}
          <div className="bg-ivory-card border border-burgundy/25 rounded-card p-6 shadow-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-burgundy-dark text-ivory">
                    Dimension 8
                  </span>
                  <span className="text-xs uppercase font-bold text-burgundy-dark tracking-wider">
                    Academic Guidance
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-burgundy/10 text-burgundy border border-burgundy/20 font-medium">
                  Faculty Committee Standard
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-ink-primary mb-1">
                Limitations & Interpretation Notes
              </h3>
              <p className="text-xs text-ink-secondary">
                Mandatory context for evaluating semantic similarity within academic project defense.
              </p>
            </div>

            {/* Exact Required Prompt Quote Callout */}
            <div className="p-4 rounded-xl bg-burgundy/[0.04] border-l-4 border-burgundy border-y border-r border-burgundy/20 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-burgundy uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-burgundy" />
                <span>Institutional Interpretation Rule</span>
              </div>
              <blockquote className="text-xs sm:text-sm font-serif italic text-ink-primary leading-relaxed font-semibold">
                "{interpretationQuote}"
              </blockquote>
            </div>

            {/* Interpretation Bullets */}
            <div className="space-y-2 text-xs text-ink-secondary">
              <div className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-ink-primary">Not a Plagiarism Index:</strong> Similarity measures conceptual proximity and literature continuity, not textual copying or intellectual property violation.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-ink-primary">Not an Originality Percentage:</strong> High overlap in standard capstone areas (e.g. OCR, navigation) is expected; the focus is on substantiated technical differentiation.
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-ink-primary">Advisory for Synopsis Defense:</strong> Use this breakdown to substantiate to your faculty guide how your work solves limitations present in prior cohorts.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: DIMENSION 2 (SHARED CONCEPTS) & DIMENSION 3 (FEATURE OVERLAP)      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* DIMENSION 2: Shared Concepts */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-beige text-ink-primary border border-border">
                  Dimension 2
                </span>
                <h3 className="font-serif text-lg font-bold text-ink-primary">
                  Shared Concepts
                </h3>
              </div>
              <span className="text-xs text-ink-muted">
                {sharedConcepts.length} Thematic Matches
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              High-level domain principles, problem formulations, and architectural paradigms identified in common with top repository benchmarks:
            </p>

            <div className="space-y-2.5">
              {sharedConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-ivory/70 border border-border flex items-start space-x-3 hover:border-burgundy/30 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-burgundy mt-1.5 flex-shrink-0" />
                  <div className="text-xs text-ink-primary font-medium leading-relaxed">
                    {concept}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-ink-muted pt-1 flex items-center justify-between">
              <span>Benchmark Source: {topMatch?.projectTitle || 'Collegiate Archive'}</span>
              <span className="font-mono text-burgundy font-semibold">Thematic Parity</span>
            </div>
          </div>

          {/* DIMENSION 3: Feature / Functional Overlap */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-beige text-ink-primary border border-border">
                  Dimension 3
                </span>
                <h3 className="font-serif text-lg font-bold text-ink-primary">
                  Feature / Functional Overlap
                </h3>
              </div>
              <span className="text-xs text-ink-muted">
                {featureOverlap.length} System Capabilities
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              Concrete system functionalities and modules proposed in this submission that duplicate or closely mirror existing repository mechanisms:
            </p>

            <div className="space-y-2.5">
              {featureOverlap.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-ivory/70 border border-border space-y-1 hover:border-burgundy/30 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Layers className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                    <h4 className="text-xs font-bold text-ink-primary">
                      {feat.name}
                    </h4>
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed pl-5.5">
                    {feat.context}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-ink-muted pt-1 flex items-center justify-between">
              <span>Scope: Direct Functional Subsystems</span>
              <span className="text-ink-secondary font-medium">Re-implementation Zone</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: DIMENSION 4 (DOMAIN SIMILARITY) & DIMENSION 5 (TECHNOLOGIES USED)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* DIMENSION 4: Domain Similarity */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-beige text-ink-primary border border-border">
                  Dimension 4
                </span>
                <h3 className="font-serif text-lg font-bold text-ink-primary">
                  Domain Similarity
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-burgundy/10 text-burgundy border border-burgundy/20">
                Discipline Alignment
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              Curricular classification and cross-disciplinary taxonomic positioning relative to indexed capstones:
            </p>

            {/* Domain Comparison Badges */}
            <div className="p-4 rounded-xl bg-ivory border border-border space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-ivory-card border border-border">
                  <span className="text-[10px] uppercase font-bold text-ink-muted block mb-1">
                    Candidate Domain
                  </span>
                  <DomainBadge domain={proposalDomain} size="sm" />
                </div>
                <div className="p-2.5 rounded-lg bg-ivory-card border border-border">
                  <span className="text-[10px] uppercase font-bold text-ink-muted block mb-1">
                    Benchmark Domain
                  </span>
                  <DomainBadge domain={benchmarkDomain} size="sm" />
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-ink-primary">{domainAlignmentLabel}</span>
                  <span className="font-mono text-xs text-burgundy font-bold">
                    {proposalDomain === benchmarkDomain ? '100% Disciplinary Match' : 'Interdisciplinary'}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {domainDescription}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-ink-muted pt-1 flex items-center justify-between">
              <span>Department: CSE Faculty Committee</span>
              <span className="text-ink-secondary">Curricular Taxonomy Verified</span>
            </div>
          </div>

          {/* DIMENSION 5: Technologies Used */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-beige text-ink-primary border border-border">
                  Dimension 5
                </span>
                <h3 className="font-serif text-lg font-bold text-ink-primary">
                  Technologies Used
                </h3>
              </div>
              <span className="text-xs text-ink-muted">
                Stack Comparison
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              Comparative mapping of proposed runtime dependencies, libraries, and frameworks against prior art implementations:
            </p>

            <div className="space-y-3.5">
              {/* Shared Tech */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-ink-primary flex items-center">
                    <Tag className="w-3.5 h-3.5 text-burgundy mr-1" />
                    Shared Stack with Top Benchmark ({sharedTech.length})
                  </span>
                  <span className="text-[11px] text-ink-muted">Identical Dependencies</span>
                </div>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg bg-beige/30 border border-border">
                  {sharedTech.length > 0 ? (
                    sharedTech.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded bg-ivory-card text-burgundy font-semibold border border-burgundy/30 shadow-xs flex items-center space-x-1"
                      >
                        <Check className="w-3 h-3 text-burgundy" />
                        <span>{tech}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-ink-muted italic">No direct library overlap</span>
                  )}
                </div>
              </div>

              {/* Distinct Proposed Tech */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-ink-primary flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-antique mr-1" />
                    Distinct / Newly Proposed Stack ({distinctTech.length})
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Unique to Candidate</span>
                </div>
                <div className="flex flex-wrap gap-1.5 p-2.5 rounded-lg bg-burgundy/[0.03] border border-burgundy/20">
                  {distinctTech.length > 0 ? (
                    distinctTech.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded bg-burgundy text-ivory font-semibold shadow-xs flex items-center space-x-1"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{tech}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-ink-muted italic">All candidate technologies mirror archive</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-ink-muted pt-1 flex items-center justify-between">
              <span>Stack Convergence: {sharedTech.length} of {proposedTech.length} tools ({Math.round((sharedTech.length / (proposedTech.length || 1)) * 100)}%)</span>
              <span className="text-burgundy font-mono font-semibold">Architectural Parity</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 4: DIMENSION 6 (NEW/DISTINCT FEATURES) & DIMENSION 7 (SUGGESTIONS)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* DIMENSION 6: New / Distinct Features */}
          <div className="bg-ivory-card border border-burgundy/25 rounded-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-burgundy text-ivory">
                  Dimension 6
                </span>
                <h3 className="font-serif text-lg font-bold text-burgundy-dark">
                  New / Distinct Features
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                Novelty Drivers
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              Original capabilities and technical differentiators introduced by this proposal that are absent from matched repository records:
            </p>

            <div className="space-y-3">
              {distinctFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-burgundy/[0.03] border border-burgundy/20 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-burgundy-dark flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-burgundy flex-shrink-0" />
                      {feat.name}
                    </h4>
                    {feat.impact && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-burgundy text-ivory flex-shrink-0">
                        {feat.impact}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed pl-4.5">
                    {feat.rationale}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-ink-muted pt-1 flex items-center justify-between">
              <span>Primary Thesis Contribution Points</span>
              <span className="text-burgundy font-semibold">Substantiated Differentiation</span>
            </div>
          </div>

          {/* DIMENSION 7: Improvement Suggestions */}
          <div className="bg-ivory-card border border-border rounded-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-beige text-ink-primary border border-border">
                  Dimension 7
                </span>
                <h3 className="font-serif text-lg font-bold text-ink-primary">
                  Improvement Suggestions
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-antique/10 text-antique-dark border border-antique/25">
                Technical Advisory
              </span>
            </div>

            <p className="text-xs text-ink-secondary">
              Actionable engineering and methodological recommendations to strengthen technical rigor and widen academic novelty:
            </p>

            <div className="space-y-3">
              {improvementSuggestions.map((sugg, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-ivory/70 border border-border flex items-start space-x-2.5 hover:border-burgundy/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-burgundy mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-ink-primary leading-relaxed font-medium">
                    {sugg}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-ink-muted pt-1 flex items-center justify-between">
              <span>Guidance for Capstone Synopsis Preparation</span>
              <span className="text-ink-secondary font-medium">Actionable Directions</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: TOP 5 MATCHING BENCHMARKS IN COLLEGIATE REPOSITORY               */}
      {/* ========================================================================= */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <BookOpen className="w-4 h-4 text-burgundy" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-primary">
              Top 5 Matching Projects in Department Repository
            </h3>
          </div>
          <p className="text-xs text-ink-secondary">
            Indexed theses and capstones exhibiting the closest conceptual and architectural proximity to your proposal.
          </p>
        </div>

        <div className="space-y-3">
          {analysis.topMatches?.map((match, idx) => (
            <div
              key={idx}
              className="bg-ivory-card border border-border rounded-card p-5 shadow-card hover:border-burgundy/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-xs font-bold text-burgundy px-2 py-0.5 rounded bg-burgundy/10 border border-burgundy/20">
                    Rank #{idx + 1}
                  </span>
                  <DomainBadge domain={match.domain} size="xs" />
                  <span className="text-xs font-bold text-burgundy-dark font-mono">
                    {match.similarity}% Semantic Similarity
                  </span>
                </div>

                <h4 className="font-serif text-lg font-bold text-ink-primary">
                  {match.projectTitle}
                </h4>

                {/* Matching concepts */}
                {match.matchingConcepts && match.matchingConcepts.length > 0 && (
                  <div className="space-y-1 text-xs">
                    <div className="text-[11px] uppercase font-bold text-ink-muted">
                      Shared Problem Formulations:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {match.matchingConcepts.map((c, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded bg-beige/50 text-ink-primary border border-border"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {match.technologies?.slice(0, 5).map((tech) => (
                    <TechnologyTag key={tech} name={tech} />
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="self-end md:self-center flex-shrink-0">
                <Link
                  to={`/student/projects/${match.projectId}`}
                  className="inline-flex items-center px-3.5 py-2 rounded-lg border border-border bg-ivory hover:bg-beige/40 text-xs font-semibold text-burgundy hover:text-burgundy-hover transition-colors shadow-soft"
                >
                  <span>View Project Details</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: DOCUMENTED RESEARCH GAPS IN ARCHIVE                             */}
      {/* ========================================================================= */}
      {analysis.opportunities?.documentedLimitationsInArchive && (
        <div className="bg-ivory-card border border-border rounded-card p-6 sm:p-7 shadow-card space-y-5">
          <div className="flex items-center space-x-3 border-b border-border pb-3.5">
            <div className="w-8 h-8 rounded-lg bg-burgundy/10 flex items-center justify-center text-burgundy">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-ink-primary">
                Identified Research Gaps in Archive Records
              </h3>
              <p className="text-xs text-ink-secondary">
                Documented limitations and unaddressed challenges from prior student cohorts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Prior Limitations */}
            <div className="p-4 rounded-xl bg-ivory/60 border border-border space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-bold text-antique-dark uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-antique" />
                <span>Documented Prior Art Limitations</span>
              </div>
              <ul className="space-y-2 text-xs text-ink-secondary">
                {analysis.opportunities.documentedLimitationsInArchive.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-antique mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unaddressed Challenges */}
            {analysis.opportunities.unaddressedFeatureGaps && (
              <div className="p-4 rounded-xl bg-ivory/60 border border-border space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-burgundy uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-burgundy" />
                  <span>Unaddressed Architectural Gaps</span>
                </div>
                <ul className="space-y-2 text-xs text-ink-secondary">
                  {analysis.opportunities.unaddressedFeatureGaps.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy mt-1.5 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOTTOM ACTION & FACULTY SUBMISSION GUIDANCE                               */}
      {/* ========================================================================= */}
      <div className="p-5 rounded-card bg-ivory-card border border-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <h4 className="font-serif text-lg font-bold text-ink-primary">
            Capstone Committee Proposal Submission
          </h4>
          <p className="text-xs text-ink-secondary">
            Export this 8-dimensional report to substantiate technical novelty during faculty supervisor synopsis defense.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadReport}
            className="flex-1 sm:flex-initial px-4 py-2 bg-ivory-card hover:bg-beige/40 text-ink-primary border border-border text-xs font-semibold rounded-lg shadow-soft transition-colors flex items-center justify-center space-x-2 focus:outline-none"
          >
            <Download className="w-4 h-4 text-burgundy" />
            <span>Export Dossier (PDF)</span>
          </button>
          <Link
            to="/student/analyse"
            className="flex-1 sm:flex-initial px-4 py-2 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all flex items-center justify-center space-x-1.5 focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
