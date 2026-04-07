"use client";

import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const [local, setLocal] = useState(value);

  // Debounce: fire onChange 400ms after user stops typing
  useEffect(() => {
    const t = setTimeout(() => onChange(local), 400);
    return () => clearTimeout(t);
  }, [local]);

  // Keep in sync if parent resets
  useEffect(() => { setLocal(value); }, [value]);

  return (
    <div className={styles.wrapper}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        className={styles.input}
        type="search"
        placeholder="Search stories…"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        aria-label="Search posts"
      />
      {local && (
        <button className={styles.clear} onClick={() => { setLocal(""); onChange(""); }} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  );
}