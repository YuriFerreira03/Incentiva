import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Brain,
  Target,
  FileText,
  Users,
  Wallet,
  TrendingUp,
  Award,
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertCircle,
  Briefcase,
  Building2,
  Rocket,
  Trophy,
  Receipt,
  ChevronRight,
  X,
  Lightbulb,
  Calendar,
  MapPin,
  Flame,
  Activity,
  Play,
  Eye,
  Lock,
  Download,
  Share2,
  MessageSquareText,
  Quote,
  CircleDot,
  Signal,
  Radar,
  Compass,
  Dumbbell,
  Landmark,
  Wand2,
} from "lucide-react";

/* ==========================================================================
   INCENTIVA — Plataforma demonstrativa para a Lei de Incentivo ao Esporte
   Protótipo navegável de alta fidelidade — single-file React
   ========================================================================== */

// ---------- Design tokens ------------------------------------------------
const COLORS = {
  bg: "#070B14",
  bgSoft: "#0B111F",
  surface: "#0F172A",
  surfaceHi: "#141C30",
  border: "rgba(148, 163, 184, 0.14)",
  borderHi: "rgba(148, 163, 184, 0.28)",
  textHi: "#F1F5F9",
  text: "#CBD5E1",
  textLo: "#94A3B8",
  primary: "#3B82F6", // azul elétrico
  primaryGlow: "#60A5FA",
  primaryDeep: "#1D4ED8",
  accent: "#10D9A3", // verde neon sofisticado
  accentSoft: "#34D399",
  gold: "#F59E0B", // marco de conquista
  goldSoft: "#FBBF24",
  danger: "#F87171",
};

const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" };

// ---------- Global styles (fonts, keyframes, scrollbar, grid) -----------
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Sora', ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.02em; }
    .font-body { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

    .incentiva-root { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; }
    .incentiva-root * { -webkit-font-smoothing: antialiased; }

    /* Subtle moving gridline background */
    .grid-bg {
      background-image:
        linear-gradient(rgba(59,130,246,0.055) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59,130,246,0.055) 1px, transparent 1px);
      background-size: 56px 56px;
    }
    .grid-bg-fine {
      background-image:
        linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px);
      background-size: 22px 22px;
    }

    .glass {
      background: linear-gradient(180deg, rgba(20,28,48,0.78) 0%, rgba(15,23,42,0.62) 100%);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border: 1px solid rgba(148,163,184,0.14);
    }
    .glass-hi {
      background: linear-gradient(180deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.7) 100%);
      border: 1px solid rgba(148,163,184,0.2);
    }

    /* Luminescent border for emphasis */
    .lume {
      position: relative;
      isolation: isolate;
    }
    .lume::before {
      content: "";
      position: absolute; inset: 0;
      padding: 1px; border-radius: inherit;
      background: linear-gradient(140deg, rgba(59,130,246,0.55), rgba(16,217,163,0.35) 40%, rgba(245,158,11,0.35) 80%, transparent);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude;
      pointer-events: none;
    }

    /* Soft radial glow utility */
    .glow-blue { background: radial-gradient(600px 300px at 10% 0%, rgba(59,130,246,0.22), transparent 60%); }
    .glow-accent { background: radial-gradient(500px 260px at 90% 10%, rgba(16,217,163,0.18), transparent 60%); }
    .glow-gold { background: radial-gradient(500px 260px at 50% 100%, rgba(245,158,11,0.18), transparent 60%); }

    @keyframes pulseRing {
      0% { transform: scale(0.9); opacity: 0.75; }
      80% { transform: scale(1.6); opacity: 0; }
      100% { opacity: 0; }
    }
    .pulse-ring { animation: pulseRing 2.2s ease-out infinite; }

    @keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
    .float-y { animation: floatY 5s ease-in-out infinite; }

    @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
    .shimmer {
      background: linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.55) 50%, rgba(59,130,246,0) 100%);
      background-size: 200% 100%;
      animation: shimmer 2.4s linear infinite;
    }

    @keyframes dash { to { stroke-dashoffset: -40; } }
    .trajectory-dash { stroke-dasharray: 6 10; animation: dash 3s linear infinite; }

    @keyframes fadeUp { from { opacity: 0; transform: translateY(14px);} to { opacity: 1; transform: translateY(0);} }
    .fade-up { animation: fadeUp 0.5s ease-out both; }
    .fade-up-1 { animation-delay: .05s; } .fade-up-2 { animation-delay: .15s; }
    .fade-up-3 { animation-delay: .25s; } .fade-up-4 { animation-delay: .35s; }
    .fade-up-5 { animation-delay: .45s; }

    @keyframes spinSlow { to { transform: rotate(360deg); } }
    .spin-slow { animation: spinSlow 18s linear infinite; }

    /* Scrollbar */
    .thin-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
    .thin-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.2); border-radius: 8px; }
    .thin-scroll::-webkit-scrollbar-track { background: transparent; }

    /* Smooth button hover lift */
    .btn-lift { transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease; }
    .btn-lift:hover { transform: translateY(-1px); }

    /* Chip ring */
    .ring-soft { box-shadow: 0 0 0 1px rgba(148,163,184,0.16) inset; }
    .ring-blue { box-shadow: 0 0 0 1px rgba(59,130,246,0.45) inset, 0 0 22px -6px rgba(59,130,246,0.6); }
    .ring-accent { box-shadow: 0 0 0 1px rgba(16,217,163,0.45) inset, 0 0 22px -6px rgba(16,217,163,0.6); }
    .ring-gold { box-shadow: 0 0 0 1px rgba(245,158,11,0.55) inset, 0 0 22px -6px rgba(245,158,11,0.6); }

    /* Selectable card */
    .pick-card { transition: all .2s ease; border: 1px solid rgba(148,163,184,0.14); }
    .pick-card:hover { border-color: rgba(59,130,246,0.45); transform: translateY(-2px); }

    /* Progress rail */
    .rail { height: 6px; background: rgba(148,163,184,0.12); border-radius: 99px; overflow: hidden; }
    .rail > span { display:block; height:100%; background: linear-gradient(90deg, #3B82F6, #10D9A3); border-radius: 99px; }

    /* Subtle noise overlay (css only) */
    .noise { background-image: radial-gradient(rgba(148,163,184,0.05) 1px, transparent 1px); background-size: 3px 3px; }

    /* AI message bubble caret */
    .ai-bubble { position: relative; }
    .ai-bubble::before {
      content:""; position:absolute; left:-6px; top:18px;
      border: 6px solid transparent; border-right-color: rgba(20,28,48,0.9);
    }

    /* Focus ring */
    .fr:focus { outline: none; box-shadow: 0 0 0 2px rgba(59,130,246,0.55); }
  `}</style>
);

// ---------- Mock data ---------------------------------------------------
const MOCK = {
  proponente: {
    nome: "Instituto Movimento Urbano",
    cnpj: "27.884.110/0001-03",
    cidade: "Belo Horizonte/MG",
    desde: 2014,
    certidoes: "Regulares",
    area: "Esporte educacional e de participação",
  },
  projeto: {
    nome: "Arena Jovem — Formação em Basquete Comunitário",
    manifestacao: "Esporte Educacional",
    dimensao: "Municipal",
    duracao: "18 meses",
    beneficiarios: 340,
    local: "Aglomerado da Serra, Belo Horizonte/MG",
    valor: 780000,
    objetivo:
      "Oferecer formação esportiva contínua em basquete para 340 crianças e adolescentes em situação de vulnerabilidade, promovendo cidadania, permanência escolar e hábitos saudáveis.",
  },
  incentivadores: [
    {
      id: "meridian",
      nome: "Grupo Meridian",
      setor: "Indústria & Infraestrutura",
      tese: "Esporte educacional, juventude, capitais regionais",
      capacidade: 1200000,
      score: 94,
      drivers: [
        { label: "Aderência temática", v: 96 },
        { label: "Alinhamento ESG", v: 92 },
        { label: "Zona geográfica", v: 97 },
        { label: "Capacidade x ticket", v: 90 },
      ],
      motivos: [
        "Tese ESG declarada prioriza esporte educacional em capitais da região Sudeste.",
        "Histórico de apoio a projetos de 600k–1.2M no mesmo formato.",
        "Perfil de beneficiários e manifestação esportiva coincidem com o projeto.",
      ],
      disponivel: 820000,
      logo: "MR",
    },
    {
      id: "horizonte",
      nome: "Banco Horizonte",
      setor: "Serviços Financeiros",
      tese: "Inclusão social via esporte, impacto mensurável",
      capacidade: 900000,
      score: 89,
      drivers: [
        { label: "Aderência temática", v: 91 },
        { label: "Alinhamento ESG", v: 95 },
        { label: "Zona geográfica", v: 82 },
        { label: "Capacidade x ticket", v: 88 },
      ],
      motivos: [
        "Estrutura de relatório de impacto compatível com o plano de M&A do projeto.",
        "Aporte típico entre 400k e 800k — compatível com o pleito.",
      ],
      disponivel: 540000,
      logo: "BH",
    },
    {
      id: "veritas",
      nome: "Construtora Veritas",
      setor: "Construção civil",
      tese: "Atuação comunitária próxima às obras",
      capacidade: 600000,
      score: 82,
      drivers: [
        { label: "Aderência temática", v: 80 },
        { label: "Alinhamento ESG", v: 78 },
        { label: "Zona geográfica", v: 94 },
        { label: "Capacidade x ticket", v: 76 },
      ],
      motivos: [
        "Dois canteiros ativos a menos de 6 km do local de execução.",
        "Preferência histórica por projetos comunitários de contrapartida social.",
      ],
      disponivel: 300000,
      logo: "CV",
    },
    {
      id: "varejo",
      nome: "Varejo Brasil S.A.",
      setor: "Varejo",
      tese: "Marketing regional + benefício fiscal",
      capacidade: 1500000,
      score: 76,
      drivers: [
        { label: "Aderência temática", v: 74 },
        { label: "Alinhamento ESG", v: 70 },
        { label: "Zona geográfica", v: 88 },
        { label: "Capacidade x ticket", v: 82 },
      ],
      motivos: [
        "Campanha de ativação regional alinhada à base de beneficiários.",
        "Preferência por projetos com alta visibilidade comunitária.",
      ],
      disponivel: 700000,
      logo: "VB",
    },
    {
      id: "energia",
      nome: "Energia Livre ESG",
      setor: "Energia",
      tese: "Transição social e agenda climática",
      capacidade: 800000,
      score: 71,
      drivers: [
        { label: "Aderência temática", v: 69 },
        { label: "Alinhamento ESG", v: 90 },
        { label: "Zona geográfica", v: 66 },
        { label: "Capacidade x ticket", v: 72 },
      ],
      motivos: [
        "Tese ESG forte, aderência temática parcial — foco maior em paradesporto.",
      ],
      disponivel: 420000,
      logo: "EL",
    },
    {
      id: "sigma",
      nome: "Sigma Telecom",
      setor: "Telecom",
      tese: "Conectividade + comunidade",
      capacidade: 500000,
      score: 68,
      drivers: [
        { label: "Aderência temática", v: 62 },
        { label: "Alinhamento ESG", v: 74 },
        { label: "Zona geográfica", v: 76 },
        { label: "Capacidade x ticket", v: 64 },
      ],
      motivos: [
        "Aporte médio abaixo do pleito — recomendado para captação complementar.",
      ],
      disponivel: 180000,
      logo: "SG",
    },
  ],
};

const BRL = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

// ---------- Reusable UI primitives --------------------------------------
const Logo = ({ size = 28 }) => (
  <div className="flex items-center gap-2.5">
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10D9A3" />
        </linearGradient>
      </defs>
      <path
        d="M6 30 C 14 30, 14 10, 22 10 C 30 10, 30 30, 38 30"
        stroke="url(#logo-g)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="6" cy="30" r="3" fill="#3B82F6" />
      <circle cx="38" cy="30" r="3" fill="#F59E0B" />
    </svg>
    <div className="font-display font-semibold tracking-tight text-[17px]">
      INCENTIVA
    </div>
  </div>
);

const Button = ({ variant = "primary", icon, iconRight, children, onClick, className = "", size = "md", disabled }) => {
  const sizes = {
    sm: "px-3.5 py-2 text-[13px]",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-[15px]",
  };
  const v = {
    primary: {
      style: {
        background: "linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)",
        color: "white",
        boxShadow: "0 8px 24px -8px rgba(59,130,246,0.6), 0 0 0 1px rgba(96,165,250,0.35) inset",
      },
    },
    accent: {
      style: {
        background: "linear-gradient(180deg, #10D9A3 0%, #0B8E6B 100%)",
        color: "#04221A",
        boxShadow: "0 8px 24px -8px rgba(16,217,163,0.55), 0 0 0 1px rgba(52,211,153,0.4) inset",
      },
    },
    gold: {
      style: {
        background: "linear-gradient(180deg, #F59E0B 0%, #B45309 100%)",
        color: "#1F1405",
        boxShadow: "0 8px 24px -8px rgba(245,158,11,0.55), 0 0 0 1px rgba(251,191,36,0.4) inset",
      },
    },
    secondary: {
      style: {
        background: "rgba(30,41,59,0.6)",
        color: "#E2E8F0",
        boxShadow: "0 0 0 1px rgba(148,163,184,0.22) inset",
      },
    },
    ghost: {
      style: {
        background: "transparent",
        color: "#CBD5E1",
        boxShadow: "0 0 0 1px rgba(148,163,184,0.18) inset",
      },
    },
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-lift inline-flex items-center justify-center gap-2 rounded-xl font-medium ${sizes[size]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={v.style}
    >
      {icon}
      <span>{children}</span>
      {iconRight}
    </button>
  );
};

const Chip = ({ children, tone = "default", icon }) => {
  const tones = {
    default: { bg: "rgba(30,41,59,0.7)", color: "#CBD5E1", ring: "rgba(148,163,184,0.22)" },
    blue: { bg: "rgba(59,130,246,0.12)", color: "#93C5FD", ring: "rgba(59,130,246,0.4)" },
    accent: { bg: "rgba(16,217,163,0.12)", color: "#6EE7B7", ring: "rgba(16,217,163,0.4)" },
    gold: { bg: "rgba(245,158,11,0.14)", color: "#FCD34D", ring: "rgba(245,158,11,0.45)" },
    danger: { bg: "rgba(248,113,113,0.14)", color: "#FCA5A5", ring: "rgba(248,113,113,0.45)" },
  }[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium"
      style={{ background: tones.bg, color: tones.color, boxShadow: `0 0 0 1px ${tones.ring} inset` }}
    >
      {icon}
      {children}
    </span>
  );
};

const AiChip = ({ children = "IA" }) => (
  <span
    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide"
    style={{
      background:
        "linear-gradient(180deg, rgba(59,130,246,0.22), rgba(16,217,163,0.18))",
      color: "#BFDBFE",
      boxShadow: "0 0 0 1px rgba(59,130,246,0.4) inset",
    }}
  >
    <Sparkles size={11} />
    {children}
  </span>
);

const GlassCard = ({ children, className = "", hi = false, style }) => (
  <div className={`rounded-2xl ${hi ? "glass-hi" : "glass"} ${className}`} style={style}>
    {children}
  </div>
);

const SectionLabel = ({ children, icon }) => (
  <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-slate-400 font-medium">
    {icon}
    {children}
  </div>
);

const ScoreRing = ({ value, size = 120, stroke = 10, label, color = COLORS.primary, trackColor = "rgba(148,163,184,0.14)" }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={`ring-${value}-${color}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={color} />
            <stop offset="1" stopColor={COLORS.accent} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#ring-${value}-${color})`}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset .8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display font-semibold text-2xl text-white leading-none">{value}</div>
        {label && <div className="text-[10.5px] tracking-widest text-slate-400 mt-1 uppercase">{label}</div>}
      </div>
    </div>
  );
};

const Meter = ({ value, tone = "primary" }) => {
  const colors = {
    primary: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
    accent: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.goldSoft})`,
    gold: `linear-gradient(90deg, ${COLORS.gold}, #FCD34D)`,
  }[tone];
  return (
    <div className="rail">
      <span style={{ width: `${value}%`, background: colors }} />
    </div>
  );
};

/* Trajectory / pulse lines — subtle sports-inspired background decoration */
const TrajectoryBg = ({ variant = "a" }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.55]"
    viewBox="0 0 1440 800"
    preserveAspectRatio="none"
    aria-hidden
  >
    <defs>
      <linearGradient id="tl1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3B82F6" stopOpacity="0.7" />
        <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="tl2" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#10D9A3" stopOpacity="0.55" />
        <stop offset="1" stopColor="#10D9A3" stopOpacity="0" />
      </linearGradient>
    </defs>
    {variant === "a" && (
      <>
        <path d="M -40 620 C 260 540, 420 260, 820 200 S 1280 120, 1500 60" stroke="url(#tl1)" strokeWidth="1.2" fill="none" />
        <path d="M -40 700 C 300 600, 560 380, 900 330 S 1320 220, 1500 180" stroke="url(#tl2)" strokeWidth="1.2" fill="none" />
        <path d="M 100 780 C 380 720, 660 520, 1040 470 S 1380 360, 1500 320" className="trajectory-dash" stroke="rgba(148,163,184,0.35)" strokeWidth="0.8" fill="none" />
      </>
    )}
    {variant === "b" && (
      <>
        <path d="M 0 200 C 300 320, 700 120, 1100 340 S 1400 360, 1500 260" stroke="url(#tl1)" strokeWidth="1" fill="none" />
        <path d="M 0 380 C 300 460, 700 340, 1100 520 S 1400 540, 1500 460" stroke="url(#tl2)" strokeWidth="1" fill="none" />
      </>
    )}
  </svg>
);

/* =========================================================================
   Top navigation — aware of current screen
   ========================================================================= */
const TopNav = ({ screen, setScreen, resetJourney }) => {
  const links = [
    { key: "landing", label: "Plataforma" },
    { key: "moduleA", label: "Módulo A · Incubação" },
    { key: "sliBridge", label: "Submissão" },
    { key: "moduleB", label: "Módulo B · Captação" },
    { key: "sponsorView", label: "Incentivador" },
  ];
  return (
    <header className="sticky top-0 z-40">
      <div className="h-14 glass-hi border-b" style={{ borderColor: COLORS.border }}>
        <div className="h-full max-w-[1440px] mx-auto px-6 flex items-center gap-6">
          <button onClick={() => { resetJourney(); setScreen("landing"); }} className="shrink-0">
            <Logo />
          </button>
          <nav className="hidden lg:flex items-center gap-1.5">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => setScreen(l.key)}
                className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors ${
                  screen === l.key ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
                style={
                  screen === l.key
                    ? {
                        background: "rgba(59,130,246,0.14)",
                        boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset",
                      }
                    : undefined
                }
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Chip tone="blue" icon={<Signal size={12} />}>Ambiente demo · Lei de Incentivo ao Esporte</Chip>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold"
              style={{ background: "rgba(59,130,246,0.15)", boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset", color: "#BFDBFE" }}
              title="Instituto Movimento Urbano"
            >
              IM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

/* =========================================================================
   AI Copilot — persistent right-side panel
   ========================================================================= */
const AiCopilot = ({ open, setOpen, context, score }) => {
  const contextual = {
    moduleA: {
      title: "Copiloto de estruturação",
      messages: [
        "Detectei que a justificativa ainda não cita dados de vulnerabilidade da região. Sugiro usar o IDHM da UDH correspondente.",
        "Para o indicador de evasão escolar, sugiro meta realista de redução de 12% no 12º mês.",
        "O orçamento está com 18% de pessoal — dentro do esperado para projetos educacionais desta dimensão.",
      ],
    },
    sliBridge: {
      title: "Copiloto de submissão",
      messages: [
        "Documentação do proponente validada. CNPJ ativo e certidões regulares.",
        "Campos obrigatórios do SLI preenchidos. Aguardando análise técnica.",
      ],
    },
    moduleB: {
      title: "Copiloto de captação",
      messages: [
        "Encontrei 6 incentivadores com aderência alta ao seu projeto.",
        "Grupo Meridian tem 82% de histórico de conversão em projetos semelhantes.",
        "Recomendo priorizar aportes únicos para reduzir tempo de captação em ~34%.",
      ],
    },
    sponsorView: {
      title: "Copiloto do incentivador",
      messages: [
        "Selecionei 3 projetos com aderência >90% à sua tese ESG declarada.",
        "O projeto 'Arena Jovem' apresenta risco operacional baixo e impacto mensurável.",
      ],
    },
    approved: {
      title: "Copiloto de captação",
      messages: ["Projeto aprovado. Já preparei o perfil público para o matching inteligente."],
    },
    deposit: {
      title: "Copiloto de aporte",
      messages: ["Aporte confirmado. Gerando recibo oficial e notificando o proponente."],
    },
    success: {
      title: "Copiloto INCENTIVA",
      messages: ["O recurso foi creditado. Vou continuar acompanhando a execução do projeto."],
    },
    gateway: {
      title: "Como posso te apoiar?",
      messages: ["Responda à pergunta ao lado para eu montar a jornada ideal para o seu caso."],
    },
    landing: { title: "INCENTIVA", messages: ["Começa quando você quiser."] },
  }[context] || { title: "Copiloto", messages: [] };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 bottom-6 right-6 group"
        aria-label="Abrir copiloto IA"
      >
        <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(59,130,246,0.35)" }} />
        <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(16,217,163,0.35)", animationDelay: "0.6s" }} />
        <span
          className="relative inline-flex items-center gap-2 pl-3 pr-4 py-3 rounded-full font-medium text-sm"
          style={{
            background: "linear-gradient(135deg, #1E293B, #0F172A)",
            boxShadow: "0 10px 30px -10px rgba(59,130,246,0.7), 0 0 0 1px rgba(59,130,246,0.45) inset",
            color: "#F1F5F9",
          }}
        >
          <span
            className="w-7 h-7 rounded-full inline-flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3B82F6, #10D9A3)", color: "#0B111F" }}
          >
            <Sparkles size={14} strokeWidth={2.5} />
          </span>
          Copiloto IA
        </span>
      </button>

      {open && (
        <aside
          className="fixed z-50 right-4 top-[72px] bottom-4 w-[380px] rounded-2xl glass-hi flex flex-col overflow-hidden fade-up"
          style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,130,246,0.2) inset" }}
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: COLORS.border }}>
            <div
              className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #3B82F6, #10D9A3)" }}
            >
              <Sparkles size={16} color="#0B111F" strokeWidth={2.5} />
              <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(59,130,246,0.4)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-100 truncate">{contextual.title}</div>
              <div className="text-[11px] text-slate-400">Copiloto de estruturação e captação</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-200">
              <X size={16} />
            </button>
          </div>

          {typeof score === "number" && (
            <div className="px-4 py-3 border-b" style={{ borderColor: COLORS.border }}>
              <div className="flex items-center gap-3">
                <ScoreRing value={score} size={60} stroke={6} label={null} />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-slate-400">Score de prontidão</div>
                  <div className="text-[13px] text-slate-200 mt-0.5">
                    {score >= 80 ? "Apto para submissão" : score >= 60 ? "Quase lá — ajustes mínimos" : "Em estruturação"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-auto thin-scroll p-4 space-y-3">
            {contextual.messages.map((m, i) => (
              <div key={i} className="flex gap-2.5 fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#1D4ED8,#0B8E6B)" }}
                >
                  <Brain size={14} color="#E0F2FE" />
                </div>
                <div
                  className="ai-bubble relative rounded-xl rounded-tl-sm px-3.5 py-2.5 text-[13px] leading-relaxed text-slate-200"
                  style={{ background: "rgba(20,28,48,0.9)", boxShadow: "0 0 0 1px rgba(148,163,184,0.1) inset" }}
                >
                  {m}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pl-9">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Copiloto observando suas ações em tempo real
            </div>
          </div>

          <div className="p-3 border-t" style={{ borderColor: COLORS.border }}>
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(148,163,184,0.14) inset" }}
            >
              <MessageSquareText size={14} className="text-slate-400" />
              <input
                placeholder="Pergunte algo ao copiloto…"
                className="bg-transparent flex-1 text-[13px] text-slate-200 placeholder:text-slate-500 outline-none"
              />
              <button className="px-2.5 py-1 rounded-md text-[11px] font-medium" style={{ background: "rgba(59,130,246,0.2)", color: "#BFDBFE" }}>
                Enviar
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

/* =========================================================================
   SCREEN 1 — Landing page
   ========================================================================= */
const Landing = ({ go, setJourney }) => {
  return (
    <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 glow-blue" />
        <div className="absolute inset-0 glow-accent" />
        <TrajectoryBg />
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-20">
          <div className="fade-up">
            <Chip tone="accent" icon={<Dumbbell size={12} />}>
              Lei de Incentivo ao Esporte · plataforma inteligente
            </Chip>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 mt-8 items-center">
            <div className="lg:col-span-7">
              <h1
                className="font-display font-semibold text-[58px] leading-[1.02] tracking-tight text-white fade-up fade-up-1"
                style={{ textWrap: "balance" }}
              >
                Apoio inteligente,
                <br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(120deg, #60A5FA 10%, #10D9A3 55%, #F59E0B 95%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  do início ao recurso.
                </span>
              </h1>
              <p className="mt-6 text-slate-300 text-[17px] leading-relaxed max-w-[620px] fade-up fade-up-2">
                O INCENTIVA conduz proponentes e incentivadores ao longo de toda a jornada da Lei de Incentivo ao Esporte —
                da ideia estruturada ao recurso depositado — com uma IA copiloto que acompanha, qualifica e conecta.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3 fade-up fade-up-3">
                <Button
                  size="lg"
                  icon={<Rocket size={16} />}
                  iconRight={<ArrowRight size={16} />}
                  onClick={() => { setJourney({ hasProject: null, isApproved: null }); go("gateway"); }}
                >
                  Começar agora
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  icon={<FileText size={16} />}
                  onClick={() => { setJourney({ hasProject: true, isApproved: null }); go("gateway"); }}
                >
                  Já tenho projeto
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  icon={<Building2 size={16} />}
                  onClick={() => go("sponsorView")}
                >
                  Sou incentivador
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-5 max-w-[620px] fade-up fade-up-4">
                {[
                  { k: "R$ 420 Mi+", v: "em projetos apoiados" },
                  { k: "1.820", v: "projetos estruturados" },
                  { k: "94%", v: "de aderência média" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-xl p-4 glass"
                    style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.12) inset" }}
                  >
                    <div className="font-display text-2xl text-white font-semibold">{s.k}</div>
                    <div className="text-[12px] text-slate-400 mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — AI orbit / trajectory radar */}
            <div className="lg:col-span-5 fade-up fade-up-3">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* Jornada resumida — flow */}
      <section className="relative max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionLabel icon={<Compass size={12} />}>Fluxo do início ao recurso</SectionLabel>
            <h2 className="font-display text-3xl text-white font-semibold mt-2">Uma única trajetória, inteligência o tempo todo</h2>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <AiChip>IA em toda a jornada</AiChip>
          </div>
        </div>
        <JourneyRibbon />
      </section>

      {/* Dois módulos */}
      <section className="relative max-w-[1280px] mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-5">
          <ModuleCard
            tone="blue"
            chip="Módulo A"
            title="Incubação do Projeto"
            subtitle="Da ideia ao projeto pronto para submissão oficial."
            bullets={[
              "IA estrutura objetivo, justificativa, metas, orçamento e público.",
              "Score de prontidão em tempo real e checklist de maturidade.",
              "Validação técnica e organizacional do proponente.",
              "Preparação assistida para cadastro no SLI.",
            ]}
            icon={<Lightbulb size={20} />}
            cta="Explorar Módulo A"
            onCta={() => { setJourney({ hasProject: false, isApproved: null }); go("moduleA"); }}
          />
          <ModuleCard
            tone="accent"
            chip="Módulo B"
            title="Captação Inteligente"
            subtitle="Do projeto aprovado ao recurso depositado."
            bullets={[
              "IA analisa perfis de projeto e de incentivador e gera matching explicável.",
              "Score de aderência com fatores de compatibilidade visíveis.",
              "Experiência para o incentivador escolher, decidir e apoiar.",
              "Aporte simulado com comprovante, recibo e confirmação.",
            ]}
            icon={<Radar size={20} />}
            cta="Explorar Módulo B"
            onCta={() => { setJourney({ hasProject: true, isApproved: true }); go("moduleB"); }}
          />
        </div>
      </section>

      {/* IA como diferencial */}
      <section className="relative max-w-[1280px] mx-auto px-6 pb-20">
        <GlassCard className="lume relative overflow-hidden p-8 md:p-10">
          <div className="absolute inset-0 grid-bg-fine opacity-60" />
          <div className="absolute inset-0 glow-blue opacity-50" />
          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <SectionLabel icon={<Brain size={12} />}>IA Copiloto</SectionLabel>
              <h3 className="font-display text-[32px] text-white font-semibold mt-2 leading-tight">
                Uma IA que não deixa o proponente sozinho.
              </h3>
              <p className="text-slate-300 mt-4 max-w-[560px] leading-relaxed">
                Do primeiro rascunho ao recurso creditado, o copiloto lê, qualifica, sugere, explica e conecta. Toda recomendação
                mostra <em>por que</em> foi feita.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {[
                  { icon: <Wand2 size={14} />, t: "Estruturação assistida", d: "Sugere texto, aponta lacunas e orienta a completude." },
                  { icon: <Activity size={14} />, t: "Score de prontidão", d: "Mede e evolui a maturidade do projeto em tempo real." },
                  { icon: <Radar size={14} />, t: "Matching explicável", d: "Mostra os fatores que sustentam cada recomendação." },
                  { icon: <Shield size={14} />, t: "Acompanhamento contínuo", d: "Acompanha até o recurso chegar e a execução começar." },
                ].map((f) => (
                  <div key={f.t} className="flex gap-3 rounded-xl p-3.5 ring-soft">
                    <span
                      className="shrink-0 w-8 h-8 rounded-lg inline-flex items-center justify-center"
                      style={{ background: "rgba(59,130,246,0.15)", color: "#93C5FD", boxShadow: "0 0 0 1px rgba(59,130,246,0.3) inset" }}
                    >
                      {f.icon}
                    </span>
                    <div>
                      <div className="text-[13.5px] text-slate-100 font-medium">{f.t}</div>
                      <div className="text-[12px] text-slate-400 mt-0.5">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <MiniAiShowcase />
            </div>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t" style={{ borderColor: COLORS.border }}>
        <div className="max-w-[1280px] mx-auto px-6 py-8 flex items-center justify-between text-[12px] text-slate-500">
          <Logo size={22} />
          <div>© INCENTIVA · protótipo demonstrativo · Lei de Incentivo ao Esporte</div>
        </div>
      </footer>
    </main>
  );
};

const HeroVisual = () => (
  <div className="relative aspect-[5/4] rounded-3xl glass-hi overflow-hidden lume">
    <div className="absolute inset-0 grid-bg-fine opacity-80" />
    <div className="absolute inset-0 glow-blue" />
    {/* Radar rings */}
    <svg viewBox="0 0 500 400" className="absolute inset-0 w-full h-full">
      <defs>
        <radialGradient id="radarG" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="arcG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#10D9A3" />
        </linearGradient>
      </defs>
      <circle cx="250" cy="210" r="160" fill="url(#radarG)" />
      {[60, 100, 140, 180].map((r) => (
        <circle key={r} cx="250" cy="210" r={r} fill="none" stroke="rgba(148,163,184,0.16)" strokeDasharray="2 4" />
      ))}
      {/* quadra lines inspired */}
      <line x1="250" y1="30" x2="250" y2="390" stroke="rgba(148,163,184,0.1)" />
      <line x1="60" y1="210" x2="440" y2="210" stroke="rgba(148,163,184,0.1)" />
      {/* trajectory arcs */}
      <path
        d="M 80 340 C 180 220, 260 140, 420 80"
        fill="none"
        stroke="url(#arcG)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 80 340 C 180 220, 260 140, 420 80"
        fill="none"
        stroke="url(#arcG)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* nodes on the arc */}
      {[
        { cx: 80, cy: 340, t: "Ideia" },
        { cx: 178, cy: 232, t: "Estruturação" },
        { cx: 260, cy: 160, t: "Aprovação" },
        { cx: 340, cy: 120, t: "Captação" },
        { cx: 420, cy: 80, t: "Recurso" },
      ].map((p, i) => (
        <g key={p.t}>
          <circle cx={p.cx} cy={p.cy} r="7" fill="#0B111F" stroke="url(#arcG)" strokeWidth="2.5" />
          <text x={p.cx} y={p.cy - 14} textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="Manrope, sans-serif">
            {p.t}
          </text>
        </g>
      ))}
      {/* scanning sweep */}
      <g className="spin-slow" style={{ transformOrigin: "250px 210px" }}>
        <line x1="250" y1="210" x2="250" y2="50" stroke="rgba(59,130,246,0.55)" strokeWidth="1.2" />
      </g>
    </svg>

    {/* Info pods */}
    <div className="absolute top-5 left-5 glass rounded-xl px-3 py-2 text-[11.5px] text-slate-200 flex items-center gap-2 fade-up fade-up-2">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Copiloto IA ativo
    </div>
    <div className="absolute bottom-5 left-5 glass rounded-xl px-3 py-2 text-[11.5px] text-slate-300 fade-up fade-up-4">
      Score de prontidão <span className="text-white font-semibold ml-1">88</span>
    </div>
    <div className="absolute top-5 right-5 glass rounded-xl px-3 py-2 text-[11.5px] text-slate-300 fade-up fade-up-3">
      Matching aderência <span className="text-emerald-300 font-semibold ml-1">94%</span>
    </div>
    <div className="absolute bottom-5 right-5 glass rounded-xl px-3 py-2 text-[11.5px] text-slate-300 fade-up fade-up-5">
      Recurso previsto <span className="text-amber-300 font-semibold ml-1">{BRL(780000)}</span>
    </div>
  </div>
);

const JourneyRibbon = () => {
  const nodes = [
    { k: "Ideia", icon: <Lightbulb size={14} /> },
    { k: "Incubação (IA)", icon: <Wand2 size={14} /> },
    { k: "Submissão SLI", icon: <Landmark size={14} /> },
    { k: "Aprovação", icon: <CheckCircle2 size={14} /> },
    { k: "Matching (IA)", icon: <Radar size={14} /> },
    { k: "Aporte", icon: <Wallet size={14} /> },
    { k: "Execução", icon: <Trophy size={14} /> },
  ];
  return (
    <div className="relative glass rounded-2xl p-5 overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-50" />
      <div className="relative flex items-center gap-3 overflow-x-auto thin-scroll">
        {nodes.map((n, i) => (
          <React.Fragment key={n.k}>
            <div className="shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl ring-soft bg-slate-900/60">
              <span
                className="w-7 h-7 rounded-lg inline-flex items-center justify-center shrink-0"
                style={{
                  background: i === 1 || i === 4 ? "rgba(59,130,246,0.18)" : "rgba(148,163,184,0.1)",
                  color: i === 1 || i === 4 ? "#93C5FD" : "#CBD5E1",
                  boxShadow: i === 1 || i === 4 ? "0 0 0 1px rgba(59,130,246,0.4) inset" : "0 0 0 1px rgba(148,163,184,0.14) inset",
                }}
              >
                {n.icon}
              </span>
              <div className="text-[12.5px] text-slate-200 font-medium whitespace-nowrap">{n.k}</div>
            </div>
            {i < nodes.length - 1 && (
              <div className="shrink-0">
                <svg width="44" height="10" viewBox="0 0 44 10">
                  <line x1="0" y1="5" x2="44" y2="5" stroke="rgba(148,163,184,0.3)" strokeDasharray="3 4" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ModuleCard = ({ tone = "blue", chip, title, subtitle, bullets, icon, cta, onCta }) => {
  const color = tone === "blue" ? COLORS.primary : COLORS.accent;
  return (
    <GlassCard hi className="relative overflow-hidden p-7 lume">
      <div
        className="absolute -top-28 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40"
        style={{ background: color }}
      />
      <div className="relative flex items-center gap-2 mb-3">
        <Chip tone={tone === "blue" ? "blue" : "accent"}>{chip}</Chip>
        <AiChip>IA integrada</AiChip>
      </div>
      <div className="relative flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: tone === "blue" ? "rgba(59,130,246,0.14)" : "rgba(16,217,163,0.14)",
            color: tone === "blue" ? "#93C5FD" : "#6EE7B7",
            boxShadow: `0 0 0 1px ${tone === "blue" ? "rgba(59,130,246,0.4)" : "rgba(16,217,163,0.4)"} inset`,
          }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-display text-[26px] text-white font-semibold leading-tight">{title}</h3>
          <p className="text-slate-300 mt-1.5 text-[14px]">{subtitle}</p>
        </div>
      </div>
      <ul className="mt-5 space-y-2.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-[13.5px] text-slate-300">
            <Check size={15} className="mt-0.5 shrink-0" style={{ color: tone === "blue" ? "#60A5FA" : "#34D399" }} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button
          variant={tone === "blue" ? "primary" : "accent"}
          iconRight={<ArrowRight size={16} />}
          onClick={onCta}
        >
          {cta}
        </Button>
      </div>
    </GlassCard>
  );
};

const MiniAiShowcase = () => (
  <div className="relative rounded-2xl glass p-5 overflow-hidden">
    <div className="absolute inset-0 grid-bg-fine opacity-60" />
    <div className="relative">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#3B82F6,#10D9A3)" }}
        >
          <Sparkles size={14} color="#0B111F" strokeWidth={2.5} />
        </div>
        <div className="text-[12.5px] text-slate-300">Copiloto IA</div>
        <span className="ml-auto text-[10.5px] text-slate-500 tracking-widest uppercase">ao vivo</span>
      </div>
      <div className="space-y-2.5">
        {[
          "Seu projeto tem 88/100 de prontidão — apto para submissão oficial.",
          "Identifiquei 6 incentivadores com aderência alta à sua tese.",
          "Melhor aderência: Grupo Meridian, 94/100.",
        ].map((t, i) => (
          <div
            key={i}
            className="ai-bubble rounded-xl rounded-tl-sm px-3.5 py-2.5 text-[12.5px] text-slate-200 fade-up"
            style={{ background: "rgba(15,23,42,0.9)", boxShadow: "0 0 0 1px rgba(148,163,184,0.1) inset", animationDelay: `${i * 120}ms` }}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { k: "Prontidão", v: 88 },
          { k: "Aderência", v: 94 },
          { k: "Risco", v: 12, tone: "danger" },
        ].map((s) => (
          <div key={s.k} className="rounded-lg p-2.5 ring-soft">
            <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">{s.k}</div>
            <div className="font-display text-lg text-white font-semibold mt-0.5">{s.v}</div>
            <Meter value={s.v} tone={s.tone === "danger" ? "gold" : "primary"} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* =========================================================================
   SCREEN 2 — Gateway (decision)
   ========================================================================= */
const Gateway = ({ go, journey, setJourney }) => {
  const step = journey.hasProject === null ? 1 : journey.isApproved === null ? 2 : 3;
  return (
    <main className="relative min-h-[calc(100vh-56px)] flex items-center">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 glow-blue" />
      <TrajectoryBg variant="b" />
      <div className="relative max-w-[1080px] mx-auto px-6 py-16 w-full">
        <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <span className={step >= 1 ? "text-blue-300" : ""}>01. Situação</span>
          <span className="text-slate-600">/</span>
          <span className={step >= 2 ? "text-blue-300" : "text-slate-500"}>02. Maturidade</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-500">03. Jornada</span>
        </div>

        {step === 1 && (
          <div className="fade-up">
            <h1 className="font-display text-[44px] text-white font-semibold tracking-tight">Você já possui projeto?</h1>
            <p className="text-slate-300 mt-3 max-w-[560px]">
              Sua resposta define a jornada mais adequada dentro do INCENTIVA. Em qualquer caminho, a IA acompanha você o
              tempo todo — da estruturação ao recurso.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8 max-w-[860px]">
              <GatewayCard
                chip="Módulo A"
                chipTone="blue"
                title="Ainda não tenho projeto"
                body="Vou te ajudar a sair da ideia e chegar a um projeto estruturado, com orçamento e metas, pronto para submissão oficial."
                hints={["IA estrutura objetivo, metas, orçamento e público", "Score de prontidão em tempo real", "Preparação assistida para o SLI"]}
                onClick={() => setJourney((j) => ({ ...j, hasProject: false }))}
                icon={<Lightbulb size={22} />}
              />
              <GatewayCard
                chip="Já tenho projeto"
                chipTone="accent"
                title="Já possuo um projeto"
                body="Vou identificar em que ponto você está — se precisa qualificar antes ou se já está pronto para captar com matching inteligente."
                hints={["IA revisa, qualifica e complementa", "Avaliação de prontidão para submissão", "Ponte direta para a captação"]}
                onClick={() => setJourney((j) => ({ ...j, hasProject: true }))}
                icon={<FileText size={22} />}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-up">
            <h1 className="font-display text-[44px] text-white font-semibold tracking-tight">
              O projeto já está <span style={{ color: "#6EE7B7" }}>aprovado</span> e apto para captação?
            </h1>
            <p className="text-slate-300 mt-3 max-w-[580px]">
              Projetos aprovados pelo órgão gestor da Lei de Incentivo ao Esporte seguem direto para o Módulo B — Captação
              Inteligente. Se ainda não estiver, a IA vai te ajudar a qualificar antes.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8 max-w-[860px]">
              <GatewayCard
                chip="Qualificar antes"
                chipTone="blue"
                title="Ainda não está aprovado"
                body="A IA revisa seu projeto, aponta lacunas, qualifica o conteúdo e prepara o envio formal para análise."
                hints={["Revisão inteligente de texto e estrutura", "Score de prontidão atualizado", "Empacotamento para submissão"]}
                onClick={() => { setJourney((j) => ({ ...j, isApproved: false })); go("moduleA"); }}
                icon={<Wand2 size={22} />}
              />
              <GatewayCard
                chip="Apto para captação"
                chipTone="accent"
                title="Sim, já está apto"
                body="Ótimo — sigo direto para o Módulo B. A IA fará o matching com os incentivadores mais aderentes ao seu projeto."
                hints={["Análise do perfil do projeto", "Matching explicável por fatores", "Fluxo completo até o aporte"]}
                onClick={() => { setJourney((j) => ({ ...j, isApproved: true })); go("approved"); }}
                icon={<Rocket size={22} />}
              />
            </div>
            <div className="mt-6">
              <button
                className="text-[12.5px] text-slate-400 hover:text-slate-200 inline-flex items-center gap-1.5"
                onClick={() => setJourney((j) => ({ ...j, hasProject: null }))}
              >
                <ArrowLeft size={13} /> voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const GatewayCard = ({ chip, chipTone, title, body, hints, onClick, icon }) => (
  <button
    onClick={onClick}
    className="text-left pick-card rounded-2xl p-6 glass relative overflow-hidden group fr"
  >
    <div className="flex items-center gap-2">
      <Chip tone={chipTone}>{chip}</Chip>
      <AiChip>IA</AiChip>
    </div>
    <div className="mt-5 flex items-start gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: chipTone === "blue" ? "rgba(59,130,246,0.14)" : "rgba(16,217,163,0.14)",
          color: chipTone === "blue" ? "#93C5FD" : "#6EE7B7",
          boxShadow: `0 0 0 1px ${chipTone === "blue" ? "rgba(59,130,246,0.4)" : "rgba(16,217,163,0.4)"} inset`,
        }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-display text-2xl text-white font-semibold leading-tight">{title}</h3>
        <p className="text-slate-300 text-[13.5px] mt-1.5">{body}</p>
      </div>
    </div>
    <ul className="mt-5 space-y-1.5">
      {hints.map((h) => (
        <li key={h} className="flex gap-2 text-[12.5px] text-slate-400">
          <CircleDot size={12} className="mt-1 text-slate-500" /> {h}
        </li>
      ))}
    </ul>
    <div className="mt-5 flex items-center gap-1.5 text-[12.5px] text-slate-300 group-hover:text-white">
      escolher este caminho <ArrowRight size={14} />
    </div>
  </button>
);

/* =========================================================================
   SCREEN 3 — Module A (Incubação) wizard
   ========================================================================= */
const MODULE_A_STEPS = [
  { k: "Ideia", icon: <Lightbulb size={14} /> },
  { k: "Objetivo", icon: <Target size={14} /> },
  { k: "Justificativa", icon: <Quote size={14} /> },
  { k: "Metas", icon: <BarChart3 size={14} /> },
  { k: "Orçamento", icon: <Wallet size={14} /> },
  { k: "Público", icon: <Users size={14} /> },
  { k: "Validação", icon: <Shield size={14} /> },
  { k: "Revisão", icon: <CheckCircle2 size={14} /> },
];

const ModuleA = ({ go }) => {
  const [step, setStep] = useState(0);
  const score = useMemo(() => {
    // score grows with progress — mimics real-time prontidão
    const base = Math.round(((step + 1) / MODULE_A_STEPS.length) * 96);
    return Math.min(96, base + 6);
  }, [step]);

  return (
    <main className="relative">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 glow-blue" />
      <div className="relative max-w-[1320px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <SectionLabel icon={<Lightbulb size={12} />}>Módulo A · Incubação do Projeto</SectionLabel>
            <h1 className="font-display text-[30px] text-white font-semibold mt-1">
              {MOCK.projeto.nome}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Chip tone="blue" icon={<Signal size={12} />}>Rascunho · salvamento automático</Chip>
            <Chip tone="accent" icon={<Sparkles size={12} />}>IA acompanhando</Chip>
          </div>
        </div>

        {/* Stepper */}
        <div className="glass rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 overflow-x-auto thin-scroll">
            {MODULE_A_STEPS.map((s, i) => {
              const state = i < step ? "done" : i === step ? "active" : "todo";
              return (
                <button
                  key={s.k}
                  onClick={() => setStep(i)}
                  className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: state === "active" ? "rgba(59,130,246,0.16)" : state === "done" ? "rgba(16,217,163,0.1)" : "rgba(30,41,59,0.5)",
                    boxShadow: `0 0 0 1px ${
                      state === "active" ? "rgba(59,130,246,0.45)" : state === "done" ? "rgba(16,217,163,0.35)" : "rgba(148,163,184,0.14)"
                    } inset`,
                    color: state === "todo" ? "#94A3B8" : "#E2E8F0",
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-semibold"
                    style={{
                      background: state === "done" ? "rgba(16,217,163,0.2)" : state === "active" ? "rgba(59,130,246,0.22)" : "rgba(148,163,184,0.1)",
                      color: state === "done" ? "#6EE7B7" : state === "active" ? "#BFDBFE" : "#94A3B8",
                    }}
                  >
                    {state === "done" ? <Check size={12} /> : i + 1}
                  </span>
                  <span className="text-[12.5px] font-medium whitespace-nowrap">{s.k}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3">
            <Meter value={(step / (MODULE_A_STEPS.length - 1)) * 100} />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Form area */}
          <div className="lg:col-span-8 space-y-5">
            <StepContent step={step} />
            <div className="flex items-center justify-between">
              <Button variant="ghost" icon={<ArrowLeft size={14} />} onClick={() => setStep((s) => Math.max(0, s - 1))}>
                Voltar
              </Button>
              {step < MODULE_A_STEPS.length - 1 ? (
                <Button iconRight={<ArrowRight size={14} />} onClick={() => setStep((s) => Math.min(MODULE_A_STEPS.length - 1, s + 1))}>
                  Avançar
                </Button>
              ) : (
                <Button variant="accent" icon={<Rocket size={14} />} iconRight={<ArrowRight size={14} />} onClick={() => go("sliBridge")}>
                  Enviar para análise oficial
                </Button>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4 space-y-5">
            <GlassCard hi className="p-5">
              <div className="flex items-center gap-4">
                <ScoreRing value={score} size={100} stroke={9} />
                <div>
                  <div className="text-[11px] tracking-widest uppercase text-slate-400">Score de prontidão</div>
                  <div className="text-[14px] text-slate-100 font-medium mt-1">
                    {score >= 80 ? "Apto para submissão" : score >= 60 ? "Ajustes finais" : "Em estruturação"}
                  </div>
                  <div className="text-[12px] text-slate-400 mt-1">Atualizado em tempo real pela IA</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  { k: "Completude", v: Math.min(100, score + 4), tone: "primary" },
                  { k: "Coerência", v: Math.min(100, score - 2), tone: "primary" },
                  { k: "Orçamento", v: Math.min(100, score + 1), tone: "accent" },
                  { k: "Evidências", v: Math.max(40, score - 15), tone: "gold" },
                ].map((m) => (
                  <div key={m.k} className="rounded-lg p-2.5 ring-soft">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-widest">
                      <span>{m.k}</span>
                      <span className="text-slate-200">{m.v}</span>
                    </div>
                    <div className="mt-1.5">
                      <Meter value={m.v} tone={m.tone} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-2">
                <AiChip>Sugestões IA</AiChip>
                <span className="text-[11px] text-slate-500 ml-auto">para o passo atual</span>
              </div>
              <div className="mt-4 space-y-3">
                {stepSuggestions[step].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 text-[12.5px] text-slate-200"
                    style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(59,130,246,0.22) inset" }}
                  >
                    <div className="flex items-center gap-2 mb-1 text-blue-200 font-medium text-[11.5px]">
                      <Lightbulb size={12} /> {s.title}
                    </div>
                    <div className="text-slate-300">{s.body}</div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" variant="secondary">Aplicar</Button>
                      <Button size="sm" variant="ghost">Ver detalhes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AiChip>Checklist</AiChip>
                <span className="text-[11px] text-slate-500 ml-auto">{Math.min(8, step + 2)}/8</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Identificação do proponente",
                  "Descrição do projeto",
                  "Objetivos e justificativa",
                  "Metas e indicadores",
                  "Orçamento analítico",
                  "Cronograma de execução",
                  "Plano de público e acesso",
                  "Documentos do proponente",
                ].map((c, i) => {
                  const done = i <= Math.min(7, step);
                  return (
                    <li key={c} className="flex items-center gap-2.5 text-[13px]">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{
                          background: done ? "rgba(16,217,163,0.18)" : "rgba(148,163,184,0.1)",
                          boxShadow: `0 0 0 1px ${done ? "rgba(16,217,163,0.5)" : "rgba(148,163,184,0.25)"} inset`,
                        }}
                      >
                        {done ? <Check size={10} color="#6EE7B7" /> : null}
                      </span>
                      <span className={done ? "text-slate-200" : "text-slate-400"}>{c}</span>
                    </li>
                  );
                })}
              </ul>
            </GlassCard>
          </aside>
        </div>
      </div>
    </main>
  );
};

const stepSuggestions = [
  [
    { title: "Ideia mais específica", body: "Considere delimitar faixa etária e manifestação esportiva — ajuda o enquadramento na Lei." },
    { title: "Referência de contexto", body: "Relacionar com dado do IDHM da UDH fortalece a proposta." },
  ],
  [
    { title: "Objetivo mensurável", body: "Reescreva usando verbo de resultado + quantidade + prazo." },
    { title: "Evite objetivos múltiplos", body: "Um objetivo geral claro e 3–4 específicos funcionam melhor na avaliação técnica." },
  ],
  [
    { title: "Base factual", body: "Cite ao menos dois indicadores públicos (IBGE, UNESCO ou Censo Esportivo)." },
    { title: "Causa e consequência", body: "Conecte o problema ao impacto esperado do projeto." },
  ],
  [
    { title: "Meta SMART", body: "Transforme 'formar jovens' em '340 beneficiários ativos em 12 meses, com 70% de retenção'." },
    { title: "Indicadores de processo + resultado", body: "Combine frequência de treinos + mudança em índices antropométricos." },
  ],
  [
    { title: "Distribuição saudável", body: "Projetos educacionais típicos alocam 45–55% em pessoal, 15–25% em material." },
    { title: "Contrapartida clara", body: "Inclua contrapartida social explícita — aumenta o score de aderência com incentivadores." },
  ],
  [
    { title: "Plano de acesso", body: "Adicione critério de seleção dos beneficiários com foco em vulnerabilidade." },
    { title: "Equidade de gênero", body: "Inclua meta mínima de 50% de participantes meninas — alinhado à política pública." },
  ],
  [
    { title: "Documentos do proponente", body: "Certidões negativas (federal, estadual, municipal, FGTS) já atualizadas." },
    { title: "Experiência comprovada", body: "Anexe 3 projetos anteriores com resultados quantitativos." },
  ],
  [
    { title: "Tudo pronto para submissão", body: "Empacotei seu projeto no formato do SLI. Você pode enviar para análise oficial." },
  ],
];

const StepContent = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Qual é a ideia inicial?</h2>
          <p className="text-slate-400 text-[13px] mt-1">
            Descreva em linhas gerais — a IA vai estruturar, sugerir reformulações e apontar lacunas.
          </p>
          <div
            className="mt-4 rounded-xl p-4 text-[14px] text-slate-200 leading-relaxed"
            style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(148,163,184,0.14) inset", minHeight: 160 }}
          >
            Oferecer formação esportiva em basquete para crianças e adolescentes em situação de vulnerabilidade no
            Aglomerado da Serra, em Belo Horizonte, promovendo cidadania, permanência escolar e hábitos saudáveis.
            <br />
            <br />
            <span className="text-slate-500">↳ IA: sugerida adequação ao enquadramento "Esporte Educacional".</span>
          </div>
          <div className="flex gap-2 mt-3">
            <Chip tone="blue" icon={<Wand2 size={12} />}>Reescrever com IA</Chip>
            <Chip tone="accent" icon={<Sparkles size={12} />}>Propor estrutura</Chip>
            <Chip icon={<Lightbulb size={12} />}>Ver exemplos</Chip>
          </div>
        </GlassCard>
      );
    case 1:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Objetivo geral e específicos</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(148,163,184,0.14) inset" }}>
              <div className="text-[11.5px] uppercase tracking-widest text-slate-400">Objetivo geral</div>
              <div className="text-slate-200 text-[14px] mt-2 leading-relaxed">
                Oferecer formação esportiva contínua em basquete para 340 crianças e adolescentes em situação de
                vulnerabilidade em 18 meses.
              </div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(148,163,184,0.14) inset" }}>
              <div className="text-[11.5px] uppercase tracking-widest text-slate-400">Objetivos específicos</div>
              <ul className="text-slate-200 text-[13.5px] mt-2 space-y-1.5 list-disc pl-4">
                <li>Implantar 4 núcleos permanentes de treino.</li>
                <li>Reduzir evasão escolar entre beneficiários em 12%.</li>
                <li>Realizar 2 torneios comunitários anuais.</li>
                <li>Capacitar 12 educadores esportivos locais.</li>
              </ul>
            </div>
          </div>
          <div
            className="mt-4 ai-bubble rounded-xl px-4 py-3 text-[13px] text-blue-100"
            style={{ background: "rgba(59,130,246,0.1)", boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset" }}
          >
            <span className="font-medium text-blue-200">IA · </span>
            Os objetivos estão no formato SMART e conectados à justificativa. Pontuação atribuída: <strong>92/100</strong>.
          </div>
        </GlassCard>
      );
    case 2:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Justificativa</h2>
          <p className="text-slate-400 text-[13px] mt-1">Contexto, base factual e relevância.</p>
          <div className="mt-4 rounded-xl p-4 text-[14px] text-slate-200 leading-relaxed"
            style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(148,163,184,0.14) inset" }}>
            O Aglomerado da Serra concentra IDHM inferior à média municipal de Belo Horizonte e apresenta evasão
            escolar superior à taxa estadual no Ensino Fundamental II. O acesso ao esporte educacional é limitado
            pela escassez de equipamentos públicos. O projeto propõe intervenção estruturada em 4 núcleos…
          </div>
          <div className="mt-3 grid md:grid-cols-3 gap-3">
            {[
              { k: "Dados públicos citados", v: 3, tone: "primary" },
              { k: "Densidade argumentativa", v: 82, tone: "accent" },
              { k: "Conexão com objetivos", v: 95, tone: "primary" },
            ].map((c) => (
              <div key={c.k} className="rounded-xl p-3 ring-soft">
                <div className="text-[11px] uppercase tracking-widest text-slate-400">{c.k}</div>
                <div className="font-display text-xl text-white font-semibold mt-1">{c.v}</div>
                <Meter value={typeof c.v === "number" ? (c.v > 10 ? c.v : c.v * 10) : 0} tone={c.tone} />
              </div>
            ))}
          </div>
        </GlassCard>
      );
    case 3:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Metas e indicadores</h2>
          <div className="mt-4 space-y-3">
            {[
              { g: "Beneficiários ativos", t: 340, u: "crianças e adolescentes", p: 78 },
              { g: "Frequência semanal mínima", t: 3, u: "treinos/semana", p: 100 },
              { g: "Retenção no 12º mês", t: 70, u: "%", p: 55 },
              { g: "Educadores capacitados", t: 12, u: "profissionais", p: 60 },
              { g: "Torneios comunitários", t: 2, u: "por ano", p: 100 },
            ].map((m) => (
              <div key={m.g} className="rounded-xl p-4 flex items-center gap-4" style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(148,163,184,0.14) inset" }}>
                <div className="flex-1">
                  <div className="text-[13px] text-slate-200 font-medium">{m.g}</div>
                  <div className="text-[11.5px] text-slate-400">Projeção pela IA · viabilidade {m.p}%</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-[22px] text-white font-semibold leading-none">{m.t}<span className="text-slate-400 text-[12px] font-normal ml-1">{m.u}</span></div>
                  <div className="w-32 mt-2"><Meter value={m.p} /></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      );
    case 4:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Orçamento analítico</h2>
          <div className="mt-4 grid md:grid-cols-5 gap-3 text-[12.5px]">
            {[
              { k: "Pessoal", v: 405600, p: 52, tone: "primary" },
              { k: "Material esportivo", v: 156000, p: 20, tone: "accent" },
              { k: "Infraestrutura", v: 78000, p: 10, tone: "primary" },
              { k: "Gestão e M&A", v: 93600, p: 12, tone: "accent" },
              { k: "Divulgação", v: 46800, p: 6, tone: "gold" },
            ].map((b) => (
              <div key={b.k} className="rounded-xl p-3 ring-soft">
                <div className="text-[10.5px] uppercase tracking-widest text-slate-400">{b.k}</div>
                <div className="font-display text-[18px] text-white font-semibold mt-1">{BRL(b.v)}</div>
                <div className="text-[11px] text-slate-400">{b.p}% do total</div>
                <div className="mt-2"><Meter value={b.p * 4} tone={b.tone} /></div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between rounded-xl p-4" style={{ background: "rgba(59,130,246,0.08)", boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset" }}>
            <div>
              <div className="text-[12px] uppercase tracking-widest text-blue-300">Total pleiteado</div>
              <div className="font-display text-[28px] text-white font-semibold">{BRL(780000)}</div>
            </div>
            <AiChip>Distribuição dentro do padrão recomendado</AiChip>
          </div>
        </GlassCard>
      );
    case 5:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Público e acesso</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-3">
            {[
              { k: "Faixa etária", v: "8 — 17 anos", i: <Users size={14} /> },
              { k: "Território", v: "Aglomerado da Serra", i: <MapPin size={14} /> },
              { k: "Frequência", v: "3x por semana", i: <Calendar size={14} /> },
              { k: "Beneficiários diretos", v: "340 pessoas", i: <Users size={14} /> },
              { k: "Equidade de gênero", v: "50% meninas", i: <Activity size={14} /> },
              { k: "Critério de acesso", v: "Cadastro + matrícula regular", i: <Shield size={14} /> },
            ].map((p) => (
              <div key={p.k} className="rounded-xl p-4 ring-soft">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400">
                  <span className="text-slate-500">{p.i}</span>
                  {p.k}
                </div>
                <div className="font-display text-[17px] text-white font-semibold mt-1.5">{p.v}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      );
    case 6:
      return (
        <GlassCard hi className="p-6">
          <h2 className="font-display text-[22px] text-white font-semibold">Validação do proponente</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {[
              { k: "CNPJ ativo", v: MOCK.proponente.cnpj, s: "ok" },
              { k: "Atuação na área esportiva", v: `Desde ${MOCK.proponente.desde}`, s: "ok" },
              { k: "Certidões negativas", v: "Regulares", s: "ok" },
              { k: "Estatuto compatível", v: "OK", s: "ok" },
              { k: "Experiência (projetos anteriores)", v: "6 concluídos", s: "ok" },
              { k: "Certificação estadual", v: "Pendente — anexar", s: "warn" },
            ].map((v) => (
              <div key={v.k} className="rounded-xl p-4 flex items-center justify-between ring-soft">
                <div>
                  <div className="text-[11.5px] uppercase tracking-widest text-slate-400">{v.k}</div>
                  <div className="text-[14px] text-slate-200 mt-1">{v.v}</div>
                </div>
                <Chip tone={v.s === "ok" ? "accent" : "gold"} icon={v.s === "ok" ? <Check size={12} /> : <AlertCircle size={12} />}>
                  {v.s === "ok" ? "Validado" : "Pendente"}
                </Chip>
              </div>
            ))}
          </div>
        </GlassCard>
      );
    case 7:
      return (
        <GlassCard hi className="p-6 lume">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-[22px] text-white font-semibold">Pronto para submissão oficial</h2>
              <p className="text-slate-400 text-[13px] mt-1">Seu projeto está estruturado e validado. Envie para análise pelo órgão gestor.</p>
            </div>
            <div className="flex items-center gap-3">
              <ScoreRing value={92} size={76} stroke={7} />
              <div>
                <div className="text-[11px] uppercase tracking-widest text-slate-400">Prontidão</div>
                <div className="text-emerald-300 text-[14px] font-medium">Apto para submissão</div>
              </div>
            </div>
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-3 text-[13px]">
            <div className="rounded-xl p-4 ring-soft">
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Projeto</div>
              <div className="text-slate-100 mt-1">{MOCK.projeto.nome}</div>
              <div className="text-slate-400 text-[12px] mt-2">{MOCK.projeto.manifestacao} · {MOCK.projeto.dimensao}</div>
            </div>
            <div className="rounded-xl p-4 ring-soft">
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Valor pleiteado</div>
              <div className="font-display text-white text-xl font-semibold mt-1">{BRL(MOCK.projeto.valor)}</div>
              <div className="text-slate-400 text-[12px] mt-2">Duração: {MOCK.projeto.duracao}</div>
            </div>
            <div className="rounded-xl p-4 ring-soft">
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Beneficiários</div>
              <div className="font-display text-white text-xl font-semibold mt-1">{MOCK.projeto.beneficiarios}</div>
              <div className="text-slate-400 text-[12px] mt-2">{MOCK.projeto.local}</div>
            </div>
          </div>
        </GlassCard>
      );
    default:
      return null;
  }
};

/* =========================================================================
   SCREEN 4 — SLI Bridge (submission simulation)
   ========================================================================= */
const SLI_STAGES = [
  { k: "Cadastro do proponente", d: "Validação de dados e documentos institucionais", icon: <Building2 size={14} /> },
  { k: "Cadastro do projeto no SLI", d: "Empacotamento do projeto no padrão oficial", icon: <FileText size={14} /> },
  { k: "Análise técnica", d: "Avaliação pelo corpo técnico do órgão gestor", icon: <Eye size={14} /> },
  { k: "Aprovação oficial", d: "Emissão de portaria e habilitação para captação", icon: <Award size={14} /> },
];

const SliBridge = ({ go }) => {
  const [active, setActive] = useState(2);
  useEffect(() => {
    // simulate progress
    const t = setInterval(() => setActive((s) => (s < SLI_STAGES.length - 1 ? s + 1 : s)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <main className="relative">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 glow-blue" />
      <div className="relative max-w-[1180px] mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-2">
          <Chip tone="blue" icon={<Landmark size={12} />}>Submissão oficial · SLI (simulado)</Chip>
          <AiChip>IA monitorando tramitação</AiChip>
        </div>
        <h1 className="font-display text-[32px] text-white font-semibold mt-2">
          Levando seu projeto à análise oficial
        </h1>
        <p className="text-slate-400 mt-2 max-w-[720px] text-[14px]">
          O INCENTIVA conduz o cadastro e o acompanhamento da tramitação no Sistema da Lei de Incentivo.
          Os dados aqui são demonstrativos.
        </p>

        <div className="grid lg:grid-cols-12 gap-5 mt-8">
          <div className="lg:col-span-7">
            <ol className="relative border-l" style={{ borderColor: COLORS.border }}>
              {SLI_STAGES.map((s, i) => {
                const state = i < active ? "done" : i === active ? "active" : "todo";
                return (
                  <li key={s.k} className="pl-6 pb-7 relative">
                    <span
                      className="absolute -left-[10px] top-1 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: state === "done" ? "rgba(16,217,163,0.2)" : state === "active" ? "rgba(59,130,246,0.22)" : "rgba(148,163,184,0.1)",
                        boxShadow: `0 0 0 1px ${
                          state === "done" ? "rgba(16,217,163,0.5)" : state === "active" ? "rgba(59,130,246,0.55)" : "rgba(148,163,184,0.25)"
                        } inset`,
                      }}
                    >
                      {state === "done" && <Check size={12} color="#6EE7B7" />}
                      {state === "active" && (
                        <>
                          <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(59,130,246,0.45)" }} />
                          <Clock size={12} color="#BFDBFE" />
                        </>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="text-[13px] font-semibold text-slate-100">{s.k}</div>
                      <Chip tone={state === "done" ? "accent" : state === "active" ? "blue" : "default"}>
                        {state === "done" ? "Concluído" : state === "active" ? "Em andamento" : "Pendente"}
                      </Chip>
                    </div>
                    <div className="text-[12.5px] text-slate-400 mt-1">{s.d}</div>
                    {state === "active" && (
                      <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(15,23,42,0.85)", boxShadow: "0 0 0 1px rgba(59,130,246,0.25) inset" }}>
                        <div className="flex items-center gap-2 text-[12px] text-blue-200 font-medium">
                          <span className="shimmer w-3 h-[2px] rounded-full" /> IA acompanhando · previsão 48h
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>

            {active === SLI_STAGES.length - 1 && (
              <div className="mt-4">
                <Button variant="accent" icon={<Trophy size={14} />} iconRight={<ArrowRight size={14} />} onClick={() => go("approved")}>
                  Ver resultado da aprovação
                </Button>
              </div>
            )}
          </div>

          {/* Document preview */}
          <div className="lg:col-span-5">
            <GlassCard hi className="p-0 overflow-hidden">
              <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-blue-300" />
                  <div className="text-[13px] text-slate-100 font-medium">Projeto · padrão SLI</div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip tone="blue" icon={<Lock size={11} />}>Somente leitura</Chip>
                  <button className="text-slate-400 hover:text-slate-100" title="Baixar"><Download size={14} /></button>
                </div>
              </div>
              <div className="p-5 text-[12.5px] text-slate-300 leading-relaxed grid-bg-fine" style={{ minHeight: 420 }}>
                <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">Identificação</div>
                <div className="text-slate-100 mt-1">{MOCK.projeto.nome}</div>
                <div className="text-slate-400 mt-0.5">
                  Proponente: {MOCK.proponente.nome} · CNPJ {MOCK.proponente.cnpj}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <MiniField k="Manifestação" v={MOCK.projeto.manifestacao} />
                  <MiniField k="Dimensão" v={MOCK.projeto.dimensao} />
                  <MiniField k="Duração" v={MOCK.projeto.duracao} />
                  <MiniField k="Local" v={MOCK.projeto.local} span />
                  <MiniField k="Beneficiários" v={`${MOCK.projeto.beneficiarios}`} />
                </div>

                <div className="mt-4 text-[10.5px] text-slate-500 uppercase tracking-widest">Objetivo geral</div>
                <div className="mt-1">{MOCK.projeto.objetivo}</div>

                <div className="mt-4 text-[10.5px] text-slate-500 uppercase tracking-widest">Valor pleiteado</div>
                <div className="font-display text-xl text-white font-semibold mt-1">{BRL(MOCK.projeto.valor)}</div>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                  <Shield size={11} /> Documento gerado automaticamente pelo INCENTIVA · demonstrativo
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
};

const MiniField = ({ k, v, span }) => (
  <div className={`rounded-lg p-2.5 ring-soft ${span ? "col-span-3" : ""}`}>
    <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">{k}</div>
    <div className="text-[13px] text-slate-100 mt-0.5">{v}</div>
  </div>
);

/* =========================================================================
   SCREEN 5 — Approved / Ready for fundraising
   ========================================================================= */
const Approved = ({ go }) => (
  <main className="relative overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute inset-0 glow-gold" />
    <TrajectoryBg />
    <div className="relative max-w-[1180px] mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 fade-up">
          <Chip tone="gold" icon={<Award size={12} />}>Projeto aprovado · apto para captação</Chip>
          <h1 className="font-display text-[44px] text-white font-semibold leading-tight tracking-tight mt-4">
            Seu projeto está
            <span
              className="ml-2"
              style={{
                backgroundImage: "linear-gradient(120deg, #FCD34D, #F59E0B, #10D9A3)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              público e aprovado
            </span>
            .
          </h1>
          <p className="text-slate-300 mt-4 max-w-[580px] text-[15px] leading-relaxed">
            {MOCK.projeto.nome} foi habilitado para captação de recursos no âmbito da Lei de Incentivo ao Esporte.
            A partir daqui, o INCENTIVA ativa o Módulo B e conecta você aos incentivadores mais aderentes.
          </p>

          <div className="mt-7 grid sm:grid-cols-3 gap-3 max-w-[620px]">
            <div className="rounded-xl p-4 ring-soft">
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Valor aprovado</div>
              <div className="font-display text-[22px] text-white font-semibold mt-1">{BRL(MOCK.projeto.valor)}</div>
            </div>
            <div className="rounded-xl p-4 ring-soft">
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Manifestação</div>
              <div className="font-display text-[15px] text-white font-semibold mt-1">Esporte Educacional</div>
            </div>
            <div className="rounded-xl p-4 ring-soft">
              <div className="text-[11px] text-slate-400 uppercase tracking-widest">Portaria</div>
              <div className="font-display text-[15px] text-white font-semibold mt-1 font-mono">Nº 2.184/2026</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Button variant="accent" size="lg" icon={<Radar size={16} />} iconRight={<ArrowRight size={16} />} onClick={() => go("moduleB")}>
              Ir para captação inteligente
            </Button>
            <Button variant="secondary" icon={<Share2 size={14} />}>Compartilhar projeto</Button>
            <Button variant="ghost" icon={<Download size={14} />}>Baixar selo oficial</Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <ApprovalBadge />
        </div>
      </div>
    </div>
  </main>
);

const ApprovalBadge = () => (
  <div className="relative aspect-square max-w-[440px] mx-auto">
    <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(245,158,11,0.25)" }} />
    <div className="absolute inset-6 rounded-full pulse-ring" style={{ background: "rgba(16,217,163,0.2)", animationDelay: "0.6s" }} />
    <div
      className="absolute inset-10 rounded-full glass-hi flex items-center justify-center lume"
      style={{ boxShadow: "0 30px 80px -30px rgba(245,158,11,0.5)" }}
    >
      <div className="text-center">
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F59E0B, #FCD34D)", color: "#1F1405" }}
          >
            <Award size={38} strokeWidth={2.2} />
          </div>
        </div>
        <div className="font-display font-semibold text-white text-[22px] mt-4">APROVADO</div>
        <div className="text-[11.5px] text-slate-400 tracking-[0.25em] uppercase mt-1">Apto para captação</div>
        <div className="mt-4 text-[12px] text-slate-300 max-w-[220px] mx-auto">
          Publicado oficialmente · selo de aprovação do órgão gestor
        </div>
      </div>
    </div>
  </div>
);

/* =========================================================================
   SCREEN 6 — Module B — Smart fundraising
   ========================================================================= */
const ModuleB = ({ go, setSelected, selected }) => {
  const [filter, setFilter] = useState("all");
  const sorted = useMemo(() => [...MOCK.incentivadores].sort((a, b) => b.score - a.score), []);
  const filtered = filter === "all" ? sorted : sorted.filter((s) => s.score >= 80);

  return (
    <main className="relative">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="absolute inset-0 glow-blue opacity-70" />
      <div className="relative max-w-[1420px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <SectionLabel icon={<Radar size={12} />}>Módulo B · Captação Inteligente</SectionLabel>
            <h1 className="font-display text-[30px] text-white font-semibold mt-1">
              Matching IA · {MOCK.projeto.nome}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Chip tone="gold" icon={<Award size={12} />}>Apto para captação</Chip>
            <Chip tone="blue" icon={<Wallet size={12} />}>Pleito {BRL(MOCK.projeto.valor)}</Chip>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Project profile summary */}
          <div className="lg:col-span-4 space-y-5">
            <GlassCard hi className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-widest text-slate-400">Perfil do projeto</div>
                <AiChip>Lido pela IA</AiChip>
              </div>
              <div className="font-display text-[19px] text-white font-semibold leading-tight">{MOCK.projeto.nome}</div>
              <div className="text-[12.5px] text-slate-400 mt-1">{MOCK.projeto.local}</div>
              <div className="mt-4 grid grid-cols-2 gap-2.5 text-[12px]">
                {[
                  { k: "Manifestação", v: MOCK.projeto.manifestacao },
                  { k: "Dimensão", v: MOCK.projeto.dimensao },
                  { k: "Duração", v: MOCK.projeto.duracao },
                  { k: "Beneficiários", v: `${MOCK.projeto.beneficiarios}` },
                ].map((x) => (
                  <div key={x.k} className="rounded-lg p-2.5 ring-soft">
                    <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">{x.k}</div>
                    <div className="text-slate-100 mt-0.5">{x.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">Tags temáticas</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Esporte educacional", "Juventude", "Comunidade", "Equidade de gênero", "Permanência escolar"].map((t) => (
                    <span key={t} className="text-[11px] px-2 py-1 rounded-full" style={{ background: "rgba(59,130,246,0.1)", color: "#BFDBFE", boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AiChip>Insights IA</AiChip>
              </div>
              <ul className="space-y-2.5 text-[12.5px] text-slate-300">
                <li className="flex gap-2"><TrendingUp size={13} className="text-emerald-400 mt-0.5" /> 6 incentivadores com aderência média de 80/100.</li>
                <li className="flex gap-2"><Flame size={13} className="text-amber-400 mt-0.5" /> Grupo Meridian lidera o matching com 94/100.</li>
                <li className="flex gap-2"><Activity size={13} className="text-blue-400 mt-0.5" /> Tempo estimado de captação: 22 dias com aporte único.</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AiChip>Filtro inteligente</AiChip>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { k: "all", l: "Todos" },
                  { k: "high", l: "Aderência ≥ 80" },
                ].map((f) => (
                  <button
                    key={f.k}
                    onClick={() => setFilter(f.k)}
                    className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                    style={{
                      background: filter === f.k ? "rgba(59,130,246,0.16)" : "rgba(30,41,59,0.5)",
                      boxShadow: `0 0 0 1px ${filter === f.k ? "rgba(59,130,246,0.45)" : "rgba(148,163,184,0.2)"} inset`,
                      color: filter === f.k ? "#BFDBFE" : "#CBD5E1",
                    }}
                  >
                    {f.l}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-[11.5px] text-slate-500">
                Filtros adicionais em breve (setor, ticket, geografia, ESG).
              </div>
            </GlassCard>
          </div>

          {/* Matching grid */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((s, i) => (
                <SponsorCard
                  key={s.id}
                  s={s}
                  rank={i}
                  selected={selected?.id === s.id}
                  onSelect={() => setSelected(s)}
                />
              ))}
            </div>

            {selected && (
              <SponsorDetail
                s={selected}
                onClose={() => setSelected(null)}
                onContinue={() => go("deposit")}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

const SponsorCard = ({ s, rank, selected, onSelect }) => {
  const top = rank === 0;
  return (
    <button
      onClick={onSelect}
      className={`text-left pick-card rounded-2xl p-5 glass relative overflow-hidden fr`}
      style={selected ? { boxShadow: "0 0 0 1.5px rgba(59,130,246,0.7) inset, 0 20px 40px -20px rgba(59,130,246,0.5)" } : undefined}
    >
      {top && (
        <span className="absolute top-3 right-3">
          <Chip tone="gold" icon={<Flame size={11} />}>Melhor aderência</Chip>
        </span>
      )}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-semibold text-[14px] shrink-0"
          style={{ background: "rgba(59,130,246,0.14)", color: "#BFDBFE", boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset" }}
        >
          {s.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-[17px] text-white font-semibold leading-tight truncate">{s.nome}</div>
          <div className="text-[12px] text-slate-400 mt-0.5">{s.setor}</div>
          <div className="text-[12.5px] text-slate-300 mt-2 line-clamp-2">{s.tese}</div>
        </div>
        <ScoreRing value={s.score} size={62} stroke={6} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {s.drivers.map((d) => (
          <div key={d.label} className="rounded-lg p-2 ring-soft">
            <div className="flex items-center justify-between text-[10.5px] text-slate-400 uppercase tracking-widest">
              <span className="truncate">{d.label}</span>
              <span className="text-slate-200">{d.v}</span>
            </div>
            <div className="mt-1.5"><Meter value={d.v} /></div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[12px]">
        <div className="text-slate-400">Disponível para aporte</div>
        <div className="font-display text-white font-semibold">{BRL(s.disponivel)}</div>
      </div>
    </button>
  );
};

const SponsorDetail = ({ s, onClose, onContinue }) => (
  <GlassCard hi className="mt-5 p-6 lume relative">
    <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-slate-100">
      <X size={16} />
    </button>
    <div className="flex items-center gap-3">
      <AiChip>Explicabilidade IA</AiChip>
      <div className="text-[12px] text-slate-400">Por que este incentivador?</div>
    </div>
    <div className="mt-3 flex items-start gap-5 flex-wrap">
      <ScoreRing value={s.score} size={120} stroke={10} label="ADERÊNCIA" />
      <div className="flex-1 min-w-[260px]">
        <div className="font-display text-[22px] text-white font-semibold">{s.nome}</div>
        <div className="text-[13px] text-slate-400">{s.setor} · tese: {s.tese}</div>
        <ul className="mt-3 space-y-1.5 text-[13px] text-slate-200">
          {s.motivos.map((m) => (
            <li key={m} className="flex gap-2"><CheckCircle2 size={14} className="mt-0.5 text-emerald-400" /> {m}</li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-5 grid md:grid-cols-4 gap-3">
      {s.drivers.map((d) => (
        <div key={d.label} className="rounded-xl p-3 ring-soft">
          <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-widest">
            <span>{d.label}</span>
            <span className="text-slate-200">{d.v}</span>
          </div>
          <div className="mt-2"><Meter value={d.v} /></div>
        </div>
      ))}
    </div>
    <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
      <div className="text-[12.5px] text-slate-400">
        Aporte sugerido pela IA: <strong className="text-white">{BRL(Math.min(s.disponivel, MOCK.projeto.valor))}</strong>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" icon={<MessageSquareText size={14} />}>Mensagem ao incentivador</Button>
        <Button variant="accent" iconRight={<ArrowRight size={14} />} onClick={onContinue}>
          Simular proposta de aporte
        </Button>
      </div>
    </div>
  </GlassCard>
);

/* =========================================================================
   SCREEN 7 — Sponsor view
   ========================================================================= */
const SponsorView = ({ go, setSelected }) => {
  const projetos = [
    {
      id: "arena-jovem",
      nome: MOCK.projeto.nome,
      prop: MOCK.proponente.nome,
      valor: MOCK.projeto.valor,
      local: MOCK.projeto.local,
      match: 94,
      tags: ["Esporte educacional", "Juventude", "ESG alto"],
      risco: "Baixo",
    },
    {
      id: "para-quadra",
      nome: "Para Quadra — iniciação paralímpica",
      prop: "Associação Passe Livre",
      valor: 520000,
      local: "Campinas/SP",
      match: 88,
      tags: ["Paradesporto", "Inclusão"],
      risco: "Médio",
    },
    {
      id: "ondas-rio",
      nome: "Ondas no Rio — surfe educativo",
      prop: "Coletivo Maré",
      valor: 640000,
      local: "Rio de Janeiro/RJ",
      match: 79,
      tags: ["Esporte de participação", "Jovem"],
      risco: "Baixo",
    },
    {
      id: "base-forte",
      nome: "Base Forte — atletismo para meninas",
      prop: "Fundação Laços",
      valor: 430000,
      local: "Recife/PE",
      match: 83,
      tags: ["Equidade de gênero", "Alto rendimento"],
      risco: "Baixo",
    },
  ];
  return (
    <main className="relative">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="absolute inset-0 glow-accent" />
      <div className="relative max-w-[1420px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <SectionLabel icon={<Building2 size={12} />}>Visão do incentivador · Grupo Meridian</SectionLabel>
            <h1 className="font-display text-[30px] text-white font-semibold mt-1">Projetos com mais aderência à sua tese</h1>
          </div>
          <div className="flex items-center gap-2">
            <Chip tone="blue" icon={<Wallet size={12} />}>Orçamento ESG disponível · {BRL(1200000)}</Chip>
            <Chip tone="accent" icon={<Sparkles size={12} />}>Recomendado pela IA</Chip>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* Sponsor profile */}
          <div className="lg:col-span-3 space-y-5">
            <GlassCard hi className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-semibold" style={{ background: "rgba(16,217,163,0.14)", color: "#6EE7B7", boxShadow: "0 0 0 1px rgba(16,217,163,0.35) inset" }}>
                  MR
                </div>
                <div>
                  <div className="font-display text-white font-semibold">Grupo Meridian</div>
                  <div className="text-[12px] text-slate-400">Indústria & Infraestrutura</div>
                </div>
              </div>
              <div className="mt-4 text-[12px] text-slate-300">
                Tese ESG focada em <strong>esporte educacional, juventude</strong> e <strong>capitais regionais</strong>.
              </div>
              <div className="mt-4 space-y-1.5 text-[12px] text-slate-300">
                <div className="flex items-center justify-between"><span className="text-slate-400">Ticket médio</span><span>{BRL(800000)}</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-400">Projetos apoiados</span><span>14</span></div>
                <div className="flex items-center justify-between"><span className="text-slate-400">Taxa de conclusão</span><span>96%</span></div>
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <div className="text-[11px] uppercase tracking-widest text-slate-400">Filtros</div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Esporte educacional", "Capital regional", "Juventude", "Baixo risco"].map((t) => (
                  <Chip key={t} tone="accent" icon={<Check size={11} />}>{t}</Chip>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Projects */}
          <div className="lg:col-span-9">
            <div className="grid md:grid-cols-2 gap-4">
              {projetos.map((p, i) => (
                <button
                  key={p.id}
                  className="text-left pick-card rounded-2xl p-5 glass relative overflow-hidden fr"
                  onClick={() => {
                    if (p.id === "arena-jovem") {
                      setSelected(MOCK.incentivadores[0]); // meridian view
                      go("deposit");
                    }
                  }}
                >
                  {i === 0 && (
                    <span className="absolute top-3 right-3">
                      <Chip tone="gold" icon={<Flame size={11} />}>Top aderência</Chip>
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[17px] text-white font-semibold leading-tight">{p.nome}</div>
                      <div className="text-[12px] text-slate-400 mt-0.5">{p.prop} · {p.local}</div>
                    </div>
                    <ScoreRing value={p.match} size={62} stroke={6} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-1 rounded-full" style={{ background: "rgba(16,217,163,0.1)", color: "#6EE7B7", boxShadow: "0 0 0 1px rgba(16,217,163,0.35) inset" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-[12px]">
                    <div className="rounded-lg p-2 ring-soft">
                      <div className="text-[10.5px] uppercase tracking-widest text-slate-400">Valor</div>
                      <div className="text-slate-100 font-display font-semibold mt-0.5">{BRL(p.valor)}</div>
                    </div>
                    <div className="rounded-lg p-2 ring-soft">
                      <div className="text-[10.5px] uppercase tracking-widest text-slate-400">Risco</div>
                      <div className="text-slate-100 mt-0.5">{p.risco}</div>
                    </div>
                    <div className="rounded-lg p-2 ring-soft">
                      <div className="text-[10.5px] uppercase tracking-widest text-slate-400">Status</div>
                      <div className="text-emerald-300 mt-0.5 inline-flex items-center gap-1"><Award size={11} /> Apto</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[12.5px]">
                    <div className="text-slate-400 flex items-center gap-1.5"><Sparkles size={12} /> IA recomenda apoiar</div>
                    <div className="text-slate-200 inline-flex items-center gap-1">ver projeto <ChevronRight size={14} /></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* =========================================================================
   SCREEN 8 — Deposit (aporte) flow
   ========================================================================= */
const Deposit = ({ go, selected, confirmed, setConfirmed }) => {
  const [step, setStep] = useState(confirmed ? 2 : 0); // 0 revisão / 1 depositando / 2 comprovante
  const sponsor = selected || MOCK.incentivadores[0];
  const amount = Math.min(sponsor.disponivel, MOCK.projeto.valor);

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => { setStep(2); setConfirmed(true); }, 2200);
      return () => clearTimeout(t);
    }
  }, [step, setConfirmed]);

  return (
    <main className="relative">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 glow-blue" />
      <div className="relative max-w-[1180px] mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-2">
          <Chip tone="blue" icon={<Wallet size={12} />}>Aporte · simulação demonstrativa</Chip>
          <AiChip>IA conduzindo a operação</AiChip>
        </div>
        <h1 className="font-display text-[30px] text-white font-semibold mt-1">
          Apoiar · {MOCK.projeto.nome}
        </h1>

        {/* Stepper */}
        <div className="mt-6 flex items-center gap-3">
          {[
            { k: "Revisão", icon: <Eye size={13} /> },
            { k: "Depósito", icon: <Wallet size={13} /> },
            { k: "Comprovante", icon: <Receipt size={13} /> },
          ].map((s, i) => {
            const state = i < step ? "done" : i === step ? "active" : "todo";
            return (
              <React.Fragment key={s.k}>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium"
                  style={{
                    background: state === "active" ? "rgba(59,130,246,0.16)" : state === "done" ? "rgba(16,217,163,0.1)" : "rgba(30,41,59,0.4)",
                    boxShadow: `0 0 0 1px ${state === "active" ? "rgba(59,130,246,0.45)" : state === "done" ? "rgba(16,217,163,0.35)" : "rgba(148,163,184,0.14)"} inset`,
                    color: state === "todo" ? "#94A3B8" : "#E2E8F0",
                  }}
                >
                  {state === "done" ? <Check size={12} /> : s.icon}
                  {s.k}
                </div>
                {i < 2 && <div className="flex-1 rail"><span style={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }} /></div>}
              </React.Fragment>
            );
          })}
        </div>

        {step === 0 && (
          <div className="grid lg:grid-cols-12 gap-5 mt-7">
            <GlassCard hi className="lg:col-span-7 p-6">
              <div className="text-[11px] uppercase tracking-widest text-slate-400">Resumo do aporte</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <MiniField k="Incentivador" v={sponsor.nome} />
                <MiniField k="Setor" v={sponsor.setor} />
                <MiniField k="Projeto" v={MOCK.projeto.nome} span />
                <MiniField k="Proponente" v={MOCK.proponente.nome} />
                <MiniField k="CNPJ" v={MOCK.proponente.cnpj} />
              </div>
              <div className="mt-5 rounded-xl p-4" style={{ background: "rgba(59,130,246,0.08)", boxShadow: "0 0 0 1px rgba(59,130,246,0.35) inset" }}>
                <div className="text-[11px] uppercase tracking-widest text-blue-300">Valor do aporte</div>
                <div className="font-display text-[34px] text-white font-semibold">{BRL(amount)}</div>
                <div className="text-[12px] text-slate-400 mt-1">
                  Depósito direcionado à conta específica do projeto, conforme a Lei de Incentivo ao Esporte.
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
                <div className="text-[12px] text-slate-400 inline-flex items-center gap-2">
                  <Shield size={13} /> Operação criptografada · conciliação automática
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => go("moduleB")}>Cancelar</Button>
                  <Button variant="accent" iconRight={<ArrowRight size={14} />} onClick={() => setStep(1)}>
                    Confirmar e depositar
                  </Button>
                </div>
              </div>
            </GlassCard>

            <div className="lg:col-span-5 space-y-5">
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AiChip>Análise do aporte</AiChip>
                </div>
                <ul className="space-y-2.5 text-[12.5px] text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={13} className="text-emerald-400 mt-0.5" /> Projeto apto para captação e com portaria publicada.</li>
                  <li className="flex gap-2"><CheckCircle2 size={13} className="text-emerald-400 mt-0.5" /> Incentivador com tese compatível e histórico consistente.</li>
                  <li className="flex gap-2"><CheckCircle2 size={13} className="text-emerald-400 mt-0.5" /> Valor dentro do limite da capacidade do incentivador.</li>
                  <li className="flex gap-2"><AlertCircle size={13} className="text-amber-400 mt-0.5" /> Recomendado: solicitar relatório trimestral ao proponente.</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-5">
                <div className="text-[11px] uppercase tracking-widest text-slate-400">Conta específica do projeto</div>
                <div className="mt-2 text-[13px] text-slate-200 font-mono">BR78-INCE-3020-7712-0045-0100</div>
                <div className="text-[11.5px] text-slate-500 mt-1">Vinculada à portaria Nº 2.184/2026</div>
              </GlassCard>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-12 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 rounded-full flex items-center justify-center">
              <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(59,130,246,0.4)" }} />
              <span className="absolute inset-4 rounded-full pulse-ring" style={{ background: "rgba(16,217,163,0.35)", animationDelay: "0.6s" }} />
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#1D4ED8,#0B8E6B)" }}
              >
                <Wallet size={36} color="#E0F2FE" />
              </div>
            </div>
            <div className="mt-6 font-display text-[22px] text-white font-semibold">Processando aporte…</div>
            <div className="text-slate-400 text-[13px] mt-1.5 max-w-[420px]">
              Efetuando depósito na conta específica e gerando recibo oficial.
            </div>
            <div className="mt-6 w-[360px]">
              <div className="rail"><span className="shimmer" style={{ width: "66%" }} /></div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-12 gap-5 mt-7">
            <GlassCard hi className="lg:col-span-7 p-0 overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center gap-2">
                  <Receipt size={15} className="text-emerald-300" />
                  <div className="text-[13px] text-slate-100 font-medium">Recibo oficial · Lei de Incentivo ao Esporte</div>
                </div>
                <Chip tone="accent" icon={<Check size={11} />}>Depósito confirmado</Chip>
              </div>
              <div className="p-6 grid-bg-fine">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">Recibo nº</div>
                    <div className="font-mono text-white text-[15px] mt-1">INC-2026-000471</div>
                  </div>
                  <div>
                    <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">Data</div>
                    <div className="font-mono text-white text-[15px] mt-1">21/04/2026 · 14:03</div>
                  </div>
                  <div>
                    <div className="text-[10.5px] text-slate-500 uppercase tracking-widest">Portaria</div>
                    <div className="font-mono text-white text-[15px] mt-1">Nº 2.184/2026</div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MiniField k="Incentivador" v={sponsor.nome} />
                  <MiniField k="CNPJ incentivador" v="12.387.221/0001-55" />
                  <MiniField k="Proponente" v={MOCK.proponente.nome} />
                  <MiniField k="CNPJ proponente" v={MOCK.proponente.cnpj} />
                  <MiniField k="Projeto" v={MOCK.projeto.nome} span />
                  <MiniField k="Conta específica" v="BR78-INCE-3020-7712-0045-0100" span />
                </div>
                <div className="mt-6 rounded-xl p-5" style={{ background: "rgba(16,217,163,0.08)", boxShadow: "0 0 0 1px rgba(16,217,163,0.35) inset" }}>
                  <div className="text-[11px] uppercase tracking-widest text-emerald-300">Valor creditado</div>
                  <div className="font-display text-[34px] text-white font-semibold leading-none mt-2">{BRL(amount)}</div>
                  <div className="text-[12px] text-slate-300 mt-2">Comprovante gerado e anexado ao dossiê do projeto.</div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                  <Shield size={11} /> Documento gerado pelo INCENTIVA · demonstrativo
                </div>
              </div>
            </GlassCard>

            <div className="lg:col-span-5 space-y-4">
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <AiChip>Próximos passos</AiChip>
                </div>
                <ul className="space-y-2.5 text-[13px] text-slate-300">
                  <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-400 mt-0.5" /> Notificar proponente e incentivador.</li>
                  <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-400 mt-0.5" /> Emitir certificado de apoio.</li>
                  <li className="flex gap-2"><Clock size={14} className="text-blue-400 mt-0.5" /> Agendar primeiro relatório trimestral.</li>
                </ul>
              </GlassCard>
              <div className="flex flex-col gap-2">
                <Button variant="gold" size="lg" icon={<Trophy size={15} />} iconRight={<ArrowRight size={15} />} onClick={() => go("success")}>
                  Concluir e celebrar
                </Button>
                <Button variant="secondary" icon={<Download size={14} />}>Baixar recibo em PDF</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

/* =========================================================================
   SCREEN 9 — Success / execution ahead
   ========================================================================= */
const Success = ({ go, resetJourney }) => (
  <main className="relative overflow-hidden">
    <div className="absolute inset-0 grid-bg opacity-40" />
    <div className="absolute inset-0 glow-gold" />
    <TrajectoryBg />
    <div className="relative max-w-[1180px] mx-auto px-6 py-14">
      <div className="text-center fade-up">
        <div className="mx-auto w-24 h-24 relative flex items-center justify-center">
          <span className="absolute inset-0 rounded-full pulse-ring" style={{ background: "rgba(245,158,11,0.35)" }} />
          <span className="absolute inset-2 rounded-full pulse-ring" style={{ background: "rgba(16,217,163,0.3)", animationDelay: "0.6s" }} />
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#F59E0B,#10D9A3)", color: "#04221A" }}>
            <Trophy size={36} strokeWidth={2.2} />
          </div>
        </div>
        <h1 className="font-display text-[44px] text-white font-semibold mt-6 tracking-tight">
          Recurso recebido. <span style={{ backgroundImage: "linear-gradient(120deg,#FCD34D,#10D9A3)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>O projeto segue para execução.</span>
        </h1>
        <p className="text-slate-300 mt-4 max-w-[640px] mx-auto">
          {BRL(780000)} foram creditados na conta específica do projeto <strong>{MOCK.projeto.nome}</strong>.
          O INCENTIVA continua com você durante toda a execução — acompanhamento de metas, monitoramento financeiro e
          relatórios automáticos para o incentivador.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-4 gap-3 max-w-[960px] mx-auto">
        {[
          { k: "Valor creditado", v: BRL(780000), i: <Wallet size={16} />, tone: "gold" },
          { k: "Duração", v: "18 meses", i: <Calendar size={16} /> },
          { k: "Beneficiários", v: "340", i: <Users size={16} /> },
          { k: "Relatórios", v: "Trimestrais", i: <BarChart3 size={16} /> },
        ].map((c) => (
          <div key={c.k} className="rounded-xl p-4 glass">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-400">
              <span className={c.tone === "gold" ? "text-amber-300" : "text-blue-300"}>{c.i}</span>
              {c.k}
            </div>
            <div className="font-display text-[20px] text-white font-semibold mt-1.5">{c.v}</div>
          </div>
        ))}
      </div>

      <GlassCard hi className="mt-10 p-6 lume">
        <div className="flex items-center gap-3">
          <AiChip>Copiloto em execução</AiChip>
          <div className="text-[13px] text-slate-300">Plano de acompanhamento sugerido pela IA</div>
        </div>
        <div className="mt-5 grid md:grid-cols-5 gap-2">
          {[
            { k: "Início das atividades", d: "05/05/2026", s: "active" },
            { k: "1º relatório", d: "05/08/2026", s: "todo" },
            { k: "Meio de execução", d: "05/02/2027", s: "todo" },
            { k: "2º relatório", d: "05/05/2027", s: "todo" },
            { k: "Encerramento", d: "05/11/2027", s: "todo" },
          ].map((m, i) => (
            <div key={m.k} className="rounded-xl p-3 ring-soft relative">
              <div className="text-[10.5px] uppercase tracking-widest text-slate-400">Marco {i + 1}</div>
              <div className="text-[13px] text-slate-100 font-medium mt-1">{m.k}</div>
              <div className="text-[11.5px] text-slate-500 mt-1 font-mono">{m.d}</div>
              {m.s === "active" && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button variant="accent" size="lg" icon={<Play size={15} />} iconRight={<ArrowRight size={15} />} onClick={() => go("moduleB")}>
          Voltar ao Módulo B
        </Button>
        <Button variant="secondary" icon={<Download size={14} />}>Exportar dossiê completo</Button>
        <Button variant="ghost" onClick={() => { resetJourney(); go("landing"); }}>Voltar ao início</Button>
      </div>
    </div>
  </main>
);

/* =========================================================================
   APP ROOT
   ========================================================================= */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [journey, setJourney] = useState({ hasProject: null, isApproved: null });
  const [aiOpen, setAiOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [donationConfirmed, setDonationConfirmed] = useState(false);

  const resetJourney = () => {
    setJourney({ hasProject: null, isApproved: null });
    setSelectedSponsor(null);
    setDonationConfirmed(false);
  };

  const go = (k) => {
    setScreen(k);
    // scroll to top of iframe-like viewport
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Score heuristic for AI panel
  const score = screen === "moduleA" ? 88 : screen === "sliBridge" ? 92 : screen === "moduleB" ? 94 : screen === "approved" ? 96 : undefined;

  return (
    <div
      className="incentiva-root min-h-screen"
      style={{
        background: `radial-gradient(1200px 600px at 50% -10%, rgba(59,130,246,0.12), transparent 70%), linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgSoft} 100%)`,
        color: COLORS.textHi,
      }}
    >
      <GlobalStyles />
      <TopNav screen={screen} setScreen={setScreen} resetJourney={resetJourney} />

      <div key={screen} className="fade-up">
        {screen === "landing" && <Landing go={go} setJourney={setJourney} />}
        {screen === "gateway" && (
          <Gateway
            go={go}
            journey={journey}
            setJourney={(u) => setJourney((j) => (typeof u === "function" ? u(j) : u))}
          />
        )}
        {screen === "moduleA" && <ModuleA go={go} />}
        {screen === "sliBridge" && <SliBridge go={go} />}
        {screen === "approved" && <Approved go={go} />}
        {screen === "moduleB" && (
          <ModuleB go={go} selected={selectedSponsor} setSelected={setSelectedSponsor} />
        )}
        {screen === "sponsorView" && <SponsorView go={go} setSelected={setSelectedSponsor} />}
        {screen === "deposit" && (
          <Deposit
            go={go}
            selected={selectedSponsor}
            confirmed={donationConfirmed}
            setConfirmed={setDonationConfirmed}
          />
        )}
        {screen === "success" && <Success go={go} resetJourney={resetJourney} />}
      </div>

      {screen !== "landing" && (
        <AiCopilot open={aiOpen} setOpen={setAiOpen} context={screen} score={score} />
      )}
    </div>
  );
}
