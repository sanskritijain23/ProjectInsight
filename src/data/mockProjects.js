export const INITIAL_PROJECTS = [
  {
    id: "proj-001",
    title: "NeuroScan: Automated Brain MRI Tumor Segmentation & Grading",
    abstract: "A dual-branch 3D U-Net pipeline integrating spatial attention mechanisms for precise volumetric segmentation of glioblastoma multiforme sub-regions, paired with radiomic feature extraction for non-invasive molecular biomarker prediction.",
    description: "NeuroScan tackles the diagnostic bottlenecks in clinical neuro-oncology by automating high-accuracy volumetric segmentation of brain tumors from multi-parametric MRI scans (T1, T1ce, T2, FLAIR). The model extracts 108 quantitative radiomic features to correlate tissue phenotypes with IDH mutation status, aiding pre-operative surgical resection planning.",
    domain: "Healthcare",
    academicYear: "2023-2024",
    technologies: ["PyTorch", "MONAI", "FastAPI", "Docker", "React", "SimpleITK"],
    features: [
      "Multi-parametric 3D MRI co-registration and skull stripping",
      "Sub-region segmentation (enhancing tumor, peritumoral edema, necrotic core)",
      "Automated dice similarity coefficient computation (>0.89 on BraTS benchmarks)",
      "Interactive 3D orthogonal slice viewer with contour overlays",
      "Radiomic feature export for clinical research workflows"
    ],
    limitations: [
      "High inference latency on standard consumer-grade GPUs without tensor quantization",
      "Limited generalizability to low-field MRI scanners (sub-1.5T systems)",
      "Requires manual skull-stripping pre-processing on non-standard DICOM inputs"
    ],
    githubUrl: "https://github.com/projectinsight-archive/neuroscan-mri",
    author: "Rohan Varma, Sneha Mukherjee",
    advisor: "Dr. K. S. Venkatesh",
    status: "Verified",
    submissionDate: "2024-03-18",
    citations: 14
  },
  {
    id: "proj-002",
    title: "AegisChain: Decentralized Zero-Knowledge Academic Credential Ledger",
    abstract: "A privacy-preserving academic credential verification platform using Ethereum smart contracts and zk-SNARK proofs to prevent counterfeit degree certificates while protecting graduate student personal identifying records.",
    description: "Academic degree fraud remains a persistent challenge for university registrars and global recruiters. AegisChain creates an immutable cryptographic verification layer where institutions issue cryptographically signed soulbound tokens, and graduates prove eligibility via zero-knowledge proofs without disclosing transcripts or personal attributes.",
    domain: "Cybersecurity",
    academicYear: "2023-2024",
    technologies: ["Solidity", "Circom", "SnarkJS", "Ethers.js", "Node.js", "Next.js"],
    features: [
      "Zero-knowledge proof verification of GPA threshold and degree completion",
      "Decentralized identity (DID) standard compliance (W3C DID v1.0)",
      "University registrar bulk issuance dashboard with cryptographic key management",
      "Instant employer verification portal via dynamic QR code challenges",
      "Gas-optimized batch verification smart contract architecture"
    ],
    limitations: [
      "Client-side proof generation requires significant browser WebAssembly memory",
      "Revocation mechanics for erroneous credential issuance require multi-sig delays",
      "Higher gas costs during network congestion without Layer-2 rollup deployment"
    ],
    githubUrl: "https://github.com/projectinsight-archive/aegischain-zk",
    author: "Ananya Deshmukh, Aditya Rao",
    advisor: "Prof. Rajeshwari Sengupta",
    status: "Verified",
    submissionDate: "2024-04-02",
    citations: 9
  },
  {
    id: "proj-003",
    title: "CampusFlow: Edge-AI Distributed Energy & Occupancy Optimization",
    abstract: "An adaptive IoT sensing network deploying tinyML models on ESP32 microcontrollers to optimize HVAC and lighting scheduling across academic halls based on real-time acoustic and infrared occupancy estimation.",
    description: "University campuses expend substantial energy conditioning unoccupied lecture theatres and laboratories. CampusFlow deploys edge-inferenced acoustic micro-models and low-resolution thermal grids to predict occupancy densities in real time, communicating via LoRaWAN to dynamically throttle building automation systems without violating comfort thresholds.",
    domain: "IoT",
    academicYear: "2024-2025",
    technologies: ["C++", "TensorFlow Lite", "ESP32", "LoRaWAN", "MQTT", "Grafana", "TimescaleDB"],
    features: [
      "On-device TinyML acoustic activity classification preserving occupant privacy",
      "LoRaWAN long-range telemetry covering up to 4km campus radius",
      "Automated BACnet protocol bridge for legacy institutional HVAC chillers",
      "Predictive thermal inertia model forecasting building cooling decay",
      "Real-time operational dashboard with kilowatt-hour carbon savings metrics"
    ],
    limitations: [
      "Acoustic classification degrades during heavy rainfall on metal campus roofing",
      "Battery life on edge sensor nodes limited to 11 months on continuous sampling",
      "Interfacing with proprietary legacy HVAC protocols required physical relay bypasses"
    ],
    githubUrl: "https://github.com/projectinsight-archive/campusflow-iot",
    author: "Vikramaditya Iyer, Neha Chawla",
    advisor: "Dr. B. Ramanathan",
    status: "Verified",
    submissionDate: "2024-09-15",
    citations: 7
  },
  {
    id: "proj-004",
    title: "ScribeSense: Multimodal Vernacular Handwritten Math OCR & Solver",
    abstract: "A transformer-based vision-language architecture translating handwritten mathematical expressions written in regional Indic scripts (Hindi, Tamil, Marathi) into structured LaTeX syntax and step-by-step explanatory derivations.",
    description: "Students in rural and regional colleges frequently complete mathematical coursework in handwritten notebooks mixing Indic numerals, vernacular explanatory notes, and mathematical symbols. ScribeSense integrates an end-to-end vision encoder-decoder with specialized tokenizers to digitize handwritten derivations into standard LaTeX and compute symbolic intermediate checks.",
    domain: "Artificial Intelligence",
    academicYear: "2024-2025",
    technologies: ["Python", "Hugging Face", "PyTorch", "LaTeX", "FastAPI", "React", "SymPy"],
    features: [
      "Bilingual Indic-Latin mathematical formula parsing and LaTeX translation",
      "Stroke-level stroke correction and background paper noise cancellation",
      "Symbolic step-by-step algebraic validation using integrated CAS engine",
      "Speech feedback generation in regional languages for visually impaired students",
      "Exportable formatted scientific notes in clean PDF format"
    ],
    limitations: [
      "Complex multidimensional matrix layouts suffer from token alignment degradation",
      "Dataset imbalance for cursive Tamil mathematical script notations",
      "Step derivation engine cannot handle non-standard topological calculus proofs"
    ],
    githubUrl: "https://github.com/projectinsight-archive/scribesense-indic",
    author: "Tanvi Kulkarni, Devendra Joshi",
    advisor: "Prof. Hemant Patidar",
    status: "Verified",
    submissionDate: "2024-10-10",
    citations: 18
  },
  {
    id: "proj-005",
    title: "PhishGuard: Graph Neural Network for Browser Session Hijacking Defense",
    abstract: "A browser-integrated security agent utilizing dynamic Document Object Model graph neural networks and TLS certificate lineage inspection to detect adversary-in-the-middle phishing proxies in real time.",
    description: "Modern phishing campaigns exploit reverse-proxy frameworks (Evilginx2) that transparently relay credentials and session cookies, bypassing hardware MFA tokens. PhishGuard constructs a graph representation of the runtime DOM, observing asynchronous WebSocket telemetry and cryptographic certificate origin trees to flag session-cloning attempts before session cookies are exfiltrated.",
    domain: "Cybersecurity",
    academicYear: "2023-2024",
    technologies: ["Python", "PyTorch Geometric", "WebExtensions API", "Rust", "TypeScript"],
    features: [
      "Runtime DOM hierarchy transformed into directed attributed graphs",
      "Zero-hour reverse proxy detection before submission of authentication payloads",
      "Chromium extension engine with Rust-compiled WebAssembly evaluator",
      "Autonomous cookie revocation upon detected man-in-the-middle handshake",
      "Threat telemetry hashing for collegiate federated defense networks"
    ],
    limitations: [
      "Average 28ms page load evaluation overhead on heavily nested single-page apps",
      "High false-positive rate on internal university portals using self-signed intranet certs",
      "Requires elevated browser extension host permissions"
    ],
    githubUrl: "https://github.com/projectinsight-archive/phishguard-gnn",
    author: "Mohammad Tariq, Arjun Nair",
    advisor: "Dr. Sandeep K. Shukla",
    status: "Verified",
    submissionDate: "2024-02-28",
    citations: 22
  },
  {
    id: "proj-006",
    title: "Dialectica: Peer Review Calibration & Argumentation Quality Evaluator",
    abstract: "A natural language argument-mining pipeline designed to evaluate the constructive rigor, specificity, and neutrality of peer reviews submitted across university capstone research deliverables.",
    description: "Peer evaluation in engineering curricula frequently suffers from superficial rubber-stamping or emotionally biased critique. Dialectica segments submitted peer review paragraphs into argumentative discourse units (claims, premises, evidence, constructive suggestions), assigning calibration scores to incentivize substantive, actionable academic critique.",
    domain: "Education",
    academicYear: "2024-2025",
    technologies: ["Python", "spaCy", "Transformers", "FastAPI", "React", "PostgreSQL"],
    features: [
      "Discourse unit segmentation and stance classification across 5 rigor dimensions",
      "Constructive tone calibration score with automated improvement nudges",
      "Reviewer bias detection comparing historical grading variance against rubric medians",
      "Blind double-review assignment matrix optimizing domain expertise match",
      "Interactive feedback authoring canvas with real-time specificity gauges"
    ],
    limitations: [
      "Subjective nuance in creative project critiques occasionally misclassified as low rigor",
      "Requires cold-start rubric calibration for newly introduced engineering disciplines",
      "Relies on English linguistic discourse conventions"
    ],
    githubUrl: "https://github.com/projectinsight-archive/dialectica-eval",
    author: "Shreya Sen, Tarun Mathur",
    advisor: "Prof. Alok Gupta",
    status: "Verified",
    submissionDate: "2024-11-04",
    citations: 5
  },
  {
    id: "proj-007",
    title: "AgriVision: Drone Imagery Hyperspectral Crop Stress Classification",
    abstract: "An aerial multispectral image processing framework employing lightweight convolutional vision backbones for early-stage nitrogen deficiency and fungal pathogen classification in smallholder farms.",
    description: "AgriVision ingests aerial photogrammetry captured by affordable modified agricultural UAVs. Using modified NDVI and red-edge spectral indices fed into an ensemble attention CNN, the system maps localized water stress and leaf blight zones down to 5-centimeter ground sampling distances.",
    domain: "Artificial Intelligence",
    academicYear: "2023-2024",
    technologies: ["Python", "TensorFlow", "GDAL", "OpenCV", "Flask", "React", "Leaflet"],
    features: [
      "Automated orthomosaic stitching from raw UAV geotagged frames",
      "Canopy chlorosis index calculation and nitrogen deficiency heatmaps",
      "Exportable prescription geo-TIFF maps for variable-rate fertilizer spreaders",
      "Mobile-friendly offline farmer portal caching weekly flyover indices",
      "Comparative temporal degradation timeline over 90-day harvest cycles"
    ],
    limitations: [
      "Stitching algorithms fail over homogenous paddy canopies under high wind gusts",
      "Cloud cover shadow distortions necessitate manual radiometric recalibration",
      "High disk storage demands for raw multi-spectral TIFF collections"
    ],
    githubUrl: "https://github.com/projectinsight-archive/agrivision-drone",
    author: "Kavya Menon, Pradeep Kumar",
    advisor: "Dr. Meenakshi Sundaram",
    status: "Verified",
    submissionDate: "2024-05-11",
    citations: 11
  },
  {
    id: "proj-008",
    title: "CivicSync: Municipal Water Quality Micro-Sensing & Anomaly Dispatch",
    abstract: "A low-cost optical and electrochemical sensor payload deployed across city distribution nodes with automated hydrodynamic anomaly detection algorithms for immediate contamination containment.",
    description: "Water distribution contamination events in developing municipal grids often spread for hours before laboratory water testing detects pathogens. CivicSync installs solar-powered inline spectrophotometric pods that monitor turbidity, pH, dissolved oxygen, and free chlorine, streaming alerts to municipal engineers upon anomalous contaminant signature patterns.",
    domain: "IoT",
    academicYear: "2024-2025",
    technologies: ["Arduino", "Python", "Apache Kafka", "Go", "Vue.js", "InfluxDB"],
    features: [
      "Sub-minute multi-parameter spectrophotometric fluid assay sampling",
      "Isolation valve solenoid trip trigger upon severe chemical threshold breaches",
      "Distributed Kafka telemetry pipeline handling 10,000+ sensor heartbeats/sec",
      "Spatial contaminant dispersion simulation overlaying municipal pipe blueprints",
      "Automated citizen SMS advisory broadcast generator geo-fenced by valve sector"
    ],
    limitations: [
      "Optical sensor window biofouling requires monthly manual ultrasonic cleaning",
      "Electrochemical chlorine probe calibration drifts ~6% every 45 operating days",
      "Cellular uplink failures in subterranean concrete utility vaults"
    ],
    githubUrl: "https://github.com/projectinsight-archive/civicsync-water",
    author: "Nikhil Bansal, Divya Krishnan",
    advisor: "Dr. Sudhir Kumar",
    status: "Verified",
    submissionDate: "2024-08-20",
    citations: 8
  },
  {
    id: "proj-009",
    title: "Synthetix: High-Throughput Synthetic Patient EHR Generator for Medical AI",
    abstract: "A conditional diffusion model framework for generating mathematically private, clinically coherent electronic health records to unblock medical machine learning research without HIPAA/GDPR violations.",
    description: "Machine learning research in healthcare is frequently bottlenecked by stringent patient privacy regulations and data siloing. Synthetix trains conditional tabular diffusion models on multi-modal clinical longitudinal records, ensuring that synthetic patient trajectories maintain complex disease comorbidity trajectories while provably satisfying differential privacy guarantees.",
    domain: "Healthcare",
    academicYear: "2023-2024",
    technologies: ["Python", "PyTorch", "Diffusers", "FastAPI", "React", "DuckDB"],
    features: [
      "Differential privacy engine with formal epsilon-delta mathematical bounds",
      "Multi-modal trajectory synthesis (ICD-10 codes, lab telemetry, medications)",
      "Clinical validity scoring comparing synthetic cohort mortality with real-world actuarials",
      "Automated outlier anonymization preventing membership inference attacks",
      "High-throughput data export pipeline in standard FHIR and OMOP formats"
    ],
    limitations: [
      "Struggles to model rare orphan disease co-occurrences due to sparse sample anchors",
      "Computational training time requires multi-node A100 GPU clusters",
      "Free-text clinical physician notes synthesis lacks nuanced clinician jargon"
    ],
    githubUrl: "https://github.com/projectinsight-archive/synthetix-ehr",
    author: "Aditi Rastogi, Chirag Singhal",
    advisor: "Dr. Anandita Sen",
    status: "Verified",
    submissionDate: "2024-01-14",
    citations: 31
  },
  {
    id: "proj-010",
    title: "CloudWeave: Serverless Microservices Topology Synthesis & Fault Injection",
    abstract: "An automated infrastructure-as-code compiler that infers distributed microservice dependency graphs from OpenTelemetry traces and generates deterministic Chaos Engineering resilience experiments.",
    description: "Modern cloud-native applications composed of hundreds of serverless functions exhibit unpredictable emergent cascade failures. CloudWeave analyzes distributed trace telemetry to synthesize live topology graphs, computing critical execution bottlenecks and executing targeted latency-injection probes to validate circuit breakers before production deployments.",
    domain: "Web Development",
    academicYear: "2024-2025",
    technologies: ["Go", "Kubernetes", "OpenTelemetry", "React", "TypeScript", "GraphQL", "AWS Lambda"],
    features: [
      "Autonomous dependency DAG extraction from live OpenTelemetry spans",
      "Deterministic chaos experiment generation targeting high-degree network nodes",
      "Automated circuit-breaker fallback validation and dead-letter queue audits",
      "Interactive 3D service mesh visualization with real-time throughput metrics",
      "GitOps integration compiling resilience assertions into CI/CD pipelines"
    ],
    limitations: [
      "High telemetry volume induces observable network overhead in small clusters",
      "Limited support for proprietary asynchronous message brokers beyond Kafka/RabbitMQ",
      "Requires distributed tracing instrumentation in legacy upstream services"
    ],
    githubUrl: "https://github.com/projectinsight-archive/cloudweave-chaos",
    author: "Karan Malhotra, Harshita Goyal",
    advisor: "Prof. Deepinder Singh",
    status: "Verified",
    submissionDate: "2024-09-30",
    citations: 12
  }
];
