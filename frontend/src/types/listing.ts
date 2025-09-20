export interface Listing {
  _id: string;
  title: string;
  description?: string;
  city: string;
  address?: string;

  pricePerNight: number;
  discountedPrice?: number;
  discount?: number; // percentage

  beds: number;
  guests: number;
  rating?: number;

  images: string[];

  location?: {
    lat: number;
    lng: number;
  };

  createdAt?: string;
  updatedAt?: string;
}
