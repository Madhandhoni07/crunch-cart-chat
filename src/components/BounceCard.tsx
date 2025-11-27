import { cn } from "@/lib/utils";
import React from "react";
import { ArrowRight } from "lucide-react";

interface BounceCardProps {
  className?: string;
  title: string;
  imgSrc: string;
}

const BounceCard = ({ className, title, imgSrc }: BounceCardProps) => {
  return (
    <div
      className={cn(
        "group relative block h-64 w-full cursor-pointer overflow-hidden rounded-xl bg-primary/10 p-4 text-left shadow-lg",
        className
      )}
    >
      <img src={imgSrc} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="relative flex h-full flex-col items-start justify-end">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span>Learn more</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default BounceCard;