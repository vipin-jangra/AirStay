import mongoose from "mongoose";
import { ListingModel } from "../models/listing.model";
import dotenv from "dotenv";

dotenv.config();

const MONGO = process.env.MONGO_URL || "mongodb://localhost:27017/airstay";

// Sample cities with lat/lng
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Hyderabad: { lat: 17.385044, lng: 78.486671 },
  Bengaluru: { lat: 12.971599, lng: 77.594566 },
  Delhi: { lat: 28.613939, lng: 77.209023 },
  Mumbai: { lat: 19.07609, lng: 72.877426 },
  Chennai: { lat: 13.08268, lng: 80.270718 },
};

const propertyTypes = ["Apartment", "House", "Villa", "Condo"];
const roomTypes = ["Entire home", "Private room", "Shared room"];
const amenitiesPool = [
  "Wifi",
  "Kitchen",
  "Air conditioning",
  "Heating",
  "Washer",
  "Dryer",
  "TV",
  "Pool",
  "Free parking",
  "Gym",
];
const rulesPool = ["No smoking", "No pets", "No parties"];
const cancellationPolicies = ["Flexible", "Moderate", "Strict"];

const hosts = [
  { name: "Alice", superhost: true, avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob", superhost: false, avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Carol", superhost: true, avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "David", superhost: false, avatar: "https://i.pravatar.cc/150?img=4" },
];

function getRandomSubset<T>(arr: T[], maxItems: number): T[] {
  const count = 1 + Math.floor(Math.random() * maxItems);
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const samples = Array.from({ length: 60 }).map((_, i) => {
  const numImages = 3 + Math.floor(Math.random() * 2); // 3–4 images
  const images = Array.from({ length: numImages }, () =>
    `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 10000)}`
  );

  const pricePerNight = 1000 + i * 50;
  const discountPercent = Math.floor(Math.random() * 31); // 0–30%
  const discountedPrice = Math.round(pricePerNight * (1 - discountPercent / 100));

  // Pick city in round-robin
  const cityNames = Object.keys(cityCoordinates);
  const city = cityNames[i % cityNames.length];
  const location = cityCoordinates[city];

  // Random host
  const host = hosts[i % hosts.length];

  return {
    title: `Sample ${roomTypes[i % roomTypes.length]} #${i + 1}`,
    description: "Nicely furnished sample listing with all amenities",
    city,
    neighborhood: `${city} Central`,
    address: `${city} - Sample locality ${i + 1}`,
    country: "India",
    postalCode: `5000${i % 10}`,
    propertyType: propertyTypes[i % propertyTypes.length],
    roomType: roomTypes[i % roomTypes.length],
    pricePerNight,
    discountedPrice,
    discount: discountPercent,
    cleaningFee: 200 + (i % 3) * 50,
    serviceFee: 100 + (i % 2) * 50,
    beds: (i % 3) + 1,
    bedrooms: 1 + (i % 3),
    bathrooms: 1 + (i % 2),
    guests: (i % 4) + 1,
    rating: Math.round((3 + Math.random() * 2) * 10) / 10,
    reviewsCount: 1 + Math.floor(Math.random() * 50),
    images,
    amenities: getRandomSubset(amenitiesPool, 5),
    rules: getRandomSubset(rulesPool, 2),
    cancellationPolicy: cancellationPolicies[i % cancellationPolicies.length],
    checkIn: "14:00",
    checkOut: "11:00",
    host,
    location, // { lat, lng }
  };
});

async function run() {
  await mongoose.connect(MONGO);
  await ListingModel.deleteMany({});
  await ListingModel.insertMany(samples);
  console.log("✅ Seeded DB with", samples.length, "items");
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Seeding error:", err);
  process.exit(1);
});
