import { useState, useEffect } from 'react'

const NAV_LINKS = ['about', 'projects', 'skills', 'deep-dive', 'reflection', 'contact']

const PROJECTS = [
  {
    name: 'Insighta Labs+ Backend API',
    repo: 'Data-persistence-api',
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

const SKILLS: { name: string; projects: string[] }[] = [
  { name: 'API Design (REST)', projects: ['Backend API'] },
  { name: 'Authentication (OAuth/PKCE/JWT)', projects: ['Backend API', 'CLI'] },
  { name: 'Role-Based Access Control', projects: ['Backend API', 'Web Portal'] },
  { name: 'Database Design (PostgreSQL)', projects: ['Backend API'] },
  { name: 'Query Optimization & Indexing', projects: ['Backend API'] },
  { name: 'Caching (In-Memory)', projects: ['Backend API'] },
  { name: 'Streaming Data Ingestion (CSV)', projects: ['Backend API'] },
  { name: 'CLI Tooling', projects: ['CLI'] },
  { name: 'State Management (Zustand)', projects: ['Web Portal'] },
  { name: 'Testing (Jest)', projects: ['Backend API'] },
  { name: 'Deployment (Vercel)', projects: ['Backend API', 'Web Portal'] },
  { name: 'TypeScript', projects: ['Backend API', 'CLI', 'Web Portal'] },
]

function PixelBox({
  children,
  className = '',
  rotation = 0,
}: {
  children: React.ReactNode
  className?: string
  rotation?: number
}) {
  return (
    <div
      className={`pixel-border relative transition-all duration-300 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  )
}

function Nav({ activeSection }: { activeSection: string }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b-4 border-yellow-400">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-pixel text-yellow-400 text-[10px] sm:text-xs hidden sm:block">TEO.dev</span>
        <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className={`text-[10px] sm:text-xs font-pixel transition-colors ${
                activeSection === link ? 'text-yellow-400' : 'text-white hover:text-yellow-300'
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

export default function App() {
  const [isDark, setIsDark] = useState(false)
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
      { threshold: 0.3 }
    )
    NAV_LINKS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="text-black dark:text-white text-sm md:text-base leading-relaxed">
      <Nav activeSection={activeSection} />

      {/* ── HERO / ABOUT ── */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center bg-sky-500 dark:bg-gray-900 px-4 pt-20 pb-16 relative overflow-hidden"
      >
        <div className="absolute top-20 left-[20%] w-32 h-14 bg-white border-4 border-black dark:bg-gray-700 dark:border-white opacity-70 hidden md:block">
          <div className="absolute -top-4 left-8 w-16 h-8 bg-white border-4 border-black dark:bg-gray-700 dark:border-white" />
        </div>
        <div className="absolute top-36 right-[25%] w-28 h-12 bg-white border-4 border-black dark:bg-gray-700 dark:border-white opacity-50 hidden md:block">
          <div className="absolute -top-3 left-6 w-14 h-6 bg-white border-4 border-black dark:bg-gray-700 dark:border-white" />
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-3xl">
          <PixelBox className="bg-white dark:bg-gray-800 p-5 md:p-8 inline-block" rotation={-2}>
            <h1 className="font-pixel text-xl md:text-3xl lg:text-4xl leading-snug">Oduwole Eyinojuoluwa</h1>
          </PixelBox>

          <PixelBox className="bg-yellow-400 dark:bg-yellow-500 text-black p-3 md:p-4 mx-auto max-w-xl" rotation={1}>
            <p className="font-pixel text-[10px] md:text-xs">Backend Developer</p>
          </PixelBox>

          <PixelBox className="bg-white dark:bg-gray-800 p-5 md:p-6 mx-auto max-w-2xl text-left" rotation={0}>
            <p className="mb-3">
              Backend engineer with hands-on experience building production APIs, CLI tools, and full-stack platforms.
              Currently interning at <strong>HNG Tech</strong>, where I shipped a multi-stage profile intelligence
              platform — from database design and OAuth security to query optimization and streaming data ingestion.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs mt-4 border-t-2 border-dashed border-black dark:border-white pt-3">
              <span><strong>Location:</strong> Nigeria (WAT, UTC+1)</span>
              <span><strong>Role:</strong> Backend Developer Intern @ HNG</span>
              <a href="mailto:oduwoleeyinojoluwa44@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                oduwoleeyinojoluwa44@gmail.com
              </a>
            </div>
          </PixelBox>
        </div>

        <div className="absolute bottom-6 animate-bounce text-2xl select-none">&#8595;</div>
      </section>

      {/* ── HNG PROJECTS ── */}
      <section id="projects" className="min-h-screen bg-teal-400 dark:bg-teal-900 px-4 py-20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <PixelBox className="bg-green-700 text-white p-4 inline-block" rotation={-1}>
              <h2 className="font-pixel text-base md:text-xl">HNG Projects</h2>
            </PixelBox>
          </div>

          {PROJECTS.map((project, i) => (
            <div key={project.repo} className="space-y-1">
              <PixelBox className="bg-green-800 text-white p-3 md:p-4 z-10 relative" rotation={i % 2 === 0 ? -1 : 1}>
                <h3 className="font-pixel text-xs md:text-sm">{project.name}</h3>
              </PixelBox>

              <PixelBox className="bg-white dark:bg-gray-800 p-5 md:p-6" rotation={0}>
                <p className="mb-4">{project.description}</p>

                <div className="border-t-2 border-dashed border-black dark:border-white pt-4 mb-4">
                  <p className="font-bold text-xs mb-2 font-pixel">What I Built</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {project.contribution.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 px-2 py-1 text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 text-xs">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold"
                  >
                    GitHub Repo &rarr;
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 dark:text-green-400 hover:underline font-bold"
                    >
                      Live API &rarr;
                    </a>
                  )}
                </div>
              </PixelBox>
            </div>
          ))}
        </div>
      </section>

      {/* ── BACKEND SKILLS ── */}
      <section id="skills" className="min-h-screen bg-indigo-500 dark:bg-indigo-900 px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <PixelBox className="bg-sky-500 text-white p-4 inline-block" rotation={2}>
              <h2 className="font-pixel text-base md:text-xl">Backend Skills</h2>
            </PixelBox>
            <p className="text-white mt-6 text-sm">Every skill below links to a project where I used it.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((skill, i) => (
              <PixelBox
                key={skill.name}
                className="bg-white dark:bg-gray-800 p-4"
                rotation={i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0}
              >
                <p className="font-bold text-sm mb-2">{skill.name}</p>
                <div className="flex flex-wrap gap-1">
                  {skill.projects.map((p) => (
                    <span key={p} className="text-[10px] bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-2 py-0.5 border border-indigo-300 dark:border-indigo-600">
                      {p}
                    </span>
                  ))}
                </div>
              </PixelBox>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT DEEP DIVE ── */}
      <section id="deep-dive" className="min-h-screen bg-orange-400 dark:bg-orange-900 px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <PixelBox className="bg-red-600 text-white p-4 inline-block" rotation={-1}>
              <h2 className="font-pixel text-base md:text-xl">Featured Deep Dive</h2>
            </PixelBox>
          </div>

          <PixelBox className="bg-white dark:bg-gray-800 p-6 md:p-8" rotation={0}>
            <h3 className="font-pixel text-sm md:text-base mb-6 text-green-700 dark:text-green-400">
              Insighta Labs+ Backend API
            </h3>

            <div className="mb-6">
              <h4 className="font-bold text-sm border-b-2 border-black dark:border-white pb-1 mb-2">The Problem</h4>
              <p>
                Insighta Labs needed a backend that could store, query, and serve demographic profile data at scale —
                with secure multi-client access (a web portal and a CLI), role-based permissions, and the ability to
                ingest large CSV datasets without blocking the server or losing partial data on failures.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-sm border-b-2 border-black dark:border-white pb-1 mb-2">Architecture &amp; Request Flow</h4>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 text-xs font-mono border-2 border-black dark:border-gray-600 overflow-x-auto mb-3">
                <pre className="whitespace-pre">{`Client (Web / CLI)
  │
  ├─ GET /auth/github ──────→ GitHub OAuth (PKCE)
  │                            ↓
  ├─ GET /auth/github/callback → Token issuance (access + refresh)
  │
  ├─ GET /profiles ──────────→ [rateLimit] → [auth] → [apiVersion]
  │                              → Controller → queryCache check
  │                              → TypeORM query (indexed PG)
  │                              → cache MISS/HIT header
  │
  ├─ GET /profiles/search ───→ parseNaturalLanguageQuery()
  │                              → canonicalizeQuery()
  │                              → same cache path
  │
  └─ POST /profiles/import ──→ [admin only]
                                 → streaming CSV parser
                                 → chunked bulk INSERT
                                 → partial-failure summary`}</pre>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-sm border-b-2 border-black dark:border-white pb-1 mb-2">Key Endpoints &amp; Modules</h4>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-900 p-3 border-2 border-black dark:border-gray-600">
                  <p className="font-bold text-xs mb-1">Auth Routes</p>
                  <p className="text-xs">GitHub OAuth, PKCE, token refresh, RBAC middleware</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 border-2 border-black dark:border-gray-600">
                  <p className="font-bold text-xs mb-1">Profile Controller</p>
                  <p className="text-xs">CRUD, filtered listing, natural-language search, CSV export</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 border-2 border-black dark:border-gray-600">
                  <p className="font-bold text-xs mb-1">Query Cache</p>
                  <p className="text-xs">Canonical key generation, deterministic normalization, X-Cache headers</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-3 border-2 border-black dark:border-gray-600">
                  <p className="font-bold text-xs mb-1">CSV Ingestion Service</p>
                  <p className="text-xs">Streaming parser, chunked bulk inserts, skip-reasons summary</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm border-b-2 border-black dark:border-white pb-1 mb-2">
                Technical Challenge: Query Normalization
              </h4>
              <p className="mb-2">
                The search endpoint supported both structured filters and natural-language queries. Different phrasings
                of the same intent (e.g., &ldquo;female profiles from Nigeria&rdquo; vs &ldquo;women in Nigeria&rdquo;) were generating
                separate cache keys and hitting the database redundantly.
              </p>
              <p className="mb-2">
                <strong>Solution:</strong> I built a deterministic rule-based parser (no AI/LLM) that converts
                natural-language queries into a normalized filter object using explicit synonym dictionaries for gender,
                age semantics, and country phrases. The parsed object is then canonicalized — keys sorted, empty values
                stripped — before cache-key generation. This means equivalent intent always maps to the same cache key,
                regardless of how the user phrases it.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Result: repeated query patterns hit cache instead of the database, reducing load on the PostgreSQL
                instance without introducing any non-deterministic behavior.
              </p>
            </div>
          </PixelBox>
        </div>
      </section>

      {/* ── LEARNING REFLECTION ── */}
      <section id="reflection" className="min-h-screen flex items-center bg-pink-400 dark:bg-pink-900 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <PixelBox className="bg-purple-600 text-white p-4 inline-block" rotation={1}>
              <h2 className="font-pixel text-base md:text-xl">What I Learned</h2>
            </PixelBox>
          </div>

          <PixelBox className="bg-white dark:bg-gray-800 p-6 md:p-8" rotation={0}>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Before HNG, I could build APIs — routes, controllers, a database connection. What I couldn't do well
                was think about what happens when things scale, break, or get used by clients I didn't build. This
                internship forced me into those problems.
              </p>
              <p>
                The biggest shift was learning to design for multiple consumers. The Insighta Labs platform had three
                clients — a web portal, a CLI, and direct API access — all sharing the same backend. That meant my auth
                flow had to work for browser redirects <em>and</em> terminal-based PKCE flows. My error responses had
                to be useful in a JSON panel <em>and</em> a terminal table. It changed how I think about API contracts.
              </p>
              <p>
                Query optimization was another level-up. I went from &ldquo;add an index if it's slow&rdquo; to understanding
                composite indexes, query planning, connection pooling limits, and why canonical cache keys matter. The
                query normalization problem — making &ldquo;women from Nigeria&rdquo; and &ldquo;female profiles in Nigeria&rdquo; hit the same
                cache — taught me more about deterministic systems than any tutorial could.
              </p>
              <p>
                On the process side, I got comfortable reading specs and translating them into code without hand-holding.
                Each stage had a technical requirements document, and I had to interpret it, make architecture decisions,
                and defend them. That's different from following a tutorial — you have to own the tradeoffs.
              </p>
              <p>
                I'm a better engineer now because I've shipped something real under time pressure, with real constraints,
                and without the safety net of &ldquo;this is just practice.&rdquo;
              </p>
            </div>
          </PixelBox>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="min-h-screen flex items-center bg-green-600 dark:bg-green-900 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-8 text-center w-full">
          <PixelBox className="bg-pink-500 text-white p-4 inline-block" rotation={-2}>
            <h2 className="font-pixel text-base md:text-xl">Let's Connect</h2>
          </PixelBox>

          <PixelBox className="bg-white dark:bg-gray-700 p-4 mx-auto max-w-md" rotation={1}>
            <p>Interested in working together or have questions about my work? Reach out.</p>
          </PixelBox>

          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <a href="https://github.com/oduwoleeyinojuoluwa44" target="_blank" rel="noopener noreferrer" className="group block">
              <PixelBox className="bg-purple-600 p-6 text-white text-center" rotation={-1}>
                <svg className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.034c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p className="font-pixel text-[10px]">GitHub</p>
              </PixelBox>
            </a>

            <a href="https://www.linkedin.com/in/oduwole-eyinojuoluwa-taofeek-teo-54544b290/" target="_blank" rel="noopener noreferrer" className="group block">
              <PixelBox className="bg-blue-500 p-6 text-white text-center" rotation={1}>
                <svg className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <p className="font-pixel text-[10px]">LinkedIn</p>
              </PixelBox>
            </a>

            <a href="mailto:oduwoleeyinojoluwa44@gmail.com" className="group block">
              <PixelBox className="bg-red-500 p-6 text-white text-center" rotation={-1}>
                <svg className="w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                </svg>
                <p className="font-pixel text-[10px]">Email</p>
              </PixelBox>
            </a>
          </div>

          <div className="pt-8">
            <PixelBox className="bg-black dark:bg-white dark:text-black text-white p-2 text-xs inline-block" rotation={0}>
              &copy; 2025 Oduwole Eyinojuoluwa. Built during HNG Internship.
            </PixelBox>
          </div>
        </div>
      </section>

      {/* Dark mode toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 pixel-border bg-black dark:bg-yellow-400 text-white dark:text-black flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  )
}
