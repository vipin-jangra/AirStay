import { Schema, model, Document, Types } from "mongoose";

export interface IListing extends Document {
  title: string;
  description?: string;
  city: string;
  neighborhood?: string;
  address?: string;
  country?: string;
  postalCode?: string;
  propertyType?: string; // e.g., Apartment, House, Villa
  roomType?: string; // Entire home, Private room, Shared room
  pricePerNight: number;
  discountedPrice?: number;
  discount?: number; // percentage
  cleaningFee?: number;
  serviceFee?: number;
  beds: number;
  bedrooms?: number;
  bathrooms?: number;
  guests: number;
  rating?: number;
  reviewsCount?: number;
  images: string[];
  amenities?: string[]; // e.g., Wifi, Kitchen, Pool
  rules?: string[]; // e.g., No smoking, No pets
  cancellationPolicy?: string; // e.g., Flexible, Moderate, Strict
  checkIn?: string;
  checkOut?: string;
  host?: {
    name: string;
    avatar?: string;
    superhost?: boolean;
  };
  location?: {
    lat: number;
    lng: number;
  };
}

const ListingSchema = new Schema<IListing>(
  {
    title: { type: String, required: true, index: "text" },
    description: { type: String },
    city: { type: String, required: true, index: true },
    neighborhood: { type: String },
    address: { type: String },
    country: { type: String },
    postalCode: { type: String },
    propertyType: { type: String },
    roomType: { type: String },
    pricePerNight: { type: Number, required: true },
    discountedPrice: { type: Number },
    discount: { type: Number }, // %
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    beds: { type: Number, default: 1 },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    guests: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    images: [{ type: String }],
    amenities: [{ type: String }],
    rules: [{ type: String }],
    cancellationPolicy: { type: String },
    checkIn: { type: String },
    checkOut: { type: String },
    host: {
      name: { type: String, required: true },
      avatar: { type: String },
      superhost: { type: Boolean, default: false },
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

// Full-text search
ListingSchema.index({ title: "text", description: "text", city: "text", address: "text", neighborhood: "text" });

export const ListingModel = model<IListing>("Listing", ListingSchema);
