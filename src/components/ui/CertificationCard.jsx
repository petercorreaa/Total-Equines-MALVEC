import { memo } from 'react';
import { motion } from 'framer-motion';

function ShieldIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 3L5 9v9c0 8.5 5.5 16.4 13 18.3 7.5-1.9 13-9.8 13-18.3V9L18 3z"
        stroke="#c9a84c"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M13 18l3 3 7-7"
        stroke="#c9a84c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CertificationCard({ title, issuer, year, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group rounded-2xl border border-gold/20 bg-white/[0.04] backdrop-blur-sm p-8 transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.07]"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.05]">
        {icon || <ShieldIcon />}
      </div>
      <h4 className="text-center font-heading uppercase text-lg font-semibold text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
        {title}
      </h4>
      <p className="mt-2 text-center font-body text-sm text-gray-400">
        {issuer}
      </p>
      <p className="mt-1 text-center font-body text-xs tracking-widest text-gold">
        {year}
      </p>
    </motion.div>
  );
}

export default memo(CertificationCard);