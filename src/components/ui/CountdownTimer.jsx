import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

function calcTimeLeft(target) {
  const diff = new Date(target) - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownTimer({ targetDate, auctionName, dateDisplay, location }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));
  const intervalRef = useRef(null);

  const tick = useCallback(() => {
    const next = calcTimeLeft(targetDate);
    setTimeLeft((prev) => {
      if (!next && !prev) return prev;
      if (!next || !prev) return next;
      if (
        prev.days === next.days &&
        prev.hours === next.hours &&
        prev.minutes === next.minutes &&
        prev.seconds === next.seconds
      ) return prev;
      return next;
    });
  }, [targetDate]);

  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [tick]);

  const blocks = timeLeft
    ? [
        { value: timeLeft.days, label: t('subastas.countdown_days') },
        { value: timeLeft.hours, label: t('subastas.countdown_hours') },
        { value: timeLeft.minutes, label: t('subastas.countdown_minutes') },
        { value: timeLeft.seconds, label: t('subastas.countdown_seconds') },
      ]
    : null;

  return (
    <section className="w-full section-tint py-16">
      <div className="container-custom text-center">
        <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold">
          {t('subastas.countdown_label')}
        </p>
        <h2 className="font-display uppercase text-3xl sm:text-5xl text-white" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>{auctionName}</h2>
        <p className="mt-2 font-body text-base text-gray-400">
          {dateDisplay} · {location}
        </p>

        <div className="mx-auto mt-10 flex items-center justify-center gap-2 sm:gap-4">
          {blocks ? (
            blocks.map((b, i) => (
              <div key={b.label} className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="min-w-[72px] rounded-2xl border border-gold/30 bg-white/[0.04] backdrop-blur-sm p-4 text-center sm:min-w-24 sm:p-6"
                >
                  <span className="font-display uppercase text-4xl text-gold sm:text-6xl" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>
                    {String(b.value).padStart(2, '0')}
                  </span>
                  <p className="mt-1 font-body text-[10px] uppercase tracking-[0.3em] text-gray-500 sm:text-xs">
                    {b.label}
                  </p>
                </motion.div>
                {i < blocks.length - 1 && (
                  <span className="hidden font-display uppercase text-4xl text-gold/40 sm:block" style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}>:</span>
                )}
              </div>
            ))
          ) : (
            <motion.p
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-display uppercase text-4xl text-gold sm:text-5xl"
              style={{ fontFamily: 'Couture, sans-serif', textTransform: 'uppercase' }}
            >
              {t('subastas.countdown_live')}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(CountdownTimer);