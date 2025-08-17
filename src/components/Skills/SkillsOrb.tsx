import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsOrbProps {
  title: string;
  skills: Skill[];
  color: string;
}

export const SkillsOrb: React.FC<SkillsOrbProps> = ({ title, skills, color }) => {
  const orbRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    const ctx = gsap.context(() => {
      // Animate the main orb
      gsap.fromTo(orb, 
        { 
          scale: 0, 
          rotation: -180,
          opacity: 0 
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: orb,
            start: 'top 80%',
          }
        }
      );

      // Animate individual skills
      skillsRef.current.forEach((skill, index) => {
        if (skill) {
          gsap.fromTo(skill,
            { 
              opacity: 0, 
              scale: 0,
              y: 30 
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: orb,
                start: 'top 80%',
              }
            }
          );
        }
      });

      // Floating animation
      gsap.to(orb, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

    }, orb);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div 
        ref={orbRef}
        className={`relative w-80 h-80 mx-auto rounded-full bg-gradient-to-br ${color} p-1 shadow-2xl hover:shadow-3xl transition-all duration-300`}
      >
        {/* Inner orb */}
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Title */}
          <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {title}
          </h3>
          
          {/* Skills grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            {skills.slice(0, 4).map((skill, index) => (
              <div
                key={skill.name}
                ref={(el) => { if (el) skillsRef.current[index] = el; }}
                className="flex flex-col items-center text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {skill.name}
                </div>
                {/* Circular progress */}
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(skill.level / 100) * 125.6} 125.6`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient definition */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-8 h-8 bg-current rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-current rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-2 w-4 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};