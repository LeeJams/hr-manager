import { ReactNode } from "react";
import MobileContainer from "@/components/MobileContainer";
import BackButton from "@/components/layout/BackButton";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MobileContainer>
      <div className="min-h-screen bg-light pb-16">
        <header className="bg-dark text-light px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="text-lg font-semibold">TechMeet</h1>
          </div>
        </header>
        {children}
      </div>
    </MobileContainer>
  );
}
