import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Management = () => {
  const leaders = [
    {
      name: 'Elena Rossi',
      role: 'Chief Operations Officer',
      description: 'Elena oversees the global supply chain, ensuring that our commitment to ethical sourcing is maintained at every touchpoint of the manufacturing process.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80'
    },
    {
      name: 'Marcus Thorne',
      role: 'Head of Sustainable Innovation',
      description: 'A pioneer in textile science, Marcus leads our R&D department in developing proprietary recycled fabrics that retain the luxury feel of silk and cashmere.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    },
    {
      name: 'Sienna Wu',
      role: 'Director of Brand Experience',
      description: 'Sienna curates the ETC digital and physical environments, ensuring that every customer interaction feels like a private gallery viewing.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto bg-surface noise-bg">
      {/* Hero Section */}
      <header className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-primary mb-8 leading-tight font-headline"
          >
            The Curators of <span className="italic text-secondary font-normal">Excellence.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-on-surface-variant leading-relaxed max-w-xl font-body"
          >
            Meet the visionaries behind ETC Apparel. A collective of designers, strategists, and craftsmen dedicated to redefining the modern wardrobe through editorial precision and sustainable innovation.
          </motion.p>
        </div>
        <div className="md:col-span-5 flex items-end justify-end">
          <div className="w-full h-64 bg-surface-container-low rounded-lg overflow-hidden relative shadow-2xl shadow-primary/5">
            <img className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Studio" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          </div>
        </div>
      </header>

      {/* Leadership Section: CEO */}
      <section className="mb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:col-span-6"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-surface-container-high rounded-lg -z-10 transition-all group-hover:-inset-2"></div>
            <img className="w-full aspect-[4/5] object-cover rounded-md shadow-2xl" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" alt="Julian V. Sterling" />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:col-span-5 md:col-start-8"
        >
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">Founder & Creative Director</span>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 font-headline">Julian V. Sterling</h2>
          <p className="text-lg text-on-surface-variant leading-relaxed mb-8 font-body">
            With over two decades in high-fashion curation, Julian founded ETC Apparel with a singular vision: to bridge the gap between bespoke craftsmanship and contemporary readiness. His philosophy of "Atmospheric Design" governs every collection we release.
          </p>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-outline-variant opacity-50"></div>
            <span className="font-headline italic text-primary">Julian Sterling</span>
          </div>
        </motion.div>
      </section>

      {/* Secondary Management Grid */}
      <section className="mb-32">
        <div className="flex items-baseline justify-between mb-16 border-b border-outline-variant/10 pb-8">
          <h3 className="text-3xl font-bold text-primary font-headline">Executive Board</h3>
          <span className="text-sm font-label text-on-surface-variant italic">2024 Strategic Leadership</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {leaders.map((leader, i) => (
            <motion.div 
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="overflow-hidden mb-6 bg-surface-container-low rounded-lg shadow-lg">
                <img className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" src={leader.image} alt={leader.name} />
              </div>
              <span className="text-xs font-label uppercase tracking-widest text-secondary block mb-2">{leader.role}</span>
              <h4 className="text-2xl font-bold text-primary mb-4 font-headline">{leader.name}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed font-body">
                {leader.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Block */}
      <section className="py-24 bg-surface-container-low rounded-xl px-12 text-center shadow-inner">
        <div className="max-w-3xl mx-auto">
          <Quote className="w-12 h-12 text-secondary/40 mx-auto mb-8" />
          <blockquote className="text-3xl md:text-4xl font-headline italic text-primary leading-tight mb-12">
            "Management at ETC is not about hierarchy; it's about the guardianship of quality. We don't just run a company; we preserve a legacy of craftsmanship."
          </blockquote>
          <div className="h-[2px] w-16 bg-secondary mx-auto"></div>
        </div>
      </section>
    </main>
  );
};

export default Management;
