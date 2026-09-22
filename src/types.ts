export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'home' | 'shield' | 'wrench' | 'cpu' | 'lightbulb' | 'smartphone' | 'wind' | 'refresh' | 'zap';
  image: string;
  features: string[];
  route?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  duration: string;
  specs: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  review: string;
  service: string;
  verified: boolean;
}

export interface QuoteFormData {
  serviceType: string;
  propertyType: string;
  postalCode: string;
  city: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  urgency: 'normal' | 'urgent';
}
