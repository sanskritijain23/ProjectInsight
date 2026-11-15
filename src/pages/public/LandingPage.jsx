import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  FileSearch,
  ArrowRight,
  Search,
  Layers,
  ShieldCheck,
  CheckCircle2,
  FileText,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TechnologyTag from '../../components/common/TechnologyTag';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory flex flex-col text-ink-primary">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-border">
        {/* Subtle background academic grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#4B192B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            {/* Eyebrow with academic clarity */}
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/25 text-burgundy text-xs font-semibold uppercase tracking-widest">
              Collegiate Capstone Prior Art & Lineage Platform
            </div>

            {/* Main Editorial Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-burgundy-dark leading-[1.12] tracking-tight">
              Every great idea has a story. <br className="hidden sm:inline" />
              <span className="italic font-normal text-burgundy-secondary">
                Know what came before.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto">
              ProjectInsight indexes multi-year collegiate capstone repositories to map conceptual lineage, identify saturated project themes, and guide engineering students toward authentic technical novelty.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                to="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-burgundy hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg shadow-card hover:shadow-elevated transition-all"
              >
                <Compass className="w-4 h-4 mr-2" />
                <span>Explore Project Repository</span>
              </Link>
              <Link
                to="/student/analyse"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 bg-ivory-card hover:bg-beige/40 text-burgundy-dark border border-border hover:border-burgundy/30 text-xs font-semibold uppercase tracking-wider rounded-lg shadow-soft transition-all"
              >
                <FileSearch className="w-4 h-4 mr-2 text-burgundy" />
                <span>Evaluate Your Proposal</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Visually Interesting Dashboard Preview */}
          <div className="mt-14 sm:mt-16 max-w-5xl mx-auto">
            <div className="bg-ivory-card rounded-2xl border border-border shadow-elevated overflow-hidden p-2 sm:p-4">
              {/* Fake Browser / App Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-ivory/60 rounded-t-xl mb-4 text-xs text-ink-muted">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-muted/60" />
                  <div className="w-3 h-3 rounded-full bg-antique/60" />
                  <div className="w-3 h-3 rounded-full bg-beige-dark/60" />
                </div>
                <div className="font-mono text-[11px] text-ink-secondary bg-ivory-card px-3 py-1 rounded border border-border">
                  projectinsight.edu / evaluation / lineage-report
                </div>
                <div className="text-[11px] font-semibold text-burgundy">
                  Sample Prior Art Evaluation
                </div>
              </div>

              {/* Preview Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 sm:p-4">
                {/* Simulated Idea Card */}
                <div className="p-4 rounded-xl bg-ivory/50 border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-burgundy px-2 py-0.5 rounded bg-burgundy/10 border border-burgundy/20">
                      Evaluated Topic
                    </span>
                    <span className="text-xs text-ink-muted">Sample Record</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-ink-primary">
                    OmniScribe: Mobile Vision Equation Assistant
                  </h4>
                  <p className="text-xs text-ink-secondary leading-relaxed line-clamp-3">
                    Quantized vision encoder deployed client-side on Android to parse handwritten mathematics with audio Socratic hints.
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <TechnologyTag name="PyTorch" />
                    <TechnologyTag name="ONNX" />
                    <TechnologyTag name="Flutter" />
                  </div>
                </div>

                {/* Simulated Similarity & Radar */}
                <div className="p-4 rounded-xl bg-ivory/50 border border-border flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-ink-secondary">
                      Closest Archived Predecessor
                    </span>
                    <h5 className="font-serif text-sm font-bold text-ink-primary mt-1">
                      ScribeSense (2024 Capstone)
                    </h5>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-ink-secondary">Conceptual Overlap</span>
                        <span className="text-burgundy font-mono font-bold">72%</span>
                      </div>
                      <div className="w-full bg-beige/60 h-2 rounded-full overflow-hidden border border-border">
                        <div className="h-full bg-burgundy rounded-full w-[72%]" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/80 text-[11px] text-ink-secondary flex items-center justify-between">
                    <span>Baseline: OCR & CAS</span>
                    <span className="text-antique font-semibold">Prior Art Match</span>
                  </div>
                </div>

                {/* Simulated Innovation Gaps */}
                <div className="p-4 rounded-xl bg-burgundy/[0.03] border border-burgundy/25 space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-burgundy px-2 py-0.5 rounded bg-burgundy/10 border border-burgundy/20">
                    Identified Research Gaps
                  </span>
                  <h5 className="font-serif text-sm font-bold text-burgundy-dark">
                    3 Verified Technical Differentiators
                  </h5>
                  <ul className="text-xs text-ink-secondary space-y-2">
                    <li className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
                      <span>INT4 Mobile Quantization (Archive used cloud GPUs)</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
                      <span>Multilingual Conversational Audio Explanations</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-burgundy mt-0.5 flex-shrink-0" />
                      <span>Camera tilt homography rectification module</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 md:py-24 bg-ivory-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2.5">
            <span className="text-xs uppercase font-bold tracking-widest text-antique">
              Evaluation Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-primary">
              How ProjectInsight Supports Academic Innovation
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Moving beyond basic keywords to deep structural comparison, helping students avoid unintentional duplication and formulate novel capstone solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-7 rounded-card border border-border bg-ivory/60 hover:bg-ivory hover:border-burgundy/30 transition-all duration-300 relative group">
              <div className="w-11 h-11 rounded-xl bg-burgundy/10 border border-burgundy/20 flex items-center justify-center text-burgundy mb-5">
                <Search className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs uppercase text-antique tracking-widest font-semibold mb-1.5">
                Phase 01
              </div>
              <h3 className="font-serif text-xl font-bold text-ink-primary mb-2.5">
                Discover Existing Projects
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Query multi-year college capstone records by architecture, hardware constraints, datasets, and engineering domains.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-card border border-border bg-ivory/60 hover:bg-ivory hover:border-burgundy/30 transition-all duration-300 relative group">
              <div className="w-11 h-11 rounded-xl bg-antique/15 border border-antique/30 flex items-center justify-center text-antique-dark mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs uppercase text-antique tracking-widest font-semibold mb-1.5">
                Phase 02
              </div>
              <h3 className="font-serif text-xl font-bold text-ink-primary mb-2.5">
                Analyse Similarities
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Compare proposed methodologies with archived deliverables, mapping baseline features without inaccurate plagiarism flags.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-card border border-border bg-ivory/60 hover:bg-ivory hover:border-burgundy/30 transition-all duration-300 relative group">
              <div className="w-11 h-11 rounded-xl bg-burgundy/10 border border-burgundy/20 flex items-center justify-center text-burgundy mb-5">
                <FileSearch className="w-5 h-5" />
              </div>
              <div className="font-mono text-xs uppercase text-antique tracking-widest font-semibold mb-1.5">
                Phase 03
              </div>
              <h3 className="font-serif text-xl font-bold text-ink-primary mb-2.5">
                Find Opportunities to Innovate
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Extract unaddressed technical limitations from prior cohorts and formulate substantiated novel contributions that elevate minor projects into publishable work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-20 md:py-24 bg-ivory border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs uppercase font-bold tracking-widest text-antique">
                Platform Capabilities
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ink-primary leading-tight">
                Designed for both student researchers and faculty review committees
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                ProjectInsight supports academic project supervision with objective lineage tracking, monitoring domain saturation and enabling students to defend novel engineering proposals.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded bg-burgundy/10 flex items-center justify-center text-burgundy mt-1 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-primary">
                      Ethical Semantic Similarity, Not Plagiarism Accusations
                    </h4>
                    <p className="text-xs text-ink-secondary leading-relaxed mt-0.5">
                      Understanding conceptual overlap empowers students to formulate valid novel features rather than fearing punitive originality scores.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded bg-burgundy/10 flex items-center justify-center text-burgundy mt-1 flex-shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-primary">
                      Domain Saturation Analytics for Faculty
                    </h4>
                    <p className="text-xs text-ink-secondary leading-relaxed mt-0.5">
                      Detect saturated themes (such as basic attendance trackers or standard portals) and redirect students toward emerging technical frontiers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="w-6 h-6 rounded bg-burgundy/10 flex items-center justify-center text-burgundy mt-1 flex-shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-primary">
                      Formal Capstone Defense Preparation
                    </h4>
                    <p className="text-xs text-ink-secondary leading-relaxed mt-0.5">
                      Export structured prior art dossiers with documented citations and limitation gap matrices for academic thesis defenses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/projects"
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-hover"
                >
                  <span>Browse Project Repository</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

            {/* Right Side Visual Box */}
            <div className="p-6 sm:p-8 rounded-card bg-ivory-card border border-border shadow-card space-y-5">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-ink-secondary">
                    Collegiate Repository Overview
                  </span>
                  <h4 className="font-serif text-lg font-bold text-ink-primary">
                    Demonstration Dataset
                  </h4>
                </div>
                <span className="text-xs font-mono font-medium text-burgundy bg-burgundy/10 px-2.5 py-1 rounded">
                  2024-2025 Cycle
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-ivory/60 border border-border">
                  <span className="text-2xl font-serif font-bold text-burgundy-dark">144</span>
                  <p className="text-xs text-ink-secondary mt-1">Sample Capstones</p>
                </div>
                <div className="p-4 rounded-lg bg-ivory/60 border border-border">
                  <span className="text-2xl font-serif font-bold text-burgundy-dark">82%</span>
                  <p className="text-xs text-ink-secondary mt-1">Approval Novelty Rate</p>
                </div>
                <div className="p-4 rounded-lg bg-ivory/60 border border-border">
                  <span className="text-2xl font-serif font-bold text-antique-dark">6</span>
                  <p className="text-xs text-ink-secondary mt-1">Engineering Disciplines</p>
                </div>
                <div className="p-4 rounded-lg bg-ivory/60 border border-border">
                  <span className="text-2xl font-serif font-bold text-antique-dark">5</span>
                  <p className="text-xs text-ink-secondary mt-1">Saturated Themes Flagged</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-beige/40 border border-border/80 text-xs text-ink-secondary leading-relaxed">
                <strong className="text-ink-primary">Institutional Note:</strong> Multi-year statistics reflect demonstration cohort metrics. Production deployment connects to departmental PostgreSQL databases.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-14 bg-burgundy text-ivory">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to evaluate your capstone proposal?
          </h2>
          <p className="text-sm text-ivory-muted max-w-xl mx-auto leading-relaxed">
            Run an initial prior art check to cross-reference past student solutions, spot architectural gaps, and establish genuine technical novelty.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/student/analyse"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-ivory text-burgundy-dark hover:bg-ivory-card text-xs font-semibold uppercase tracking-wider rounded-lg shadow-elevated transition-all"
            >
              <span>Begin Proposal Analysis</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-burgundy-dark hover:bg-burgundy-hover text-ivory text-xs font-semibold uppercase tracking-wider rounded-lg border border-rose-muted/30 transition-all"
            >
              <span>Faculty Sign In</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
