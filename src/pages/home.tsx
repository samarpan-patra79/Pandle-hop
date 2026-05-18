import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, MapPin, Trophy, Route, RefreshCw } from "lucide-react";
import { PANDALS } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";

const ZONE_GRADIENTS: Record<string, string> = {
  "North Kolkata": "from-red-800 to-amber-700",
  "Central Kolkata": "from-rose-700 to-orange-600",
  "South Kolkata": "from-red-700 to-yellow-600",
  "Salt Lake": "from-amber-700 to-red-600",
  "Howrah": "from-orange-800 to-red-700",
};

const features = [
  { icon: <span className="text-2xl">&#127908;</span>, label: "Social Feed", desc: "Live updates from the festival grounds", href: "/feed", color: "from-red-800 to-rose-600" },
  { icon: <span className="text-2xl">&#127981;</span>, label: "Pandal Directory", desc: "Browse all pandals with ratings & reviews", href: "/directory", color: "from-amber-700 to-yellow-500" },
  { icon: <Trophy size={24} className="text-white" />, label: "Leaderboard", desc: "Top-ranked pandals by zone", href: "/leaderboard", color: "from-red-700 to-orange-500" },
  { icon: <Route size={24} className="text-white" />, label: "Route Planner", desc: "Plan your pandal-hopping itinerary", href: "/planner", color: "from-rose-800 to-red-600" },
];

export default function HomePage() {
  const [likes] = useLocalStorage<Record<string, number>>("pandal-likes", {});
  const featuredPandals = PANDALS.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary to-red-900 text-primary-foreground p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #D4A017 0%, transparent 60%)" }}
        />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Durga Puja 2024 — Live
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
            Discover the Best<br />
            <span className="text-secondary">Pandals</span> in West Bengal
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-6 max-w-md">
            Your festive companion for exploring the grandest Durga Puja pandals across Kolkata and beyond. Discover, rate, and plan your pandal-hopping adventure.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/directory">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-secondary text-primary font-bold px-6 py-3 rounded-xl shadow-lg"
                data-testid="hero-explore-btn"
              >
                Explore Pandals <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link href="/planner">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 font-bold px-6 py-3 rounded-xl border border-white/20 transition-colors"
                data-testid="hero-plan-btn"
              >
                Plan Route <Route size={18} />
              </motion.button>
            </Link>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute right-4 top-4 md:right-10 md:top-8 opacity-20 md:opacity-30">
          <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-secondary" />
          <div className="w-16 h-16 md:w-28 md:h-28 rounded-full border-2 border-white/50 absolute -bottom-4 -left-4" />
        </div>
      </motion.div>

      {/* Feature tiles */}
      <div className="mb-8">
        <h2 className="text-xl font-black text-foreground mb-4">What's Inside</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
            >
              <Link href={f.href}>
                <div className={`bg-gradient-to-br ${f.color} text-white rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1`}
                  data-testid={`feature-tile-${f.label.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  <div className="mb-3">{f.icon}</div>
                  <div className="font-bold text-sm mb-1">{f.label}</div>
                  <div className="text-white/75 text-xs leading-snug">{f.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured pandals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-foreground">Featured Pandals</h2>
          <Link href="/directory" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featuredPandals.map((pandal, i) => {
            const likeCount = (likes[pandal.id] ?? 0) + pandal.likes;
            return (
              <motion.div
                key={pandal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all"
                data-testid={`featured-pandal-${pandal.id}`}
              >
                <div className={`h-28 bg-gradient-to-br ${ZONE_GRADIENTS[pandal.zone]} flex items-center justify-center`}>
                  <span className="text-white/30 text-5xl font-black">{pandal.name[0]}</span>
                </div>
                <div className="p-3">
                  <div className="font-bold text-sm text-foreground mb-0.5 truncate">{pandal.name}</div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
                    <MapPin size={11} /> {pandal.zone}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-secondary text-secondary" />
                      <span className="text-xs font-bold">{pandal.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Heart size={12} className="fill-red-400 text-red-400" />
                      {likeCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center"
      >
        <div className="text-primary font-black text-lg mb-1">About Durga Puja</div>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          Durga Puja is West Bengal's grandest festival, celebrating the goddess Durga's victory over evil. 
          Every year, thousands of elaborately decorated temporary structures called <strong>pandals</strong> are built across the state, 
          each competing to create the most awe-inspiring experience.
        </p>
      </motion.div>
    </div>
  );
}
