import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links | Nhero Milano',
  description: 'Tutti i link utili di Nhero Milano',
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Standalone layout without Navigation, Footer, FloatingDock, or FrameBorder
  return <>{children}</>;
}
