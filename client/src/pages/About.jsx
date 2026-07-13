import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Users, ShieldCheck, Truck, Compass, Heart, Layers } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('genesis');

  const stories = {
    genesis: {
      title: "The Genesis",
      subtitle: "Redefining the Sourcing Paradigm",
      text: "ETC Apparel Ltd was born out of a stark observation: the global fashion supply chain had become detached from its human foundation. In 2018, we set out to build a new model of sourcing—one rooted in absolute transparency, absolute quality, and mutual respect. We didn't want to be just another intermediary; we wanted to be a dedicated partner in the creative and industrial journey.",
      quote: "We set out to turn transactions into long-term partnerships.",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800"
    },
    bridge: {
      title: "The UK-Bangladesh Bridge",
      subtitle: "Bridging Design & Industrial Mastery",
      text: "Operating across London and Dhaka, we serve as the vital link between world-class creative design and unparalleled manufacturing capacity. Our UK team understands the fast-evolving demands of the global retail market, while our Dhaka team provides deep, on-the-ground engineering expertise, overseeing quality control, and ensuring compliance at every tier of production.",
      quote: "Bridging the gap between creative intent and absolute execution.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    human: {
      title: "The Human Element",
      subtitle: "Investing in People & Ethical Workplaces",
      text: "For us, textiles are a deeply human art. Behind every fabric sample, pattern, and stitch is a dedicated worker. We partner exclusively with compliant, ethically certified mills that provide fair wages, safe workspaces, and environmental respect. Sourcing responsibly means keeping the livelihood of our partners at the heart of every decision.",
      quote: "Sustainable business is built on dignity and respect for the makers.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800"
    }
  };

  const journeySteps = [
    {
      icon: Compass,
      title: "1. Sourcing & Development",
      description: "We source yarn and fabrics globally, developing custom structures, color palettes (lab dips), and detailed prototypes that align perfectly with brand identity."
    },
    {
      icon: Layers,
      title: "2. Production & Compliance",
      description: "Our selected mills in Bangladesh operate under strict social and environmental audits, using state-of-the-art machinery for knitting, weaving, and finishing."
    },
    {
      icon: ShieldCheck,
      title: "3. Quality Assurance",
      description: "Our in-house QA inspectors are stationed permanently at production lines, conducting rigorous inline and final inspection checks based on international standards (AQL)."
    },
    {
      icon: Truck,
      title: "4. Logistics & Supply Chain",
      description: "We handle the entire transport journey—from custom clearances to shipping logistics—ensuring containers arrive on time and in pristine condition."
    }
  ];

  return (
    <main className="pt-24 bg-surface noise-bg min-h-screen text-on-surface">
      {/* Hero Section: Editorial Header */}
      <section className="px-8 md:px-20 py-16 md:py-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-secondary font-label text-xs font-bold tracking-[0.3em] uppercase block mb-3"
            >
              UK-Bangladesh Textile Venture
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl md:text-7xl font-headline font-bold text-primary leading-[1.1] tracking-tighter max-w-4xl"
            >
              Bridging Creative Intent <br />
              with <span className="italic font-serif" style={{ color: '#feb564' }}>Industrial Mastery.</span>
            </motion.h1>
          </div>
        </div>

        {/* Big Premium Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full h-[400px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl relative"
        >
          <img 
            className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]" 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
            alt="Textile Sourcing House Dhaka Bangladesh" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-8 md:p-12">
            <p className="font-headline italic text-white/90 text-lg md:text-2xl max-w-2xl leading-relaxed">
              "We coordinate global apparel sourcing, engineering quality and reliability directly into the production line."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Main Introduction - The Buying House Context */}
      <section className="px-8 md:px-20 py-20 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-secondary font-label font-bold tracking-widest uppercase text-xs">Who We Are</span>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary leading-tight">
              Your Extended Supply Chain <br />in Bangladesh.
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
              ETC Apparel Ltd operates as a premier textile buying and sourcing agent, bringing decades of apparel manufacturing experience directly to your brand. We serve as your eyes and ears on the ground in one of the world's most dynamic manufacturing hubs.
            </p>
            <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
              From raw fiber sourcing, yarn selection, and fabric testing to compliance checks, inline production audits, and shipping logistics—we navigate the complexities of apparel manufacturing so you can focus on building your brand.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-outline-variant/10 shadow-lg relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-secondary/5 rounded-full" />
              <h3 className="font-headline text-xl font-bold text-primary mb-6">Our Capabilities</h3>
              <ul className="space-y-4">
                {[
                  "Global standard compliance management (BSCI, OEKO-TEX, GOTS)",
                  "Rigorous quality assurance (AQL 1.5 - 2.5 standards)",
                  "Custom fabric development & laboratory color matching",
                  "Consolidated shipping & streamlined customs management",
                  "Ethical and sustainable production pipelines"
                ].map((cap, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-on-surface-variant">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section - The Stories */}
      <section className="px-8 md:px-20 py-24 bg-surface max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-label font-bold tracking-widest uppercase text-xs block mb-3">Our Core Narratives</span>
          <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">Stories of the Thread</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12 border-b border-outline-variant/20 pb-4 flex-wrap">
          {Object.keys(stories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded-full font-label text-xs tracking-wider uppercase font-bold transition-all duration-300 ${
                activeTab === key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-on-surface-variant border border-outline-variant/40 hover:bg-surface-container-low'
              }`}
            >
              {stories[key].title}
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <div className="bg-white rounded-3xl p-6 md:p-12 border border-outline-variant/10 shadow-xl overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              <div className="lg:col-span-7 space-y-6">
                <span className="text-secondary font-label font-bold tracking-widest uppercase text-[10px] bg-secondary/10 px-3 py-1.5 rounded-full inline-block">
                  {stories[activeTab].subtitle}
                </span>
                <h3 className="text-2xl md:text-4xl font-headline font-bold text-primary">
                  {stories[activeTab].title}
                </h3>
                <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {stories[activeTab].text}
                </p>
                <div className="border-l-4 border-secondary pl-4 py-1 italic font-headline text-lg text-primary">
                  "{stories[activeTab].quote}"
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={stories[activeTab].image} 
                    alt={stories[activeTab].title} 
                    className="w-full h-full object-cover grayscale contrast-115"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Sourcing Suffix: Sourcing Journey Timeline */}
      <section className="px-8 md:px-20 py-24 bg-surface-container-low border-t border-outline-variant/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-secondary font-label font-bold tracking-widest uppercase text-xs block mb-3">Our Workflow</span>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">From Fiber to Finished Product</h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="p-8 bg-white border border-outline-variant/10 rounded-2xl hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <step.icon className="w-6 h-6 text-secondary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-headline text-xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="px-8 md:px-20 py-24 bg-primary text-on-primary text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-secondary font-label font-bold tracking-[0.3em] uppercase text-xs block">Compliance & Trust</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-headline mb-6 leading-tight">
            Certified Facilities. Rigorous Standards.
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto">
            We hold ourselves and our factory partners to the absolute highest international standards. We actively mandate BSCI, OEKO-TEX, Accord, and GOTS certifications, building a completely transparent, sustainable ecosystem.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8">
            {[
              { num: "100%", label: "Compliant Factories" },
              { num: "0", label: "Quality Incidents" },
              { num: "24/7", label: "Production Monitoring" },
              { num: "AQL 1.5", label: "Inspection Standard" }
            ].map((stat, idx) => (
              <div key={idx} className="px-6 py-4 bg-white/5 rounded-xl border border-white/10 min-w-[150px]">
                <div className="font-headline text-2xl md:text-3xl font-bold text-secondary">{stat.num}</div>
                <div className="font-label text-[10px] text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
