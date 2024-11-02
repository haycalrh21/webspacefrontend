"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showMeteor, setShowMeteor] = useState(true); // State untuk visibilitas meteor

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setScrollY(window.scrollY);
    };

    const onScrollEnd = () => {
      setTimeout(() => {
        if (isScrolling) {
          setIsScrolling(false);
          setShowMeteor(true); // Munculkan kembali meteor
        }
      }, 100); // Delay sebelum memunculkan kembali
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", () => {
      setShowMeteor(false); // Sembunyikan meteor saat scrolling
      onScrollEnd();
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5 + scrollY + "px",
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number, scrollY]);

  return (
    <>
      {showMeteor && (
        <>
          {[...meteorStyles].map((style, idx) => (
            <span
              key={idx}
              className={cn(
                "pointer-events-none absolute left-1/2 top-2/2 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
              )}
              style={style}
            >
              <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
            </span>
          ))}
        </>
      )}
    </>
  );
};

export default Meteors;
