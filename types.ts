
export interface MediaItem {
  id: string;
  title: string;
  imageUrl: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  buttonText: string;
  link: string;
  isBestValue?: boolean;
}
