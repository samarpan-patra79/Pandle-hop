import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Heart, MapPin, TrendingUp } from "lucide-react";
import { PANDALS, Pandal } from "@/lib/data";
import { useLocalStorage } from "@/hooks/use-local-storage";

const ZONES = ["All", "North Kolkata", "Central Kolkata", "South Kolkata", "Salt Lake", "Howrah"];

const ZONE_GRADIENTS: Record<string, string> = {
  "North Kolkata": "from-red-800 to-amber-700",
  "Central Kolkata": "from-rose-700 to-orange-600",
  "South Kolkata": "from-red-700 to-yellow-600",
  "Salt Lake": "from-amber-700 to-red-600",
  "Howrah": "from-orange-800 to-red-700",
};

function scoreOf(p: Pandal, likes: Record<string, number>): number {
  const totalLikes = (likes[p.id] ?? 0) + p.likes;
  return Math.round(p.rating * 1000 + totalLikes / 10);
}

export default function LeaderboardPage() {
  const [zone, setZone] = useState("All");
  const [likes] = useLocalStorage<Record<string, number>>("pandal-likes", {});

  const filtered = (zone === "All" ? PANDALS : PANDALS.filter((p) => p.zone === zone))
    .slice()
    .sort((a, b) => scoreOf(b, likes) - scoreOf(a, likes));

  const top3 = filtered.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={22} className="text-secondary" />
          <h1 className="text-2xl font-black text-foreground">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground text-sm">Ranked by combined rating and likes</p>
      </div>

      {/* Zone filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {ZONES.map((z) => (
          <button
            key={z}
            onClick={() => setZone(z)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              zone === z
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-muted-foreground border-border hover:border-primary/40"
            }`}
            data-testid={`leaderboard-zone-${z.replace(/\s+/g, "-").toLowerCase()}`}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Top 3 podium */}
      {top3.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-end justify-center gap-3 mb-4">
            {/* 2nd */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex-1 max-w-28"
            >
              <div className={`rounded-t-2xl bg-gradient-to-br ${ZONE_GRADIENTS[top3[1].zone]} h-24 flex items-center justify-center relative`}>
                <span className="text-white/20 text-4xl font-black">{top3[1].name[0]}</span>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-black text-sm shadow">2</div>
              </div>
              <div className="bg-white border border-border rounded-b-xl px-2 py-2 text-center">
                <div className="font-bold text-xs truncate">{top3[1].name}</div>
                <div className="text-xs text-muted-foreground">{scoreOf(top3[1], likes).toLocaleString()} pts</div>
              </div>
            </motion.div>

            {/* 1st */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex-1 max-w-32"
            >
              <div className={`rounded-t-2xl bg-gradient-to-br ${ZONE_GRADIENTS[top3[0].zone]} h-32 flex items-center justify-center relative border-2 border-secondary`}>
                <span className="text-white/20 text-5xl font-black">{top3[0].name[0]}</span>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                  <Trophy size={18} className="text-primary" />
                </div>
              </div>
              <div className="bg-primary text-primary-foreground rounded-b-xl px-2 py-2 text-center">
                <div className="font-black text-xs truncate">{top3[0].name}</div>
                <div className="text-xs text-white/70">{scoreOf(top3[0], likes).toLocaleString()} pts</div>
              </div>
            </motion.div>

            {/* 3rd */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 max-w-28"
            >
              <div className={`rounded-t-2xl bg-gradient-to-br ${ZONE_GRADIENTS[top3[2].zone]} h-20 flex items-center justify-center relative`}>
                <span className="text-white/20 text-4xl font-black">{top3[2].name[0]}</span>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-white font-black text-sm shadow">3</div>
              </div>
              <div className="bg-white border border-border rounded-b-xl px-2 py-2 text-center">
                <div className="font-bold text-xs truncate">{top3[2].name}</div>
                <div className="text-xs text-muted-foreground">{scoreOf(top3[2], likes).toLocaleString()} pts</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Full ranked list */}
      <div className="space-y-2">
        {filtered.map((pandal, i) => {
          const totalLikes = (likes[pandal.id] ?? 0) + pandal.likes;
          const score = scoreOf(pandal, likes);
          const rank = i + 1;
          const isTop3 = rank <= 3;

          return (
            <motion.div
              key={pandal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-4 p-3.5 rounded-xl border transition-all ${
                isTop3
                  ? "bg-primary/5 border-primary/15"
                  : "bg-white border-border"
              }`}
              data-testid={`leaderboard-row-${pandal.id}`}
            >
              {/* Rank badge */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${
                rank === 1 ? "bg-secondary text-primary shadow-md" :
                rank === 2 ? "bg-gray-300 text-gray-800" :
                rank === 3 ? "bg-amber-600 text-white" :
                "bg-muted text-muted-foreground"
              }`}>
                {rank}
              </div>

              {/* Pandal icon */}
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${ZONE_GRADIENTS[pandal.zone]} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-black text-sm">{pandal.name[0]}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-foreground truncate">{pandal.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={10} />
                  {pandal.zone}
                </div>
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-3 justify-end mb-1">
                  <div className="flex items-center gap-1">
                    <Star size={11} className="fill-secondary text-secondary" />
                    <span className="text-xs font-bold">{pandal.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={11} className="fill-red-400 text-red-400" />
                    <span className="text-xs font-bold">{totalLikes.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp size={10} className="text-primary" />
                  <span className="text-xs font-bold text-primary">{score.toLocaleString()} pts</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Trophy size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-semibold">No pandals in this zone</p>
        </div>
      )}
    </div>
  );
}
