import {
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  FolderGit2,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

const navItems = [
  { icon: <Home size={20} />, label: "Terminal", href: "/" },
  { icon: <User size={20} />, label: "About", href: "/about" },
  { icon: <Sparkles size={20} />, label: "Journey", href: "/journey" },
  { icon: <FolderGit2 size={20} />, label: "Projects", href: "/projects" },
  { icon: <Mail size={20} />, label: 'Feedback', href: '/feedback' },
];

const socialItems = [
  {
    icon: <Github size={20} />,
    label: "GitHub",
    href: "https://github.com/deekshithagowdaar",
    isExternal: true,
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    href: "https://linkedin.com/in/deekshithaar",
    isExternal: true,
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    href: "mailto:deekshitha@example.com",
    isExternal: true,
  },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const NavItemComponent = ({ item }) => {
    const isActive = location.pathname === item.href;
    const Component = item.isExternal ? "a" : Link;

    const props = item.isExternal
      ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
      : { to: item.href };

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Component
          {...props}
          onClick={() => setIsMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 group relative",
            isActive
              ? "bg-primary/20 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          <span
            className={cn(
              "transition-colors duration-300",
              isActive ? "text-primary" : "group-hover:text-primary"
            )}
          >
            {item.icon}
          </span>

          <AnimatePresence>
            {(isExpanded || isMobileOpen) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-medium text-sm whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>

          {!isExpanded && !isMobileOpen && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 hidden md:block">
              {item.label}
            </div>
          )}
        </Component>
      </motion.div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border md:hidden"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isMobileOpen ? 200 : isExpanded ? 200 : 64,
        }}
        className={cn(
          "fixed left-0 top-0 h-full z-50 glass-strong flex flex-col py-6 transition-all duration-300",
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="px-4 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
            D
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-2">
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </nav>

        <div className="mx-4 my-4 h-px bg-border" />

        <div className="px-2 space-y-2">
          {socialItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </div>

        <div className="px-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {(isExpanded || isMobileOpen) && (
              <span className="text-xs text-muted-foreground">
                Available for opportunities
              </span>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
