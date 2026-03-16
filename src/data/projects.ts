import { ProjectDetails } from '@/components/ProjectFlashcard';

export interface CategoryGroup {
  category: string;
  projects: ProjectDetails[];
}

const allProjects: ProjectDetails[] = [
  // ─── Category 1: Experimental Electronics & Embedded Systems ───
  {
    title: "Invisible Paper Circuit System",
    description: "Development of paper-based disappearing electronic circuits using transparent conductive materials.",
    tags: ["Paper Electronics", "Conductive Materials", "Circuit Design", "Experimental"],
    type: "Experimental Research",
    status: "Completed",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "Conventional electronic circuits rely on rigid substrates and visible wiring, limiting applications in stealth, biodegradable, and covert electronics.",
    objective: "To develop functional electronic circuits on paper substrates using transparent conductive materials that become invisible after application.",
    approach: [
      "Researched transparent conductive polymers and nanomaterials",
      "Formulated ink compositions for paper adhesion and conductivity",
      "Tested circuit visibility under various lighting conditions",
      "Validated electrical performance of invisible pathways"
    ],
    results: [
      "Successfully created invisible conductive traces on standard paper",
      "Achieved functional circuit operation with minimal resistance",
      "Demonstrated potential for biodegradable electronics",
      "Documented formulation process for reproducibility"
    ],
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },
  {
    title: "Transparent Conductive Ink Formulation for Paper Electronics",
    description: "Experimental development of low-cost conductive ink for paper-based electronics.",
    tags: ["Conductive Ink", "Materials Science", "Paper Electronics", "Low-Cost"],
    type: "Experimental Research",
    status: "Completed",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "Commercial conductive inks are expensive and not optimized for paper substrates, creating a barrier for accessible paper electronics research.",
    objective: "To formulate a low-cost, transparent conductive ink that adheres well to paper and maintains reliable electrical conductivity.",
    approach: [
      "Surveyed existing conductive ink formulations and their limitations",
      "Experimented with carbon-based and metallic nanoparticle suspensions",
      "Optimized viscosity and surface tension for paper application",
      "Conducted conductivity and durability testing"
    ],
    results: [
      "Developed ink with conductivity suitable for low-power circuits",
      "Achieved 70% cost reduction compared to commercial alternatives",
      "Ink maintains conductivity after multiple paper folding cycles",
      "Published formulation methodology for open research use"
    ],
    images: [
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },
  {
    title: "Paper Electronics Conductivity Analysis",
    description: "Experimental evaluation of conductivity performance of paper-based electronic pathways.",
    tags: ["Conductivity Testing", "Paper Electronics", "Analysis", "Experimental"],
    type: "Experimental Research",
    status: "Published",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "There is limited empirical data on the conductivity behavior of various paper-based electronic pathway configurations under real-world conditions.",
    objective: "To systematically evaluate and characterize the conductivity performance of different paper-based electronic pathway designs.",
    approach: [
      "Designed test matrices with varying trace widths and materials",
      "Measured resistance across different environmental conditions",
      "Analyzed degradation over time and usage cycles",
      "Compared performance against flexible PCB benchmarks"
    ],
    results: [
      "Mapped conductivity profiles for 5+ paper-ink combinations",
      "Identified optimal trace geometry for maximum reliability",
      "Quantified environmental impact on circuit performance",
      "Published findings for academic reference"
    ],
    images: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "Automatic Water Tank Overflow Prevention System",
    description: "Embedded system designed to automatically cut off motor operation to prevent water overflow.",
    tags: ["Embedded Systems", "IoT", "Automation", "Water Management"],
    type: "Engineering Project",
    status: "Completed",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "Water tank overflow due to unattended pump operation causes significant water wastage and potential structural damage in residential and commercial settings.",
    objective: "To design an automated embedded system that detects water level and cuts off motor operation before overflow occurs.",
    approach: [
      "Selected ultrasonic and float-based water level sensors",
      "Designed relay-based motor cutoff circuit",
      "Programmed microcontroller for threshold-based control logic",
      "Built weatherproof enclosure for outdoor deployment"
    ],
    results: [
      "100% overflow prevention in controlled testing",
      "Sub-second response time for motor cutoff",
      "System operates reliably in humid environments",
      "Estimated 30% water savings in pilot deployment"
    ],
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  },
  {
    title: "ESP32-Based Micro Drone Prototype",
    description: "Development of a lightweight ESP32-controlled drone platform for experimentation and control systems.",
    tags: ["ESP32", "Drone", "Embedded Systems", "Control Systems"],
    type: "Engineering Project",
    status: "Prototype",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "Commercial drone platforms are expensive and closed-source, limiting hands-on learning and custom control algorithm experimentation.",
    objective: "To develop a low-cost, open-architecture micro drone using ESP32 for flight control and wireless communication.",
    approach: [
      "Designed lightweight frame using 3D-printed components",
      "Implemented PID-based flight stabilization on ESP32",
      "Configured WiFi-based remote control interface",
      "Integrated IMU sensors for orientation tracking"
    ],
    results: [
      "Achieved stable hover with PID tuning",
      "Total build cost under $50",
      "WiFi control range of 30+ meters",
      "Platform supports custom firmware development"
    ],
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },
  {
    title: "Morse-Code Based Custom Keyboard using Arduino Mini",
    description: "Development of a minimal-input keyboard interface using Morse code interpretation through microcontroller logic.",
    tags: ["Arduino", "Morse Code", "HCI", "Embedded Systems"],
    type: "Engineering Project",
    status: "Completed",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "Standard keyboards require complex matrix wiring and multiple keys, making them unsuitable for ultra-compact or accessibility-focused input devices.",
    objective: "To create a functional keyboard using minimal physical inputs by interpreting Morse code patterns through Arduino logic.",
    approach: [
      "Mapped full alphanumeric character set to Morse code patterns",
      "Implemented timing-based dot/dash detection algorithm",
      "Built USB HID interface for computer connectivity",
      "Designed single-button and dual-button input modes"
    ],
    results: [
      "Full alphabet and number input using just 1-2 buttons",
      "Typing speed of 10+ WPM achievable with practice",
      "Successfully interfaces as standard USB keyboard",
      "Potential accessibility application for motor-impaired users"
    ],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  },
  {
    title: "Compact Cyber Desk Box – Portable Raspberry Pi Workstation",
    description: "Design of a compact integrated computing workstation using Raspberry Pi within a portable cyber-desk enclosure.",
    tags: ["Raspberry Pi", "Portable Computing", "Industrial Design", "DIY"],
    type: "Engineering Project",
    status: "Completed",
    category: "Experimental Electronics & Embedded Systems",
    problemStatement: "Portable computing solutions either sacrifice functionality for portability or are too bulky for true field deployment.",
    objective: "To design a self-contained, portable computing workstation integrating a Raspberry Pi with display, input, and power in a compact enclosure.",
    approach: [
      "Designed compact enclosure with integrated 7-inch display",
      "Integrated keyboard, trackpad, and cooling system",
      "Built battery management system for portable operation",
      "Optimized Raspberry Pi OS for workstation use"
    ],
    results: [
      "Fully functional workstation in a briefcase-sized enclosure",
      "4+ hours battery life on single charge",
      "Supports full Linux desktop environment",
      "Used for field data collection and analysis"
    ],
    images: [
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },

  // ─── Category 2: Space Systems & Aerospace Research ───
  {
    title: "Tiny Satellite Ground Station Communication System",
    description: "Development of a ground station capable of receiving and communicating with low-earth-orbit satellites.",
    tags: ["Satellite Communication", "Ground Station", "RF Engineering", "Space Tech"],
    type: "Independent Research",
    status: "Completed",
    category: "Space Systems & Aerospace Research",
    problemStatement: "Building satellite ground stations requires expensive commercial equipment, making space communication research inaccessible for independent researchers and students.",
    objective: "To develop a low-cost ground station system capable of receiving telemetry and communicating with LEO satellites.",
    approach: [
      "Designed Yagi-Uda antenna for UHF/VHF satellite bands",
      "Built SDR-based receiver with signal processing pipeline",
      "Implemented satellite tracking using TLE orbital data",
      "Developed ground station control software"
    ],
    results: [
      "Successfully received signals from NOAA weather satellites",
      "Decoded APT images from orbiting satellites",
      "Total system cost under $200",
      "Demonstrated two-way communication capability"
    ],
    images: [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },
  {
    title: "Satellite Deployer Mechanism Concept",
    description: "Mechanical system design for controlled deployment of small satellites.",
    tags: ["Satellite Deployment", "Mechanical Design", "Aerospace", "CubeSat"],
    type: "Independent Research",
    status: "In Development",
    category: "Space Systems & Aerospace Research",
    problemStatement: "Small satellite deployment mechanisms are often complex, heavy, and prone to mechanical failure in the harsh space environment.",
    objective: "To design a reliable, lightweight mechanical system for controlled deployment of small satellites from a carrier vehicle.",
    approach: [
      "Analyzed existing P-POD and similar deployer mechanisms",
      "Designed spring-loaded rail deployment system",
      "Simulated deployment dynamics and vibration response",
      "Prototyped mechanism using 3D printing"
    ],
    results: [
      "Achieved smooth deployment in ground-based testing",
      "30% weight reduction compared to conventional deployers",
      "Mechanism supports 1U to 3U CubeSat sizes",
      "Design documented for open-source release"
    ],
    images: [
      "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541185933-55f5d8e8e89d?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "Centripetal-Force Assisted Rocket Launch System",
    description: "Conceptual launch system using rotational centripetal acceleration to assist rocket launch.",
    tags: ["Launch Systems", "Aerospace", "Physics", "Conceptual Design"],
    type: "Research Paper",
    status: "Published",
    category: "Space Systems & Aerospace Research",
    problemStatement: "Chemical rocket launches are extremely fuel-intensive, with most propellant consumed overcoming initial gravitational and atmospheric drag forces.",
    objective: "To explore a conceptual launch assist system that uses rotational centripetal force to impart initial velocity, reducing fuel requirements.",
    approach: [
      "Modeled centripetal acceleration for various rotation radii",
      "Calculated energy requirements vs. conventional launch",
      "Analyzed structural loads on launch vehicle",
      "Simulated atmospheric transition trajectory"
    ],
    results: [
      "Theoretical fuel savings of 15-25% for LEO missions",
      "Identified optimal rotation radius and release angle",
      "Highlighted engineering challenges for future research",
      "Research paper published for academic discourse"
    ],
    images: [
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1541185933-55f5d8e8e89d?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "VanarakshakSat – Forest Monitoring Satellite System",
    description: "Satellite concept designed for monitoring forest ecosystems and environmental changes.",
    tags: ["Earth Observation", "Forest Monitoring", "Remote Sensing", "Satellite"],
    type: "Research Paper",
    status: "Published",
    category: "Space Systems & Aerospace Research",
    problemStatement: "Deforestation and forest fires cause irreversible ecological damage, yet real-time satellite monitoring of forest cover remains limited and expensive.",
    objective: "To design a dedicated satellite system for continuous monitoring of forest ecosystems, detecting deforestation and fire events in near real-time.",
    approach: [
      "Defined mission requirements for forest observation payload",
      "Selected multispectral and thermal imaging sensors",
      "Designed LEO orbit for optimal India forest coverage",
      "Developed data processing pipeline for change detection"
    ],
    results: [
      "Satellite concept capable of 10m ground resolution",
      "Near real-time fire detection within 15-minute latency",
      "Coverage of all major Indian forest regions",
      "Research presented at national space conference"
    ],
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "Astro Twin – Space Debris Removal System",
    description: "Conceptual orbital system designed to capture or redirect hazardous space debris.",
    tags: ["Space Debris", "Orbital Mechanics", "Spacecraft Design", "Sustainability"],
    type: "Research Paper",
    status: "Published",
    category: "Space Systems & Aerospace Research",
    problemStatement: "The growing accumulation of space debris in Earth orbit poses an escalating threat to operational satellites and future space missions.",
    objective: "To conceptualize an orbital system capable of capturing, deorbiting, or redirecting hazardous space debris fragments.",
    approach: [
      "Analyzed debris density maps and collision risk zones",
      "Designed net-based and robotic arm capture mechanisms",
      "Modeled deorbit maneuvers for various debris sizes",
      "Evaluated mission economics and sustainability"
    ],
    results: [
      "Proposed dual-mode capture system for varied debris types",
      "Simulated successful deorbit of 50+ debris objects per mission",
      "Estimated 40% cost reduction over existing proposals",
      "Research published and recognized at space sustainability forum"
    ],
    images: [
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },

  // ─── Category 3: Sustainable Materials & Environmental Systems ───
  {
    title: "Self-Healing Bioplastic from Waste Materials",
    description: "Experimental research on biodegradable polymer materials capable of limited self-repair.",
    tags: ["Bioplastic", "Sustainability", "Materials Science", "Self-Healing"],
    type: "Experimental Research",
    status: "Published",
    category: "Sustainable Materials & Environmental Systems",
    problemStatement: "Petroleum-based plastics persist in the environment for centuries, and even biodegradable alternatives lack durability and self-repair capabilities.",
    objective: "To develop a bioplastic material from waste feedstock that exhibits self-healing properties to extend product lifespan.",
    approach: [
      "Sourced waste starch and cellulose as polymer base",
      "Incorporated microcapsule-based healing agents",
      "Tested mechanical recovery after controlled damage",
      "Evaluated biodegradation timeline"
    ],
    results: [
      "Achieved 60% tensile strength recovery after fracture",
      "Material fully biodegrades within 6 months",
      "Production cost comparable to conventional bioplastics",
      "Research findings published in materials science journal"
    ],
    images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "Biodegradable Newspaper Composite Carry Bag",
    description: "Development of reinforced biodegradable bags using recycled newspaper and protective gel coating.",
    tags: ["Recycling", "Biodegradable", "Newspaper", "Sustainable Packaging"],
    type: "Engineering Project",
    status: "Completed",
    category: "Sustainable Materials & Environmental Systems",
    problemStatement: "Single-use plastic bags cause massive environmental pollution, and existing paper bag alternatives lack water resistance and structural strength.",
    objective: "To create a strong, water-resistant carry bag from recycled newspaper reinforced with biodegradable gel coating.",
    approach: [
      "Developed multi-layer newspaper lamination technique",
      "Formulated plant-based waterproofing gel coating",
      "Tested load-bearing capacity and water resistance",
      "Assessed biodegradation under composting conditions"
    ],
    results: [
      "Bags support up to 5kg load capacity",
      "Water-resistant for up to 2 hours of exposure",
      "Fully biodegradable within 45 days",
      "Production scalable using simple manual processes"
    ],
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5"
  },
  {
    title: "GLOBE Explorer – Environmental Science Educational Game",
    description: "Development of a learning platform integrating environmental science concepts into interactive gameplay.",
    tags: ["Education", "Environmental Science", "Gamification", "Interactive Learning"],
    type: "Engineering Project",
    status: "Completed",
    category: "Sustainable Materials & Environmental Systems",
    problemStatement: "Environmental science education often relies on passive learning methods that fail to engage students and build practical understanding.",
    objective: "To develop an interactive educational game that teaches environmental science concepts through exploration and hands-on virtual experimentation.",
    approach: [
      "Designed curriculum-aligned game scenarios",
      "Built interactive simulations of ecological systems",
      "Implemented progress tracking and assessment system",
      "Conducted user testing with student groups"
    ],
    results: [
      "Improved student test scores by 25% in pilot study",
      "90% student engagement rate during gameplay sessions",
      "Covers 15+ environmental science topics",
      "Adopted by 2 schools for supplementary learning"
    ],
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },

  // ─── Category 4: Intelligent Systems & Computational Tools ───
  {
    title: "Truth Finder (VERITON) – Information Verification System",
    description: "Conceptual AI-assisted system designed to evaluate truthfulness and validate information sources.",
    tags: ["AI", "Fact-Checking", "NLP", "Information Verification"],
    type: "Research Paper",
    status: "In Development",
    category: "Intelligent Systems & Computational Tools",
    problemStatement: "The rapid spread of misinformation online undermines public trust and decision-making, with existing fact-checking systems unable to scale effectively.",
    objective: "To design an AI-assisted system that evaluates the truthfulness of claims by cross-referencing multiple authoritative sources.",
    approach: [
      "Developed claim extraction and decomposition pipeline",
      "Built multi-source evidence retrieval system",
      "Implemented credibility scoring algorithm",
      "Designed user-friendly verification report interface"
    ],
    results: [
      "Conceptual architecture validated through case studies",
      "Credibility scoring correlates with expert fact-check results",
      "System processes claims in under 5 seconds",
      "Framework published for community development"
    ],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "Suction – AI-Assisted CAD Modeling System",
    description: "Conceptual AI-driven CAD system allowing natural language input to generate engineering models.",
    tags: ["AI", "CAD", "Natural Language", "3D Modeling"],
    type: "Research Paper",
    status: "In Development",
    category: "Intelligent Systems & Computational Tools",
    problemStatement: "Traditional CAD software requires extensive training and manual input, creating barriers for rapid prototyping and non-expert users.",
    objective: "To conceptualize an AI-driven CAD system where users describe engineering components in natural language and receive generated 3D models.",
    approach: [
      "Defined natural language schema for engineering geometry",
      "Explored LLM-to-parametric model translation pipelines",
      "Designed constraint satisfaction for dimensional accuracy",
      "Prototyped text-to-3D workflow for simple geometries"
    ],
    results: [
      "Successfully generated basic mechanical parts from text input",
      "Dimensional accuracy within 5% for simple geometries",
      "Identified key challenges for complex assembly generation",
      "Research paper drafted for academic review"
    ],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },

  // ─── Category 5: Human-Centric Safety & Infrastructure Systems ───
  {
    title: "Aarogya Vaani – Low-Cost Through-Wall Structural & Human Detection System",
    description: "Portable scanning system designed to detect structural cavities and human presence behind walls.",
    tags: ["Radar", "Detection System", "Safety", "Embedded Systems"],
    type: "Independent Research",
    status: "Prototype",
    category: "Human-Centric Safety & Infrastructure Systems",
    problemStatement: "Search and rescue operations in collapsed structures are hampered by inability to detect trapped survivors through debris and walls quickly and affordably.",
    objective: "To develop a low-cost portable system that can detect human presence and structural cavities behind walls using radar-based sensing.",
    approach: [
      "Selected UWB radar module for through-wall detection",
      "Developed signal processing algorithms for human detection",
      "Built portable enclosure with display interface",
      "Tested detection through various wall materials"
    ],
    results: [
      "Detected human presence through 20cm concrete walls",
      "Breathing detection at 3+ meters range",
      "Total system cost under $150",
      "Potential application in disaster search and rescue"
    ],
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },
  {
    title: "SABSS – Smart Guard 360 Advanced IoT Biometric Security System",
    description: "Integrated biometric security system using IoT architecture for intelligent access monitoring.",
    tags: ["Biometrics", "IoT", "Security", "Access Control"],
    type: "Engineering Project",
    status: "Completed",
    category: "Human-Centric Safety & Infrastructure Systems",
    problemStatement: "Traditional access control systems rely on single-factor authentication and lack real-time monitoring, creating security vulnerabilities.",
    objective: "To build a multi-factor biometric security system with IoT connectivity for real-time access monitoring and alerts.",
    approach: [
      "Integrated fingerprint, RFID, and facial recognition modules",
      "Designed IoT communication layer using MQTT protocol",
      "Built cloud dashboard for real-time access monitoring",
      "Implemented anomaly detection for unauthorized access attempts"
    ],
    results: [
      "99.5% biometric recognition accuracy",
      "Real-time alerts delivered within 2 seconds",
      "System supports 500+ registered users",
      "Successfully deployed in pilot facility"
    ],
    images: [
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  },
  {
    title: "Modern Conveyor System Design",
    description: "Design research for an optimized conveyor system architecture for industrial material movement.",
    tags: ["Industrial Design", "Mechanical Engineering", "Automation", "Manufacturing"],
    type: "Research Paper",
    status: "Published",
    category: "Human-Centric Safety & Infrastructure Systems",
    problemStatement: "Existing conveyor systems suffer from energy inefficiency, maintenance complexity, and limited adaptability to varying material types.",
    objective: "To research and design an optimized conveyor system architecture that improves energy efficiency and maintenance accessibility.",
    approach: [
      "Surveyed current conveyor technologies and failure modes",
      "Modeled energy consumption across different configurations",
      "Designed modular belt and roller system",
      "Simulated material flow dynamics"
    ],
    results: [
      "Proposed design reduces energy consumption by 20%",
      "Modular design cuts maintenance time by 40%",
      "Adaptable to 5+ material types without reconfiguration",
      "Research paper published for industry reference"
    ],
    images: [
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
    ],
    reportUrl: "#"
  },
  {
    title: "Resilience Quest – Disaster Management Training Simulation Game",
    description: "Interactive training platform designed to simulate disaster scenarios and improve emergency response awareness.",
    tags: ["Simulation", "Disaster Management", "Training", "Gamification"],
    type: "Engineering Project",
    status: "Completed",
    category: "Human-Centric Safety & Infrastructure Systems",
    problemStatement: "Disaster preparedness training is often theoretical and fails to create realistic decision-making pressure experienced during actual emergencies.",
    objective: "To develop an interactive simulation game that immerses users in disaster scenarios, training them to make effective emergency response decisions.",
    approach: [
      "Designed realistic disaster scenarios based on case studies",
      "Built decision-tree based simulation engine",
      "Implemented scoring system based on response effectiveness",
      "Conducted pilot testing with emergency response trainees"
    ],
    results: [
      "Trainees showed 35% improvement in response decision-making",
      "Covers earthquake, flood, and fire scenarios",
      "Average session engagement time of 45+ minutes",
      "Adopted by civil defense training program"
    ],
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
    ],
    videoUrl: "https://youtube.com/@ict_labz?si=eP_82jlVnq2NbOm5",
    reportUrl: "#"
  }
];

export const categories = [
  "Experimental Electronics & Embedded Systems",
  "Space Systems & Aerospace Research",
  "Sustainable Materials & Environmental Systems",
  "Intelligent Systems & Computational Tools",
  "Human-Centric Safety & Infrastructure Systems"
];

export const getProjectsByCategory = (): CategoryGroup[] => {
  return categories.map(category => ({
    category,
    projects: allProjects.filter(p => p.category === category)
  }));
};

export const getFeaturedProjects = (): ProjectDetails[] => {
  // One from each category + 1 extra for 6 total
  return [
    allProjects[0],  // Invisible Paper Circuit
    allProjects[7],  // Tiny Satellite Ground Station
    allProjects[12], // Self-Healing Bioplastic
    allProjects[15], // Truth Finder (VERITON)
    allProjects[17], // Aarogya Vaani
    allProjects[4],  // ESP32 Micro Drone
  ];
};

export default allProjects;
