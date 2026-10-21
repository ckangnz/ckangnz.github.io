import { ReactNode, useRef } from "react";
import { useInView } from "../hooks/useInView";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const Reveal = ({ children, delay = 0, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
