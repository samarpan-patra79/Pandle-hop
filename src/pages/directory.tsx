import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, MapPin, Search, Filter } from "lucide-react";
import { PANDALS, Pandal } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";

const ZONE_GRADIENTS: Record<string, string> = {
  "North Kolkata": "from-red-800 to-amber-700",
  "Central Kolkata": "from-rose-700 to-orange-600",
  "South Kolkata": "from-red-700 to-yellow-600",
  "Salt Lake": "from-amber-700 to-red-600",
  "Howrah": "from-orange-800 to-red-700",
};

const ZONES = ["All", "North Kolkata", "Central Kolkata", "South Kolkata", "Salt Lake", "Howrah"];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
          data-testid={`star-${star}`}
        >
          <Star
            size={14}
            className={
              star <= (hovered || value)
                ? "fill-secondary text-secondary"
                : "text-muted-foreground"
            }
          />
        </button>
      ))}
    </div>
  );
}

function PandalCard({ pandal }: { pandal: Pandal }) {
  const [likes, setLikes] = useLocalStorage<Record<string, number>>("pandal-likes", {});
  const [liked, setLiked] = useLocalStorage<string[]>("pandal-liked-ids", []);
  const [ratings, setRatings] = useLocalStorage<Record<string, number>>("pandal-ratings", {});

  const isLiked = liked.includes(pandal.id);
  const likeCount = (likes[pandal.id] ?? 0) + pandal.likes;
  const userRating = ratings[pandal.id] ?? 0;
  const displayRating = userRating > 0 ? ((pandal.rating + userRating) / 2).toFixed(1) : pandal.rating.toFixed(1);

  const toggleLike = () => {
    if (isLiked) {
      setLiked(liked.filter((id) => id !== pandal.id));
      setLikes({ ...likes, [pandal.id]: Math.max(0, (likes[pandal.id] ?? 0) - 1) });
    } else {
      setLiked([...liked, pandal.id]);
      setLikes({ ...likes, [pandal.id]: (likes[pandal.id] ?? 0) + 1 });
    }
  };

  const handleRating = (star: number) => {
    setRatings({ ...ratings, [pandal.id]: star });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
      data-testid={`pandal-card-${pandal.id}`}
    >
      {/* Image area */}
      <div className={`relative h-36 bg-gradient-to-br ${ZONE_GRADIENTS[pandal.zone]} flex items-center justify-center`}>
        <span className="text-white/20 text-7xl font-black">{pandal.name[0]}</span>
        <div className="absolute top-2 right-2">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={toggleLike}
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md"
            data-testid={`like-pandal-${pandal.id}`}
          >
            <Heart
              size={15}
              className={isLiked ? "fill-primary text-primary" : "text-muted-foreground"}
            />
          </motion.button>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-black/40 text-white text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
            {pandal.theme}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="font-bold text-sm text-foreground mb-0.5 leading-tight">{pandal.name}</div>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
          <MapPin size={10} />
          <span>{pandal.zone}</span>
        </div>

        {/* Summary */}
        <p className="text-xs text-muted-foreground leading-snug mb-3 line-clamp-2">
          {pandal.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-secondary text-secondary" />
              <span className="text-xs font-bold text-foreground">{displayRating}</span>
              <span className="text-xs text-muted-foreground">({userRating > 0 ? "your rating" : "avg"})</span>
            </div>
            <StarRating value={userRating} onChange={handleRating} />
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Heart size={11} className="fill-red-400 text-red-400" />
            <span className="font-semibold">{likeCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("All");

  const filtered = PANDALS.filter((p) => {
    const matchZone = zone === "All" || p.zone === zone;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.zone.toLowerCase().includes(search.toLowerCase()) ||
      p.theme.toLowerCase().includes(search.toLowerCase());
    return matchZone && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-foreground mb-1">Pandal Directory</h1>
        <p className="text-muted-foreground text-sm">Browse, rate, and like pandals across West Bengal</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search by name, zone, or theme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          data-testid="directory-search"
        />
      </div>

      {/* Zone filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
        {ZONES.map((z) => (
          <button
            key={z}
            onClick={() => setZone(z)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              zone === z
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-muted-foreground border-border hover:border-primary/40"
            }`}
            data-testid={`zone-filter-${z.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="text-xs text-muted-foreground mb-4 font-medium">
        Showing {filtered.length} of {PANDALS.length} pandals
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence>
          {filtered.map((pandal) => (
            <PandalCard key={pandal.id} pandal={pandal} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Filter size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-semibold">No pandals found</p>
          <p className="text-sm">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
