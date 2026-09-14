interface BrandLogoProps {
  inverse?: boolean;
  compact?: boolean;
}

export default function BrandLogo({ inverse = false, compact = false }: BrandLogoProps) {
  const primaryColor = inverse ? 'text-cream-100' : 'text-cocoa-600';
  const secondaryColor = inverse ? 'text-cream-300' : 'text-cocoa-400';

  return (
    <span className={`inline-flex items-center ${compact ? 'gap-2.5' : 'gap-3'}`}>
      <span
        aria-hidden="true"
        className={`relative flex shrink-0 items-end justify-center border-b-2 border-gold-400 pb-0.5 ${
          compact ? 'h-8 w-8' : 'h-10 w-10'
        }`}
      >
        <span className={`font-serif italic leading-none ${primaryColor} ${compact ? 'text-2xl' : 'text-3xl'}`}>
          V
        </span>
        <span className="absolute -right-0.5 bottom-0.5 h-1.5 w-1.5 rounded-full bg-blush-400" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-semibold tracking-[0.18em] ${primaryColor} ${compact ? 'text-base' : 'text-lg'}`}>
          MLAR
        </span>
        <span className={`mt-1 text-[8px] font-semibold uppercase tracking-[0.32em] ${secondaryColor}`}>
          Bakehouse
        </span>
      </span>
    </span>
  );
}