/* Quiet Luxury Editorial: rental data is written like a curated catalogue—short, specific, and structured for confident decisions. */
export type Rental = {
  id: string;
  tag: string;
  title: string;
  location: string;
  address: string;
  price: number;
  priceLabel: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  alt: string;
  description: string;
  available: string;
};

export const rentals: Rental[] = [
  {
    id: "glasshouse-villa",
    tag: "VILLA",
    title: "The Glass House Retreat",
    location: "Carmel-by-the-Sea, CA",
    address: "48 Cypress Way, Carmel-by-the-Sea, CA",
    price: 4500,
    priceLabel: "$4,500",
    beds: 4,
    baths: 3.5,
    sqft: "3,280 sqft",
    image: "/hearthline/rentapp-hero_ad8f2a12.webp",
    alt: "Sunlit modern rental home with warm oak floors and an olive tree",
    description: "A light-filled retreat that makes space for slow mornings, long dinners, and the quiet beauty of the coast. Natural materials, open sightlines, and a sheltered garden give this home its easy rhythm.",
    available: "Available from 01 May 2026",
  },
  {
    id: "azure-penthouse",
    tag: "PENTHOUSE",
    title: "The Azure Penthouse",
    location: "Manhattan, NY",
    address: "1200 Riverside Drive, Manhattan, NY",
    price: 12500,
    priceLabel: "$12,500",
    beds: 3,
    baths: 3.5,
    sqft: "2,400 sqft",
    image: "/hearthline/rentapp-loft_0d886501.webp",
    alt: "Characterful loft living room with tall windows and a cream sofa",
    description: "A composed city residence with tall windows, warm walnut joinery, and room to host without losing its sense of calm. Concierge service and a private terrace complete the address.",
    available: "Available from 15 Apr 2026",
  },
  {
    id: "oakwood-townhouse",
    tag: "TOWNHOUSE",
    title: "Oakwood Modern Townhouse",
    location: "Westside District",
    address: "88 Heritage Lane, Westside District",
    price: 8200,
    priceLabel: "$8,200",
    beds: 2,
    baths: 2,
    sqft: "1,980 sqft",
    image: "/hearthline/rentapp-courtyard_5694575f.webp",
    alt: "Pale limestone courtyard with a small tiled terrace and citrus tree",
    description: "A quietly confident townhouse where crisp architectural lines meet a lived-in material palette. The courtyard is made for a first coffee; the upper floor keeps evenings private.",
    available: "Available from 01 Jun 2026",
  },
  {
    id: "park-avenue-residence",
    tag: "RESIDENCE",
    title: "Park Avenue Residence",
    location: "Upper East Side, NY",
    address: "124 Central Park South, New York, NY",
    price: 9800,
    priceLabel: "$9,800",
    beds: 2,
    baths: 2.5,
    sqft: "1,760 sqft",
    image: "/hearthline/rentapp-loft_0d886501.webp",
    alt: "Warm modern living room in a premium city residence",
    description: "A refined two-bedroom for days that move between the park, the gallery, and home. Its proportions are generous, its details are quiet, and its location is exceptionally connected.",
    available: "Available from 22 Apr 2026",
  },
  {
    id: "citrus-courtyard",
    tag: "VILLA",
    title: "Citrus Courtyard House",
    location: "Sonoma, CA",
    address: "17 Orchard Road, Sonoma, CA",
    price: 6200,
    priceLabel: "$6,200",
    beds: 3,
    baths: 2,
    sqft: "2,860 sqft",
    image: "/hearthline/rentapp-courtyard_5694575f.webp",
    alt: "Pale courtyard house with green shutters and an outdoor bistro set",
    description: "A gentle, garden-facing home with easy indoor-outdoor flow and a generous kitchen. The kind of place that rewards a longer stay and an unhurried itinerary.",
    available: "Available from 10 May 2026",
  },
];

export const findRental = (id: string) => rentals.find((rental) => rental.id === id) ?? rentals[0];

export const formatPrice = (price: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
