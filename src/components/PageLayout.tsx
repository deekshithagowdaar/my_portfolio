import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface PageLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.55, 0.06, 0.68, 0.19] as const,
    },
  },
};

const PageLayout = ({ children, showSidebar = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showSidebar && <Sidebar />}
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={showSidebar ? 'md:pl-16' : ''}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default PageLayout;
