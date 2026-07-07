import React from 'react';
import { motion } from 'framer-motion';
import { Factory, PenTool } from 'lucide-react';

const ArchitectureIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="2 9 12 2 22 9" />
  </svg>
);

const About = () => {
  return (
    <main className="pt-24 bg-surface noise-bg">
      {/* Hero Section: Editorial Header */}
      <section className="px-8 md:px-20 py-16 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-8xl font-headline font-bold text-primary leading-tight tracking-tighter max-w-3xl"
            >
              The Architecture <br/> of Apparel.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-secondary font-label font-medium uppercase tracking-[0.2em] pb-4"
            >
            {/* add your company establsih year here */}
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full h-[614px] overflow-hidden rounded-lg shadow-2xl shadow-primary/10"
          >
            <img className="w-full h-full object-cover grayscale brightness-90 hover:scale-105 transition-transform duration-1000" src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80" alt="Atelier" />
          </motion.div>
        </div>
      </section>

      {/* Our Story: Asymmetric Layout */}
      <section className="px-8 md:px-20 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:col-span-5"
          >
            <span className="text-secondary font-label font-bold tracking-widest uppercase text-xs mb-6 block">Heritage</span>
            <h2 className="text-4xl md:text-5xl font-headline text-primary mb-8">Our Story</h2>
            <div className="space-y-6 text-on-surface-variant font-body leading-relaxed text-lg">
              <p>Founded in a small workshop in the heart of the historic garment district, ETC Apparel began with a singular focus: the pursuit of the perfect seam. What started as a bespoke tailoring service for local artists has evolved into a global symbol of understated luxury.</p>
              <p>We believe that clothing is an extension of the self—a quiet but powerful statement of intent. Our journey has been one of continuous refinement, where heritage techniques meet modern silhouettes to create garments that transcend seasons.</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="md:col-start-7 md:col-span-6 relative"
          >
            <div className="aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden translate-y-12 shadow-2xl">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" alt="Craft" />
            </div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/10 backdrop-blur-xl rounded-full hidden md:block"></div>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="px-8 md:px-20 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-headline text-primary mb-4">Craftsmanship</h2>
            <div className="w-24 h-px bg-secondary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white border border-outline-variant/10 group hover:bg-primary transition-all duration-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors">
                <ArchitectureIcon className="w-6 h-6 text-secondary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-headline text-primary mb-4 group-hover:text-white">Material Integrity</h3>
              <p className="text-on-surface-variant font-body leading-relaxed group-hover:text-white/70">We source only the finest natural fibers, from long-staple Egyptian cotton to ethically harvested Mongolian cashmere.</p>
            </div>
            <div className="p-10 bg-white border border-outline-variant/10 group hover:bg-primary transition-all duration-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors">
                <Factory className="w-6 h-6 text-secondary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-headline text-primary mb-4 group-hover:text-white">Precision Tailoring</h3>
              <p className="text-on-surface-variant font-body leading-relaxed group-hover:text-white/70">Every garment undergoes a 12-point inspection process, ensuring that every stitch serves both form and function.</p>
            </div>
            <div className="p-10 bg-white border border-outline-variant/10 group hover:bg-primary transition-all duration-500 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-white/20 transition-colors">
                <PenTool className="w-6 h-6 text-secondary group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-headline text-primary mb-4 group-hover:text-white">Editorial Vision</h3>
              <p className="text-on-surface-variant font-body leading-relaxed group-hover:text-white/70">Our designs are born from a dialogue between architectural structure and the fluidity of movement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="px-8 md:px-20 py-32 bg-primary text-on-primary overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-secondary font-label font-bold tracking-[0.3em] uppercase text-xs mb-8 block"
          >
            Our Mission
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-headline mb-10 leading-tight"
          >
            To dress the modern curator in garments that endure.
          </motion.h2>
          <p className="text-white/60 text-xl font-body leading-relaxed max-w-2xl mx-auto mb-12">
            We reject the cycle of fast fashion. Our mission is to create a wardrobe of permanence, built on the foundations of sustainability, ethical labor, and timeless aesthetic value.
          </p>
        </div>
      </section>
    </main>
  );
};



export default About;
