const sizeMap = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-24',
};

export default function Logo({ size = 'md', className = '', white = false }) {
  return (
    <img
      src="/assets/logo.png"
      alt="Total Equines"
      className={`${sizeMap[size]} w-auto object-contain ${white ? 'brightness-0 invert' : ''} ${className}`}
      draggable={false}
      decoding="async"
      onError={(e) => { console.error('Logo failed to load:', e.target.src); }}
    />
  );
}
