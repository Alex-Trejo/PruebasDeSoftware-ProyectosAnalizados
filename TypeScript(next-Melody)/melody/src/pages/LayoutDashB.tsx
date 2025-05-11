import React from 'react';
import { Header } from "../components/Header";
import Footer from '../components/Footer';
import GradientEllipses from '../components/GradientEllipses';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-neutral-950">
     
      <GradientEllipses className="absolute inset-0 z-0" />
      
      {/* Header en la parte superior */}
      <div className="fixed top-0 left-0 w-full z-50">
      <Header />
      </div>
      
      
      {/* Contenido principal */}
      <main className="top-[95px] relative z-20">
        {children}
      </main>
      
      {/* Footer en la parte inferior */}
      <Footer className="relative z-10" />
    </div>
  );
};

export default Layout;