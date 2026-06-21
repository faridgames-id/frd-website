"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export function SpotlightCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [size, setSize] = useState({ w: 0, h: 0 });

  const glassSize = 160; 
  const zoom = 1.2;

  // Refs for gsap quickTo
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const innerXTo = useRef<gsap.QuickToFunc | null>(null);
  const innerYTo = useRef<gsap.QuickToFunc | null>(null);
  const originSetter = useRef<Function | null>(null);
  const glowXTo = useRef<gsap.QuickToFunc | null>(null);
  const glowYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (divRef.current) {
      setSize({ w: divRef.current.offsetWidth, h: divRef.current.offsetHeight });
      const observer = new ResizeObserver((entries) => {
        setSize({ w: entries[0].contentRect.width, h: entries[0].contentRect.height });
      });
      observer.observe(divRef.current);

      // Initialize GSAP for ultra-smooth 60fps tracking
      gsap.set(bubbleRef.current, { scale: 0.5, force3D: true, autoAlpha: 0 });
      gsap.set(glowRef.current, { force3D: true, autoAlpha: 0 });
      gsap.set(innerRef.current, { scale: zoom, force3D: true });

      xTo.current = gsap.quickTo(bubbleRef.current, "x", { duration: 0.1, ease: "power2.out" });
      yTo.current = gsap.quickTo(bubbleRef.current, "y", { duration: 0.1, ease: "power2.out" });
      innerXTo.current = gsap.quickTo(innerRef.current, "x", { duration: 0.1, ease: "power2.out" });
      innerYTo.current = gsap.quickTo(innerRef.current, "y", { duration: 0.1, ease: "power2.out" });
      originSetter.current = gsap.quickSetter(innerRef.current, "transformOrigin");
      glowXTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.1, ease: "power2.out" });
      glowYTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.1, ease: "power2.out" });

      return () => observer.disconnect();
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Use GSAP quickTo to completely bypass React state re-renders!
    if (xTo.current && yTo.current) {
      xTo.current(x - glassSize / 2);
      yTo.current(y - glassSize / 2);
    }
    if (innerXTo.current && innerYTo.current && originSetter.current) {
      innerXTo.current(-(x - glassSize / 2));
      innerYTo.current(-(y - glassSize / 2));
      originSetter.current(`${x}px ${y}px`);
    }
    if (glowXTo.current && glowYTo.current) {
      glowXTo.current(x - (glassSize * 1.5) / 2);
      glowYTo.current(y - (glassSize * 1.5) / 2);
    }
  };

  const handleMouseEnter = () => {
    gsap.to(bubbleRef.current, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out", force3D: true });
    gsap.to(glowRef.current, { autoAlpha: 0.4, duration: 0.3, ease: "power2.out", force3D: true });
  };

  const handleMouseLeave = () => {
    gsap.to(bubbleRef.current, { autoAlpha: 0, scale: 0.5, duration: 0.2, force3D: true });
    gsap.to(glowRef.current, { autoAlpha: 0, duration: 0.2, force3D: true });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-none ${className}`}
      style={{ ...style, transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* 1. The original un-zoomed content */}
      {children}

      {/* 2. The HD Magnifying Glass Bubble */}
      <div
        ref={bubbleRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full z-[60] overflow-hidden"
        style={{
          width: `${glassSize}px`,
          height: `${glassSize}px`,
          willChange: "transform, opacity",
          transformStyle: "preserve-3d",
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.4), inset 10px 0 40px rgba(79,142,247,0.5), inset -10px 0 40px rgba(79,142,247,0.5), 0 15px 40px rgba(0,0,0,0.6), 0 0 50px rgba(79,142,247,0.3)",
          backdropFilter: "blur(6px) saturate(1.2)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        {/* 3. The duplicated content, shifted back and scaled up to create the zoom effect! */}
        <div
          ref={innerRef}
          className="absolute top-0 left-0"
          style={{
            width: size.w ? `${size.w}px` : "100%",
            height: size.h ? `${size.h}px` : "100%",
            willChange: "transform",
            filter: "brightness(1.1) contrast(1.1) drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
          }}
        >
          {children}
        </div>
        
        {/* 4. The 3D glass highlight / reflection on top of the zoomed text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(255,255,255,0) 40%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1), rgba(255,255,255,0) 50%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>
      
      {/* 5. A soft blue glow behind the glass onto the background */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 rounded-full z-10"
        style={{
          width: `${glassSize * 1.5}px`,
          height: `${glassSize * 1.5}px`,
          willChange: "transform, opacity",
          background: `radial-gradient(circle, rgba(79,142,247,0.6), transparent 60%)`,
        }}
      />
    </div>
  );
}
