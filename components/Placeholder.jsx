import { mono } from '@/lib/theme';

/** Striped stand-in for photography. Swap for next/image once real photos exist. */
export default function Placeholder({ label, height = 'clamp(150px, 16vw, 210px)', dark = true, align = 'flex-end', style }) {
  return (
    <div
      style={{
        height,
        backgroundImage: dark
          ? 'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 10px, transparent 10px 20px)'
          : 'repeating-linear-gradient(135deg, rgba(16,23,38,0.045) 0 12px, transparent 12px 24px)',
        display: 'flex',
        alignItems: align,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        padding: 16,
        ...style
      }}
    >
      <span
        style={{
          fontFamily: mono,
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.42)' : '#4A5260'
        }}
      >
        [ {label} ]
      </span>
    </div>
  );
}
