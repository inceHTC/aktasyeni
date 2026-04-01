"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoryCard({ name, icon, path }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={path} className="block">
      <div
        className="p-4 rounded-2xl text-center cursor-pointer flex flex-col items-center gap-2"
        style={{
          backgroundColor: hovered ? "#1A1A1A" : "#FFFFFF",
          border: `1px solid ${hovered ? "#C9963F" : "#E5E0D5"}`,
          transform: hovered ? "translateY(-5px)" : "translateY(0)",
          boxShadow: hovered ? "0 12px 28px rgba(0,0,0,0.13)" : "0 2px 8px rgba(0,0,0,0.05)",
          transition: "all 0.25s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            color: hovered ? "#C9963F" : "#2B4A1F",
            transition: "color 0.25s ease",
          }}
        >
          {icon}
        </div>
        <span
          className="text-xs font-medium"
          style={{
            color: hovered ? "#FFFFFF" : "#1A1A1A",
            letterSpacing: "0.02em",
            transition: "color 0.25s ease",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {name}
        </span>
      </div>
    </Link>
  );
}
