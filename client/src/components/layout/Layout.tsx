import { Sidebar } from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Layout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple entry animation for page content
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [children]); // Re-run when children (route) changes

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans overflow-hidden relative">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <Sidebar />
      
      <main className="flex-1 ml-64 relative z-10 h-screen overflow-y-auto">
        <div className="container mx-auto p-8 max-w-7xl" ref={contentRef}>
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
}
