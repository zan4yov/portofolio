import { motion } from 'framer-motion';

interface TechBadgeProps {
  name: string;
  logo: string;
}

export default function TechBadge({ name, logo }: TechBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-primary/30 bg-card hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
    >
      <img
        src={logo}
        alt={`${name} logo`}
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
        className="w-6 h-6 object-contain"
        onError={(e) => {
          // Fallback jika gambar gagal dimuat
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
      <span className="text-sm font-medium text-foreground">{name}</span>
    </motion.div>
  );
}
