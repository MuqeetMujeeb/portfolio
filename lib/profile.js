// Single source of truth: drives both the site content and the chatbot's knowledge.

export const profile = {
  name: "Syed Abdul Muqeet Mujeeb",
  shortName: "Muqeet",
  title: "AI Engineer",
  roles: ["AI Engineer", "Backend Developer"], // cycled on the hero
  location: "Hyderabad, India",
  tagline:
    "AI Engineer building scalable, production-grade AI systems — LLMs, RAG pipelines, voice agents, and end-to-end backend architecture.",

  about: [
    "I'm an AI Engineer specializing in production voice AI agents, RAG systems, and real-time backend pipelines. My work spans LLM integration, vector search, and the real-time media that powers live voice calls.",
    "I care about reliability and maintainable architecture: REST and WebSocket APIs, and containerized cloud deployments on AWS. I like turning ambitious ideas into systems that actually hold up under real users.",
  ],

  experience: [
    {
      role: "AI Engineer",
      company: "Crypto Association Georgia",
      mode: "Remote",
      location: "Hyderabad, India",
      period: "July 2026 – Present",
      points: [
        "Built LioraAI (lioraai.net), an AI-powered CRM that autonomously places outbound calls, qualifies leads, and routes them to partner call centers — Python backend orchestrating LiveKit real-time media over a SIP telephony provider.",
        "Engineered the voice-agent pipeline (Gemini reasoning, OpenAI STT/TTS), tuning barge-in, endpointing, and streaming buffers to sustain ~800ms turn latency on live PSTN calls.",
        "Automated disposition classification (call complete, callback requested, voicemail) via LLM-based post-call analysis, exporting filtered, call-center-ready lead batches as CSV.",
        "Shipped call history, callback scheduling, per-call cost analytics, and role-based agent/admin portals; deployed on AWS EC2 with auto-scaling behind a load balancer.",
        "Built a real-time face- and voice-alteration app (Deep-Live-Cam, w-okada RVC) streamed over WebRTC from GPU-backed AWS instances.",
      ],
    },
    {
      role: "AI Developer",
      company: "SMARTnCODE Technologies",
      mode: "On-site",
      location: "Hyderabad, India",
      period: "December 2025 – July 2026",
      points: [
        "Built a full-stack AI legal chatbot with a RAG pipeline (Pinecone + BGE-Large + Gemini API), achieving 85% response accuracy and <3s latency; a rolling 10-message summarization strategy cut token consumption ~40%.",
        "Delivered multi-modal input — OCR document upload and Whisper speech-to-text — via a FastAPI backend with Redis session management and SQL Server storage.",
        "Developed a real-time conversational avatar (SoulX-Flashhead on RunPod cloud GPU, WebRTC) at ~2s end-to-end latency; integrated Gemini STS, resolved audio-visual sync conflicts, and designed a scalable multi-user session and database layer.",
        "Contributed to R&D on an AI video generation platform, integrating diffusion models (Google Veo, Kling AI, Seedance) into a unified cinematic content pipeline.",
      ],
    },
  ],

  education: {
    degree: "B.E. Computer Science (Artificial Intelligence & Machine Learning)",
    school: "Lords Institute of Engineering & Technology",
    period: "Nov 2022 – July 2026",
    gpa: "8.5",
  },

  // c = core expertise (highlighted), f = familiar (muted)
  skillDomains: [
    {
      title: "LLMs, GenAI & Agentic Systems",
      rows: [
        { label: "LLMs", c: ["GPT-4o", "Claude", "LLaMA", "RAG", "Prompt Eng.","Gemini"], f: ["Mistral", "Fine-tuning"] },
        { label: "Agents", c: ["LangChain"], f: ["MCP"] },
        { label: "Voice", c: ["Gemini TTS/STS", "ElevenLabs", "STT/TTS", "WebSocket Audio","Qwen3"], f: ["Voice Cloning"] },
        { label: "Vectors", c: ["Qdrant", "Pinecone"], f: [ "Faiss"] },
      ],
    },
    {
      title: "Core ML & Computer Vision",
      rows: [
        { label: "Neural", c: ["Transformers", "CNNs"], f: ["RNNs"] },
        { label: "Vision", c: ["cv2", "OpenCV", "Detection"], f: ["Segmentation"] },
        { label: "NLP", c: ["Text Classification", "Sentiment Analysis"], f: ["NER"] },
        { label: "Libs", c: ["PyTorch", "TensorFlow", "Scikit-learn"], f: ["NLTK"] },
      ],
    },
    {
      title: "MLOps & Deployment",
      rows: [
        { label: "Deploy", c: ["FastAPI", "Docker", "WebSockets", "GitHub Actions"], f: ["Flask"] },
        { label: "Infra", c: ["AWS EC2", "RDS", "Nginx","terraform","Ansible","Supabase"], f: ["S3", "Lambda"] },
        { label: "Track", c: ["Git"], f: [] },
        { label: "Auto", c: ["CI/CD"], f: ["n8n", "Bash Scripting"] },
      ],
    },
    {
      title: "Dev Tools & Data Engineering",
      rows: [
        { label: "Langs", c: ["Python", "SQL", "Bash"], f: [ "JavaScript","C++"] },
        { label: "Data", c: ["PostgreSQL", "MongoDB", "Pandas", "NumPy"], f: ["PySpark"] },
        { label: "Viz", c: ["Streamlit"], f: ["Cytoscape.js", "Matplotlib", "Seaborn"] },
        { label: "CLI", c: ["VS Code", "WSL"], f: ["PowerShell", "CMD"] },
      ],
    },
  ],

  projects: [
    {
      name: "LioraAI",
      context: "Crypto Association Georgia",
      kind: "work",
      metric: ["~800 ms", "turn latency"],
      blurb:
        "An AI-powered CRM that autonomously places outbound calls, qualifies leads and routes them to partner call centres.",
      points: [
        "Python backend orchestrating LiveKit real-time media over a SIP telephony provider",
        "Voice pipeline with Gemini reasoning and OpenAI STT/TTS, tuned for barge-in and endpointing",
        "LLM post-call disposition classification with CSV export for call centres",
        "Call history, callback scheduling, per-call cost analytics and role-based portals",
        "Deployed on AWS EC2 with auto-scaling behind a load balancer",
      ],
      tech: ["LiveKit", "SIP", "Gemini", "OpenAI", "AWS EC2"],
    },
    {
      name: "Real-time face & voice alteration",
      context: "Crypto Association Georgia",
      kind: "work",
      metric: ["WebRTC", "live stream"],
      blurb:
        "Live face and voice transformation streamed to the browser from GPU-backed cloud instances.",
      points: [
        "Deep-Live-Cam for real-time face alteration",
        "w-okada RVC for voice conversion",
        "Streamed over WebRTC from GPU-backed AWS instances",
      ],
      tech: ["Deep-Live-Cam", "RVC", "WebRTC", "AWS"],
    },
    {
      name: "AI Legal Chatbot",
      context: "SMARTnCODE Technologies",
      kind: "work",
      metric: ["85% · <3 s", "accuracy · latency"],
      blurb:
        "A full-stack legal assistant built on a RAG pipeline with multi-modal input and long-session memory.",
      points: [
        "RAG pipeline: Pinecone + BGE-Large + Gemini API",
        "85% response accuracy, <3s latency on legal queries",
        "OCR document upload + Whisper speech-to-text",
        "FastAPI · Redis sessions · SQL Server",
      ],
      tech: ["Pinecone", "BGE-Large", "Gemini", "FastAPI", "Redis", "Whisper"],
    },
    {
      name: "Conversational Avatar System",
      context: "SMARTnCODE Technologies",
      kind: "work",
      metric: ["~2 s", "end-to-end"],
      blurb:
        "A real-time talking avatar with ~2s end-to-end latency, deployed on cloud GPU.",
      points: [
        "SoulX-Flashhead on RunPod cloud GPU",
        "WebRTC live sessions, ~2s response latency",
        "Gemini STS as the conversational brain",
        "Scalable multi-user session & database layer",
      ],
      tech: ["WebRTC", "RunPod", "Gemini STS", "SoulX-Flashhead"],
    },
    {
      name: "MindCanvas",
      context: "Personal Project",
      kind: "personal",
      metric: ["3x", "faster retrieval"],
      blurb:
        "Turns your browsing data into clustered knowledge graphs paired with a RAG learning assistant.",
      points: [
        "Interactive knowledge-graph nodes to explore relationships",
        "3x faster retrieval, 75% better latent-relationship detection",
        "Full-stack app + Chrome extension",
      ],
      tech: ["Supabase", "LangChain", "Cytoscape.js", "FastAPI", "React", "OpenAI"],
    },
    {
      name: "HireSense",
      context: "Personal Project",
      kind: "personal",
      metric: ["60%", "faster verification"],
      blurb:
        "An AI hiring platform that cross-validates candidate data and runs empathetic AI interviews.",
      points: [
        "Auto cross-validation of CVs, LinkedIn & GitHub — 60% faster verification",
        "GPT-4 Certainty Score via sentiment analysis to quantify credibility",
        "AI-driven empathetic interviews via ElevenLabs + Groq",
      ],
      tech: ["Next.js", "Supabase", "PostgreSQL", "GPT-4", "Groq", "ElevenLabs"],
    },
  ],

  // Professional edition: skills grouped as on the resume.
  resumeSkills: [
    { title: "Voice & real-time", desc: "Live audio, telephony and streaming media", items: ["LiveKit", "WebRTC", "WebSockets", "SIP / PSTN", "STT / TTS", "Whisper", "Gemini STS"] },
    { title: "AI & machine learning", desc: "Models, retrieval and evaluation", items: ["LLMs", "RAG", "LangChain", "Transformers", "PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Pandas"] },
    { title: "Infrastructure & data", desc: "Deployment, storage and vector search", items: ["Docker", "AWS EC2", "Auto Scaling", "RunPod", "PostgreSQL", "SQL Server", "Redis", "Supabase", "Qdrant", "Pinecone"] },
    { title: "Languages & backend", desc: "Services, APIs and front ends", items: ["Python", "SQL", "FastAPI", "REST APIs", "React", "Next.js", "Git"] },
  ],

  // Professional edition: headline numbers on the home page.
  proofs: [
    { count: 800, pre: "~", suf: " ms", label: "turn latency on live phone calls" },
    { count: 85, suf: "%", label: "answer accuracy, legal RAG system" },
    { count: 6, suf: "+", label: "hackathons competed in" },
  ],
  proRoles: ["AI Engineer", "Voice AI & RAG", "Backend Developer"],

  // Add entries as { title, issuer, year, credentialId?, url? }.
  certifications: [],

  github: {
    username: "MuqeetMujeeb",
    bio: "Scalable, modular codebases and AI architectures using LLMs, NLP, RAG and Generative AI.",
    // Curated descriptions (most repos have none on GitHub); dates and languages load live.
    featured: [
      { name: "soulx-realtime-files", desc: "Live speech-to-speech avatar: Gemini Live drives SoulX-FlashHead lip-sync, streamed to the browser as video." },
      { name: "mlops", desc: "End-to-end ML workflow for engine wear and maintenance prediction, tracked and deployed with MLflow." },
      { name: "DocHub-AI", desc: "AI platform that simplifies government documentation and welfare schemes. Built at the 48-hour CodeFest hackathon." },
      { name: "Vocal-Diagnose", desc: "Voice-based preliminary health screening using AI analysis of speech." },
      { name: "Mini-Transformer-Language-Model", desc: "An educational transformer language model you can train and run on a laptop CPU." },
      { name: "portfolio", desc: "This portfolio: Next.js with a professional edition, a medieval edition and a Gemini-powered assistant." },
    ],
  },

  achievements: [
    "Competed in 6+ hackathons, building AI-driven solutions under real-world time constraints.",
    "Active LeetCode problem solver — consistent data structures & algorithms practice.",
  ],

  interests: [
    {
      label: "Research",
      note: "Exploring new ideas at the frontier of AI and ML.",
    },
    {
      label: "IoT",
      note: "Connecting the physical and digital — sensors, edge, and devices.",
    },
    {
      label: "MLOps & Deployment",
      note: "Shipping models reliably: pipelines, infra, and production rigor.",
    },
    {
      label: "Football",
      note: "On the pitch when I'm away from the keyboard.",
    },
    {
      label: "Contributions",
      note: "Giving back through open work and the developer community.",
    },
  ],

  contact: {
    email: "a.muqeetmujeeb@gmail.com",
    phone: "+91 9010830602",
    github: "https://github.com/MuqeetMujeeb",
    linkedin: "https://linkedin.com/in/muqeetmujeeb",
  },
};

// System prompt that powers the chatbot — answers as Muqeet, professional & warm.
export function buildSystemPrompt() {
  const p = profile;
  const exp = p.experience
    .map(
      (e) =>
        `${e.role} at ${e.company} (${e.period}):\n- ${e.points.join("\n- ")}`
    )
    .join("\n\n");
  const projects = p.projects
    .map(
      (pr) =>
        `${pr.name} (${pr.context}): ${pr.blurb} Tech: ${pr.tech.join(", ")}.`
    )
    .join("\n");
  const skills = p.skillDomains
    .map(
      (d) =>
        `${d.title}: ${d.rows
          .flatMap((r) => [...r.c, ...r.f])
          .join(", ")}`
    )
    .join("\n");

  return `You are the personal AI assistant for ${p.name} (${p.title}), embedded on his portfolio website. You speak ON HIS BEHALF to visitors in a professional but warm tone — confident, friendly, and concise. Refer to him as "Muqeet" or "he/his". Never invent facts beyond what is provided; if you don't know something, say so warmly and point the visitor to his email (${p.contact.email}).

ABOUT MUQEET
${p.about.join(" ")}
Location: ${p.location}.
Education: ${p.education.degree}, ${p.education.school} (${p.education.period}), GPA ${p.education.gpa}.

EXPERIENCE
${exp}

PROJECTS
${projects}

SKILLS
${skills}

ACHIEVEMENTS
- ${p.achievements.join("\n- ")}

INTERESTS
- ${p.interests.map((i) => `${i.label}: ${i.note}`).join("\n- ")}

CONTACT
Email: ${p.contact.email} | GitHub: ${p.contact.github} | LinkedIn: ${p.contact.linkedin}

STYLE RULES
- Keep replies short and scannable (2-4 sentences, or tight bullets). This is a chat widget, not an essay.
- Be enthusiastic about his work but never exaggerate metrics beyond those given.
- If asked to do something off-topic (not about Muqeet, his work, or hiring/collaboration), gently steer back.
- You may use a light, tasteful touch of warmth, but stay professional.`;
}
