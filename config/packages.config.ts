export interface ServiceDefinition {
  id: string;
  label: string;
  type: 'boolean' | 'number';
  // Template for display, e.g., "{value} images"
  render: (value: any) => string;
}

export interface PackageTier {
  id: string;
  slug: string;
  name: string;
  price: string;
  description: string;
  isPopular: boolean;
  services: Record<string, any>; // maps service.id to its value
}

export interface AddonDefinition {
  id: string;
  slug: string;
  name: string;
  price: string;
  category: 'photo' | 'video';
  description?: string;
}

// 1. All available services (The Schema / Source of Truth for labels)
export const SERVICES: ServiceDefinition[] = [
  { 
    id: 'duration', 
    label: 'Duration', 
    type: 'number', 
    render: (v) => (v >= 60 ? `${v/60 === 1 ? '1-hour' : `${v/60}-hour`} session` : `${v}-minute session`) 
  },
  { 
    id: 'photos', 
    label: 'Retouched Photos', 
    type: 'number', 
    render: (v) => `${v} high-end retouched images` 
  },
  { 
    id: 'onlineGallery', 
    label: 'Online private gallery', 
    type: 'boolean', 
    render: () => 'Online private gallery' 
  },
  { 
    id: 'unedited', 
    label: 'Unedited gallery access', 
    type: 'boolean', 
    render: () => 'Access to all unedited photos' 
  },
  { 
    id: 'mua', 
    label: 'Professional MUA', 
    type: 'boolean', 
    render: () => 'Professional MUA (Make-up Artist)' 
  },
  { 
    id: 'hair', 
    label: 'Professional Hair Stylist', 
    type: 'boolean', 
    render: () => 'Professional Hair Stylist' 
  },
  { 
    id: 'studio', 
    label: 'Studio rental', 
    type: 'boolean', 
    render: () => 'Studio rental cost included' 
  },
  { 
    id: 'cloudStorage', 
    label: 'Cloud storage', 
    type: 'boolean', 
    render: () => 'Includes cloud storage' 
  },
];

// 2. The source-of-truth tiers (The Data)
export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: '1',
    slug: 'express',
    name: 'Express',
    price: '£300',
    description: 'Perfect for quick updates or singular elite looks.',
    isPopular: false,
    services: { duration: 30, photos: 5, onlineGallery: true }
  },
  {
    id: '2',
    slug: 'silver',
    name: 'Silver',
    price: '£550',
    description: 'A comprehensive session designed for high versatility and depth.',
    isPopular: true,
    services: { duration: 60, photos: 10, onlineGallery: true }
  },
  {
    id: '3',
    slug: 'premium',
    name: 'Premium',
    price: '£950',
    description: 'An expansive experience allowing for multiple concepts and outfits.',
    isPopular: false,
    services: { duration: 90, photos: 15, onlineGallery: true, mua: true, studio: true }
  },
  {
    id: '4',
    slug: 'platinum',
    name: 'Platinum',
    price: '£1,800',
    description: 'The ultimate luxury experience providing a full suite of elevated services.',
    isPopular: false,
    services: { duration: 120, photos: 20, onlineGallery: true, unedited: true, mua: true, hair: true, studio: true }
  }
];

// 3. Optional add-ons
export const ADDONS: AddonDefinition[] = [
  {
    id: 'a1',
    slug: 'photo-extra',
    name: 'Additional Retouched Photo',
    price: '£40',
    category: 'photo',
    description: 'Each additional high-end retouched image of your choice.'
  },
  {
    id: 'a2',
    slug: 'photo-rush',
    name: 'Expedited Delivery',
    price: '£150',
    category: 'photo',
    description: 'Photos delivered within 48 hours.'
  },
  {
    id: 'a3',
    slug: 'photo-custom',
    name: 'Custom Backdrop / Setting',
    price: '£100',
    category: 'photo',
    description: 'Bespoke location scouting or unique prop sourcing.'
  },
  {
    id: 'a4',
    slug: 'video-teaser',
    name: 'Teaser (5–10 seconds)',
    price: '£50',
    category: 'video',
    description: 'Short-form vertical video captured intentionally during the session.'
  },
  {
    id: 'a5',
    slug: 'video-edit',
    name: 'Edit (15 seconds)',
    price: '£75',
    category: 'video',
    description: 'Short-form vertical video with light editing and music sync.'
  },
  {
    id: 'a6',
    slug: 'video-extended',
    name: 'Extended (30 seconds)',
    price: '£150',
    category: 'video',
    description: 'Comprehensive vertical highlight reel.'
  }
];
