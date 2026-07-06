export type Branch = {
  id: number;
  name: string;
  city: string;
  phone: string;
  /** Local slider image in public/branches/. */
  image: string;
  googleMap: string;
  location: string;
  description: string;
  hours: { label: string; time: string | null }[];
  amenities: string[];
};

const STANDARD_HOURS = [
  { label: "Sun – Thu", time: "07:00 AM – 12:00 AM" },
  { label: "Friday", time: "10:00 AM – 12:00 AM" },
  { label: "Saturday", time: "07:00 AM – 12:00 AM" },
];

export const BRANCHES: Branch[] = [
  {
    id: 40252,
    name: "Taj Mall",
    city: "Amman",
    phone: "+962779080906",
    image: "/branches/taj-mall.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Taj%20Mall%20Amman%20Jordan",
    location: "Taj Mall, Abdoun, Amman, Jordan",
    description:
      "Nestled within the vibrant atmosphere of Abdoun's premium shopping destination.",
    hours: STANDARD_HOURS,
    amenities: ["Non-smoking Area", "Free Parking"],
  },
  {
    id: 40253,
    name: "HTU",
    city: "Amman",
    phone: "+962790303109",
    image: "/branches/htu.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20HTU%20King%20Hussein%20Business%20Park%20Amman",
    location:
      "Al-Hussein Technical University, King Hussein Business Park, Amman, Jordan",
    description:
      "Located at Al-Hussein Technical University within King Hussein Business Park.",
    hours: [
      { label: "Sun – Thu", time: "09:00 AM – 05:00 PM" },
      { label: "Friday", time: null },
      { label: "Saturday", time: "09:00 AM – 05:00 PM" },
    ],
    amenities: ["Non-smoking Area", "Free Parking"],
  },
  {
    id: 40254,
    name: "Icon 7",
    city: "Amman",
    phone: "+96265346466",
    image: "/branches/icon-7.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Icon%207%20Amman%20Jordan",
    location: "Icon 7, Amman, Jordan",
    description:
      "Located within the prominent Icon 7 development with a sleek urban coffee experience.",
    hours: [{ label: "Fri – Sat", time: "02:00 AM – 12:00 AM" }],
    amenities: [],
  },
  {
    id: 40255,
    name: "Astrolabe The Roastery",
    city: "Amman",
    phone: "+96265346466",
    image: "/branches/roastery.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20The%20Roastery%20Amman%20Jordan",
    location: "Amman, Jordan",
    description:
      "The aromatic heart of Astrolabe where guests can experience coffee from bean to cup.",
    hours: STANDARD_HOURS,
    amenities: ["Smoking Area", "Non-smoking Area", "Free Parking"],
  },
  {
    id: 40256,
    name: "Astrolabe Coffee BMW",
    city: "Amman",
    phone: "+962792192012",
    image: "/branches/bmw.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20BMW%20Amman%20Jordan",
    location: "BMW showroom, Amman, Jordan",
    description:
      "A premium coffee branch inside a high-end BMW showroom environment.",
    hours: [{ label: "Fri – Sat", time: "09:00 AM – 12:00 AM" }],
    amenities: ["Smoking Area", "Non-smoking Area"],
  },
  {
    id: 40257,
    name: "Astrolabe Coffee ASU",
    city: "Amman",
    phone: "+962790608046",
    image: "/branches/asu.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20ASU%20Applied%20Science%20Private%20University%20Amman",
    location: "Applied Science Private University, Amman, Jordan",
    description:
      "Located at Applied Science Private University, serving students and faculty.",
    hours: STANDARD_HOURS,
    amenities: ["Free Parking", "Non-smoking Area"],
  },
  {
    id: 40251,
    name: "Tabarbour",
    city: "Amman",
    phone: "+962796782836",
    image: "/branches/tabarbour.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Tabarbour%20Al-Shahid%20Street%20Amman",
    location: "Al-Shahid Street, Tabarbour, Amman, Jordan",
    description:
      "Located along Al-Shahid Street, serving students, locals, and professionals.",
    hours: [{ label: "Daily", time: "07:00 AM – 12:00 AM" }],
    amenities: ["Smoking Area", "Non-smoking Area"],
  },
  {
    id: 40232,
    name: "Irbid",
    city: "Irbid",
    phone: "+962799700181",
    image: "/branches/irbid.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20King%20Hussein%20Street%20Irbid%20Jordan",
    location: "King Hussein Street, next to McDonald's, Irbid, Jordan",
    description: "Astrolabe Coffee branch in Irbid.",
    hours: STANDARD_HOURS,
    amenities: ["Smoking Area", "Non-smoking Area"],
  },
  {
    id: 40229,
    name: "Alnakheel",
    city: "Amman",
    phone: "+962796782837",
    image: "/branches/alnakheel.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Dahiat%20Al%20Nakheel%20Amman",
    location: "Dahiat Al Nakheel, Amman, Jordan",
    description: "A specialty coffee destination in Dahiat Al Nakheel.",
    hours: [
      { label: "Sun – Thu", time: "07:30 AM – 12:00 AM" },
      { label: "Friday", time: "09:00 AM – 12:00 AM" },
      { label: "Saturday", time: "07:30 AM – 12:00 AM" },
    ],
    amenities: ["Smoking Area", "Non-smoking Area"],
  },
  {
    id: 40230,
    name: "Zarqa",
    city: "Zarqa",
    phone: "+962778717017",
    image: "/branches/zarqa.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Souq%20Bab%20Al%20Madina%20Zarqa",
    location: "Souq Bab Al Madina, Zarqa, Jordan",
    description:
      "Located in Souq Bab Al Madina, Zarqa's modern specialty coffee destination.",
    hours: STANDARD_HOURS,
    amenities: [],
  },
  {
    id: 40231,
    name: "Quattro Village",
    city: "Amman",
    phone: "+962791472013",
    image: "/branches/quattro-village.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Quattro%20Village%20Amman",
    location: "Quattro Village, Amman, Jordan",
    description:
      "A refined coffee escape in Quattro Village for relaxation or focused work.",
    hours: STANDARD_HOURS,
    amenities: ["Smoking Area", "Non-smoking Area"],
  },
  {
    id: 40217,
    name: "Petra University",
    city: "Amman",
    phone: "+962790608046",
    image: "/branches/petra-university.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Petra%20University%20Airport%20Road%20Amman",
    location: "Petra University, Airport Road, Amman, Jordan",
    description: "Located at Petra University on Airport Road.",
    hours: STANDARD_HOURS,
    amenities: ["Free Parking", "Non-smoking Area"],
  },
  {
    id: 40214,
    name: "Abdali Mall",
    city: "Amman",
    phone: "+962790303107",
    image: "/branches/abdali-mall.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Abdali%20Mall%20Amman",
    location: "Abdali Mall, Abdali St., Amman 11937, Jordan",
    description: "Located at Abdali Mall in Amman.",
    hours: STANDARD_HOURS,
    amenities: ["Non-smoking Area", "Free Parking", "Breakfast"],
  },
  {
    id: 40215,
    name: "Downtown",
    city: "Amman",
    phone: "+96264901539",
    image: "/branches/downtown.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Downtown%20Amman",
    location: "Downtown, Amman, Jordan",
    description: "Located in the heart of Amman, Downtown.",
    hours: STANDARD_HOURS,
    amenities: ["Smoking Area", "Non-smoking Area", "Meeting Room"],
  },
  {
    id: 40216,
    name: "Khalda",
    city: "Amman",
    phone: "+962790303109",
    image: "/branches/khalda.webp",
    googleMap:
      "https://www.google.com/maps/search/?api=1&query=Astrolabe%20Coffee%20Khalda%20Amman",
    location: "Khalda, Amman, Jordan",
    description:
      "Located in Khalda, offering breakfast, specialty coffee, and a cozy atmosphere.",
    hours: STANDARD_HOURS,
    amenities: ["Smoking Area", "Non-smoking Area", "Breakfast"],
  },
];

export const CITIES = ["Amman", "Irbid", "Zarqa"] as const;
