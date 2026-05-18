import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, AlertTriangle, Archive, RefreshCw, Heart, Star, MessageSquare, Check, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { PANDALS } from "@/lib/data";

export default function AdminPage() {
  const [pandaLikes] = useLocalStorage<Record<string, number>>("pandal-likes", {});
  const [pandaRatings] = useLocalStorage<Record<string, number>>("pandal-ratings", {});
  const [likedPosts] = useLocalStorage<string[]>("liked-posts", []);
  const [likedPandals] = useLocalStorage<string[]>("pandal-liked-ids", []);

  const [, setPandaLikes] = useLocalStorage<Record<string, number>>("pandal-likes", {});
  const [, setPandaRatings] = useLocalStorage<Record<string, number>>("pandal-ratings", {});
  const [, setLikedPosts] = useLocalStorage<string[]>("liked-posts", []);
  const [, setLikedPandals] = useLocalStorage<string[]>("pandal-liked-ids", []);
  const [, setFeedLikes] = useLocalStorage<Record<string, number>>("feed-likes", {});
  const [, setSavedPosts] = useLocalStorage<string[]>("saved-posts", []);

  const [archiveEnabled, setArchiveEnabled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [archived, setArchived] = useState(false);

  const totalLikes = Object.values(pandaLikes).reduce((a, b) => a + b, 0) + likedPosts.length;
  const totalRatings = Object.keys(pandaRatings).length;
  const totalLikedPandals = likedPandals.length;

  const handleArchive = () => {
    setPandaLikes({});
    setPandaRatings({});
    setLikedPosts([]);
    setLikedPandals([]);
    setFeedLikes({});
    setSavedPosts([]);
    setShowConfirm(false);
    setArchiveEnabled(false);
    setArchived(true);
    setTimeout(() => setArchived(false), 4000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Settings size={22} className="text-primary" />
          <h1 className="text-2xl font-black text-foreground">Admin Panel</h1>
        </div>
        <p className="text-muted-foreground text-sm">Year-end data management and archive controls</p>
      </div>

      {/* Year badge */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">Current Year</div>
          <div className="text-3xl font-black">2024</div>
          <div className="text-white/70 text-sm">Durga Puja Season</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/70 font-medium uppercase tracking-wide mb-1">Next Year</div>
          <div className="text-3xl font-black text-secondary">2025</div>
          <div className="text-white/70 text-sm">Archive to begin</div>
        </div>
      </div>

      {/* Current year stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Heart size={18} className="text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{totalLikes}</div>
          <div className="text-xs text-muted-foreground font-medium">User Likes</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm">
          <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Star size={18} className="text-secondary" />
          </div>
          <div className="text-2xl font-black text-foreground">{totalRatings}</div>
          <div className="text-xs text-muted-foreground font-medium">Ratings</div>
        </div>
        <div className="bg-white rounded-xl border border-border p-4 text-center shadow-sm">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
            <MessageSquare size={18} className="text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{PANDALS.length}</div>
          <div className="text-xs text-muted-foreground font-medium">Pandals</div>
        </div>
      </div>

      {/* Archive control */}
      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-4">
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-black text-foreground text-base mb-0.5">Yearly Archive Mode</h2>
              <p className="text-muted-foreground text-sm">
                Enable to clear 2024 user data and make room for the 2025 festival season.
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setArchiveEnabled(!archiveEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${
                archiveEnabled ? "bg-primary" : "bg-muted"
              }`}
              data-testid="archive-toggle"
            >
              <motion.div
                animate={{ x: archiveEnabled ? 24 : 2 }}
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
              />
            </motion.button>
          </div>

          {/* What will be cleared */}
          <div className="bg-muted/60 rounded-xl p-4 mb-4">
            <div className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Data to be archived:</div>
            <ul className="space-y-1.5">
              {[
                `${totalLikedPandals} pandal likes`,
                `${totalRatings} user ratings`,
                `${likedPosts.length} feed likes`,
                "All saved posts",
                "All user interaction data",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence>
            {archiveEnabled && !showConfirm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                  <AlertTriangle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    <strong>Warning:</strong> This will permanently clear all 2024 user ratings, likes, and interaction data. 
                    The pandal directory will remain but all personalization data will be reset.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowConfirm(true)}
                  className="w-full py-3 rounded-xl bg-destructive text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                  data-testid="archive-year-btn"
                >
                  <Archive size={16} />
                  Archive 2024 Data
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confirmation dialog */}
          <AnimatePresence>
            {showConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-destructive/5 border border-destructive/20 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-destructive" />
                  <span className="font-bold text-sm text-foreground">Are you sure?</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  This action cannot be undone. All 2024 user data will be permanently cleared.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-2.5 rounded-xl border border-border font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-muted/50 transition-colors"
                    data-testid="cancel-archive-btn"
                  >
                    <X size={14} /> Cancel
                  </button>
                  <button
                    onClick={handleArchive}
                    className="flex-1 py-2.5 rounded-xl bg-destructive text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md"
                    data-testid="confirm-archive-btn"
                  >
                    <Check size={14} /> Confirm Archive
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success message */}
      <AnimatePresence>
        {archived && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
            data-testid="archive-success-msg"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={16} className="text-green-700" />
            </div>
            <div>
              <div className="font-bold text-sm text-green-800">Archive Complete!</div>
              <div className="text-xs text-green-700">2024 data has been cleared. Ready for Durga Puja 2025!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <div className="bg-primary/5 rounded-xl p-4 mt-4">
        <div className="flex items-start gap-2">
          <RefreshCw size={14} className="text-primary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            The yearly archive prepares PandalHop for the next festival season. Pandal listings are preserved, 
            but all user-generated data (ratings, likes, saves) is cleared so visitors can experience a fresh start for 2025.
          </p>
        </div>
      </div>
    </div>
  );
}
