import React, { useEffect, useRef } from 'react';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { portfolioConfig } from '../../config/portfolio';
import { showToast } from '../Toast/CustomToast';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations with enhanced timing
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo('.hero-title',
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power4.out' }
      )
        .fromTo('.hero-subtitle',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8'
        )
        .fromTo('.hero-description',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6'
        )
        .fromTo('.hero-buttons',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.4'
        )
        .fromTo('.hero-social',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.6'
        )
        .fromTo('.hero-image',
          { opacity: 0, scale: 0.8, rotation: -10 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' }, '-=1'
        );

      // Continuous floating animation
      gsap.to('.hero-image', {
        y: -20,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      // Background elements animation
      gsap.to('.bg-decoration', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleDownloadCV = () => {
    showToast.success('CV download will start shortly!', 3000);
    // Add actual download logic here
    setTimeout(() => {
      window.open('/resume.pdf', '_blank');
    }, 1000);
  };

  const handleContactClick = () => {
    showToast.info('Scrolling to contact section...', 2000);
    const contactSection = document.querySelector('#contact') ||
      document.querySelector('[data-section="contact"]') ||
      document.querySelector('.contact-section');

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Scroll to bottom if no specific contact section found
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-gray-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-decoration absolute top-20 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="bg-decoration absolute bottom-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-cyan-400/20 to-indigo-400/20 rounded-full blur-3xl" style={{ animationDelay: '-10s' }} />
        <div className="bg-decoration absolute top-1/2 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-2xl" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-32 items-center">
          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end order-first lg:order-last mt-12 sm:mt-16">
            <div className="hero-image relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full transform rotate-6 scale-110 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full transform -rotate-12 scale-95 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-indigo-400 rounded-full transform rotate-3 scale-105 opacity-20"></div>

                {/* Main image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <img
                    src={portfolioConfig.personal.profileImage}
                    alt={portfolioConfig.personal.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 glass-effect p-2 sm:p-3 rounded-xl">
                  <span className="text-lg sm:text-2xl">💻</span>
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 glass-effect p-2 sm:p-3 rounded-xl">
                  <span className="text-lg sm:text-2xl">🚀</span>
                </div>
                <div className="absolute top-1/2 -right-6 sm:-right-8 glass-effect p-2 sm:p-3 rounded-xl transform -translate-y-1/2">
                  <span className="text-lg sm:text-2xl">⚡</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-last lg:order-first">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-center lg:text-left">
                <span className="block text-gray-900 dark:text-white">Hi, I'm</span>
                <span className="block text-gradient-animate">
                  {portfolioConfig.personal.name.split(' ')[0]}
                </span>
              </h1>

              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white bg-clip-text text-transparent text-center lg:text-left">
                {portfolioConfig.personal.title}
              </h2>

              <p className="hero-description text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-full sm:max-w-2xl leading-relaxed text-center lg:text-left">
                {portfolioConfig.personal.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="hero-buttons flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start">
              <a
                href={portfolioConfig.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 pulse-effect text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                <span>Download CV</span>
              </a>


              <button
                onClick={handleContactClick}
                className="group glass-effect text-gray-900 dark:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Get In Touch</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 sm:space-x-6 justify-center lg:justify-start">
              <a
                href={portfolioConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social group p-3 sm:p-4 glass-effect rounded-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 magnetic"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200 group-hover:text-purple-500" />
              </a>
              <a
                href={portfolioConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social group p-3 sm:p-4 glass-effect rounded-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 magnetic"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200 group-hover:text-blue-500" />
              </a>
              <a
                href={`mailto:${portfolioConfig.personal.email}`}
                className="hero-social group p-3 sm:p-4 glass-effect rounded-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 magnetic"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200 group-hover:text-green-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-500">
            <span className="text-xs sm:text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>
      </div>
    </section>
  );
};