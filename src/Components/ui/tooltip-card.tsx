"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const supportsPointerEvents = typeof window !== "undefined" && "PointerEvent" in window;

  useEffect(() => {
    setMounted(true);
  }, []);

  const calculatePosition = (clientX: number, clientY: number) => {
    if (!contentRef.current) return { x: clientX + 12, y: clientY + 12 };

    const tooltip = contentRef.current;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const tooltipWidth = 240; // match your min-w or fixed width
    const tooltipHeight = tooltip.scrollHeight;

    let finalX = clientX + 12;
    let finalY = clientY + 12;

    if (finalX + tooltipWidth > viewportWidth) {
      finalX = clientX - tooltipWidth - 12;
    }
    if (finalX < 0) finalX = 12;

    if (finalY + tooltipHeight > viewportHeight) {
      finalY = clientY - tooltipHeight - 12;
    }
    if (finalY < 0) finalY = 12;

    return { x: finalX, y: finalY };
  };

  const updateMousePosition = (clientX: number, clientY: number) => {
    const newPosition = calculatePosition(clientX, clientY);
    setPosition(newPosition);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    setIsVisible(true);
    updateMousePosition(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    setIsVisible(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    if (!isVisible) return;
    updateMousePosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    updateMousePosition(touch.clientX, touch.clientY);
    setIsVisible(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const hasHover =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      !window.matchMedia("(hover: none)").matches;

    if (!hasHover) {
      e.preventDefault();
      if (isVisible) {
        setIsVisible(false);
      } else {
        updateMousePosition(e.clientX, e.clientY);
        setIsVisible(true);
      }
    }
  };

  // Keep position updated if tooltips change their size
  useEffect(() => {
    if (isVisible && contentRef.current) {
      // In a real app we might track mouse globally, but as a fallback
      // we can't reliably update without an event.
      // But the animation takes care of most visual changes.
    }
  }, [isVisible, content]);

  return (
    <div
      className={cn("relative block", containerClassName)}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onMouseEnter={supportsPointerEvents ? undefined : (e) => {
        setIsVisible(true);
        updateMousePosition(e.clientX, e.clientY);
      }}
      onMouseMove={supportsPointerEvents ? undefined : (e) => {
        if (isVisible) updateMousePosition(e.clientX, e.clientY);
      }}
      onMouseLeave={supportsPointerEvents ? undefined : () => {
        setIsVisible(false);
      }}
    >
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isVisible && (
              <motion.div
                key="tooltip"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="pointer-events-none fixed z-[9999] overflow-hidden rounded-xl border border-transparent shadow-xl ring-1 shadow-black/5 ring-black/5 dark:shadow-white/10 dark:ring-white/5 bg-transparent"
                style={{
                  top: position.y,
                  left: position.x,
                }}
              >
                <div
                  ref={contentRef}
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
