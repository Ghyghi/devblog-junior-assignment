"use client";

import styles from "./CategoryFilter.module.css";

const CATEGORIES = ["All", "Tech", "Lifestyle", "Travel", "Sports"];

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className={styles.wrapper} role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => {
        const active = cat === "All" ? value === "" : value === cat;
        return (
          <button
            key={cat}
            className={`${styles.chip} ${active ? styles.active : ""}`}
            onClick={() => onChange(cat === "All" ? "" : cat)}
            aria-pressed={active}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}