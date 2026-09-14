import type { ReactNode } from 'react';
import { usePointerTilt } from '@/hooks/usePointerTilt';

type TiltFrameProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export default function TiltFrame({ children, className = '', max = 8 }: TiltFrameProps) {
  const ref = usePointerTilt<HTMLDivElement>({ max });

  return (
    <div ref={ref} className={`tilt-stage ${className}`}>
      {children}
      <span className="tilt-shine" aria-hidden="true" />
    </div>
  );
}
