'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Loader Screen Component
 * Shows a loading screen with the Nhero logo and a circular loader animation.
 * When loading completes, a green ring expands from center outward, revealing the website.
 */
export default function LoaderScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [ringPhase, setRingPhase] = useState(0); // 0: waiting, 1: green expanding, 2: hole expanding

  useEffect(() => {
    // Loading phase
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsRevealing(true);
      setRingPhase(1);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (ringPhase === 1) {
      // Start expanding the inner hole after green has started expanding
      const holeTimer = setTimeout(() => {
        setRingPhase(2);
      }, 150);

      return () => clearTimeout(holeTimer);
    }
  }, [ringPhase]);

  useEffect(() => {
    if (ringPhase === 2) {
      // After ring animation completes, remove loader
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, 1000);

      return () => clearTimeout(completeTimer);
    }
  }, [ringPhase]);

  if (isComplete) {
    return null;
  }

  return (
    <>
      {/* Loader frame - matches the site frame but with higher z-index */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--frame-border)',
          backgroundColor: 'var(--border-color)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'var(--frame-border)',
          backgroundColor: 'var(--border-color)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 'var(--frame-border)',
          backgroundColor: 'var(--border-color)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 'var(--frame-border)',
          backgroundColor: 'var(--border-color)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

      {/* Global keyframes */}
      <style>
        {`
          @keyframes loader-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes loader-dash {
            0% {
              stroke-dasharray: 1, 100;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 60, 100;
              stroke-dashoffset: -20;
            }
            100% {
              stroke-dasharray: 60, 100;
              stroke-dashoffset: -100;
            }
          }
        `}
      </style>

      {/* Cream background with logo - shrinks from center */}
      <div
        style={{
          position: 'fixed',
          inset: 'var(--frame-border)',
          zIndex: 9998,
          backgroundColor: 'var(--nhero-green)',
          clipPath: isRevealing
            ? 'circle(0% at 50% 50%)'
            : 'circle(150% at 50% 50%)',
          transition: 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Content container */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            opacity: isRevealing ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}
        >
          {/* Logo */}
          <Image
            src="/nhero_white_logo.png"
            alt="Nhero Milano"
            width={180}
            height={60}
            priority
            style={{
              objectFit: 'contain',
            }}
          />

          {/* Circle Loader Animation */}
          {isLoading && (
            <div className="loader-spinner">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                style={{
                  animation: 'loader-rotate 1.4s linear infinite',
                }}
              >
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="var(--nhero-cream)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{
                    animation: 'loader-dash 1.4s ease-in-out infinite',
                  }}
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Green ring layer - uses mask to create ring effect */}
      <div
        style={{
          position: 'fixed',
          inset: 'var(--frame-border)',
          zIndex: 9997,
          backgroundColor: 'var(--nhero-green)',
          clipPath: ringPhase >= 1
            ? 'circle(150% at 50% 50%)'
            : 'circle(0% at 50% 50%)',
          WebkitMaskImage: ringPhase >= 2
            ? 'radial-gradient(circle at 50% 50%, transparent 150%, black 150%)'
            : 'radial-gradient(circle at 50% 50%, transparent 0%, black 0%)',
          maskImage: ringPhase >= 2
            ? 'radial-gradient(circle at 50% 50%, transparent 150%, black 150%)'
            : 'radial-gradient(circle at 50% 50%, transparent 0%, black 0%)',
          transition: 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1), mask-image 0.8s cubic-bezier(0.22, 1, 0.36, 1), -webkit-mask-image 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
    </>
  );
}
