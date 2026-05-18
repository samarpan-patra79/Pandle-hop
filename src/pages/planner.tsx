import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Route, Clock, Navigation, Star, Footprints } from "lucide-react";
import { PANDALS } from "@/lib/data";

const LOCATIONS = [
  "Bagbazar", "Kumartuli", "Shyambazar", "College Street", "Sealdah",
  "Park Street", "Ballygunge", "Tollygunge", "Jadavpur", "Dhakuria",
  "FD Block, Salt Lake", "AE Block, Salt Lake", "Sector V, Salt Lake",
  "Howrah Station", "Shibpur", "Golabari",
  "Airport", "New Town", "Rajarhat", "Dum Dum"
];

interface ItineraryStop {
  pandalId: string;
  pandalName: string;
  zone: string;
  distance: string;
  duration: string;
  visitTime: string;
  order: number;
}

const ZONE_GRADIENTS: Record<string, string> = {
  "North Kolkata": "from-red-800 to-amber-700",
  "Central Kolkata": "from-rose-700 to-orange-600",
  "South Kolkata": "from-red-700 to-yellow-600",
  "Salt Lake": "from-amber-700 to-red-600",
  "Howrah": "from-orange-800 to-red-700",
};

function generateItinerary(start: string, end: string): ItineraryStop[] {
  const startLower = start.toLowerCase();
  const endLower = end.toLowerCase();

  let relevantZones: string[] = [];

  if (startLower.includes("kumartuli") || startLower.includes("bagbazar") || startLower.includes("shyam")) {
    relevantZones.push("North Kolkata");
  }
  if (startLower.includes("college") || startLower.includes("sealdah") || startLower.includes("park")) {
    relevantZones.push("Central Kolkata");
  }
  if (startLower.includes("ballygunge") || startLower.includes("tolly") || startLower.includes("jadavpur")) {
    relevantZones.push("South Kolkata");
  }
  if (startLower.includes("salt lake") || startLower.includes("fd") || startLower.includes("ae") || startLower.includes("sector")) {
    relevantZones.push("Salt Lake");
  }
  if (startLower.includes("howrah") || startLower.includes("shibpur") || startLower.includes("golabari")) {
    relevantZones.push("Howrah");
  }

  if (endLower.includes("kolkata") || endLower.includes("college") || endLower.includes("sealdah")) {
    relevantZones.push("Central Kolkata");
  }
  if (endLower.includes("south") || endLower.includes("tolly") || endLower.includes("jadavpur")) {
    relevantZones.push("South Kolkata");
  }

  if (relevantZones.length === 0) {
    relevantZones = ["Central Kolkata", "North Kolkata"];
  }

  const uniqueZones = [...new Set(relevantZones)];
  const selected = PANDALS
    .filter((p) => uniqueZones.includes(p.zone) || Math.random() > 0.6)
    .slice(0, Math.min(6, PANDALS.length));

  const distances = ["1.2 km", "0.8 km", "2.1 km", "1.5 km", "3.0 km", "0.6 km"];
  const durations = ["5 min walk", "3 min walk", "8 min walk", "6 min walk", "12 min walk", "2 min walk"];
  const visitTimes = ["45 min", "30 min", "1 hr", "45 min", "1 hr", "30 min"];

  return selected.map((p, i) => ({
    pandalId: p.id,
    pandalName: p.name,
    zone: p.zone,
    distance: distances[i % distances.length],
    duration: durations[i % durations.length],
    visitTime: visitTimes[i % visitTimes.length],
    order: i + 1,
  }));
}

export default function PlannerPage() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryStop[]>([]);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!startLocation || !endLocation) return;
    const result = generateItinerary(startLocation, endLocation);
    setItinerary(result);
    setGenerated(true);
  };

  const totalTime = itinerary.reduce((acc, stop) => {
    const visit = parseInt(stop.visitTime) || 45;
    const travel = parseInt(stop.duration) || 5;
    return acc + visit + travel;
  }, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Route size={22} className="text-primary" />
          <h1 className="text-2xl font-black text-foreground">Route Planner</h1>
        </div>
        <p className="text-muted-foreground text-sm">Plan your pandal-hopping route and discover stops along the way</p>
      </div>

      {/* Input form */}
      <div className="bg-white rounded-2xl border border-border shadow-sm p-5 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wide">
              Start Location
            </label>
            <div className="relative">
              <Navigation size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <input
                list="locations-start"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="e.g. Bagbazar, Howrah Station..."
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                data-testid="start-location-input"
              />
              <datalist id="locations-start">
                {LOCATIONS.map((l) => <option key={l} value={l} />)}
              </datalist>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Footprints size={14} className="text-primary" />
            </div>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1.5 uppercase tracking-wide">
              End Location
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-destructive" />
              <input
                list="locations-end"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="e.g. Park Street, Jadavpur..."
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                data-testid="end-location-input"
              />
              <datalist id="locations-end">
                {LOCATIONS.map((l) => <option key={l} value={l} />)}
              </datalist>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            disabled={!startLocation || !endLocation}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-shadow"
            data-testid="generate-route-btn"
          >
            Generate Itinerary
          </motion.button>
        </div>
      </div>

      {/* Itinerary */}
      <AnimatePresence>
        {generated && itinerary.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Summary bar */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div>
                <div className="font-black text-sm">{startLocation} → {endLocation}</div>
                <div className="text-white/70 text-xs">{itinerary.length} pandal stops</div>
              </div>
              <div className="text-right">
                <div className="font-black text-lg">{Math.floor(totalTime / 60)}h {totalTime % 60}m</div>
                <div className="text-white/70 text-xs">estimated total</div>
              </div>
            </div>

            {/* Stops */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />

              <div className="space-y-3">
                {/* Start */}
                <div className="flex items-center gap-4 pl-1">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10">
                    <Navigation size={16} className="text-white" />
                  </div>
                  <div className="bg-primary/10 rounded-xl px-4 py-2 flex-1">
                    <div className="font-bold text-sm text-primary">Start: {startLocation}</div>
                    <div className="text-xs text-muted-foreground">Your starting point</div>
                  </div>
                </div>

                {itinerary.map((stop, i) => (
                  <motion.div
                    key={stop.pandalId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex gap-4"
                    data-testid={`itinerary-stop-${stop.order}`}
                  >
                    {/* Stop number */}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0 z-10">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center font-black text-sm text-primary shadow-sm">
                        {stop.order}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white rounded-xl border border-border shadow-sm overflow-hidden mb-1">
                      <div className={`h-1.5 bg-gradient-to-r ${ZONE_GRADIENTS[stop.zone]}`} />
                      <div className="p-3">
                        <div className="font-bold text-sm text-foreground mb-0.5">{stop.pandalName}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin size={10} /> {stop.zone}
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1 bg-primary/8 text-primary font-semibold px-2 py-1 rounded-full">
                            <Footprints size={10} />
                            {stop.distance} · {stop.duration}
                          </div>
                          <div className="flex items-center gap-1 bg-secondary/20 text-amber-800 font-semibold px-2 py-1 rounded-full">
                            <Clock size={10} />
                            Visit: {stop.visitTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* End */}
                <div className="flex items-center gap-4 pl-1">
                  <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center flex-shrink-0 z-10">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div className="bg-destructive/10 rounded-xl px-4 py-2 flex-1">
                    <div className="font-bold text-sm text-destructive">End: {endLocation}</div>
                    <div className="text-xs text-muted-foreground">Your destination</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-secondary/20 rounded-xl p-4 text-center">
              <Star size={16} className="mx-auto mb-1 text-amber-700" />
              <p className="text-xs text-muted-foreground">
                This is a suggested itinerary based on your route. Actual travel times may vary. 
                Visit pandals in any order that suits you!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!generated && (
        <div className="text-center py-12 text-muted-foreground">
          <Route size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">Enter your start and end locations</p>
          <p className="text-sm">We'll find pandals along your route</p>
        </div>
      )}
    </div>
  );
}
