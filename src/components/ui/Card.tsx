import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = "", title }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-gray-700 bg-zinc-900 p-6 ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-xl font-semibold text-white">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
