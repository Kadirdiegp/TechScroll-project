import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Rocket, Brain, Code, Sparkles, Menu, X, Github, Twitter, Linkedin, Cpu } from 'lucide-react';
import { Card } from './components/Card';
import { AnimatedSection } from './components/AnimatedSection';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Korrigierte Farbpalette
  const gradientColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'rgb(129, 140, 248)', // Indigo
      'rgb(167, 139, 250)', // Violet
      'rgb(236, 72, 153)'   // Pink
    ]
  );

  // Logo Text Farbe
  const logoStyle = {
    background: useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [
        'linear-gradient(to right, rgb(129, 140, 248), rgb(167, 139, 250))',
        'linear-gradient(to right, rgb(167, 139, 250), rgb(236, 72, 153))',
        'linear-gradient(to right, rgb(236, 72, 153), rgb(129, 140, 248))'
      ]
    ),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Scroll-Transform für die Karten anpassen
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-300%']  // Zurück zu -300% für bessere Sichtbarkeit
  );

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <motion.div 
          className="bg-black/80 backdrop-blur-sm"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo mit Animation */}
              <motion.div 
                className="flex items-center gap-2 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <Cpu className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </motion.div>
                <motion.div 
                  className="text-xl font-bold"
                  style={logoStyle}
                >
                  Tech<span className="text-indigo-400">Scroll</span>
                </motion.div>
              </motion.div>
              
              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="hover:text-indigo-400 transition-colors">Home</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">About</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Projects</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
              </nav>

              {/* Mobile Menu Button */}
              <motion.button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black/95 backdrop-blur-md z-50"
            >
              <nav className="container mx-auto px-4 py-8">
                <motion.div 
                  className="flex flex-col gap-6"
                  variants={{
                    open: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="text-2xl font-bold py-4 px-6 hover:bg-gray-800/50 rounded-xl transition-all"
                      variants={{
                        closed: { x: -20, opacity: 0 },
                        open: { x: 0, opacity: 1 }
                      }}
                      whileHover={{ x: 10, color: '#818cf8' }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Überarbeiteter Main Content mit mehr Karten */}
      <div className="h-[300vh]">
        <motion.div 
          style={{ x }}
          className="sticky top-[10vh] h-[90vh] flex items-center"
        >
          <div className="flex gap-8 px-8">
            {/* Erste Karte */}
            <div className="w-[60vw] md:w-[50vw] h-[70vh] flex-shrink-0">
              <Card
                title="Technology"
                description="Exploring the latest in tech innovation"
                icon={<Brain className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                className="h-full"
                priority={true}
              />
            </div>

            {/* Weitere Karten mit gleicher Größe */}
            <div className="w-[60vw] md:w-[50vw] h-[70vh] flex-shrink-0">
              <Card
                title="Robotics"
                description="The future of automation and robotics engineering"
                icon={<Rocket className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80"
                className="h-full"
                priority={true}
              />
            </div>

            {/* Dritte Karte */}
            <div className="w-[60vw] md:w-[50vw] h-[70vh] flex-shrink-0">
              <Card
                title="Digital Arts"
                description="Where creativity meets technology"
                icon={<Sparkles className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1549281899-f75600a24107?auto=format&fit=crop&q=80"
                className="h-full"
              />
            </div>

            {/* Vierte Karte */}
            <div className="w-[60vw] md:w-[50vw] h-[70vh] flex-shrink-0">
              <Card
                title="Quantum Computing"
                description="The next frontier of computation"
                icon={<Brain className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
                className="h-full"
              />
            </div>

            {/* Fünfte Karte */}
            <div className="w-[60vw] md:w-[50vw] h-[70vh] flex-shrink-0">
              <Card
                title="Green Tech"
                description="Sustainable solutions for a better tomorrow"
                icon={<Sparkles className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80"
                className="h-full"
              />
            </div>

            {/* Sechste Karte - Cybersecurity */}
            <div className="w-[60vw] md:w-[50vw] h-[70vh] flex-shrink-0">
              <Card
                title="Cybersecurity"
                description="Protecting the digital frontier from emerging threats"
                icon={<Code className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
                className="h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Neue Feature-Sektion */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
            style={{
              backgroundImage: 'linear-gradient(to right, #818cf8, #c084fc, #e879f9)'
            }}
          >
            Zukunftsweisende Technologien
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80" 
                  alt="AI Technology"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold mb-2">Künstliche Intelligenz</h3>
                  <p className="text-gray-300">Fortschrittliche KI-Systeme für die Zukunft</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80" 
                  alt="Blockchain Technology"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold mb-2">Blockchain</h3>
                  <p className="text-gray-300">Dezentrale Technologien der nächsten Generation</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="group relative overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                  alt="Mixed Reality"
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold mb-2">Mixed Reality</h3>
                  <p className="text-gray-300">Verschmelzung von virtueller und realer Welt</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Interaktive Technologie-Sektion */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text" style={{
                  backgroundImage: 'linear-gradient(to right, #818cf8, #c084fc)'
                }}>
                  Innovation durch Technologie
                </span>
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Entdecken Sie die neuesten Entwicklungen in der Welt der Technologie. 
                Von KI bis Quantencomputing - wir zeigen Ihnen die Zukunft.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                Mehr erfahren
              </motion.button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
                  alt="Technology Innovation"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile optimiert */}
      <footer className="bg-gray-900 text-white py-8 md:py-12 relative z-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">TechScroll</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Exploring the intersection of technology and innovation through interactive experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex justify-center md:justify-start gap-6">
                {[Github, Twitter, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">© 2024 TechScroll. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;