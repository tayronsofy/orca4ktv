
import { MediaItem, FeatureItem, PricingPlan } from './types';

export const COLORS = {
  bg: '#1f2326',
  card: '#2c3034',
  primary: '#a855f7',
};

export const SPORTS_RAIL: MediaItem[] = [
  { id: '1', title: 'NBA', imageUrl: 'https://picsum.photos/seed/nba/300/450' },
  { id: '2', title: 'NFL', imageUrl: 'https://picsum.photos/seed/nfl/300/450' },
  { id: '3', title: 'Premier League', imageUrl: 'https://picsum.photos/seed/nba/300/450' },
  { id: '4', title: 'Champions League', imageUrl: 'https://picsum.photos/seed/ucl/300/450' },
  { id: '5', title: 'F1 Racing', imageUrl: 'https://picsum.photos/seed/f1/300/450' },
  { id: '6', title: 'UFC', imageUrl: 'https://picsum.photos/seed/ufc/300/450' },
];

export const MOVIES_RAIL: MediaItem[] = [
  { id: 'm1', title: 'Gladiator II', imageUrl: 'https://picsum.photos/seed/movie1/300/450' },
  { id: 'm2', title: 'Interstellar', imageUrl: 'https://picsum.photos/seed/movie2/300/450' },
  { id: 'm3', title: 'The Dark Knight', imageUrl: 'https://picsum.photos/seed/movie3/300/450' },
  { id: 'm4', title: 'Oppenheimer', imageUrl: 'https://picsum.photos/seed/movie4/300/450' },
  { id: 'm5', title: 'Inception', imageUrl: 'https://picsum.photos/seed/movie5/300/450' },
  { id: 'm6', title: 'Avatar', imageUrl: 'https://picsum.photos/seed/movie6/300/450' },
];

export const CHANNELS_RAIL: MediaItem[] = [
  { id: 'c1', title: 'HBO', imageUrl: 'https://picsum.photos/seed/hbo/300/450' },
  { id: 'c2', title: 'Sky Sports', imageUrl: 'https://picsum.photos/seed/sky/300/450' },
  { id: 'c3', title: 'NBC', imageUrl: 'https://picsum.photos/seed/nbc/300/450' },
  { id: 'c4', title: 'BBC One', imageUrl: 'https://picsum.photos/seed/bbc/300/450' },
  { id: 'c5', title: 'ESPN', imageUrl: 'https://picsum.photos/seed/espn/300/450' },
  { id: 'c6', title: 'Fox News', imageUrl: 'https://picsum.photos/seed/fox/300/450' },
];

export const FEATURES: FeatureItem[] = [
  {
    title: "Multi-Platform Compatibility",
    description: "Access your premium programming across smart TVs, tablets, mobile devices, and gaming consoles. Our platform delivers flawlessly optimized performance uniformly.",
    imageUrl: "/images/iptv-devices-scaled.png",
  },
  {
    title: "Intelligent Content Curation",
    description: "Eliminate endless searching. Our state-of-the-art personalized engine analyzes your viewing habits to instantly highlight live broadcasts and cinematic hits you’ll love.",
    imageUrl: "/images/iptv-AI-scaled.png",
    reverse: true,
  },
  {
    title: "Lightning-Fast 4K Streaming",
    description: "Enjoy zero-interruption viewing through our worldwide optimized network. We supply pristine native 4K feeds at maximum velocity so every match and movie plays perfectly.",
    imageUrl: "/images/4K-IPTV-scaled.png",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "ONE M BASIC PLAN",
    price: "$14.98",
    description: "1 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://smart4k.io/product/1-month",
  },
  {
    name: "TWELVE ULTIMATE",
    price: "$59.98",
    description: "12 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://smart4k.io/product/12-month",
    isBestValue: true,
  },
  {
    name: "THREE STANDARD",
    price: "$34.98",
    description: "3 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://smart4k.io/product/3-month",
  },
  {
    name: "SIX PREMIUM",
    price: "$45.98",
    description: "6 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://smart4k.io/product/6-month",
  },
];
