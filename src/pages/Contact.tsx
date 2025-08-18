import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail,
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  MessageCircle,
  Calendar,
  Coffee,
  Zap,
  Heart,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';
import { showToast } from '../components/Toast/CustomToast';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});

export const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.contact-hero',
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      // Floating elements animation
      gsap.utils.toArray('.floating-element').forEach((element: any, index) => {
        gsap.to(element, {
          y: `${gsap.utils.random(-20, 20)}px`,
          x: `${gsap.utils.random(-15, 15)}px`,
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });

      // Contact cards animation
      gsap.utils.toArray('.contact-method').forEach((card: any, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateY: 45 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.5 + index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            }
          }
        );
      });

      // Form animation
      gsap.fromTo('.contact-form-container',
        { opacity: 0, x: 100, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.8,
          scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 85%'
          }
        }
      );

      // Social links animation
      gsap.utils.toArray('.social-bubble').forEach((bubble: any, index) => {
        gsap.fromTo(bubble,
          { opacity: 0, scale: 0, rotation: 180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            delay: 1.2 + index * 0.1,
            scrollTrigger: {
              trigger: bubble,
              start: 'top 90%'
            }
          }
        );
      });

      // Stats animation
      gsap.utils.toArray('.stat-item').forEach((stat: any, index) => {
        gsap.fromTo(stat,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 1.5 + index * 0.1,
            scrollTrigger: {
              trigger: stat,
              start: 'top 90%'
            }
          }
        );
      });

    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    setSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xjkodypy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setIsSuccess(true);
        showToast.success('🎉 Message sent successfully! I\'ll get back to you within 24 hours.');
        resetForm();
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        showToast.error('❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      showToast.error('❌ Error: ' + error);
    } finally {
      setSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Me',
      subtitle: 'Drop me a line',
      content: portfolioConfig.personal.email,
      action: `mailto:${portfolioConfig.personal.email}`,
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      bgGradient: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
      description: 'Best for detailed discussions'
    },
    {
      icon: MessageCircle,
      title: 'Let\'s Chat',
      subtitle: 'Quick response',
      content: 'WhatsApp/Telegram',
      action: `tel:${portfolioConfig.personal.phone}`,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      description: 'For instant communication'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      subtitle: 'Book a meeting',
      content: '30 min consultation',
      action: '#',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      bgGradient: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
      description: 'Free strategy session'
    }
  ];

  const socialLinks = [
    { icon: Github, url: portfolioConfig.social.github, name: 'GitHub', color: 'hover:bg-gray-800' },
    { icon: Linkedin, url: portfolioConfig.social.linkedin, name: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Twitter, url: portfolioConfig.social.twitter, name: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, url: portfolioConfig.social.instagram, name: 'Instagram', color: 'hover:bg-pink-600' },
  ];

  const stats = [
    { icon: Zap, value: '24h', label: 'Response Time' },
    { icon: Coffee, value: '∞', label: 'Coffee Cups' },
  ];

  return (
    <div ref={contactRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 pt-20 pb-20 relative overflow-hidden" id="contact">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-xl"></div>
        <div className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-10 blur-xl"></div>
        <div className="floating-element absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-10 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="contact-hero text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-6 py-3 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-medium">Let's Create Something Amazing</span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Ready to
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
              Collaborate?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            I'm always excited to work on innovative projects and help bring your ideas to life. 
            Let's discuss how we can create something extraordinary together!
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-item text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <Icon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Preferred Way
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Pick the method that works best for you. I'm available across all channels!
              </p>
            </div>

            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className={`contact-method group relative bg-gradient-to-br ${method.bgGradient} rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/20`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => window.open(method.action, '_blank')}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-4 bg-gradient-to-r ${method.gradient} rounded-2xl text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {method.subtitle}
                      </p>
                      <p className="text-gray-700 dark:text-gray-200 font-medium mb-2">
                        {method.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {method.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  {hoveredCard === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl pointer-events-none"></div>
                  )}
                </div>
              );
            })}

            
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="contact-form-container sticky top-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Send Me a Message
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tell me about your project and let's make it happen!
                  </p>
                </div>

                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                  }}
                  validationSchema={contactSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                          <Field
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className={`w-full px-6 py-4 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              errors.name && touched.name
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500'
                            }`}
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-2" />
                        </div>

                        <div className="relative">
                          <Field
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className={`w-full px-6 py-4 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              errors.email && touched.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500'
                            }`}
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2" />
                        </div>
                      </div>

                      <div className="relative">
                        <Field
                          type="text"
                          name="subject"
                          placeholder="Project Subject"
                          className={`w-full px-6 py-4 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.subject && touched.subject
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500'
                          }`}
                        />
                        <ErrorMessage name="subject" component="div" className="text-red-500 text-sm mt-2" />
                      </div>

                      <div className="relative">
                        <Field
                          as="textarea"
                          name="message"
                          rows="6"
                          placeholder="Tell me about your project, goals, timeline, and budget..."
                          className={`w-full px-6 py-4 bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
                            errors.message && touched.message
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500'
                          }`}
                        />
                        <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-2" />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full group relative bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 text-white px-8 py-5 rounded-2xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 overflow-hidden ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {isSubmitting ? (
                          <div className="flex items-center space-x-3 relative z-10">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending your message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3 relative z-10">
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            <span>Send Message</span>
                            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                          </div>
                        )}
                      </button>

                      {isSuccess && (
                        <p className="text-center text-sm text-green-500 font-medium mt-4">
                          Thank you! Your message has been sent.
                        </p>
                      )}

                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        I typically respond within 24 hours. Looking forward to hearing from you! 🚀
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

        </div>

        {/* Social Links */}
        <div className="mt-12 ">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Connect on Social
          </h3>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-bubble group p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 ${social.color} hover:text-white`}
                  title={social.name}
                >
                  <Icon className="w-6 h-6 transition-colors duration-300" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};