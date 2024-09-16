"use client";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function Testimonial() {
  return (
    <>
      <h1 className="font-bold flex items-center justify-center text-3xl md:text-5xl mt-[10rem]">
        Testimonial
      </h1>
      <div className="h-[20rem] mb-20 rounded-md flex flex-col antialiased bg-white dark:bg-blue-400 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </>
  );
}

const testimonials = [
  {
    quote:
      "Choosing this insurance company was one of the best decisions I made for my family. Their policies are flexible, and the customer support is outstanding. They made everything so simple and stress-free!",
    name: "Ravi Sharma",
    title: " IT Manager, Mumbai",
  },
  {
    quote:
      "I was impressed by how transparent and straightforward the whole process was. The team genuinely cared about finding the best plan for me, and the affordable premiums were a huge plus. Highly recommended!",
    title: "Teacher, Delhi",
    name: "Priya Mehta",
  },
  {
    quote:
      "The service has been exceptional from day one. They handled my claims quickly and efficiently, making what could have been a stressful situation a breeze. I trust them completely with my insurance needs.",
    name: "Anil Kumar",
    title: "Entrepreneur, Bangalore",
  },
  {
    quote:
      "Their customer support is always available when I need them, and they go above and beyond to ensure everything is clear. I feel secure knowing that I’m in good hands with this company.",
    name: "Neha Verma",
    title: "Marketing Executive, Pune",
  },
  {
    quote:
      "This insurance company stands out for its commitment to customer satisfaction. Their policies are comprehensive, yet affordable, and I always feel well-informed about my coverage. It’s been a great experience!",

    title: "Financial Analyst, Hyderabad",
    name: "Vikram Singh",
  },
];
