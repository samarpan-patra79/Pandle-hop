import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-7xl font-black text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-black text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">This pandal does not exist — but there are plenty more to explore!</p>
        <Link href="/">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl mx-auto hover:opacity-90 transition-opacity">
            <Home size={16} /> Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
