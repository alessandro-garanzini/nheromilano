'use client';

/**
 * Frame Border Component
 * Creates a Manhattan-style border around the entire website
 */
export default function FrameBorder() {
  return (
    <>
      <div className="frame-border frame-border-top" />
      <div className="frame-border frame-border-right" />
      <div className="frame-border frame-border-bottom" />
      <div className="frame-border frame-border-left" />
    </>
  );
}
