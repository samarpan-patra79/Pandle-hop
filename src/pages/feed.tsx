import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Clock, MessageCircle, Share2, Bookmark } from "lucide-react";
import { PANDALS, FEED_POSTS } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";

const ZONE_GRADIENTS: Record<string, string> = {
  "North Kolkata": "from-red-800 to-amber-700",
  "Central Kolkata": "from-rose-700 to-orange-600",
  "South Kolkata": "from-red-700 to-yellow-600",
  "Salt Lake": "from-amber-700 to-red-600",
  "Howrah": "from-orange-800 to-red-700",
};

const EXTRA_POSTS = [
  { id: "post6", pandalId: "p6", caption: "The nature-themed installation at Ekdalia Evergreen is genuinely peaceful. The sound of water features and lush greenery makes you forget you're in a city.", timestamp: "12 hours ago" },
  { id: "post7", pandalId: "p3", caption: "Mohammed Ali Park outdid themselves this year. The scale of the replica is jaw-dropping. Go early to avoid the massive crowds.", timestamp: "15 hours ago" },
  { id: "post8", pandalId: "p7", caption: "The interactive art stations at Ballygunge Cultural kept the kids occupied for hours. A great family outing in South Kolkata.", timestamp: "1 day ago" },
  { id: "post9", pandalId: "p2", caption: "Kumartuli Park's environmental theme this year is both thought-provoking and visually stunning. The craftsmen have truly outdone themselves.", timestamp: "1 day ago" },
  { id: "post10", pandalId: "p12", caption: "The evening aarti at Howrah Golabari was deeply moving. The devotional atmosphere there is unlike anywhere else. Highly recommended.", timestamp: "2 days ago" },
];

const ALL_POSTS = [...FEED_POSTS, ...EXTRA_POSTS];

export default function FeedPage() {
  const [postLikes, setPostLikes] = useLocalStorage<Record<string, number>>("feed-likes", {});
  const [likedPosts, setLikedPosts] = useLocalStorage<string[]>("liked-posts", []);
  const [savedPosts, setSavedPosts] = useLocalStorage<string[]>("saved-posts", []);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      setPostLikes({ ...postLikes, [postId]: Math.max(0, (postLikes[postId] ?? 48) - 1) });
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPostLikes({ ...postLikes, [postId]: (postLikes[postId] ?? 48) + 1 });
    }
  };

  const handleSave = (postId: string) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter((id) => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">Festival Feed</h1>
          <p className="text-muted-foreground text-sm">Live updates from the pandals</p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-primary">Live</span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {ALL_POSTS.map((post, i) => {
            const pandal = PANDALS.find((p) => p.id === post.pandalId);
            if (!pandal) return null;
            const isLiked = likedPosts.includes(post.id);
            const isSaved = savedPosts.includes(post.id);
            const likes = postLikes[post.id] ?? (42 + i * 7);

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
                data-testid={`feed-post-${post.id}`}
              >
                {/* Post header */}
                <div className="flex items-center gap-3 p-4 pb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ZONE_GRADIENTS[pandal.zone]} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-black text-sm">{pandal.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground truncate">{pandal.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={10} />
                      <span>{pandal.zone}</span>
                      <span>·</span>
                      <Clock size={10} />
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                    {pandal.theme}
                  </div>
                </div>

                {/* Image placeholder */}
                <div className={`h-52 bg-gradient-to-br ${ZONE_GRADIENTS[pandal.zone]} relative flex items-end`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-white text-9xl font-black">{pandal.name[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="relative p-4">
                    <span className="text-white font-bold text-sm">{pandal.name}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="px-4 py-3">
                  <p className="text-sm text-foreground leading-relaxed">{post.caption}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between px-4 pb-4">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                      style={{ color: isLiked ? "#8B1A1A" : undefined }}
                      data-testid={`like-btn-${post.id}`}
                    >
                      <Heart
                        size={18}
                        className={isLiked ? "fill-primary text-primary" : "text-muted-foreground"}
                      />
                      <span className={isLiked ? "text-primary" : "text-muted-foreground"}>{likes}</span>
                    </motion.button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
                      <MessageCircle size={18} />
                      <span>{8 + i * 3}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground font-semibold">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handleSave(post.id)}
                    className="text-muted-foreground"
                    data-testid={`save-btn-${post.id}`}
                  >
                    <Bookmark size={18} className={isSaved ? "fill-secondary text-secondary" : ""} />
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-muted-foreground text-sm py-6">
        You're all caught up! Check back during the festival for live updates.
      </div>
    </div>
  );
}
