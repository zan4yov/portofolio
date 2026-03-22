import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";
import TypingText from "@/components/TypingText";
import TechBadge from "@/components/TechBadge";
import { Button } from "@/components/ui/button";
import AboutMe from "@/components/AboutMe";
import { personalInfo, techStack, projects } from "@/data/portfolio-data";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 🧠 Hero Section */}
      <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <div className="text-secondary text-sm font-mono">{">"} Hello, World! 👋</div>

          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <TypingText
                text={`I'm ${personalInfo.name}`}
                className="text-foreground"
                speed={80}
              />
            </h1>
            <h2 className="text-2xl md:text-3xl text-primary font-semibold">
              {personalInfo.title}
            </h2>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl">
            {personalInfo.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
            >
              <Link to="/projects">
                View Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <Link to="/contact">
                Get in Touch
                <Sparkles className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-full"
          >
            <span className="w-2 h-2 bg-secondary rounded-full animate-glow-pulse" />
            <span className="text-sm text-muted-foreground">
              {personalInfo.availability}
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-md"
        >
          <ProfileCard
            avatarUrl={personalInfo.profileImage}
            name={personalInfo.name}
            title={personalInfo.title}
            handle="razanwr"
            status={personalInfo.availability}
            contactText="Contact Me"
            onContactClick={() => (window.location.href = "/contact")}
          />
        </motion.div>
      </section>

      {/* 🌟 About Me Section */}
      <AboutMe />

      {/* 🧠 Tech Stack Section */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-3 text-foreground">
            {"<Tech Stack />"}
          </h2>
          <p className="text-muted-foreground">Technologies I work with</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <TechBadge name={tech.name} logo={tech.logo} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🚀 Project Preview Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3 text-foreground">Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing a selection of projects that reflect my skills, creativity,
            and passion for building meaningful digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="rounded-xl border border-[#7B61FF]/40 bg-black/40 backdrop-blur-md p-6 shadow-[0_0_25px_rgba(123,97,255,0.2)] hover:shadow-[0_0_35px_rgba(123,97,255,0.4)] transition-all duration-500"
            >
              {/* Gambar */}
              {project.image && (
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-gradient-to-tr from-[#7B61FF]/10 to-transparent">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              )}

              {/* Judul dan Deskripsi */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tag list */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs border border-[#7B61FF]/30 text-[#7B61FF] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔗 Browse More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#7B61FF]/80 hover:bg-[#7B61FF] text-white shadow-[0_0_15px_rgba(123,97,255,0.5)] hover:shadow-[0_0_30px_rgba(123,97,255,0.7)] transition-all"
          >
            <Link to="/projects">Browse More →</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
