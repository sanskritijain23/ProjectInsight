export const INITIAL_ANALYSES = [
  // ----------------------------------------------------
  // Nitya Arya (nitya.arya@college.edu) - AI & Vision
  // ----------------------------------------------------
  {
    id: "ana-101",
    authorEmail: "nitya.arya@college.edu",
    authorName: "Nitya Arya",
    authorRoll: "21BCE1001",
    title: "OmniScribe: Edge Vision-Language Assistant for Real-Time Handwritten Equation Solving with Audio Explanations",
    domain: "Artificial Intelligence",
    date: "2024-11-10",
    status: "Completed",
    highestSimilarity: 72,
    description: "A compact on-device vision-language model deployed on mobile hardware to parse complex multi-step handwritten algebra and calculus equations, generate step-by-step LaTeX transcriptions, and synthesize interactive voice explanations in multilingual regional languages for remote learners.",
    features: [
      "Real-time camera feed stroke recognition and continuous noise cancellation",
      "Vernacular audio narration explaining why each algebraic transformation occurred",
      "Interactive step-by-step canvas highlighting errors in student derivations",
      "Offline inference quantized for low-tier Android smartphones (<2GB RAM)",
      "Automated practice worksheet generation based on detected student weakness patterns"
    ],
    technologies: ["PyTorch", "ONNX Runtime", "Flutter", "FastAPI", "SymPy", "Whisper", "EdgeTTS"],
    summary: "High conceptual overlap with ScribeSense (72%) and NeuroScan (24%) in vision encoder architectures. Significant innovation opportunities identified in on-device quantization and conversational audio tutoring modules.",
    topMatches: [
      {
        projectId: "proj-004",
        projectTitle: "ScribeSense: Multimodal Vernacular Handwritten Math OCR & Solver",
        similarity: 72,
        domain: "Artificial Intelligence",
        technologies: ["Python", "Hugging Face", "PyTorch", "LaTeX", "SymPy"],
        matchingConcepts: [
          "Handwritten mathematical formula parsing",
          "Vision encoder-decoder with LaTeX translation",
          "Regional language support and vernacular assistance",
          "Symbolic algebra engine integration"
        ],
        differentiatingFactors: [
          "OmniScribe proposes on-device edge quantization for low-end mobile devices",
          "OmniScribe adds conversational voice tutoring dialogue",
          "ScribeSense was purely server-side FastAPI with web frontend"
        ]
      },
      {
        projectId: "proj-006",
        projectTitle: "Dialectica: Peer Review Calibration & Argumentation Quality Evaluator",
        similarity: 38,
        domain: "Education",
        technologies: ["Python", "spaCy", "Transformers", "FastAPI"],
        matchingConcepts: [
          "Pedagogical feedback generation",
          "Discourse evaluation of student reasoning",
          "Formative evaluation mechanics"
        ],
        differentiatingFactors: [
          "Dialectica operates exclusively on written academic peer reviews",
          "OmniScribe focuses on mathematical vision OCR"
        ]
      }
    ],
    comparison: {
      commonFeatures: [
        {
          name: "Bilingual Indic-Latin mathematical parsing",
          context: "Both your proposal and ScribeSense incorporate bilingual OCR pipelines converting regional written characters and standard numerals into structured mathematical tokens."
        },
        {
          name: "Symbolic algebraic verification",
          context: "Both architectures leverage automated computer algebra systems (CAS) to evaluate whether intermediate equality statements hold mathematically."
        }
      ],
      newlyProposedFeatures: [
        {
          name: "On-device INT4/INT8 quantization for sub-2GB RAM smartphones",
          impact: "High Technical Novelty",
          rationale: "Archived projects suffered from severe server latency bottlenecks; executing quantized vision models client-side removes cloud GPU cost barriers for rural learners."
        },
        {
          name: "Conversational multimodal voice remediation dialogue",
          impact: "High Pedagogical Novelty",
          rationale: "Instead of merely stating the correct final answer, the proposal speaks step-by-step Socratic questions explaining student misconception points."
        }
      ]
    },
    opportunities: {
      documentedLimitationsInArchive: [
        "ScribeSense documented severe latency (~4.2s per equation) when dispatching high-resolution camera images to remote cloud instances.",
        "ScribeSense noted dataset imbalance in South Indian cursive handwritten scripts (specifically Tamil and Telugu mathematical ligatures)."
      ],
      unaddressedFeatureGaps: [
        "None of the archived projects implemented real-time offline speech synthesis tailored for low-bandwidth educational environments.",
        "Zero prior projects provided interactive step-level counter-examples when a student made an invalid factoring or division by zero assumption."
      ],
      recommendedDirections: [
        "Incorporate a homography rectification module before feeding image slices into the vision encoder to overcome tilted camera captures.",
        "Benchmark inference execution on MediaTek Helio and Snapdragon 600-series mobile processors to establish empirical feasibility."
      ]
    }
  },
  {
    id: "ana-105",
    authorEmail: "nitya.arya@college.edu",
    authorName: "Nitya Arya",
    authorRoll: "21BCE1001",
    title: "RetinoScan: Multi-Modal Attention Transformer for Diabetic Retinopathy Micro-Aneurysm Grading",
    domain: "Healthcare",
    date: "2024-10-18",
    status: "Completed",
    highestSimilarity: 46,
    description: "Deep learning segmentation of high-resolution digital fundus photography to detect early-stage micro-aneurysms, hemorrhages, and hard exudates with uncertainty quantification for clinical decision support.",
    features: [
      "Dual-branch Swin Transformer extracting multi-scale vascular lesions",
      "Monte Carlo Dropout generating epistemic confidence scores for ophthalmologists",
      "DICOM-compatible report export with automated ICD-10 clinical coding"
    ],
    technologies: ["PyTorch", "TorchVision", "FastAPI", "Docker", "DICOM"],
    summary: "Moderate overlap (46%) with NeuroScan in deep convolutional spatial feature extraction. Highly novel clinical calibration and lesion-level uncertainty estimation.",
    topMatches: [
      {
        projectId: "proj-001",
        projectTitle: "NeuroScan: Automated Brain MRI Tumor Segmentation & Grading",
        similarity: 46,
        domain: "Healthcare",
        technologies: ["PyTorch", "MONAI", "FastAPI"],
        matchingConcepts: ["Biomedical image segmentation", "Confidence scoring"],
        differentiatingFactors: ["NeuroScan evaluates 3D multi-sequence MRI; RetinoScan evaluates 2D fundus photography."]
      }
    ],
    comparison: {
      commonFeatures: [{ name: "Biomedical feature maps", context: "Shared spatial convolutional encoders." }],
      newlyProposedFeatures: [{ name: "Epistemic uncertainty bounds", impact: "High Clinical Safety", rationale: "Flags borderline scans for mandatory human specialist audit." }]
    },
    opportunities: {
      documentedLimitationsInArchive: ["NeuroScan required expensive GPU servers; RetinoScan targets clinical tablet preview."],
      unaddressedFeatureGaps: ["Uncertainty calibration under pupil dilation variance."],
      recommendedDirections: ["Collect diverse cross-hospital camera calibration benchmarks."]
    }
  },

  // ----------------------------------------------------
  // Sanskriti Jain (sanskriti.jain@college.edu) - Security
  // ----------------------------------------------------
  {
    id: "ana-102",
    authorEmail: "sanskriti.jain@college.edu",
    authorName: "Sanskriti Jain",
    authorRoll: "21BCE1002",
    title: "CryptoBadge: Zero-Knowledge Verification for Extracurricular Hackathon Certifications",
    domain: "Cybersecurity",
    date: "2024-11-04",
    status: "Completed",
    highestSimilarity: 68,
    description: "A decentralized application (dApp) that issues cryptographic verifiable credentials for competitive hackathons and student clubs using zk-SNARKs to prove competition placement without exposing student personal IDs.",
    features: [
      "Soulbound NFT badge minting with customizable SVG metadata",
      "zk-SNARK verification proving 'Top 3 Finisher' without revealing exact identity",
      "Gasless student claim transactions via ERC-4337 account abstraction",
      "Integration with GitHub API to verify commit histories during competition hours"
    ],
    technologies: ["Solidity", "Circom", "Ethers.js", "Polygon", "Next.js"],
    summary: "Substantial similarity (68%) with AegisChain in zk-SNARK architecture and soulbound credential tokens. Strong novelty opportunities in student account abstraction and automated commit-based verification.",
    topMatches: [
      {
        projectId: "proj-002",
        projectTitle: "AegisChain: Decentralized Zero-Knowledge Academic Credential Ledger",
        similarity: 68,
        domain: "Cybersecurity",
        technologies: ["Solidity", "Circom", "SnarkJS", "Ethers.js"],
        matchingConcepts: [
          "Zero-knowledge proof verification",
          "Soulbound academic credential tokens",
          "Cryptographic registry of issuing authorities"
        ],
        differentiatingFactors: [
          "AegisChain is geared toward formal institutional degrees and registrar offices",
          "CryptoBadge targets informal extracurricular hackathons and student hack events"
        ]
      }
    ],
    comparison: {
      commonFeatures: [
        { name: "zk-SNARK circuit proving eligibility without disclosure", context: "Both projects compile Circom circuits for client-side zero-knowledge proofs." }
      ],
      newlyProposedFeatures: [
        { name: "ERC-4337 Account Abstraction for gasless onboarding", impact: "High Usability Novelty", rationale: "Removes crypto wallet and gas token friction for university participants." }
      ]
    },
    opportunities: {
      documentedLimitationsInArchive: ["AegisChain suffered from severe gas fee spikes on Ethereum Layer-1."],
      unaddressedFeatureGaps: ["Automated anti-sybil checks for student identities."],
      recommendedDirections: ["Deploy on an L2 roll-up (such as Polygon zkEVM) to document 95%+ gas reduction."]
    }
  },
  {
    id: "ana-106",
    authorEmail: "sanskriti.jain@college.edu",
    authorName: "Sanskriti Jain",
    authorRoll: "21BCE1002",
    title: "ZeroTrustMesh: Ephemeral Mutual TLS Identity Exchange for Decentralized Microservices",
    domain: "Cybersecurity",
    date: "2024-10-12",
    status: "Completed",
    highestSimilarity: 39,
    description: "Automated cryptographic certificate rotation and zero-trust service mesh authentication leveraging TPM/HSM hardware roots of trust.",
    features: [
      "Sub-second SPIFFE/SPIRE certificate provisioning",
      "Hardware-enforced key non-extractability using YubiKey and TPM 2.0",
      "Distributed anomaly detection on service-to-service call patterns"
    ],
    technologies: ["Go", "Rust", "SPIFFE", "eBPF", "gRPC"],
    summary: "Moderate similarity (39%) with PhishGuard in network session inspection. Outstanding novelty in hardware-enforced microservice certificates.",
    topMatches: [
      {
        projectId: "proj-005",
        projectTitle: "PhishGuard: Graph Neural Network for Browser Session Hijacking Defense",
        similarity: 39,
        domain: "Cybersecurity",
        technologies: ["Python", "Rust", "TypeScript"],
        matchingConcepts: ["Session integrity checking", "Network defense"],
        differentiatingFactors: ["PhishGuard guards web browsers; ZeroTrustMesh guards backend microservices."]
      }
    ],
    comparison: {
      commonFeatures: [{ name: "Cryptographic session handshakes", context: "Mutual cryptographic verification." }],
      newlyProposedFeatures: [{ name: "Hardware TPM 2.0 enclave binding", impact: "High Security Novelty", rationale: "Prevents memory dumping of private keys." }]
    },
    opportunities: {
      documentedLimitationsInArchive: ["High TLS handshake latency overhead."],
      unaddressedFeatureGaps: ["Zero-downtime certificate rotation under high packet throughput."],
      recommendedDirections: ["Benchmark eBPF socket layer acceleration."]
    }
  },

  // ----------------------------------------------------
  // Aradhya Jain (aradhya.jain@college.edu) - IoT & Edge
  // ----------------------------------------------------
  {
    id: "ana-103",
    authorEmail: "aradhya.jain@college.edu",
    authorName: "Aradhya Jain",
    authorRoll: "21BCE1003",
    title: "ThermalGrid: LoRaWAN Urban Heat Island Mapping & Micro-Climate Predictive Dashboard",
    domain: "IoT",
    date: "2024-10-22",
    status: "Completed",
    highestSimilarity: 54,
    description: "A decentralized solar-powered IoT sensor network distributed across campus asphalt and green spaces measuring localized humidity, radiant heat, and aerosol concentrations to forecast micro-climate cooling requirements.",
    features: [
      "Solar-powered ESP32 nodes with ultra-low sleep modes",
      "LoRaWAN long-range mesh packet forwarding",
      "Kriging spatial interpolation creating high-resolution temperature surfaces",
      "Integration with university campus landscaping watering schedules"
    ],
    technologies: ["C++", "ESP32", "LoRaWAN", "Python", "FastAPI", "React", "Mapbox GL"],
    summary: "Moderate similarity (54%) with CampusFlow in IoT firmware and LoRaWAN mesh communication. Differentiates into outdoor micro-climate modeling and spatial Kriging interpolation.",
    topMatches: [
      {
        projectId: "proj-003",
        projectTitle: "CampusFlow: Edge-AI Distributed Energy & Occupancy Optimization",
        similarity: 54,
        domain: "IoT",
        technologies: ["C++", "ESP32", "LoRaWAN", "MQTT"],
        matchingConcepts: ["LoRaWAN campus telemetry", "Thermal decay modeling", "ESP32 edge firmware"],
        differentiatingFactors: ["CampusFlow was indoor HVAC control; ThermalGrid is outdoor urban heat island mapping"]
      }
    ],
    comparison: {
      commonFeatures: [
        { name: "LoRaWAN long-range communication over campus perimeter", context: "Bypasses campus Wi-Fi authentication restrictions." }
      ],
      newlyProposedFeatures: [
        { name: "Spatial Kriging geostatistical interpolation", impact: "High Environmental Novelty", rationale: "Constructs dense temperature contours with few physical nodes." }
      ]
    },
    opportunities: {
      documentedLimitationsInArchive: ["CampusFlow reported battery degradation after 11 months."],
      unaddressedFeatureGaps: ["Direct automated API integration with campus facility watering sprinkler manifolds."],
      recommendedDirections: ["Test adaptive transmission intervals based on rate of thermal change."]
    }
  },
  {
    id: "ana-107",
    authorEmail: "aradhya.jain@college.edu",
    authorName: "Aradhya Jain",
    authorRoll: "21BCE1003",
    title: "AgriSensEdge: Solar-Harvesting Soil Nitrogen-Phosphorus-Potassium Optical Pods",
    domain: "IoT",
    date: "2024-09-28",
    status: "Completed",
    highestSimilarity: 35,
    description: "Multi-spectral optical probe pods embedded in agricultural soil to measure macro-nutrient reflectance with edge TinyML regression.",
    features: [
      "Spectrophotometric LED array assessing N-P-K reflectance wavelengths",
      "Ultra-low power TinyML regression model running directly on ARM Cortex-M4",
      "Sub-GHz radio mesh forwarding data to central irrigation gateway"
    ],
    technologies: ["Embedded C", "STM32", "TinyML", "LoRa", "FreeRTOS"],
    summary: "35% overlap with CivicSync in probe telemetry pods. High technical novelty in embedded optical spectrophotometry for soil chemistry.",
    topMatches: [
      {
        projectId: "proj-008",
        projectTitle: "CivicSync: Municipal Water Quality Micro-Sensing & Anomaly Dispatch",
        similarity: 35,
        domain: "IoT",
        technologies: ["Arduino", "Python", "Apache Kafka"],
        matchingConcepts: ["Distributed micro-sensing pods", "Environmental chemistry monitoring"],
        differentiatingFactors: ["CivicSync monitors fluid water pipelines; AgriSensEdge monitors soil solid matrix optical reflectance."]
      }
    ],
    comparison: {
      commonFeatures: [{ name: "Electrochemical sensor probes", context: "Submersible sensor telemetry." }],
      newlyProposedFeatures: [{ name: "On-chip TinyML spectrophotometric regression", impact: "High Agronomic Novelty", rationale: "Estimates soil nutrients without chemical reagent cartridges." }]
    },
    opportunities: {
      documentedLimitationsInArchive: ["Sensor drift over seasonal moisture cycles."],
      unaddressedFeatureGaps: ["Solar supercapacitor buffer in prolonged monsoon cloud cover."],
      recommendedDirections: ["Calibrate against regional black-cotton soil types in central India."]
    }
  },

  // ----------------------------------------------------
  // Hemant Dangi (hemant.dangi@college.edu) - NLP & Legal
  // ----------------------------------------------------
  {
    id: "ana-104",
    authorEmail: "hemant.dangi@college.edu",
    authorName: "Hemant Dangi",
    authorRoll: "21BCE1004",
    title: "JurisSense: Indic Statutory Compliance & High Court Judgment Precedent Retrieval with Grounded Citations",
    domain: "Education",
    date: "2024-11-02",
    status: "Completed",
    highestSimilarity: 41,
    description: "An automated legal research engine that ingests High Court and Supreme Court case judgements, extracts statutory conflict matrices, and generates citation-grounded advisory briefs in English and Hindi for legal aid clinics.",
    features: [
      "Hybrid dense-sparse vector search combining BM25 and legal transformer embeddings",
      "Citation hallucination filter cross-verifying quoted paragraphs against official court reporters",
      "Bilingual case ratio extraction summarizing majority vs dissenting opinions",
      "Interactive precedent timeline tracking overruled vs reaffirmed rulings"
    ],
    technologies: ["Python", "Hugging Face", "LangChain", "Qdrant", "FastAPI", "React"],
    summary: "Moderate similarity (41%) with Dialectica in argumentation structure extraction and legal discourse modeling. Strong novelty in multi-script statutory conflict matrices and grounded citation verification.",
    topMatches: [
      {
        projectId: "proj-006",
        projectTitle: "Dialectica: Peer Review Calibration & Argumentation Quality Evaluator",
        similarity: 41,
        domain: "Education",
        technologies: ["Python", "spaCy", "Transformers", "FastAPI"],
        matchingConcepts: [
          "Argumentation quality assessment",
          "Discourse claim-evidence linking",
          "Automated textual rubrics"
        ],
        differentiatingFactors: [
          "Dialectica was created for academic conference peer reviews",
          "JurisSense is specialized for appellate judicial rulings and statutory interpretation"
        ]
      }
    ],
    comparison: {
      commonFeatures: [
        { name: "Discourse claim-evidence parsing", context: "Both systems extract whether a claim is substantiated by valid source references." }
      ],
      newlyProposedFeatures: [
        { name: "Official court gazette citation verification filter", impact: "High Ethical Safety", rationale: "Completely eliminates generative hallucinations in legal advice briefs." },
        { name: "Bilingual English-Hindi judicial ratio summarization", impact: "High Public Service Novelty", rationale: "Makes complex appellate law accessible to under-resourced grassroots legal clinics." }
      ]
    },
    opportunities: {
      documentedLimitationsInArchive: [
        "Prior text models failed on archaic Victorian legal idioms and mixed Latin legal terminology.",
        "Server timeout on judgment transcripts exceeding 100 pages."
      ],
      unaddressedFeatureGaps: [
        "Automated identification of conflicting precedents between concurrent High Court benches.",
        "Interactive graphical citation lineage graphs for case law evolution."
      ],
      recommendedDirections: [
        "Fine-tune an open-source Legal-Llama checkpoint on Indian Supreme Court Judgments (e-SCR).",
        "Implement hierarchical document chunking preserving headnote hierarchy."
      ]
    }
  },
  {
    id: "ana-108",
    authorEmail: "hemant.dangi@college.edu",
    authorName: "Hemant Dangi",
    authorRoll: "21BCE1004",
    title: "DocuCalibrate: Multi-Document Discrepancy Auditing for Engineering Procurement Contracts",
    domain: "Education",
    date: "2024-10-05",
    status: "Completed",
    highestSimilarity: 48,
    description: "Automated inconsistency and liability clause detection across architectural specifications, bills of quantities, and vendor contract terms.",
    features: [
      "Semantic clause alignment across conflicting contract drafts",
      "Penalty clause risk scoring highlighting unbalanced indemnity clauses",
      "Interactive redline diff generator with clause provenance tracking"
    ],
    technologies: ["Python", "FastAPI", "Transformers", "spaCy", "PostgreSQL"],
    summary: "48% similarity with AutoAudit and Dialectica. Strong novelty in multi-document contract clause alignment and cross-reference validation.",
    topMatches: [
      {
        projectId: "proj-010",
        projectTitle: "AutoAudit: Smart Contract Formal Verification & Fuzzing",
        similarity: 48,
        domain: "Cybersecurity",
        technologies: ["Rust", "Python", "Slither"],
        matchingConcepts: ["Automated specification auditing", "Vulnerability and risk scoring"],
        differentiatingFactors: ["AutoAudit analyzes Solidity smart contract code; DocuCalibrate audits natural language engineering contracts."]
      }
    ],
    comparison: {
      commonFeatures: [{ name: "Risk severity scoring", context: "Categorizing ambiguous clauses into high/medium/low liability tiers." }],
      newlyProposedFeatures: [{ name: "Bi-directional BoQ to specification reconciliation", impact: "High Industry Novelty", rationale: "Ensures material numbers in engineering drawings match contract pricing clauses." }]
    },
    opportunities: {
      documentedLimitationsInArchive: ["Single-document context limits."],
      unaddressedFeatureGaps: ["Cross-checking revision dates and addenda notices."],
      recommendedDirections: ["Benchmark on public CPWD and FIDIC construction contract templates."]
    }
  }
];
