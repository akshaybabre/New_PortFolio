"use client"

import { useEffect, useRef, useState } from "react"
import { Hero } from "../components/Hero/Hero"
import { AnimatedBackground } from "../components/Background/AnimatedBackground"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { portfolioConfig } from "../config/portfolio"
import { ExternalLink, Github, Calendar, Mail, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom" // Added for navigation

gsap.registerPlugin(ScrollTrigger)

export const Home = () => {
  const homeRef = useRef<HTMLDivElement>(null)
  const [activeSkillTab, setActiveSkillTab] = useState<"frontend" | "backend" | "tools">("frontend")
  const navigate = useNavigate() // Added for navigation

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray(".fade-in-up").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        )
      })

      // Parallax effect for sections
      gsap.utils.toArray(".parallax").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }, homeRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={homeRef} className="relative">
      <AnimatedBackground variant="particles" />

      {/* Hero Section */}
      <Hero />

      {/* Skills Section */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="fade-in-up text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-3 sm:mb-4">
              Technical Skills
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Crafting digital experiences with modern technologies
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="fade-in-up mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => setActiveSkillTab("frontend")}
                className={`group relative px-6 py-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 ${
                  activeSkillTab === "frontend"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80"
                } border border-white/20 dark:border-gray-700/30`}
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                    />
                  </svg>
                  <span>Frontend</span>
                  <span
                    className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                      activeSkillTab === "frontend"
                        ? "bg-white/20 text-white"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    }`}
                  >
                    {portfolioConfig.skills.frontend.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveSkillTab("backend")}
                className={`group relative px-6 py-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 ${
                  activeSkillTab === "backend"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80"
                } border border-white/20 dark:border-gray-700/30`}
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                  <span>Backend</span>
                  <span
                    className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                      activeSkillTab === "backend"
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {portfolioConfig.skills.backend.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveSkillTab("tools")}
                className={`group relative px-6 py-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 ${
                  activeSkillTab === "tools"
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/25"
                    : "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80"
                } border border-white/20 dark:border-gray-700/30`}
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Tools</span>
                  <span
                    className={`text-xs sm:text-sm px-2 py-1 rounded-full ${
                      activeSkillTab === "tools"
                        ? "bg-white/20 text-white"
                        : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                    }`}
                  >
                    {portfolioConfig.skills.tools.length}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Skills Content */}
          <div className="fade-in-up">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 border border-white/20 dark:border-gray-700/30 shadow-xl">
              {/* Frontend Skills */}
              {activeSkillTab === "frontend" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                      Frontend Development
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                      Creating beautiful and interactive user interfaces
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {portfolioConfig.skills.frontend.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg border border-purple-100 dark:border-purple-800/30"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <div className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                          {skill.name}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-sm sm:text-base text-purple-600 dark:text-purple-400 font-bold">
                          {skill.level}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Backend Skills */}
              {activeSkillTab === "backend" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                      Backend Development
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                      Building robust server-side applications and APIs
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {portfolioConfig.skills.backend.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg border border-blue-100 dark:border-blue-800/30"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <div className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                          {skill.name}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-bold">
                          {skill.level}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Skills */}
              {activeSkillTab === "tools" && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                      Development Tools
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                      Essential tools for efficient development workflow
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {portfolioConfig.skills.tools.map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg border border-green-100 dark:border-green-800/30"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-125 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <div className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                          {skill.name}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-teal-500 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        <div className="text-sm sm:text-base text-green-600 dark:text-green-400 font-bold">
                          {skill.level}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Section */}
          <div className="fade-in-up mt-12 sm:mt-16 lg:mt-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center border border-white/20 dark:border-gray-700/30 hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {portfolioConfig.skills.frontend.length +
                    portfolioConfig.skills.backend.length +
                    portfolioConfig.skills.tools.length}
                  +
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center border border-white/20 dark:border-gray-700/30 hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  1+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center border border-white/20 dark:border-gray-700/30 hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  3+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">Projects Done</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center border border-white/20 dark:border-gray-700/30 hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 parallax">
          <AnimatedBackground variant="minimal" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="fade-in-up text-center mb-16">
            <h2 className="text-5xl font-bold text-gradient-animate mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Some of my recent work</p>
          </div>

          <div className="space-y-12">
            {portfolioConfig.projects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className={`fade-in-up ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:flex gap-12 items-center`}
              >
                <div className="lg:w-1/2">
                  <div className="glass-effect rounded-3xl p-2 card-hover group overflow-hidden">
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 right-4 flex space-x-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 pulse-effect"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:animate-bounce" />
                      <span>View Live</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 glass-effect text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 parallax">
          <AnimatedBackground variant="particles" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="fade-in-up text-center mb-16">
            <h2 className="text-5xl font-bold text-gradient-animate mb-6">Latest Articles</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Thoughts and insights on development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioConfig.blogs.slice(0, 3).map((blog) => (
              <div key={blog.id} className="fade-in-up glass-effect rounded-3xl overflow-hidden card-hover group">
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">{blog.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(`/blogs/${blog.id}`)} // Navigate to /blogs/:id
                    className="group/btn w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 pulse-effect"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 parallax">
          <AnimatedBackground variant="gradient" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="fade-in-up text-center">
            <div className="glass-effect rounded-3xl p-12 card-hover">
              <Mail className="w-16 h-16 text-purple-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gradient-animate mb-6">Let's Work Together</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${portfolioConfig.personal.email}`}
                  className="group bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 pulse-effect"
                >
                  <Mail className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Send Email</span>
                </a>
                <a
                  href={`tel:${portfolioConfig.personal.phone}`}
                  className="group glass-effect text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}