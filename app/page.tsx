'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (section: string) => {
    setActiveSection(section)
    const element = document.getElementById(section)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = async () => {
    try {
      const response = await fetch('/api/download-resume')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Ayush_Kumar_Singh_Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading resume:', error)
    }
  }

  // Generate glowing drifting stars once
  const cyberParticles = useMemo(() => Array.from({ length: 85 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1.5, // crisp star size (between 1.5px and 4px)
    duration: Math.random() * 16 + 12, // smooth upward drift (12s to 28s)
    delay: Math.random() * -30, // distributed pre-scattered on load
    driftX: Math.random() * 140 - 70, // horizontal drift
    maxOpacity: Math.random() * 0.4 + 0.6, // bright star opacities (between 0.6 and 1.0)
    color: Math.random() > 0.5 ? 'rgba(168, 85, 247, 0.95)' : 'rgba(6, 182, 212, 0.95)', // highly saturated purple/cyan glow
  })), [])

  useEffect(() => {
    const sections = ['home', 'about', 'journey', 'projects', 'contact']
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        })
      }, {
        rootMargin: '-30% 0px -60% 0px'
      })
      observer.observe(el)
      return { observer, el }
    })

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <style>{`
        @keyframes drift-particle {
          0% {
            transform: translateY(105vh) translateX(0) scale(0.8);
            opacity: 0;
          }
          10% { opacity: var(--max-opacity); }
          90% { opacity: var(--max-opacity); }
          100% {
            transform: translateY(-5vh) translateX(var(--drift-x)) scale(1.2);
            opacity: 0;
          }
        }
        .cyber-particle {
          position: absolute;
          border-radius: 50%;
          animation: drift-particle var(--duration) linear var(--delay) infinite;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-b border-purple-500/30 shadow-lg shadow-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => {
                scrollToSection('home')
                setMobileMenuOpen(false)
              }}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="relative h-8 w-8 rounded-full border-2 border-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/galaxy-logo-ai0NXpBh4YFh500mUXn6XVL4XPBXsu.jpg"
                  alt="Galaxy Logo"
                  className="h-6 w-6 rounded-full"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-wide font-mono">AYUSH</span>
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Journey', id: 'journey' },
                { name: 'Projects', id: 'projects' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-purple-400 bg-purple-500/10 border border-purple-500/30'
                      : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg focus:outline-none transition-colors duration-300"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`md:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-purple-500/30 backdrop-blur-lg shadow-2xl transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-72 opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
          <div className="px-4 space-y-2 flex flex-col">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Journey', id: 'journey' },
              { name: 'Projects', id: 'projects' },
              { name: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20'
                    : 'text-gray-300 hover:text-purple-400 hover:bg-purple-500/5'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-10 pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-black">
          {/* Pitch Black Cyber Dust Background */}
          <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-black">
            {/* Drifting Cyber Dust Particles */}
            {cyberParticles.map((particle) => (
              <div
                key={particle.id}
                className="cyber-particle"
                style={{
                  left: `${particle.left}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 10px 2px ${particle.color}`,
                  '--duration': `${particle.duration}s`,
                  '--delay': `${particle.delay}s`,
                  '--drift-x': `${particle.driftX}px`,
                  '--max-opacity': `${particle.maxOpacity}`,
                } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="relative z-10 text-center max-w-5xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Ayush | Software Engineer
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Driven computer science graduate passionate about building scalable applications, secure systems, and smart IoT solutions. Fast learner with strong fundamentals in full-stack development, Java backend, and proven success in delivering real-world projects.
            </p>
            <div className="flex gap-6 justify-center mb-8">
              <a
                href="https://www.linkedin.com/in/ayush-singh25"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/ayush829"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600/20 transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://codeforces.com/profile/ayush250103"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-orange-600/20 transition-all duration-300 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </a>
            </div>
            <button
              onClick={() => scrollToSection('about')}
              className="mx-auto mt-16 animate-bounce p-3 rounded-full bg-gray-900/60 border border-purple-500/30 hover:border-purple-500/80 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
              aria-label="Scroll to About Section"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-purple-400"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-gray-950 relative z-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  I&apos;m Ayush Kumar Singh, a driven computer science graduate passionate about building scalable applications and smart IoT solutions. With expertise in Java, Spring Boot, and full-stack development, I bring strong fundamentals and proven success in delivering real-world projects.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Currently pursuing advanced training in Java Full-Stack development, I&apos;m committed to building secure, efficient systems and collaborating with innovative teams to push the boundaries of what&apos;s possible.
                </p>
                <button
                  onClick={downloadResume}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full font-medium transition-all duration-300"
                >
                  Download Resume
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">💻</div>
                  <div className="text-xl font-bold text-purple-400 mb-2">Frontend</div>
                  <div className="text-gray-300 text-sm">HTML5, CSS3, JavaScript</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">⚙️</div>
                  <div className="text-xl font-bold text-cyan-400 mb-2">Backend</div>
                  <div className="text-gray-300 text-sm">Java, Spring Boot, REST APIs, SQL</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">📱</div>
                  <div className="text-xl font-bold text-green-400 mb-2">IoT & Python</div>
                  <div className="text-gray-300 text-sm">Arduino IDE, Python, Streamlit</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl mb-3">🛠️</div>
                  <div className="text-xl font-bold text-orange-400 mb-2">Tools</div>
                  <div className="text-gray-300 text-sm">IntelliJ, MySQL, Git, Postman, VS Code</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section id="journey" className="py-20 px-6 bg-gray-900/30 relative z-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Journey
            </h2>

            {/* Professional Experience */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-cyan-400 mb-8">Professional Experience</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-cyan-500/30 rounded-xl p-8 transform hover:translate-x-2 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">Java Full Stack Trainee</h4>
                    <span className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0">
                      December 2025 - March 2026
                    </span>
                  </div>
                  <p className="text-cyan-400 mb-4 font-medium">Revature</p>
                  <ul className="text-gray-300 leading-relaxed space-y-2">
                    <li>• Completed hands-on training in Java, Spring Boot, REST APIs, and database management, building scalable backend applications.</li>
                    <li>• Gained practical experience in authentication, API development, and full-stack integration using industry-standard tools.</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-purple-500/30 rounded-xl p-8 transform hover:translate-x-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">MERN Stack Developer Intern</h4>
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0">
                      February 2024 - May 2024
                    </span>
                  </div>
                  <p className="text-purple-400 mb-4 font-medium">Allsoft Solutions and Services Pvt. Ltd. • Remote</p>
                  <ul className="text-gray-300 leading-relaxed space-y-2">
                    <li>• Developed and deployed a scalable web application using the MERN stack, integrating front-end and back-end systems seamlessly.</li>
                    <li>• Enhanced data management using MongoDB and improved UI responsiveness with React.js and Material UI.</li>
                    <li>• Built robust server-side logic and secured RESTful APIs with Node.js and Express.</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-blue-500/30 rounded-xl p-8 transform hover:translate-x-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">Software Developer Intern</h4>
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0">
                      June 2023 - July 2023
                    </span>
                  </div>
                  <p className="text-blue-400 mb-4 font-medium">Ardent Computech Pvt. Ltd. • Remote</p>
                  <ul className="text-gray-300 leading-relaxed space-y-2">
                    <li>• Developed and deployed a mobile application using Flutter, contributing to a 30% increase in user engagement.</li>
                    <li>• Worked collaboratively with a team of 5 developers and 1 product manager to improve functionality and UX.</li>
                    <li>• Integrated RESTful APIs with React.js frontend, achieving 20% faster response time.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-8">Education</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-purple-500/30 rounded-xl p-8 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">Bachelor of Technology in Computer Science</h4>
                    <span className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0">
                      2020 - 2024
                    </span>
                  </div>
                  <p className="text-purple-400 mb-2 font-medium">Shri Vaishnav Vidyapeeth Vishwavidyalaya</p>
                  <p className="text-gray-300 font-semibold">CGPA - 8.29</p>
                </div>
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-cyan-500/30 rounded-xl p-8 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">Higher Secondary Education</h4>
                    <span className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0">
                      2019 - 2020
                    </span>
                  </div>
                  <p className="text-cyan-400 mb-2 font-medium">Kendriya Vidyalaya No.2 Indore</p>
                  <p className="text-gray-300 font-semibold">Percentage - 81.2%</p>
                </div>
                <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-green-500/30 rounded-xl p-8 transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className="text-xl font-bold text-white">Secondary Education</h4>
                    <span className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium mt-2 md:mt-0">
                      2017 - 2018
                    </span>
                  </div>
                  <p className="text-green-400 mb-2 font-medium">Kendriya Vidyalaya No.2 Indore</p>
                  <p className="text-gray-300 font-semibold">Percentage - 77.6%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="py-20 px-6 bg-gray-900/30 relative z-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'Python', icon: '🐍' },
                { name: 'Java', icon: '☕' },
                { name: 'HTML5', icon: '🌐' },
                { name: 'CSS3', icon: '🎨' },
                { name: 'JavaScript', icon: '📜' },
                { name: 'Spring Boot', icon: '🌱' },
                { name: 'REST API', icon: '🔗' },
                { name: 'IntelliJ', icon: '💡' },
                { name: 'MySQL', icon: '🗄️' },
                { name: 'Postman', icon: '🚀' },
                { name: 'Git', icon: '📦' },
                { name: 'Vercel', icon: '▲' },
                { name: 'MATLAB', icon: '📊' },
                { name: 'Arduino IDE', icon: '📟' },
                { name: 'Visual Studio', icon: '💻' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-center transform hover:scale-110 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <p className="text-gray-300 font-semibold text-sm">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 bg-gray-950 relative z-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* CipherVoid Project */}
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-purple-600 to-purple-900">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4uwRjcemGPeIHD6yiwfWcA7YxBimdJ.png"
                    alt="CipherVoid Password Manager"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">CipherVoid Vault - Password Manager</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Designed and developed a secure password management system using Java, Spring Boot, and REST APIs with JWT-based authentication. Implemented AES encryption, CRUD operations, 2FA, password generator, and security audit features.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">Java</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">Spring Boot</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">JWT</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">AES Encryption</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://ciphervoid.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full text-center font-medium transition-all duration-300 text-sm"
                  >
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/ayush829/CipherVoid.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full text-center font-medium transition-all duration-300 text-sm"
                  >
                    Source Code
                  </a>
                </div>
              </div>

              {/* HireNova Project */}
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-green-600 to-teal-900">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ib9y5kSCCjoyVMFl9YJ1VxcRmYZdiU.png"
                    alt="HireNova AI Recruitment Platform"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">HireNova - Recruitment Platform</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  AI-powered recruitment platform that streamlines hiring processes. Features intelligent candidate matching, resume parsing, interview scheduling, and skill assessments to help companies find the perfect talent.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">Python</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">Streamlit</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">AI</span>
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://hire-nova.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full text-center font-medium transition-all duration-300 text-sm"
                  >
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/ayush829/HireNova.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-full text-center font-medium transition-all duration-300 text-sm"
                  >
                    Source Code
                  </a>
                </div>
              </div>

              {/* IoT Smart Water Bottle */}
              <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-900">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yP9gkoxPEOO7hEzlNtUJSafIRIzHM2.png"
                    alt="IoT Smart Water Bottle"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">IoT-Based Smart Water Bottle</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Engineered an IoT-enabled smart bottle to monitor water levels and temperature, sending real-time hydration reminders via the Blynk mobile app. Utilized Arduino IDE and ESP8266 Wi-Fi module for hardware integration.
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">Arduino IDE</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">ESP8266</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">Blynk</span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs">IoT</span>
                </div>
                <a
                  href="https://github.com/ayush829/Smart_Water_Bottle.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full text-center font-medium transition-all duration-300 text-sm"
                >
                  View Source Code
                </a>
              </div>


            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-gray-900/30 relative z-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Contact
            </h2>
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-purple-400"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white">ayush250103@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-cyan-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">+91-8349503108</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-green-400"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">Indore, India</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
                  <div className="flex gap-4 justify-center">
                    <a
                      href="https://www.linkedin.com/in/ayush-singh25"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/ayush829"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-800/50 hover:bg-purple-600/20 transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                    <a
                      href="https://codeforces.com/profile/ayush250103"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-800/50 hover:bg-orange-600/20 transition-all duration-300 hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                      >
                        <path d="m18 16 4-4-4-4" />
                        <path d="m6 8-4 4 4 4" />
                        <path d="m14.5 4-5 16" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-800/50 backdrop-blur-md bg-gray-950/30 relative z-20">
          <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Ayush Kumar Singh. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
