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
    "I'm an AI Engineer who builds scalable, modular systems and end-to-end backend pipelines. My work centers on applying LLMs, NLP, and Generative AI to production-oriented projects — including real-time voice AI agents.",
    "I care about reliability and maintainable architecture: vector search, REST and WebSocket APIs, and containerized cloud deployments. I like turning ambitious ideas into systems that actually hold up under real users.",
  ],

  experience: [
    {
      role: "AI Developer",
      company: "SMARTnCODE Technologies",
      mode: "On-site",
      location: "Hyderabad, India",
      period: "December 2025 – Present",
      points: [
        "Built a full-stack AI legal chatbot from scratch with a RAG pipeline (Pinecone + BGE-Large + Gemini API), achieving 85% response accuracy and <3s latency on domain-specific legal queries.",
        "Engineered a rolling 10-message summarization strategy, reducing token consumption by ~40% while preserving full conversational context across long sessions.",
        "Delivered multi-modal input — document upload via OCR and speech-to-text via Whisper — served through a FastAPI backend with Redis session management and SQL Server storage.",
        "Developed a real-time conversational avatar system using SoulX-Flashhead on RunPod cloud GPU with WebRTC sessions, achieving ~2s end-to-end response latency in live interactions.",
        "Integrated Gemini STS as the avatar's conversational brain; resolved audio-visual sync conflicts and designed a scalable multi-user session and database layer.",
        "Contributing to R&D on an AI video generation platform, evaluating diffusion models (Google Veo, Kling AI, Seedance) for a unified cinematic content pipeline.",
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
      name: "AI Legal Chatbot",
      context: "SMARTnCODE Technologies",
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
