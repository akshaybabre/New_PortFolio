import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioConfig } from '../config/portfolio';
import { Mail, MapPin, Phone, Download, Award, Code2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState('frontend');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill bars
      gsap.utils.toArray('.skill-bar').forEach((bar: any, index) => {
        const level = bar.dataset.level;
        gsap.fromTo(bar.querySelector('.skill-progress'),
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%'
            }
          }
        );
      });

      // Animate cards
      gsap.utils.toArray('.about-card').forEach((card: any, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });

      // Animate profile image
      gsap.fromTo('.profile-image',
        { opacity: 0, scale: 0.8, rotateY: 45 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.profile-image',
            start: 'top 85%'
          }
        }
      );

    }, aboutRef);

    return () => ctx.revert();
  }, [activeSkillCategory]);

  const skillCategories = [
    { key: 'frontend', label: 'Frontend', icon: '🎨', color: 'from-purple-500 to-pink-500' },
    { key: 'backend', label: 'Backend', icon: '⚙️', color: 'from-blue-500 to-indigo-500' },
    { key: 'tools', label: 'Tools', icon: '🛠️', color: 'from-green-500 to-teal-500' },
    { key: 'libraries', label: 'Libraries', icon: '📚', color: 'from-orange-500 to-red-500' }
  ];

  const renderSkillCategory = (categoryKey: string, skills: any[], color: string) => (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={skill.name} className="skill-bar group" data-level={skill.level}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <div>
                <span className="font-semibold text-gray-800 dark:text-gray-200 block">
                  {skill.name}
                </span>
                {skill.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {skill.description}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{skill.level}%</span>
            </div>
          </div>
          <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className={`skill-progress h-full bg-gradient-to-r ${color} rounded-full relative transition-all duration-300 group-hover:brightness-110`}
              style={{ width: '0%' }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={aboutRef} className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {portfolioConfig.personal.shortBio}
          </p>
        </div>

        {/* Enhanced Bio Section */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Profile Image - Fixed on Scroll */}
          <div className="lg:col-span-2 sticky top-28 self-start">
            <div className="about-card">
              <div className="relative">
                <div className="profile-image relative">
                  <img
                    src={portfolioConfig.personal.profileImage}
                    alt={portfolioConfig.personal.name}
                    className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-3xl"></div>
                </div>
                
                {/* Floating Stats - Positioned Below Image Without Gap */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        {portfolioConfig.stats.projects}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        {portfolioConfig.stats.technologies}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story and Info */}
          <div className="lg:col-span-3 space-y-8">
            <div className="about-card">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    My Story
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-lg">
                  {portfolioConfig.personal.bio}
                </p>
                
                {/* Contact Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{portfolioConfig.personal.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <Phone className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{portfolioConfig.personal.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl sm:col-span-2">
                    <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{portfolioConfig.personal.location}</span>
                  </div>
                </div>

                {/* Resume Download */}
                <a
                  href={portfolioConfig.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* Education & Training */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="about-card bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Education</h3>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">{portfolioConfig.education.degree}</h4>
                  <p className="text-purple-100">{portfolioConfig.education.field}</p>
                  <p className="text-purple-200 text-sm">{portfolioConfig.education.institution}</p>
                  <p className="text-purple-200 text-sm">{portfolioConfig.education.period} • {portfolioConfig.education.cgpa}</p>
                </div>
              </div>

              <div className="about-card bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Code2 className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Training</h3>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">{portfolioConfig.training.program}</h4>
                  <p className="text-green-100">{portfolioConfig.training.institution}</p>
                  <p className="text-green-200 text-sm">{portfolioConfig.training.period}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Technologies and tools I work with
            </p>
          </div>

          {/* Skill Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveSkillCategory(category.key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeSkillCategory === category.key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md hover:scale-105'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          {/* Active Skills Display */}
          <div className="about-card bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center space-x-3 mb-8">
              <div className={`w-12 h-12 bg-gradient-to-r ${skillCategories.find(cat => cat.key === activeSkillCategory)?.color} rounded-full flex items-center justify-center text-2xl`}>
                {skillCategories.find(cat => cat.key === activeSkillCategory)?.icon}
              </div>
              <h3 className={`text-3xl font-bold bg-gradient-to-r ${skillCategories.find(cat => cat.key === activeSkillCategory)?.color} bg-clip-text text-transparent`}>
                {skillCategories.find(cat => cat.key === activeSkillCategory)?.label} Technologies
              </h3>
            </div>
            {renderSkillCategory(
              activeSkillCategory,
              portfolioConfig.skills[activeSkillCategory as keyof typeof portfolioConfig.skills],
              skillCategories.find(cat => cat.key === activeSkillCategory)?.color || 'from-purple-500 to-pink-500'
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              My professional journey
            </p>
          </div>

          <div className="space-y-8">
            {portfolioConfig.experience.map((exp, index) => (
              <div key={index} className="about-card bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {exp.title}
                      </h3>
                    </div>
                    <h4 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-1">
                      {exp.company}
                    </h4>
                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span className="capitalize">{exp.type}</span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0">
                    <span className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-600 dark:text-gray-300 flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:shadow-md transition-shadow"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};