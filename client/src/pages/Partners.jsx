import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Factory, ShieldCheck } from 'lucide-react';
import { retailPartners, manufacturingPartners, complianceCertifications } from '../data/partners';
import { Link } from 'react-router-dom';

const Partners = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-[45] flex items-center justify-center bg-surface/50 backdrop-blur-sm pt-20">
        <div className="bg-white p-10 md:p-14 text-center rounded-2xl shadow-2xl border border-outline-variant/10 max-w-xl mx-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            <span className="text-secondary font-label font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Section Update</span>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-primary mb-6 tracking-tighter">Under Construction</h2>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-8">
              Our company and network are growing rapidly. We are currently rebuilding this page to better reflect our expanding global partnerships and capabilities.
            </p>
            <Link to="/contact" className="inline-block editorial-gradient text-on-primary px-8 py-4 rounded-DEFAULT font-label text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:opacity-90 transition-all">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      <main className="pt-24 bg-surface noise-bg min-h-screen grayscale opacity-80 pointer-events-none select-none blur-[2px]">
        {/* Hero Section */}
        <section className="px-8 md:px-20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-secondary font-label font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
                Our Global Network
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-primary leading-tight tracking-tighter mb-8 max-w-4xl mx-auto">
                Connecting Global Vision <br className="hidden md:block" /> With Manufacturing Excellence.
              </h1>
              <p className="text-on-surface-variant font-body text-lg max-w-2xl mx-auto leading-relaxed">
                As a premier buying house, we bridge the gap between world-renowned retail brands and certified, high-capacity manufacturing facilities in Bangladesh.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Retail Partners Section */}
        <section className="px-8 md:px-20 py-16 bg-white border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Globe className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h2 className="text-3xl font-headline text-primary">Global Retail Partners</h2>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {retailPartners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-32 md:w-40 h-20 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                >
                  {partner.name === 'ZARA' || partner.name === 'H&M' || partner.name === 'Primark' || partner.name === 'ASOS' || partner.name === 'Next' || partner.name === 'Marks & Spencer' ? (
                    /* Render text as a placeholder if logo URL fails to load in development, but try to show logo first */
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : (
                    <img src={partner.logoUrl} alt={partner.name} className="max-h-full max-w-full object-contain" />
                  )}
                  <span className="hidden font-headline text-2xl font-black text-primary tracking-tighter">{partner.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Network */}
        <section className="px-8 md:px-20 py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-secondary font-label font-bold tracking-widest uppercase text-xs mb-4 block">Supply Chain</span>
              <h2 className="text-4xl md:text-5xl font-headline text-primary flex items-center gap-4">
                Manufacturing Network <Factory className="w-8 h-8 md:w-10 md:h-10 text-secondary" />
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {manufacturingPartners.map((factory, index) => (
                <motion.div
                  key={factory.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="bg-white rounded-lg overflow-hidden border border-outline-variant/10 shadow-sm group hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                      src={factory.image}
                      alt={factory.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-label font-bold uppercase tracking-widest text-primary rounded-full">
                      {factory.type}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-headline font-bold text-primary mb-2">{factory.name}</h3>
                    <p className="text-sm font-label text-secondary tracking-widest uppercase mb-6">{factory.location}</p>

                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-outline-variant/10">
                      <div className="flex-1">
                        <span className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Monthly Capacity</span>
                        <span className="font-headline font-bold text-lg text-primary">{factory.capacity}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-3">Key Capabilities</span>
                      <div className="flex flex-wrap gap-2">
                        {factory.features.map((feature, i) => (
                          <span key={i} className="px-3 py-1 bg-surface-container-highest text-primary text-[10px] font-label font-bold uppercase tracking-wider rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Compliance */}
        <section className="px-8 md:px-20 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <ShieldCheck className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-headline text-primary mb-4">Compliance & Ethics</h2>
              <p className="text-on-surface-variant font-body max-w-2xl mx-auto">
                Our partner facilities are strictly audited and maintain the highest global standards for environmental sustainability, worker safety, and ethical production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {complianceCertifications.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center p-8 bg-surface-container-low rounded-lg border border-outline-variant/5 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-20 flex items-center justify-center mb-6">
                    {cert.name === 'BSCI' || cert.name.includes('Accord') ? (
                      <span className="font-headline text-2xl font-black text-primary">{cert.name}</span>
                    ) : (
                      <img
                        src={cert.logoUrl}
                        alt={cert.name}
                        className="max-h-full max-w-[120px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    )}
                    <span className="hidden font-headline text-xl font-black text-primary">{cert.name}</span>
                  </div>
                  <h3 className="font-headline font-bold text-lg text-primary mb-3">{cert.name}</h3>
                  <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-8 md:px-20 py-20 bg-primary text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Ready to start production?</h2>
            <p className="text-on-primary-container/80 font-body mb-8 text-lg">
              Leverage our extensive network of certified manufacturers to bring your collections to life.
            </p>
            <Link to="/contact" className="inline-block editorial-gradient text-on-primary px-8 py-4 rounded font-label text-xs uppercase tracking-[0.2em] font-bold shadow-lg hover:opacity-90 transition-all">
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Partners;
