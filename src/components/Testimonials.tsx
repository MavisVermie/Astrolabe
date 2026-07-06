import { Star, Quote, MapPin } from "lucide-react";
import Starfield from "./Starfield";
import Reveal from "./Reveal";
import { NorthStar } from "./SpaceDecor";

type Review = {
  name: string;
  branch: string;
  rating: number;
  review: string;
};

const REVIEWS: Review[] = [
  {
    name: "Haytham Fareh",
    branch: "Abdali Mall",
    rating: 5,
    review:
      "Amazing coffee and super friendly staff. The desserts are delicious and the atmosphere is cozy.",
  },
  {
    name: "Ahmad Al-Khatib",
    branch: "Downtown",
    rating: 5,
    review:
      "One of the best specialty coffee places in Amman. Great espresso and excellent service.",
  },
  {
    name: "Lina Abu Odeh",
    branch: "Khalda",
    rating: 5,
    review:
      "Perfect place to study or work. Fast Wi-Fi, comfortable seating, and consistently good coffee.",
  },
  {
    name: "Omar Haddad",
    branch: "Taj Mall",
    rating: 5,
    review:
      "Their flat white is always on point. Friendly baristas and quick service even during busy hours.",
  },
  {
    name: "Sara Naser",
    branch: "Petra University",
    rating: 5,
    review:
      "I stop here almost every morning before class. The coffee never disappoints.",
  },
  {
    name: "Yousef Al-Rawabdeh",
    branch: "Irbid",
    rating: 5,
    review:
      "Finally a specialty coffee shop in Irbid with excellent quality and a relaxing atmosphere.",
  },
  {
    name: "Dana Shannak",
    branch: "HTU",
    rating: 5,
    review:
      "The perfect coffee break between lectures. Friendly staff and great iced Spanish latte.",
  },
  {
    name: "Mohammad Qudah",
    branch: "Tabarbour",
    rating: 5,
    review:
      "Excellent coffee and the place is always clean. Great spot to meet friends.",
  },
  {
    name: "Rama Al-Masri",
    branch: "Quattro Village",
    rating: 5,
    review:
      "Love the calm atmosphere. Their manual brew options are some of the best I've tried.",
  },
  {
    name: "Alaa Abu Zaid",
    branch: "BMW",
    rating: 5,
    review:
      "Premium experience from the coffee to the service. Definitely worth visiting.",
  },
  {
    name: "Nour Khreis",
    branch: "Abdali Mall",
    rating: 5,
    review:
      "Beautiful interior design, delicious pastries, and excellent coffee every single visit.",
  },
  {
    name: "Khaled Samara",
    branch: "Zarqa",
    rating: 5,
    review:
      "Didn't expect specialty coffee of this level in Zarqa. Highly recommended.",
  },
  {
    name: "Razan Hamed",
    branch: "Alnakheel",
    rating: 5,
    review:
      "The staff always remembers my order. It feels welcoming every time I visit.",
  },
  {
    name: "Baraa Shdeifat",
    branch: "Downtown",
    rating: 5,
    review:
      "Great coffee in the middle of downtown Amman. Perfect place to take a break after walking around.",
  },
  {
    name: "Haneen Al-Zoubi",
    branch: "Taj Mall",
    rating: 5,
    review:
      "Tried the pistachio latte and it was incredible. Will definitely come back.",
  },
  {
    name: "Tareq Obeidat",
    branch: "The Roastery",
    rating: 5,
    review:
      "Watching the roasting process while enjoying fresh coffee is an amazing experience.",
  },
  {
    name: "Maysa Al-Salem",
    branch: "Khalda",
    rating: 5,
    review:
      "Breakfast was delicious and the coffee paired perfectly. One of my favourite cafés in Amman.",
  },
  {
    name: "Fadi Jaradat",
    branch: "Irbid",
    rating: 5,
    review:
      "Great quality beans, excellent cappuccino, and very professional staff.",
  },
  {
    name: "Reem Al-Kilani",
    branch: "HTU",
    rating: 5,
    review:
      "A modern café with excellent coffee and plenty of seating for studying.",
  },
  {
    name: "Anas Abu Ghosh",
    branch: "Quattro Village",
    rating: 5,
    review:
      "One of the nicest coffee shops for business meetings. Quiet, clean, and consistently excellent.",
  },
];

const ROW_A = REVIEWS.slice(0, 10);
const ROW_B = REVIEWS.slice(10);

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-[#CF9E58] text-[#CF9E58]"
          strokeWidth={1}
        />
      ))}
    </span>
  );
}

function ReviewCard({ review, hidden = false }: { review: Review; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="liquid-glass group relative mx-3 flex w-[21rem] shrink-0 flex-col rounded-3xl p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-18px_rgba(207,158,88,0.35)] sm:w-96"
    >
      <Quote
        className="absolute right-5 top-5 h-7 w-7 text-[#CF9E58]/15 transition-colors duration-500 group-hover:text-[#CF9E58]/35"
        strokeWidth={1}
      />
      <Stars rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-sm font-light leading-relaxed text-[#F4EBD6]/85">
        “{review.review}”
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-[#CFBD8D]/10 pt-4">
        <span className="text-sm font-medium tracking-wide text-[#CFBD8D]">
          {review.name}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#CFBD8D]/55">
          <MapPin className="h-3 w-3 text-[#CF9E58]" />
          {review.branch}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ reviews, reverse = false }: { reviews: Review[]; reverse?: boolean }) {
  return (
    <div className="reviews-slider relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#173134] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#173134] to-transparent sm:w-32" />
      <div
        className={`flex w-max py-2 ${
          reverse ? "reviews-track-reverse" : "reviews-track"
        }`}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.name} review={r} />
        ))}
        {reviews.map((r) => (
          <ReviewCard key={`${r.name}-dup`} review={r} hidden />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-[#173134] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CFBD8D]/25 to-transparent" />
      <Starfield count={90} />
      <NorthStar className="right-[4%] top-16 hidden opacity-70 lg:block" size={110} />
      <div className="aurora pointer-events-none absolute right-[12%] top-0 h-72 w-[34rem] rounded-full bg-[#CF9E58]/5 blur-3xl" />

      <div className="relative">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#CF9E58]">
            What Our Customers Say
          </p>
          <h2 className="font-display mt-5 text-4xl font-medium text-[#F4EBD6] sm:text-5xl">
            Loved under <span className="text-shimmer italic">every star</span>
          </h2>
          <p className="mt-5 flex items-center justify-center gap-2.5 text-sm font-light text-[#CFBD8D]/70">
            <Stars rating={5} />
            5.0 · from guests across Jordan
          </p>
        </Reveal>

        {/* Two conveyors, opposite directions (pause on hover) */}
        <Reveal delay={150} className="mt-14 flex flex-col gap-5 sm:mt-16">
          <Row reviews={ROW_A} />
          <Row reviews={ROW_B} reverse />
        </Reveal>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-[#CFBD8D]/40">
          Hover to pause · real words, real branches
        </p>
      </div>
    </section>
  );
}
