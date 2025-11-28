import React from 'react';
// You will likely have a Navbar and Footer component here.
// For now, we'll assume they exist or will be created.
// import Navbar from './Navbar';
// import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-grow">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;