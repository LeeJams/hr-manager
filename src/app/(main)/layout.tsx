import { ReactNode } from "react";
import MobileContainer from "@/components/MobileContainer";
import BottomNav from "@/components/BottomNav";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
        <header className="bg-dark text-light px-6 py-4 sticky top-0 z-10">
          <h1 className="text-lg font-semibold">TechMeet</h1>
        </header>
        {children}
        <BottomNav />
      </div>
    </MobileContainer>
  );
}
