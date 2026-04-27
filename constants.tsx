
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
    title: "One Subscription. Every Screen.",
    description: "A single ORCA 4K TV IPTV subscription unlocks every screen in the house — Firestick 4K Max, Apple TV 4K (3rd gen), Android TV 14, Samsung Tizen, LG webOS, MAG, iOS and Android. Up to four simultaneous streams on the same plan, with the identical channel library and smart EPG guide on every device.",
    imageUrl: "/images/iptv-devices-scaled.png",
    imageAlt: "Family watching a live 4K football match on a Smart TV with a tablet and smartphone alongside — multi-device IPTV subscription on ORCA 4K TV.",
  },
  {
    title: "Smart EPG That Knows What You Want Next",
    description: "Ask in plain English — 'Is the World Cup 2026 final on?' or 'What's playing on Sky Sports tonight?' — and the AI concierge surfaces the right channel instantly. The smart EPG guide learns your viewing habits, builds personalized recommendations, and remembers everything aired in the last 7 days for catch up TV across every premium IPTV channel.",
    imageUrl: "/images/iptv-AI-scaled.png",
    imageAlt: "Young adult using AI voice search to navigate the smart EPG guide on a 4K TV — AI-powered IPTV streaming service from ORCA 4K TV.",
    reverse: true,
  },
  {
    title: "4K HDR That Never Buffers",
    description: "Native 4K Ultra-HD with HDR10+ and Dolby Vision support, delivered through our proprietary Anti Freeze CDN. Edge POPs reroute around peak traffic in real time, so the FIFA World Cup 2026 final, Super Bowl LX, and every Champions League knockout play through buffer-free from kickoff to final whistle on a 25 Mbps+ connection.",
    imageUrl: "/images/4K-IPTV-scaled.png",
    imageAlt: "Two friends watching a live 4K HDR football broadcast on a wall-mounted Smart TV — buffer-free streaming on ORCA 4K TV with Anti Freeze CDN.",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "ONE M BASIC PLAN",
    price: "$14.98",
    description: "1 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://orca4ktv.com/product/1-month",
  },
  {
    name: "TWELVE ULTIMATE",
    price: "$59.98",
    description: "12 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://orca4ktv.com/product/12-month",
    isBestValue: true,
  },
  {
    name: "THREE STANDARD",
    price: "$34.98",
    description: "3 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://orca4ktv.com/product/3-month",
  },
  {
    name: "SIX PREMIUM",
    price: "$45.98",
    description: "6 MONTH SUBSCRIBE",
    buttonText: "BUY NOW",
    link: "https://orca4ktv.com/product/6-month",
  },
];
