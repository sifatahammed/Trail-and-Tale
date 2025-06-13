import { BlogPost, Comment } from "../types";

// Mock comments data
export const mockComments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: "Alex Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Loved reading about your trip to Kyoto—so magical!",
    date: "2024-03-17",
    likes: 12,
  },
  {
    id: "c2",
    postId: "1",
    author: "Sarah Williams",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "I’ve been dreaming of visiting Japan! Thanks for the tips.",
    date: "2024-03-18",
    likes: 8,
  },
  {
    id: "c3",
    postId: "2",
    author: "Michael Brown",
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content: "Absolutely agree—Moroccan street food is incredible!",
    date: "2024-03-16",
    likes: 9,
  },
  {
    id: "c4",
    postId: "3",
    author: "Emily Davis",
    authorAvatar: "https://randomuser.me/api/portraits/women/67.jpg",
    content: "I found the minimalist packing list so helpful, thank you!",
    date: "2024-03-15",
    likes: 14,
  },
];


// Helper function to generate a large number of mock blog posts
const generateMockPosts = (): BlogPost[] => {
  const existingPosts = [
  // Keep existing posts first for consistency
  {
    id: "1",
    title: "Exploring the Heart of Lisbon: A Local’s Travel Guide",
    slug: "lisbon-local-guide",
    content: "Lisbon is a charming city full of colorful streets, historic trams, and unforgettable cuisine...",
    excerpt: "Get an insider’s view of the best places to eat, stay, and explore in Lisbon.",
    author: "John Doe",
    authorBio: "Travel writer and photographer exploring Europe one city at a time.",
    authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2024-03-15",
    thumbnail: "https://picsum.photos/800/400?random=1",
    tags: ["Portugal", "Lisbon", "europe", "city travel"],
    categories: ["Travel", "Lifestyle"],
    featured: true,
    comments: mockComments.filter((comment) => comment.postId === "1"),
    likes: 42,
  },
  {
    id: "2",
    title: "Designing a Mindful Morning Routine While Traveling",
    slug: "mindful-morning-travel",
    content: "Travel can disrupt routines, but a mindful morning can ground you no matter where you are...",
    excerpt: "Learn how to create a peaceful, energizing morning ritual on the road.",
    author: "Jane Smith",
    authorBio: "Lifestyle blogger helping digital nomads find balance and joy in travel.",
    authorAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
    date: "2024-03-14",
    thumbnail: "https://picsum.photos/800/400?random=2",
    tags: ["mindfulness", "routine", "lifestyle", "travel tips"],
    categories: ["Lifestyle", "Wellness"],
    comments: mockComments.filter((comment) => comment.postId === "2"),
    likes: 35,
  },
  {
    id: "3",
    title: "Top 10 Hidden Beach Escapes in Southeast Asia",
    slug: "hidden-beaches-southeast-asia",
    content: "From secret coves in the Philippines to quiet Thai islands, these are the beaches you've never heard of...",
    excerpt: "Skip the crowds and discover the serene, lesser-known shores of Southeast Asia.",
    author: "Mike Johnson",
    authorBio: "Adventure seeker and travel vlogger passionate about off-the-beaten-path destinations.",
    authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2024-03-13",
    thumbnail: "https://picsum.photos/800/400?random=3",
    tags: ["beaches", "Asia", "travel", "islands"],
    categories: ["Travel", "Adventure"],
    featured: true,
    comments: mockComments.filter((comment) => comment.postId === "3"),
    likes: 28,
  },
  {
    id: "4",
    title: "How to Pack Stylishly for a Two-Week European Trip",
    slug: "europe-trip-packing-style",
    content: "Packing light doesn't mean sacrificing style. Here's how to curate your travel wardrobe smartly...",
    excerpt: "Travel chic and light: outfit ideas and essentials for a stylish Euro trip.",
    author: "Sarah Chen",
    authorBio: "Fashion-forward nomad sharing global style inspiration from her journeys.",
    authorAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2024-03-12",
    thumbnail: "https://picsum.photos/800/400?random=4",
    tags: ["packing", "style", "Europe", "travel tips"],
    categories: ["Travel", "Lifestyle"],
    likes: 21,
  },
  {
    id: "5",
    title: "The Rise of Slow Travel: Why Less Is More",
    slug: "slow-travel-benefits",
    content: "Slow travel emphasizes connection, sustainability, and immersive experiences over fast-paced tourism...",
    excerpt: "Discover how slowing down your travel can make it more meaningful and enjoyable.",
    author: "David Kim",
    authorBio: "Sustainability advocate and slow travel expert exploring the world mindfully.",
    authorAvatar: "https://randomuser.me/api/portraits/men/4.jpg",
    date: "2024-03-11",
    thumbnail: "https://picsum.photos/800/400?random=5",
    tags: ["slow travel", "sustainability", "mindful travel"],
    categories: ["Lifestyle", "Travel"],
    featured: true,
    likes: 32,
  },
];

  // Titles for different categories to generate mock posts
  const categoryTitles = {
  Travel: [
    "Exploring the Hidden Gems of Northern Italy",
    "A Backpacker's Guide to South America",
    "Top 10 Scenic Train Journeys Around the World",
    "Solo Travel: Finding Confidence on the Road",
    "Island Hopping in the Philippines",
    "A Weekend in Kyoto: Culture, Cuisine, and Calm",
    "How to Travel Sustainably in 2025",
    "Visa-Free Countries for Digital Nomads",
    "The Ultimate Travel Photography Guide",
    "How to Travel Europe by Train on a Budget",
    "5 Cultural Etiquette Tips for Southeast Asia",
    "Best Destinations for Off-Season Travel",
    "How to Choose Your Next Travel Destination",
    "Planning the Perfect Road Trip Route",
    "A Guide to Traveling During Festivals",
    "Bucket List Adventures for Nature Lovers",
    "Exploring the Nordic Countries in Winter",
    "Underrated Cities You Should Visit in 2025",
    "How to Stay Connected Abroad Without Roaming Charges",
    "Eco-Friendly Accommodations Worth Booking",
  ],
  Lifestyle: [
    "Creating a Productive Morning Routine",
    "How to Build a Capsule Wardrobe",
    "The Joy of Minimalist Living",
    "Balancing Work and Leisure While Traveling",
    "Digital Detox: A Weekend Without Screens",
    "Mindful Living for the Modern Nomad",
    "Designing a Cozy and Functional Travel Van",
    "How to Build a Home Away from Home",
    "Tips for Starting a Lifestyle Blog",
    "Eco-Conscious Living: Where to Start",
    "Slow Living: Embracing Simplicity on the Road",
    "Managing Your Finances as a Full-Time Traveler",
    "Staying Creative While Living on the Go",
    "How to Maintain Friendships While Traveling",
    "The Art of Journaling Your Life Adventures",
    "Remote Work Lifestyle: Myths vs. Reality",
    "How to Find Balance in a Busy World",
    "Practicing Gratitude While Traveling",
    "Stylish Travel Essentials for Women",
    "Creating a Vision Board for Your Travels",
  ],
  Food: [
    "Street Food You Must Try in Bangkok",
    "A Foodie's Guide to Italian Cuisine",
    "Top 10 Local Dishes Around the World",
    "Coffee Culture in Istanbul",
    "Best Farmers Markets in Europe",
    "How to Eat Plant-Based While Traveling",
    "Spices of Morocco: A Culinary Adventure",
    "Cooking Classes to Take While Abroad",
    "The Best Food Tours in Asia",
    "Pastries You Can’t Miss in Paris",
    "Vegan Eats in Unexpected Places",
    "Dining Like a Local in Mexico City",
    "How to Pack Snacks for Long Travel Days",
    "Unusual Foods Worth Trying Once",
    "Traveling with Food Allergies: Tips & Tricks",
    "Exploring Wine Regions Around the World",
    "The Rise of Food Trucks in South America",
    "How to Cook While Staying in Hostels",
    "Traditional Breakfasts Around the World",
    "Sustainable Food Practices for Travelers",
  ],
  Wellness: [
    "Maintaining Mental Health While Traveling",
    "Simple Yoga Poses for Long Flights",
    "The Best Meditation Retreats Worldwide",
    "How to Stay Fit Without a Gym",
    "Wellness Resorts Worth Visiting",
    "Balancing Adventure with Rest",
    "Hydration Hacks for Frequent Travelers",
    "Natural Remedies for Jet Lag",
    "Sleep Tips for Changing Time Zones",
    "Daily Self-Care Practices for Nomads",
    "How to Travel Stress-Free",
    "Digital Nomad Burnout: Signs and Solutions",
    "The Benefits of Walking Tours",
    "Practicing Gratitude in a New Country",
    "Healthy Travel Snacks You Can Make at Home",
    "Maintaining Skin Care While Backpacking",
    "Essential Oils for Travel Anxiety",
    "How to Stay Present While Exploring",
    "Setting Intentions Before a Trip",
    "Wellness Apps Every Traveler Should Try",
  ],
  "Travel Tips": [
    "How to Pack Light for Any Trip",
    "Navigating Airports Like a Pro",
    "Using Google Maps Offline",
    "What to Do if You Miss a Flight",
    "Budget Travel Hacks That Actually Work",
    "How to Choose the Right Travel Insurance",
    "Top Apps for Planning Your Trip",
    "Travel Safety Tips for Solo Explorers",
    "Avoiding Tourist Traps in Major Cities",
    "Traveling with a Carry-On Only",
    "Tips for Booking Cheap Flights",
    "How to Learn Basic Local Phrases Quickly",
    "What to Pack for Long-Term Travel",
    "Avoiding Hidden Fees While Traveling",
    "Essential Gear for Digital Nomads",
    "How to Deal with Travel Fatigue",
    "Understanding Currency Exchange",
    "Travel Etiquette Around the World",
    "Tips for Traveling with Kids",
    "How to Avoid Getting Scammed Abroad",
  ],
  Culture: [
    "Understanding Local Customs Around the World",
    "Festivals Worth Traveling For",
    "A Guide to Cultural Immersion",
    "How to Respect Local Traditions",
    "Music and Dance Traditions Across Continents",
    "Living with Host Families Abroad",
    "How to Make Friends in a New Country",
    "Art and Architecture in South America",
    "Exploring Temples and Sacred Sites",
    "How History Shapes Local Culture",
    "The Role of Religion in Global Travel",
    "Attending a Traditional Tea Ceremony in Japan",
    "Language and Identity While Traveling",
    "Supporting Indigenous Artists Abroad",
    "Cultural Faux Pas to Avoid While Traveling",
    "How Food Reflects a Culture's Values",
    "Preserving Culture Through Tourism",
    "Photographing People Respectfully",
    "Cultural Storytelling Through Dance",
    "How to Engage in Meaningful Cultural Exchange",
  ],
  Adventure: [
    "Hiking the Inca Trail: What You Need to Know",
    "Skydiving in New Zealand",
    "Scuba Diving in the Great Barrier Reef",
    "How to Plan a Safari in Africa",
    "Kayaking Through Iceland’s Glaciers",
    "Mountain Biking Trails in the Alps",
    "Volcano Trekking in Indonesia",
    "Best National Parks for Hiking",
    "Paragliding in Switzerland",
    "Hot Air Ballooning in Cappadocia",
    "Camping in the Sahara Desert",
    "How to Train for a Trekking Expedition",
    "Adventure Travel Safety Tips",
    "Packing Essentials for Adventure Travel",
    "Waterfall Hikes in South America",
    "Climbing Kilimanjaro: A Beginner’s Story",
    "Caving Adventures Around the World",
    "Desert Survival Skills for Explorers",
    "Exploring Canyons in the American Southwest",
    "Snorkeling with Manta Rays in Hawaii",
  ],
};

  // Other fields for generated posts
const authors = [
  {
    name: "Sophie Bennett",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    bio: "Travel blogger and digital nomad exploring the world one country at a time.",
  },
  {
    name: "Liam Carter",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    bio: "Adventure photographer and outdoor enthusiast with a love for remote places.",
  },
  {
    name: "Isabella Rivera",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    bio: "Wellness coach and lifestyle writer sharing tips on mindful living.",
  },
  {
    name: "Noah Patel",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    bio: "Culture lover and foodie documenting local experiences across continents.",
  },
  {
    name: "Maya Thompson",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    bio: "Minimalist traveler focused on sustainable and budget-friendly adventures.",
  },
  {
    name: "Oliver Wright",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    bio: "Backpacking expert and van lifer writing about off-the-grid living.",
  },
  {
    name: "Chloe Nguyen",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    bio: "Lifestyle blogger passionate about self-care, style, and slow travel.",
  },
  {
    name: "Ethan Brooks",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    bio: "Remote work advocate and travel tech reviewer living the laptop lifestyle.",
  },
];


  const tags = [
  "travel",
  "solo travel",
  "budget travel",
  "luxury travel",
  "road trip",
  "digital nomad",
  "backpacking",
  "travel tips",
  "wellness",
  "mindfulness",
  "self-care",
  "lifestyle",
  "minimalism",
  "van life",
  "remote work",
  "photography",
  "travel photography",
  "cultural travel",
  "adventure",
  "hiking",
  "camping",
  "beach",
  "mountains",
  "foodie",
  "street food",
  "local cuisine",
  "sustainability",
  "eco travel",
  "slow travel",
  "travel planning",
  "packing tips",
  "off the beaten path",
  "hidden gems",
  "itinerary",
  "festivals",
  "language tips",
  "customs & etiquette",
  "mental health",
  "digital detox",
  "urban exploration"
];


  const generatedPosts: BlogPost[] = [];
  let idCounter = existingPosts.length + 1;

  // Generate posts for each category
  Object.entries(categoryTitles).forEach(([category, titles]) => {
    titles.forEach((title, index) => {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      const author = authors[Math.floor(Math.random() * authors.length)];

      // Get random date within the last year
      const randomDate = new Date();
      randomDate.setDate(
        randomDate.getDate() - Math.floor(Math.random() * 365)
      );

      // Generate post tags
      const postTags: string[] = [];
      const numTags = 2 + Math.floor(Math.random() * 4); // 2-5 tags
      for (let i = 0; i < numTags; i++) {
        const randomTag = tags[Math.floor(Math.random() * tags.length)];
        if (!postTags.includes(randomTag)) {
          postTags.push(randomTag);
        }
      }

      // Add secondary categories sometimes
      const categories = [category];
      if (Math.random() > 0.6) {
        const otherCategories = Object.keys(categoryTitles).filter(
          (c) => c !== category
        );
        const secondaryCategory =
          otherCategories[Math.floor(Math.random() * otherCategories.length)];
        categories.push(secondaryCategory);
      }

      // Featured flag for some posts
      const featured = Math.random() > 0.9; // 10% chance of being featured

      // Mock content
      const contentParagraphs = 3 + Math.floor(Math.random() * 5); // 3-7 paragraphs
      const content = Array(contentParagraphs)
        .fill(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        )
        .join("\n\n");

      // Post excerpt
      const excerpt = `Explore ${title.toLowerCase()} in this comprehensive guide. Perfect for both beginners and experienced developers.`;

      // Add generated post
      generatedPosts.push({
        id: (idCounter++).toString(),
        title,
        slug,
        content,
        excerpt,
        author: author.name,
        authorBio: author.bio,
        authorAvatar: author.avatar,
        date: randomDate.toISOString().slice(0, 10),
        thumbnail: `https://picsum.photos/800/400?random=${idCounter}`,
        tags: postTags,
        categories,
        featured,
        likes: Math.floor(Math.random() * 50),
      });
    });
  });

  // Combine existing and generated posts
  return [...existingPosts, ...generatedPosts];
};

export const mockBlogPosts: BlogPost[] = generateMockPosts();

export const categories = [
  "Travel",
  "Lifestyle",
  "Food",
  "Wellness",
  "Travel Tips",
  "Culture",
  "Adventure",
];

export const tags = [
  "travel",
  "lifestyle",
  "wellness",
  "adventure",
  "digital nomad",
  "budget travel",
  "foodie",
  "culture",
  "solo travel",
  "remote work",
  "travel tips",
  "photography",
  "road trip",
  "eco travel",
  "mindfulness",
  "minimalism",
  "hiking",
  "street food",
  "packing tips",
  "sustainability"
];
