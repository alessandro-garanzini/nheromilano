'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * Loader Screen Component
 * Shows a loading screen with the Nhero logo and a circular loader animation.
 * When loading completes, the cream background transforms into green via a circular reveal,
 * then smoothly fades out to reveal the website.
 */
export default function LoaderScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Loading phase
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsRevealing(true);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (isRevealing) {
      // After circular reveal completes, remove loader
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
      }, 800);

      return () => clearTimeout(completeTimer);
    }
  }, [isRevealing]);

  if (isComplete) {
    return null;
  }

  return (
    <>
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

      <div
        className="loader-screen"
        style={{
          position: 'fixed',
          inset: 'var(--frame-border)',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--nhero-cream)',
          overflow: 'hidden',
        }}
      >
        {/* Green circular reveal overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--nhero-green)',
            clipPath: isRevealing
              ? 'circle(150% at 50% 50%)'
              : 'circle(0% at 50% 50%)',
            transition: 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 1,
          }}
        />

        {/* Content container */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            opacity: isRevealing ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Logo */}
          <Image
            src="/nhero_black_logo.png"
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
                  stroke="var(--nhero-green)"
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
    </>
  );
}
