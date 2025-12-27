import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Shield,
  Cpu,
  Code,
  Sword,
  Scroll,
  Mail,
  Github,
  Linkedin,
  Database,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Trophy,
  Zap,
  Bot,
  Sparkles,
  Send,
  Lock,
  Server,
  Key,
  Network,
} from "lucide-react";

// --- API CONFIGURATION ---
const apiKey = process.env.VITE_GEMINI_API_KEY; // API Key will be injected by the environment

// --- CV DATA ---
const HERO_DATA = {
  name: "Tanishk Viraj Bhanage",
  roles: [
    "Cyber Security Student",
    "Researcher",
    "Full Stack Developer",
    "Hackathon Winner",
  ],
  location: "Bengaluru, IN",
  education: "B.Tech CSE (Cyber Security) @ RVCE",
  gradYear: "2027",
};

const SKILLS_STATS = [
  {
    label: "STR (ML/DL)",
    value: 85,
    color: "bg-red-500",
    desc: "XGBoost, LSTM, YOLOv5",
  },
  {
    label: "AGI (Dev)",
    value: 90,
    color: "bg-[#00f0ff]",
    desc: "React, Node, Tailwind",
  },
  {
    label: "INT (Cyber)",
    value: 88,
    color: "bg-[#00ff41]",
    desc: "Cryptography, Wireshark",
  },
  {
    label: "WIS (Langs)",
    value: 92,
    color: "bg-yellow-400",
    desc: "Python, Java, SQL, C",
  },
];

const QUEST_LOG = [
  {
    title: "Internship: RRCAT (DAE)",
    role: "Research Intern",
    date: "Jul 2025 - Sep 2025",
    desc: "Researched chaos-based cryptographic systems for secure image transmission. Developed hybrid encryption using Logistic, Henon, and Sine maps.",
    stats: ["NPCR > 99.6%", "UACI ~31.4%"],
    loot: ["Cryptography", "Research", "Python"],
    id: "q1",
  },
];

const INVENTORY_PROJECTS = [
  {
    title: "X-IDS",
    type: "Security Tool",
    desc: "Explainable AI in Intrusion Detection using XGBoost & SHAP. Integrated LIME for interpretability.",
    buff: "+90% Accuracy",
    link: "https://github.com/TaNiShK1911",
    icon: <Shield size={20} />,
  },
  {
    title: "BlockDAG Sim",
    type: "DeFi Simulator",
    desc: "Winner of HackOdisha 5.0. Interactive simulator visualizing parallel transactions in real-time.",
    buff: "$1000 Prize",
    link: "https://github.com/TaNiShK1911",
    icon: <Trophy size={20} />,
  },
  {
    title: "Zero-Day Detect",
    type: "AI Defense",
    desc: "AI-based intrusion detection using Autoencoder & LSTM models with Wireshark integration.",
    buff: "Real-time",
    link: "https://github.com/TaNiShK1911",
    icon: <Zap size={20} />,
  },
  {
    title: "Flight Tracker",
    type: "Web App",
    desc: "Top 10 Honeywell Ideathon. Integrated FAA AWC and NOTAM APIs for predictive rerouting.",
    buff: "Predictive",
    link: "https://github.com/TaNiShK1911",
    icon: <ExternalLink size={20} />,
  },
];

// --- GEMINI API HELPER ---
async function callGemini(prompt, systemInstruction = "") {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      },
    );

    if (!response.ok) throw new Error("API_ERROR");

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "SYSTEM_OFFLINE";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERROR: CONNECTION_LOST. RETRY_LATER.";
  }
}

// --- BACKGROUND COMPONENT (The "Server Room" Effect) ---
const BackgroundMatrix = () => {
  // Floating icons configuration
  const floatingIcons = [
    { Icon: Lock, size: 48, x: "10%", y: "20%", duration: 15, delay: 0 },
    { Icon: Shield, size: 64, x: "80%", y: "15%", duration: 20, delay: 2 },
    { Icon: Server, size: 56, x: "85%", y: "80%", duration: 18, delay: 1 },
    { Icon: Key, size: 40, x: "15%", y: "75%", duration: 22, delay: 3 },
    { Icon: Network, size: 96, x: "50%", y: "50%", duration: 30, delay: 0 },
    { Icon: Code, size: 32, x: "30%", y: "40%", duration: 12, delay: 5 },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. Deep Obsidian Gradient Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a2e1a_0%,#000000_100%)] opacity-80" />

      {/* 2. Perspective Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #00ff41 1px, transparent 1px), linear-gradient(to bottom, #00ff41 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          transform:
            "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)",
          transformOrigin: "top center",
        }}
      />

      {/* 3. Floating Data Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-[#00ff41] opacity-10"
          initial={{ x: item.x, y: item.y, rotate: 0 }}
          animate={{
            y: [item.y, `calc(${item.y} - 50px)`, item.y],
            rotate: [0, 10, -10, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}

      {/* 4. Falling "Data Streams" (Simple CSS Overlay) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
    </div>
  );
};

export default function Portfolio() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      text: "MAINFRAME_ONLINE. ASK_QUERY_ABOUT_PLAYER_TANISHK.",
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Contact Draft State
  const [draftInput, setDraftInput] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter Effect
  useEffect(() => {
    const currentRole = HERO_DATA.roles[textIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText !== currentRole) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      } else if (isDeleting && displayedText !== "") {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      } else if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % HERO_DATA.roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  // --- GEMINI FUNCTIONS ---
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsChatLoading(true);

    const context = `
      You are the "Mainframe AI" for Tanishk Viraj Bhanage's portfolio.
      Style: Retro, Robotic, 8-bit RPG Game Master, concise.
      Data: 
      - Name: ${HERO_DATA.name}
      - Roles: ${HERO_DATA.roles.join(", ")}
      - Location: ${HERO_DATA.location}
      - Skills: ${SKILLS_STATS.map((s) => s.label).join(", ")}
      - Projects: ${INVENTORY_PROJECTS.map((p) => p.title + ": " + p.desc).join("; ")}
      - Internship: ${QUEST_LOG[0].title} (${QUEST_LOG[0].desc})
      
      User Query: ${userMsg}
      Answer as the Mainframe. Keep it under 50 words.
    `;

    const reply = await callGemini(userMsg, context);
    setChatHistory((prev) => [...prev, { role: "system", text: reply }]);
    setIsChatLoading(false);
  };

  const handleAutoDraft = async () => {
    if (!draftInput.trim()) return;
    setIsDrafting(true);

    const prompt = `
      Generate a short, professional but slightly "gamer/tech" themed email message to Tanishk.
      The user wants to contact him for: "${draftInput}".
      The tone should be respectful but fit a cyber-security portfolio context.
      Keep it under 3 sentences.
    `;

    const draft = await callGemini(
      prompt,
      "You are a helpful communications droid.",
    );
    setGeneratedMessage(draft);
    setIsDrafting(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black overflow-x-hidden relative">
      {/* --- CSS INJECTION --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Press+Start+2P&family=VT323&display=swap');
        
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        .font-retro { font-family: 'VT323', monospace; }
        .font-mono { font-family: 'Fira Code', monospace; }

        /* CRT SCANLINES - Keeping this on top */
        .scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.2)
          );
          background-size: 100% 4px;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 50;
          animation: scroll 6s linear infinite;
        }

        @keyframes scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }

        .text-glow {
          text-shadow: 0 0 5px #00ff41, 0 0 10px #00ff41;
        }

        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #00ff41; border: 2px solid #111; }
      `}</style>

      {/* --- BACKGROUND LAYERS --- */}
      <BackgroundMatrix />
      <div className="scanlines" />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-40 bg-[#000]/80 backdrop-blur-md border-b-4 border-[#00ff41] p-4 flex justify-between items-center font-pixel text-[10px] md:text-xs shadow-[0_0_20px_rgba(0,255,65,0.2)]">
        <div className="flex gap-4 items-center">
          <div className="w-3 h-3 bg-[#00ff41] animate-pulse rounded-full shadow-[0_0_10px_#00ff41]"></div>
          <span className="text-[#00ff41] hidden md:inline">● SYS.ONLINE</span>
          <span className="text-white">LVL 3 [{HERO_DATA.gradYear}]</span>
        </div>

        <div className="hidden md:flex gap-8 uppercase">
          {["Stats", "Quests", "Inventory", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#00f0ff] hover:underline decoration-2 underline-offset-4 cursor-pointer transition-all"
            >
              [{item}]
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-[#00ff41]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 w-full bg-[#0a0a0a] border-b-4 border-[#00ff41] z-30 p-4 md:hidden flex flex-col gap-4 font-pixel text-xs shadow-lg"
          >
            {["Stats", "Quests", "Inventory", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-[#00ff41] p-3 border border-[#444] hover:bg-[#222]"
              >
                {`> ${item.toUpperCase()}`}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 pt-32 max-w-5xl relative z-10">
        {/* --- HERO SECTION --- */}
        <section className="flex flex-col md:flex-row items-center gap-12 py-16 border-b-4 border-dashed border-[#00ff41]/30 relative mb-20 bg-black/40 p-8 rounded-lg backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative group shrink-0"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-[#00ff41] bg-black relative overflow-hidden shadow-[8px_8px_0_0_#003300]">
              <img
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${HERO_DATA.name}&backgroundColor=111111`}
                alt="Avatar"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-0 right-0 bg-[#00ff41] text-black font-pixel text-[8px] px-2 py-1">
                P1_READY
              </div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="font-pixel text-lg md:text-3xl text-white leading-relaxed"
            >
              PLAYER{" "}
              <span className="text-[#00f0ff] text-glow">
                {HERO_DATA.name.split(" ")[0]}
              </span>{" "}
              HAS ENTERED
            </motion.h1>

            <div className="font-mono text-lg md:text-2xl text-[#00ff41] min-h-[40px] flex items-center justify-center md:justify-start">
              <span className="mr-3 text-[#ff00ff]">{">"}</span>
              {displayedText}
              <span className="animate-pulse ml-1 bg-[#00ff41] w-3 h-6 block"></span>
            </div>

            <p className="font-retro text-2xl text-gray-400">
              {HERO_DATA.location} | {HERO_DATA.education}
            </p>

            <div className="flex gap-4 justify-center md:justify-start pt-6">
              <a
                href="https://github.com/TaNiShK1911"
                target="_blank"
                rel="noreferrer"
                className="bg-[#111] text-[#00ff41] border-2 border-[#00ff41] px-6 py-3 font-pixel text-[10px] uppercase shadow-[4px_4px_0_#004d13] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#004d13] transition-all flex items-center gap-2 hover:bg-[#00ff41] hover:text-black"
              >
                <Github size={16} /> GITHUB
              </a>
              <a
                href="https://linkedin.com/in/tanishk-viraj-bhanage"
                target="_blank"
                rel="noreferrer"
                className="bg-[#111] text-[#00ff41] border-2 border-[#00ff41] px-6 py-3 font-pixel text-[10px] uppercase shadow-[4px_4px_0_#004d13] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#004d13] transition-all flex items-center gap-2 hover:bg-[#00ff41] hover:text-black"
              >
                <Linkedin size={16} /> LINKEDIN
              </a>
            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section id="stats" className="py-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12">
            <Cpu className="text-[#ff00ff] animate-spin-slow" size={32} />
            <h2 className="font-pixel text-xl md:text-2xl text-[#ff00ff]">
              CHARACTER STATS
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Skill Bars */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="border-4 border-[#444] p-6 bg-[#0a0a0a]/90 backdrop-blur relative shadow-[8px_8px_0_0_#222]"
            >
              <div className="absolute -top-3 left-4 bg-[#111] px-2 font-pixel text-[10px] text-[#ff00ff] border border-[#ff00ff]">
                SKILL_TREE
              </div>
              <div className="space-y-6 mt-4">
                {SKILLS_STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between font-mono mb-2 text-sm text-[#00ff41]">
                      <span>{stat.label}</span>
                      <span>{stat.value}/100</span>
                    </div>
                    <div className="h-4 bg-[#111] border border-[#444] relative p-[2px]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={`h-full ${stat.color} relative`}
                      >
                        <div className="absolute top-0 right-0 w-1 h-full bg-white opacity-50"></div>
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-500 font-retro mt-1 tracking-wider uppercase">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Equipment & Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border-4 border-[#444] p-6 bg-[#0a0a0a]/90 backdrop-blur flex flex-col justify-between shadow-[8px_8px_0_0_#222]"
            >
              <div>
                <h3 className="font-pixel text-xs text-[#00f0ff] mb-4 border-b border-[#333] pb-2">
                  EQUIPPED TOOLS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Wireshark",
                    "Neo4j",
                    "Git",
                    "Streamlit",
                    "Vercel",
                    "Postman",
                    "Burp Suite",
                  ].map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 border border-[#00ff41] text-[#00ff41] font-mono text-[10px] hover:bg-[#00ff41] hover:text-black cursor-crosshair transition-colors uppercase"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-pixel text-xs text-yellow-400 mb-4 border-b border-[#333] pb-2">
                  ACHIEVEMENTS_UNLOCKED
                </h3>
                <ul className="space-y-3">
                  {[
                    "Winner BlockDAG Track - HackOdisha 5.0 ($1000)",
                    "Top 10 - Honeywell Ideathon 2024",
                    "Top 50 - Qualcomm AI Hackathon 2024",
                    "CGPA: 8.82/10",
                  ].map((ach, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm font-retro text-gray-300"
                    >
                      <Trophy
                        size={14}
                        className="text-yellow-400 mt-1 flex-shrink-0"
                      />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- QUEST LOG --- */}
        <section id="quests" className="py-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12">
            <Scroll className="text-yellow-400" size={32} />
            <h2 className="font-pixel text-xl md:text-2xl text-yellow-400">
              QUEST LOG
            </h2>
          </div>

          <div className="space-y-8">
            {QUEST_LOG.map((quest, i) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="border-l-4 border-[#00ff41] pl-8 py-2 relative group bg-black/40 p-4 rounded-r"
              >
                <div className="absolute -left-[11px] top-4 w-5 h-5 bg-black border-4 border-[#00ff41] group-hover:bg-[#00ff41] transition-colors"></div>

                <h3 className="font-pixel text-lg md:text-xl text-white">
                  {quest.title}
                </h3>

                <div className="flex flex-wrap gap-4 items-center font-mono text-sm text-[#00f0ff] mt-2 mb-4">
                  <span className="bg-[#222] px-2 py-1 border border-[#444]">
                    {quest.role}
                  </span>
                  <span className="text-gray-500">{quest.date}</span>
                </div>

                <p className="font-retro text-xl text-gray-300 max-w-3xl leading-relaxed mb-6">
                  {quest.desc}
                </p>

                <div className="grid grid-cols-2 md:flex gap-4 mb-6">
                  {quest.stats.map((stat) => (
                    <div
                      key={stat}
                      className="bg-[#0a0a0a] border border-[#333] p-2 text-xs font-mono text-[#00ff41] flex items-center gap-2"
                    >
                      <ChevronRight size={12} /> {stat}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {quest.loot.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] border border-[#444] px-2 py-1 text-gray-400 font-pixel uppercase hover:text-white hover:border-white cursor-help"
                    >
                      +{item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- INVENTORY --- */}
        <section id="inventory" className="py-20 scroll-mt-24">
          <div className="flex items-center gap-4 mb-12">
            <Sword className="text-[#ff00ff]" size={32} />
            <h2 className="font-pixel text-xl md:text-2xl text-[#ff00ff]">
              INVENTORY (PROJECTS)
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {INVENTORY_PROJECTS.map((project, i) => (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="group block bg-[#0a0a0a]/90 backdrop-blur border-4 border-[#444] p-5 relative overflow-hidden hover:border-[#ff00ff] transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#ff00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="bg-[#111] p-3 border-2 border-[#444] group-hover:border-[#ff00ff] transition-colors text-white group-hover:text-[#ff00ff]">
                    {project.icon}
                  </div>
                  <span className="font-pixel text-[8px] bg-[#222] px-2 py-1 text-white border border-[#444]">
                    {project.type.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-pixel text-sm md:text-base text-white mb-2 group-hover:text-[#ff00ff] transition-colors">
                  {project.title}
                </h3>

                <p className="font-retro text-xl text-gray-400 mb-6 h-16 leading-tight">
                  {project.desc}
                </p>

                <div className="flex justify-between items-center border-t border-[#333] pt-4 font-mono text-xs relative z-10">
                  <span className="text-yellow-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    BUFF: {project.buff}
                  </span>
                  <ExternalLink
                    size={14}
                    className="text-gray-500 group-hover:text-white"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* --- CONTACT WITH GEMINI DRAFTER --- */}
        <section id="contact" className="py-20 pb-40 scroll-mt-24">
          <div className="max-w-3xl mx-auto border-4 border-[#00ff41] bg-black p-1 md:p-2 shadow-[0_0_30px_rgba(0,255,65,0.15)] relative z-20">
            <div className="bg-[#00ff41] text-black font-pixel text-[10px] md:text-xs p-2 mb-2 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Terminal size={12} /> COMMUNICATION_UPLINK
              </span>
              <span>v1.0.4</span>
            </div>

            <div className="p-4 md:p-8 font-mono text-sm space-y-4">
              <p className="text-[#00ff41]">System: Uplink established...</p>
              <p className="text-white">
                Target ID:{" "}
                <span className="text-[#ff00ff]">tanishkbhanage@gmail.com</span>
              </p>
              <p className="text-white">Subject: Collaboration Request</p>

              <div className="border border-[#333] p-4 bg-[#0a0a0a] mb-6">
                <h4 className="flex items-center gap-2 text-yellow-400 font-pixel text-[10px] mb-3">
                  <Sparkles size={12} /> AI COMMS DRAFTER ✨
                </h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="E.g., I want to hire you for a pentesting role..."
                    className="flex-1 bg-[#111] border border-[#333] text-white px-3 py-2 text-xs font-mono outline-none focus:border-yellow-400"
                    value={draftInput}
                    onChange={(e) => setDraftInput(e.target.value)}
                  />
                  <button
                    onClick={handleAutoDraft}
                    disabled={isDrafting}
                    className="bg-yellow-400 text-black px-3 py-2 font-pixel text-[8px] hover:bg-yellow-300 disabled:opacity-50"
                  >
                    {isDrafting ? "COMPUTING..." : "AUTO-DRAFT"}
                  </button>
                </div>
                {generatedMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#00f0ff] text-xs border-l-2 border-[#00f0ff] pl-3 py-1 mt-2 italic"
                  >
                    "{generatedMessage}"
                  </motion.div>
                )}
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <span className="text-[#00ff41] shrink-0 whitespace-nowrap">
                    {"> Enter_Name:"}
                  </span>
                  <input
                    type="text"
                    className="bg-transparent border-b border-[#333] focus:border-[#00ff41] outline-none text-white w-full font-retro text-xl py-1 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[#00ff41]">{"> Enter_Message:"}</span>
                  <textarea
                    rows={4}
                    className="bg-[#111] border border-[#333] focus:border-[#00ff41] outline-none text-white w-full font-retro text-xl p-3 resize-none transition-colors"
                    defaultValue={generatedMessage || ""}
                  ></textarea>
                </div>

                <button className="bg-[#111] text-[#00ff41] border-2 border-[#00ff41] px-8 py-4 font-pixel text-[10px] uppercase shadow-[4px_4px_0_#004d13] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#004d13] hover:bg-white hover:text-black hover:border-white transition-all w-full md:w-auto mt-4">
                  [SEND_PACKET]
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* --- MAINFRAME ORACLE CHATBOT (FLOATING) --- */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-20 right-4 md:right-8 w-80 md:w-96 bg-[#0a0a0a] border-4 border-[#00f0ff] z-50 shadow-[0_0_30px_rgba(0,240,255,0.3)] rounded-sm overflow-hidden"
          >
            <div className="bg-[#00f0ff] text-black p-2 font-pixel text-[10px] flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Bot size={14} /> MAINFRAME_ORACLE_V2 ✨
              </span>
              <button onClick={() => setIsChatOpen(false)}>
                <X size={14} />
              </button>
            </div>

            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-black/90 font-mono text-xs scrollbar-thin">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-2 rounded ${
                      msg.role === "user"
                        ? "bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50"
                        : "bg-[#00ff41]/10 text-[#00ff41] border-l-2 border-[#00ff41]"
                    }`}
                  >
                    <span className="block text-[8px] opacity-50 mb-1 font-pixel uppercase">
                      {msg.role === "user" ? "PLAYER" : "SYSTEM"}
                    </span>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="text-[#00ff41] animate-pulse text-[10px]">
                  [COMPUTING_RESPONSE...]
                </div>
              )}
            </div>

            <form
              onSubmit={handleChatSubmit}
              className="border-t border-[#00f0ff] p-2 flex gap-2 bg-[#111]"
            >
              <input
                className="flex-1 bg-black border border-[#333] text-[#00f0ff] px-2 py-1 outline-none text-xs focus:border-[#00f0ff]"
                placeholder="Ask about skills, projects..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="bg-[#00f0ff] text-black p-2 hover:bg-white">
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING CHAT TOGGLE --- */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 md:right-10 bg-[#00f0ff] text-black border-2 border-white p-3 md:p-4 rounded-full shadow-[0_0_20px_#00f0ff] z-50 flex items-center justify-center group"
      >
        <Bot size={24} className="group-hover:animate-bounce" />
        <span className="absolute -top-10 right-0 bg-white text-black px-2 py-1 text-[8px] font-pixel whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          CONSULT_AI
        </span>
      </motion.button>

      <footer className="text-center font-pixel text-[10px] text-gray-600 py-6 border-t border-[#222] bg-[#0a0a0a]">
        <p className="mb-2">© 2025 TANISHK VIRAJ BHANAGE</p>
        <p className="animate-pulse text-[#00ff41] cursor-pointer hover:underline">
          PRESS START TO CONTINUE
        </p>
      </footer>
    </div>
  );
}
