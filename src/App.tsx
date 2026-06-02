import { useState, useEffect } from 'react'

/* ─── DATA ─── */
const NAV_LINKS = ['about', 'projects', 'skills', 'deep-dive', 'reflection', 'contact']

const PROJECTS = [
  {
    name: 'Insighta Labs+ Backend API',
    repo: 'Data-persistence-api',
    emoji: '&#x1F5A5;',
    color: 'bg-emerald-600',
    headerColor: 'bg-emerald-800',
    description:
      'Production-ready backend API for a profile intelligence platform. Secure GitHub OAuth with PKCE, role-based access control (admin/analyst), a query engine with filtering, sorting, pagination, and natural-language search. Includes query normalization, in-memory caching, and streaming CSV ingestion with chunked bulk inserts.',
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Express', 'Vercel'],
    contribution: [
      'Designed and implemented the full REST API from scratch — auth, profiles, search, and import endpoints',
      'Built GitHub OAuth with PKCE support for both web and CLI flows',
      'Implemented RBAC middleware separating admin (write) and analyst (read) permissions',
      'Created a deterministic query normalization layer so equivalent searches share cache keys',
      'Built streaming CSV ingestion that handles partial failures gracefully',
    ],
    liveUrl: 'https://data-persistence-api-psi.vercel.app',
    repoUrl: 'https://github.com/oduwoleeyinojuoluwa44/Data-persistence-api',
  },
  {
    name: 'Insighta Labs+ CLI',
    repo: 'CLI-for-insighta-labs-',
    emoji: '&#x1F4BB;',
    color: 'bg-violet-600',
    headerColor: 'bg-violet-800',
    description:
      'Secure command-line interface for querying profile intelligence. Supports GitHub OAuth with PKCE, encrypted credential storage, natural-language profile queries, CSV export, and automatic token refresh.',
    stack: ['Node.js', 'TypeScript', 'Commander.js', 'PKCE/OAuth'],
    contribution: [
      'Built the full CLI architecture — command parsing, service layer, and credential management',
      'Implemented secure credential storage at ~/.insighta/credentials.json with 0o600 permissions',
      'Created natural-language query parsing so users can type plain English searches',
      'Added automatic token refresh with 5-minute pre-expiry window',
      'Designed table-formatted output for readable terminal results',
    ],
    repoUrl: 'https://github.com/oduwoleeyinojuoluwa44/CLI-for-insighta-labs-',
  },
  {
    name: 'Insighta Labs+ Web Portal',
    repo: 'insighta-Labs-web-portal',
    emoji: '&#x1F310;',
    color: 'bg-sky-600',
    headerColor: 'bg-sky-800',
    description:
      'Modern React-based web interface for the Profile Intelligence Platform. GitHub OAuth login, role-based access, interactive profile browser with real-time filtering, CSV export, Zustand state management, and CSRF protection.',
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Axios', 'Tailwind CSS'],
    contribution: [
      'Built the full frontend SPA — routing, state management, API integration',
      'Implemented OAuth callback flow with automatic token management via Axios interceptors',
      'Created protected routes with role-based rendering',
      'Built a real-time filter panel with debounced API calls',
      'Added code splitting with lazy-loaded routes for performance',
    ],
    repoUrl: 'https://github.com/oduwoleeyinojuoluwa44/insighta-Labs-web-portal',
  },
]

const SKILLS: { name: string; icon: string; projects: string[]; color: string }[] = [
  { name: 'API Design (REST)', icon: '🔌', projects: ['Backend API'], color: 'bg-red-500' },
  { name: 'Auth (OAuth/PKCE/JWT)', icon: '🔐', projects: ['Backend API', 'CLI'], color: 'bg-amber-500' },
  { name: 'RBAC', icon: '🛡️', projects: ['Backend API', 'Web Portal'], color: 'bg-blue-500' },
  { name: 'PostgreSQL', icon: '🐘', projects: ['Backend API'], color: 'bg-indigo-500' },
  { name: 'Query Optimization', icon: '⚡', projects: ['Backend API'], color: 'bg-yellow-500' },
  { name: 'Caching', icon: '💾', projects: ['Backend API'], color: 'bg-green-500' },
  { name: 'CSV Ingestion', icon: '📊', projects: ['Backend API'], color: 'bg-teal-500' },
  { name: 'CLI Tooling', icon: '🖥️', projects: ['CLI'], color: 'bg-purple-500' },
  { name: 'Zustand State', icon: '🧠', projects: ['Web Portal'], color: 'bg-pink-500' },
  { name: 'Testing (Jest)', icon: '🧪', projects: ['Backend API'], color: 'bg-orange-500' },
  { name: 'Vercel Deploy', icon: '🚀', projects: ['Backend API', 'Web Portal'], color: 'bg-cyan-500' },
  { name: 'TypeScript', icon: '📘', projects: ['Backend API', 'CLI', 'Web Portal'], color: 'bg-blue-600' },
]

/* ─── COMPONENTS ─── */

function PixelBox({
  children,
  className = '',
  rotation = 0,
  sticker,
}: {
  children: React.ReactNode
  className?: string
  rotation?: number
  sticker?: { color: string; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }
}) {
  const stickerPos = {
    'top-right': 'top-0 right-0 -mt-3 -mr-3',
    'top-left': 'top-0 left-0 -mt-3 -ml-3',
    'bottom-right': 'bottom-0 right-0 -mb-3 -mr-3',
    'bottom-left': 'bottom-0 left-0 -mb-3 -ml-3',
  }
  return (
    <div
      className={`pixel-border relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
      {sticker && (
        <div className={`sticker ${sticker.color} ${stickerPos[sticker.position]}`} />
      )}
    </div>
  )
}

function Cloud({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute w-28 h-12 bg-white border-4 border-black dark:bg-gray-700 dark:border-white ${className}`} style={style}>
      <div className="absolute -top-3 left-6 w-14 h-6 bg-white border-4 border-black dark:bg-gray-700 dark:border-white" />
    </div>
  )
}

function PixelCharacter({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-20 h-28 animate-float ${className}`}>
      {/* Hat */}
      <div className="absolute -top-2 left-2 w-10 h-4 bg-yellow-400 border-3 border-black dark:border-white" />
      <div className="absolute -top-5 left-4 w-6 h-3 bg-green-500 border-3 border-black dark:border-white" />
      {/* Head */}
      <div className="absolute top-2 left-0 w-16 h-16 bg-green-500 border-4 border-black dark:border-white">
        {/* Eyes */}
        <div className="absolute top-3 left-3 w-3 h-3 bg-black dark:bg-white animate-blink" />
        <div className="absolute top-3 right-3 w-3 h-3 bg-black dark:bg-white animate-blink" />
        {/* Mouth */}
        <div className="absolute bottom-3 left-5 w-5 h-2 bg-black dark:bg-white" />
      </div>
      {/* Body */}
      <div className="absolute bottom-0 left-2 w-12 h-8 bg-blue-500 border-3 border-black dark:border-white" />
    </div>
  )
}

function Star({ className = '' }: { className?: string }) {
  return <div className={`absolute w-3 h-3 bg-yellow-300 rotate-45 ${className}`} />
}

function Coin({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute w-8 h-8 bg-yellow-400 border-3 border-yellow-600 rounded-sm animate-float ${className}`} style={style}>
      <div className="w-full h-full flex items-center justify-center font-pixel text-[8px] text-yellow-800 font-bold">$</div>
    </div>
  )
}

function Nav({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-4 border-yellow-400">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-pixel text-yellow-400 text-[10px] sm:text-xs hidden sm:block animate-pulse-glow px-2 py-1">TEO.dev</span>
        <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={`text-[10px] sm:text-xs font-pixel transition-all duration-200 hover:scale-110 ${
                activeSection === link
                  ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]'
                  : 'text-gray-400 hover:text-yellow-300'
              }`}
            >
              {link.replace('-', ' ')}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

/* ─── MAIN APP ─── */

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.25 }
    )
    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="text-black dark:text-white text-sm md:text-base leading-relaxed overflow-x-hidden">
      <Nav activeSection={activeSection} />

      {/* ════════════════════ HERO / ABOUT ════════════════════ */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 via-sky-500 to-sky-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 pt-20 pb-16 relative overflow-hidden scanlines"
      >
        {/* Clouds */}
        <Cloud className="top-20 left-[10%] opacity-80 animate-drift hidden md:block" />
        <Cloud className="top-32 right-[15%] opacity-60 hidden md:block" style={{ animationDelay: '2s' } as React.CSSProperties} />
        <Cloud className="bottom-48 left-[30%] opacity-50 hidden lg:block" style={{ animationDelay: '4s' } as React.CSSProperties} />

        {/* Stars (dark mode) */}
        <Star className="top-24 left-[5%] dark:block hidden" />
        <Star className="top-40 right-[10%] dark:block hidden" />
        <Star className="top-56 left-[45%] dark:block hidden" />
        <Star className="bottom-32 right-[30%] dark:block hidden" />
        <Star className="top-28 left-[70%] dark:block hidden w-2 h-2" />

        {/* Pixel character */}
        <PixelCharacter className="absolute left-6 bottom-20 md:left-16 hidden lg:block" />

        {/* Coin */}
        <Coin className="absolute right-16 top-36 hidden md:block" />
        <Coin className="absolute left-[40%] top-24 hidden lg:block" style={{ animationDelay: '1.5s' } as React.CSSProperties} />

        <div className="relative z-10 text-center space-y-6 max-w-3xl">
          <PixelBox
            className="bg-white dark:bg-gray-800 p-5 md:p-8 inline-block"
            rotation={-2}
            sticker={{ color: 'bg-pink-400', position: 'top-right' }}
          >
            <h1 className="font-pixel text-xl md:text-3xl lg:text-4xl leading-snug bg-gradient-to-r from-green-600 to-emerald-400 dark:from-yellow-400 dark:to-green-400 bg-clip-text text-transparent">
              Oduwole Eyinojuoluwa
            </h1>
          </PixelBox>

          <PixelBox
            className="bg-yellow-400 dark:bg-yellow-500 text-black p-3 md:p-4 mx-auto max-w-md"
            rotation={1}
            sticker={{ color: 'bg-red-400', position: 'bottom-left' }}
          >
            <p className="font-pixel text-[10px] md:text-xs tracking-wider">⚔️ Backend Developer ⚔️</p>
          </PixelBox>

          <PixelBox className="bg-white dark:bg-gray-800 p-5 md:p-6 mx-auto max-w-2xl text-left" rotation={0}>
            <p className="mb-3">
              Backend engineer with hands-on experience building production APIs, CLI tools, and full-stack platforms.
              Currently interning at <strong className="text-green-600 dark:text-green-400">HNG Tech</strong>, where I shipped a multi-stage profile intelligence
              platform — from database design and OAuth security to query optimization and streaming data ingestion.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs mt-4 border-t-4 border-dashed border-black dark:border-yellow-400 pt-3">
              <span>📍 <strong>Nigeria</strong> (WAT, UTC+1)</span>
              <span>💼 <strong>Backend Dev Intern</strong> @ HNG</span>
              <a href="mailto:oduwoleeyinojoluwa44@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                ✉️ oduwoleeyinojoluwa44@gmail.com
              </a>
            </div>
          </PixelBox>
        </div>

        <div className="absolute bottom-6 animate-bounce text-3xl select-none font-pixel text-white dark:text-yellow-400">
          ▼
        </div>

        {/* Ground blocks */}
        <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="ground-block flex-shrink-0" />
          ))}
        </div>
      </section>

      {/* ════════════════════ HNG PROJECTS ════════════════════ */}
      <section id="projects" className="min-h-screen bg-gradient-to-b from-teal-500 to-teal-600 dark:from-teal-900 dark:to-gray-900 px-4 py-20 relative">
        <div className="max-w-5xl mx-auto space-y-14">
          <div className="text-center">
            <PixelBox
              className="bg-green-700 text-white p-4 md:p-5 inline-block"
              rotation={-2}
              sticker={{ color: 'bg-yellow-300', position: 'top-left' }}
            >
              <h2 className="font-pixel text-base md:text-xl">🎮 HNG Projects</h2>
            </PixelBox>
            <p className="text-white/80 mt-4 text-sm">Three projects. One platform. Built from scratch.</p>
          </div>

          {PROJECTS.map((project, i) => (
            <div key={project.repo} className="space-y-0 group">
              <PixelBox
                className={`${project.headerColor} text-white p-3 md:p-4 z-10 relative`}
                rotation={i % 2 === 0 ? -1 : 1}
                sticker={i === 0 ? { color: 'bg-red-400', position: 'top-right' } : i === 2 ? { color: 'bg-pink-400', position: 'top-left' } : undefined}
              >
                <h3 className="font-pixel text-xs md:text-sm">
                  <span dangerouslySetInnerHTML={{ __html: project.emoji }} /> {project.name}
                </h3>
              </PixelBox>

              <PixelBox className="bg-white dark:bg-gray-800 p-5 md:p-6 -mt-1" rotation={0}>
                <p className="mb-4">{project.description}</p>

                <div className="border-t-4 border-dashed border-black dark:border-yellow-400 pt-4 mb-4">
                  <p className="font-bold text-xs mb-3 font-pixel text-green-700 dark:text-green-400">▸ What I Built</p>
                  <ul className="space-y-2 text-sm">
                    {project.contribution.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="text-yellow-500 flex-shrink-0">★</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`${project.color} text-white border-2 border-black dark:border-white px-3 py-1 text-xs font-bold shadow-[3px_3px_0_0_#000] dark:shadow-[3px_3px_0_0_#facc15] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-default`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 text-xs font-pixel">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline hover:scale-105 transition-transform inline-block"
                  >
                    [GitHub] →
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 dark:text-green-400 hover:underline hover:scale-105 transition-transform inline-block"
                    >
                      [Live API] →
                    </a>
                  )}
                </div>
              </PixelBox>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════ BACKEND SKILLS ════════════════════ */}
      <section id="skills" className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-gray-900 px-4 py-20 relative">
        <Coin className="top-16 right-20 hidden md:block" />
        <Star className="top-32 left-12 hidden md:block dark:block" />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <PixelBox
              className="bg-sky-500 text-white p-4 md:p-5 inline-block"
              rotation={2}
              sticker={{ color: 'bg-orange-400', position: 'bottom-right' }}
            >
              <h2 className="font-pixel text-base md:text-xl">🛠️ Backend Skills</h2>
            </PixelBox>
            <p className="text-white/80 mt-4 text-sm">Every skill links to a project where I used it. No filler.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => (
              <PixelBox
                key={skill.name}
                className="bg-white dark:bg-gray-800 p-4 group hover:!scale-105"
                rotation={i % 4 === 0 ? -2 : i % 4 === 1 ? 1.5 : i % 4 === 2 ? -1 : 2}
                sticker={i % 5 === 0 ? { color: 'bg-yellow-300', position: 'top-right' } : i % 7 === 0 ? { color: 'bg-pink-400', position: 'bottom-left' } : undefined}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl group-hover:animate-bounce">{skill.icon}</span>
                  <p className="font-bold text-sm">{skill.name}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.projects.map((p) => (
                    <span
                      key={p}
                      className={`text-[10px] ${skill.color} text-white px-2 py-0.5 border-2 border-black dark:border-white font-bold`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </PixelBox>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FEATURED PROJECT DEEP DIVE ════════════════════ */}
      <section id="deep-dive" className="min-h-screen bg-gradient-to-b from-orange-400 to-red-500 dark:from-orange-900 dark:to-gray-900 px-4 py-20 relative">
        <PixelCharacter className="absolute right-8 top-24 hidden xl:block" />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <PixelBox
              className="bg-red-600 text-white p-4 md:p-5 inline-block"
              rotation={-1}
              sticker={{ color: 'bg-yellow-300', position: 'top-right' }}
            >
              <h2 className="font-pixel text-base md:text-xl">🔬 Featured Deep Dive</h2>
            </PixelBox>
          </div>

          <PixelBox
            className="bg-white dark:bg-gray-800 p-6 md:p-8"
            rotation={0}
            sticker={{ color: 'bg-green-400', position: 'bottom-right' }}
          >
            <h3 className="font-pixel text-sm md:text-base mb-6 text-emerald-600 dark:text-emerald-400">
              🖥️ Insighta Labs+ Backend API
            </h3>

            <div className="mb-6">
              <h4 className="font-pixel text-xs text-red-600 dark:text-red-400 border-b-4 border-black dark:border-yellow-400 pb-1 mb-3">▸ The Problem</h4>
              <p>
                Insighta Labs needed a backend that could store, query, and serve demographic profile data at scale —
                with secure multi-client access (a web portal and a CLI), role-based permissions, and the ability to
                ingest large CSV datasets without blocking the server or losing partial data on failures.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-pixel text-xs text-blue-600 dark:text-blue-400 border-b-4 border-black dark:border-yellow-400 pb-1 mb-3">▸ Architecture &amp; Request Flow</h4>
              <div className="bg-gray-900 dark:bg-black p-4 text-xs font-mono text-green-400 border-4 border-black dark:border-yellow-400 overflow-x-auto mb-3 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#facc15]">
                <pre className="whitespace-pre">{`Client (Web / CLI)
  │
  ├─ GET /auth/github ──────→ GitHub OAuth (PKCE)
  │                            ↓
  ├─ GET /auth/github/callback → Token issuance
  │                               (access + refresh)
  │
  ├─ GET /profiles ──────────→ [rateLimit]
  │                            → [auth] → [apiVersion]
  │                            → Controller → queryCache
  │                            → TypeORM (indexed PG)
  │                            → X-Cache: MISS|HIT
  │
  ├─ GET /profiles/search ───→ parseNaturalLanguage()
  │                            → canonicalizeQuery()
  │                            → same cache path
  │
  └─ POST /profiles/import ──→ [admin only]
                                → streaming CSV parser
                                → chunked bulk INSERT
                                → partial-failure summary`}</pre>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-pixel text-xs text-purple-600 dark:text-purple-400 border-b-4 border-black dark:border-yellow-400 pb-1 mb-3">▸ Key Modules</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  { title: '🔐 Auth Routes', desc: 'GitHub OAuth, PKCE, token refresh, RBAC middleware', color: 'bg-red-50 dark:bg-red-900/30' },
                  { title: '👤 Profile Controller', desc: 'CRUD, filtered listing, natural-language search, CSV export', color: 'bg-blue-50 dark:bg-blue-900/30' },
                  { title: '⚡ Query Cache', desc: 'Canonical key generation, deterministic normalization, X-Cache headers', color: 'bg-yellow-50 dark:bg-yellow-900/30' },
                  { title: '📊 CSV Ingestion', desc: 'Streaming parser, chunked bulk inserts, skip-reasons summary', color: 'bg-green-50 dark:bg-green-900/30' },
                ].map((mod) => (
                  <div key={mod.title} className={`${mod.color} p-3 border-3 border-black dark:border-white shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#facc15]`}>
                    <p className="font-bold text-xs mb-1">{mod.title}</p>
                    <p className="text-xs opacity-80">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 border-4 border-black dark:border-yellow-400 shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#facc15]">
              <h4 className="font-pixel text-xs text-amber-700 dark:text-amber-400 mb-3">
                🏆 Challenge: Query Normalization
              </h4>
              <p className="mb-2 text-sm">
                Different phrasings of the same intent (e.g., &ldquo;female profiles from Nigeria&rdquo; vs &ldquo;women in Nigeria&rdquo;)
                were generating separate cache keys and hitting the database redundantly.
              </p>
              <p className="mb-2 text-sm">
                <strong>Solution:</strong> I built a deterministic rule-based parser (no AI/LLM) that converts
                natural-language queries into a normalized filter object using explicit synonym dictionaries. The parsed
                object is canonicalized — keys sorted, empty values stripped — before cache-key generation.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Result: equivalent intent always hits the same cache key → fewer DB queries → lower PG load.
              </p>
            </div>
          </PixelBox>
        </div>
      </section>

      {/* ════════════════════ LEARNING REFLECTION ════════════════════ */}
      <section id="reflection" className="min-h-screen flex items-center bg-gradient-to-b from-pink-500 to-fuchsia-600 dark:from-pink-900 dark:to-gray-900 px-4 py-20 relative">
        <Star className="top-20 left-[8%] dark:block hidden" />
        <Star className="bottom-32 right-[12%] dark:block hidden" />
        <Coin className="top-28 right-24 hidden lg:block" />

        <div className="max-w-3xl mx-auto space-y-8 w-full">
          <div className="text-center">
            <PixelBox
              className="bg-purple-700 text-white p-4 md:p-5 inline-block"
              rotation={1}
              sticker={{ color: 'bg-yellow-300', position: 'top-left' }}
            >
              <h2 className="font-pixel text-base md:text-xl">📝 What I Learned</h2>
            </PixelBox>
          </div>

          <PixelBox
            className="bg-white dark:bg-gray-800 p-6 md:p-8"
            rotation={-0.5}
            sticker={{ color: 'bg-green-400', position: 'bottom-left' }}
          >
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Before HNG, I could build APIs — routes, controllers, a database connection. What I couldn't do well
                was think about what happens when things <strong className="text-red-500">scale</strong>, <strong className="text-red-500">break</strong>, or get used by clients I didn't build. This
                internship forced me into those problems.
              </p>
              <p>
                The biggest shift was learning to <strong className="text-blue-500 dark:text-blue-400">design for multiple consumers</strong>. The Insighta Labs platform had three
                clients — a web portal, a CLI, and direct API access — all sharing the same backend. That meant my auth
                flow had to work for browser redirects <em>and</em> terminal-based PKCE flows. My error responses had
                to be useful in a JSON panel <em>and</em> a terminal table.
              </p>
              <p>
                <strong className="text-purple-500 dark:text-purple-400">Query optimization</strong> was another level-up. I went from &ldquo;add an index if it's slow&rdquo; to understanding
                composite indexes, query planning, connection pooling limits, and why canonical cache keys matter. The
                query normalization problem taught me more about deterministic systems than any tutorial could.
              </p>
              <p>
                On the process side, I got comfortable <strong className="text-green-600 dark:text-green-400">reading specs and translating them into code</strong> without hand-holding.
                Each stage had a technical requirements document, and I had to interpret it, make architecture decisions,
                and defend them.
              </p>
              <p className="font-pixel text-xs text-center pt-4 border-t-4 border-dashed border-black dark:border-yellow-400 text-gray-600 dark:text-gray-400">
                "I shipped something real under real pressure. That changed me."
              </p>
            </div>
          </PixelBox>
        </div>
      </section>

      {/* ════════════════════ CONTACT ════════════════════ */}
      <section id="contact" className="min-h-screen flex items-center bg-gradient-to-b from-green-500 to-emerald-700 dark:from-green-900 dark:to-gray-900 px-4 py-20 relative">
        <Cloud className="top-20 left-[15%] opacity-40 hidden md:block" />
        <PixelCharacter className="absolute left-8 bottom-24 hidden xl:block" />

        <div className="max-w-3xl mx-auto space-y-8 text-center w-full">
          <PixelBox
            className="bg-pink-500 text-white p-4 md:p-5 inline-block"
            rotation={-2}
            sticker={{ color: 'bg-yellow-300', position: 'bottom-right' }}
          >
            <h2 className="font-pixel text-base md:text-xl">🤝 Let's Connect</h2>
          </PixelBox>

          <PixelBox className="bg-white dark:bg-gray-700 p-4 mx-auto max-w-md" rotation={1}>
            <p>Interested in working together? Let's talk.</p>
          </PixelBox>

          <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              {
                name: 'GitHub',
                url: 'https://github.com/oduwoleeyinojuoluwa44',
                color: 'bg-purple-600',
                hoverColor: 'hover:bg-purple-500',
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.034c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/oduwole-eyinojuoluwa-taofeek-teo-54544b290/',
                color: 'bg-blue-500',
                hoverColor: 'hover:bg-blue-400',
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                name: 'Email',
                url: 'mailto:oduwoleeyinojoluwa44@gmail.com',
                color: 'bg-red-500',
                hoverColor: 'hover:bg-red-400',
                icon: (
                  <svg className="w-12 h-12 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                  </svg>
                ),
              },
            ].map((link, i) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group block">
                <PixelBox
                  className={`${link.color} ${link.hoverColor} p-6 text-white text-center transition-colors`}
                  rotation={i === 0 ? -2 : i === 1 ? 2 : -1}
                  sticker={i === 0 ? { color: 'bg-yellow-300', position: 'bottom-left' } : i === 2 ? { color: 'bg-pink-400', position: 'top-right' } : undefined}
                >
                  <div className="group-hover:scale-110 group-hover:-rotate-6 transition-transform">
                    {link.icon}
                  </div>
                  <p className="font-pixel text-[10px]">{link.name}</p>
                </PixelBox>
              </a>
            ))}
          </div>

          <div className="pt-10">
            <PixelBox className="bg-black dark:bg-yellow-400 dark:text-black text-white p-3 text-xs inline-block font-pixel" rotation={0}>
              &copy; 2025 Oduwole Eyinojuoluwa &middot; Built during HNG
            </PixelBox>
          </div>
        </div>

        {/* Ground blocks */}
        <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="ground-block flex-shrink-0" />
          ))}
        </div>
      </section>

      {/* ─── Dark mode toggle ─── */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 pixel-border bg-black dark:bg-yellow-400 text-white dark:text-black flex items-center justify-center text-2xl cursor-pointer hover:scale-110 active:scale-95 transition-transform"
        aria-label="Toggle dark mode"
      >
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
