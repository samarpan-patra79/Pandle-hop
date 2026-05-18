export interface Pandal {
  id: string;
  name: string;
  area: string;
  rating: number;
  likes: number;
  theme: string;
  description: string;
  imageUrl?: string;
  zone: 'North Kolkata' | 'Central Kolkata' | 'South Kolkata' | 'Salt Lake' | 'Howrah';
}

export const PANDALS: Pandal[] = [
  {
    id: "p1",
    name: "Bagbazar Sarbojanin",
    area: "Bagbazar",
    zone: "North Kolkata",
    rating: 4.8,
    likes: 2341,
    theme: "Heritage & Culture",
    description: "A legendary pandal with century-old traditions. The main idol is sculpted by master artisans."
  },
  {
    id: "p2",
    name: "Kumartuli Park",
    area: "Kumartuli",
    zone: "North Kolkata",
    rating: 4.6,
    likes: 1876,
    theme: "Contemporary Art",
    description: "Where tradition meets modern art. Stunning environmental theme this year."
  },
  {
    id: "p3",
    name: "Mohammed Ali Park",
    area: "College Street",
    zone: "Central Kolkata",
    rating: 4.7,
    likes: 2105,
    theme: "Grand Architecture",
    description: "Replica of famous world monuments. A must-visit for architecture lovers."
  },
  {
    id: "p4",
    name: "College Square",
    area: "College Street",
    zone: "Central Kolkata",
    rating: 4.5,
    likes: 1654,
    theme: "Literature",
    description: "Celebrates Bengali literary heritage. The pandal itself is shaped like an open book."
  },
  {
    id: "p5",
    name: "Santosh Mitra Square",
    area: "Sealdah",
    zone: "Central Kolkata",
    rating: 4.9,
    likes: 2567,
    theme: "Spectacular Lighting",
    description: "Known for record-breaking lighting installations. Come after dark for the full effect."
  },
  {
    id: "p6",
    name: "Ekdalia Evergreen",
    area: "Ballygunge",
    zone: "South Kolkata",
    rating: 4.4,
    likes: 1432,
    theme: "Nature",
    description: "Serene nature-themed pandal in South Kolkata. Peaceful and beautifully landscaped."
  },
  {
    id: "p7",
    name: "Ballygunge Cultural",
    area: "Ballygunge",
    zone: "South Kolkata",
    rating: 4.3,
    likes: 1298,
    theme: "Modern Art",
    description: "Contemporary art installations with interactive elements. Great for families."
  },
  {
    id: "p8",
    name: "Mudiali Club",
    area: "Tollygunge",
    zone: "South Kolkata",
    rating: 4.5,
    likes: 1521,
    theme: "Heritage",
    description: "Known for its elaborate decorations and traditional prasad. Very authentic experience."
  },
  {
    id: "p9",
    name: "Bidhannagar FD Block",
    area: "FD Block",
    zone: "Salt Lake",
    rating: 4.2,
    likes: 987,
    theme: "Technology",
    description: "Futuristic theme with digital art displays. Popular with younger visitors."
  },
  {
    id: "p10",
    name: "Salt Lake AE Block",
    area: "AE Block",
    zone: "Salt Lake",
    rating: 4.1,
    likes: 876,
    theme: "Culture",
    description: "Community-organized with genuine neighborhood warmth. Less crowded than city pandals."
  },
  {
    id: "p11",
    name: "Howrah Shibpur",
    area: "Shibpur",
    zone: "Howrah",
    rating: 4.4,
    likes: 1123,
    theme: "Traditional",
    description: "Cross the bridge for this gem. Traditional setup with excellent cultural programs."
  },
  {
    id: "p12",
    name: "Howrah Golabari",
    area: "Golabari",
    zone: "Howrah",
    rating: 4.3,
    likes: 1034,
    theme: "Devotion",
    description: "Deep-rooted devotional atmosphere. The evening aarti is not to be missed."
  }
];

export interface FeedPost {
  id: string;
  pandalId: string;
  caption: string;
  timestamp: string;
}

export const FEED_POSTS: FeedPost[] = [
  {
    id: "post1",
    pandalId: "p5",
    caption: "The lights at Santosh Mitra Square are absolutely breathtaking this year! 🌟 A truly magical experience.",
    timestamp: "2 hours ago"
  },
  {
    id: "post2",
    pandalId: "p1",
    caption: "Nothing beats the traditional vibes at Bagbazar. The idol is magnificent as always.",
    timestamp: "4 hours ago"
  },
  {
    id: "post3",
    pandalId: "p9",
    caption: "Mind-blowing digital art displays at FD Block. A completely different take on the festival!",
    timestamp: "5 hours ago"
  },
  {
    id: "post4",
    pandalId: "p4",
    caption: "The reflection of the pandal on the College Square pool at night is picture perfect. 📚✨",
    timestamp: "7 hours ago"
  },
  {
    id: "post5",
    pandalId: "p11",
    caption: "Crossed the river for Shibpur and it was so worth it. The cultural program is top notch tonight.",
    timestamp: "10 hours ago"
  }
];
