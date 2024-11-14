import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  className?: string;
  priority?: boolean;
}

export function Card({ title, description, icon, imageUrl, className = '', priority = false }: CardProps) {
  return (
    <div className={`relative group overflow-hidden rounded-xl ${className}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="h-full bg-gray-800 transition-all duration-300"
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 z-10" />
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading={priority ? "eager" : "lazy"}
            style={{
              objectPosition: "center",
              aspectRatio: "16/9",
            }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 md:p-6 
                     bg-gradient-to-t from-black/90 via-black/60 to-transparent"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-400">{icon}</span>
              <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-gray-300 text-xs md:text-sm line-clamp-2">{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}