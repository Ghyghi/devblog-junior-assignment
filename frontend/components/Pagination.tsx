"use client";

import styles from "./Pagination.module.css";

interface Props {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({ current, total, onChange }: Props) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  // Show at most 7 page buttons: first, last, current ± 2, with ellipsis
  const visible = pages.filter((p) => {
    if (total <= 7) return true;
    if (p === 1 || p === total) return true;
    if (Math.abs(p - current) <= 2) return true;
    return false;
  });

  // Insert null for gaps
  const withEllipsis: (number | null)[] = [];
  for (let i = 0; i < visible.length; i++) {
    if (i > 0 && visible[i] - visible[i - 1] > 1) withEllipsis.push(null);
    withEllipsis.push(visible[i]);
  }

  return (
    <nav className={styles.nav} aria-label="Pagination">
      <button
        className={styles.arrow}
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
      >
        ←
      </button>

      {withEllipsis.map((p, i) =>
        p === null ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            className={`${styles.page} ${p === current ? styles.active : ""}`}
            onClick={() => onChange(p)}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className={styles.arrow}
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}