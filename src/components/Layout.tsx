import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Terminal, Home, User, Briefcase, Mail, Github, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import FaultyTerminalBackground from "./FaultyTerminalBackground";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: User },
  { path: "/projects", label: "Projects", icon: Briefcase },
  { path: "/contact", label: "Contact", icon: Mail },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col justify-between">
      {/* 🌌 Faulty Terminal Background */}
      <FaultyTerminalBackground />

      {/* 🧠 Terminal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary"
            >
              <Terminal className="w-6 h-6" />
              <span className="text-xl font-bold tracking-tight">
                {"zan4yov.portfolio />"}
              </span>
            </motion.div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-primary/20 text-primary border border-primary/50"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden md:inline text-sm font-medium">
                      {item.label}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* 💻 Main Content */}
      <main className="pt-20 flex-1 relative z-10">{children}</main>

      {/* 🌈 Modern Footer Container */}
      <footer className="relative z-20 py-10 flex justify-center">
        <div
          className="w-[90%] max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between 
          gap-6 px-8 py-6 rounded-2xl
          bg-gradient-to-r from-[#00D4FF]/10 via-[#0072FF]/10 to-[#00D4FF]/10
          border border-[#00D4FF]/20 backdrop-blur-md
          shadow-[0_0_25px_rgba(0,212,255,0.15)] hover:shadow-[0_0_40px_rgba(0,212,255,0.3)]
          transition-all duration-500"
        >
          {/* Left: Brand */}
          <span className="text-white font-semibold text-lg tracking-tight select-none">
            {">_ zan4yov.portfolio />"}
          </span>

          {/* Middle: Social Links */}
          <div className="flex items-center gap-5 text-gray-300">
            <a
              href="https://github.com/zan4yov"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-all hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/razanvvr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-all hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/razan-reswara-376b54326/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-all hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Right: Navigation Buttons */}
          <div className="flex items-center gap-3 bg-[#0a0a0a]/70 p-2 rounded-xl border border-[#00D4FF]/20">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `p-3 rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#00D4FF]/30 text-[#00D4FF] shadow-[0_0_12px_rgba(0,212,255,0.4)]"
                      : "hover:bg-[#00D4FF]/10 text-gray-300 hover:text-[#00D4FF]"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
              </NavLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
