import Link from "next/link";
import styles from "./PostCard.module.css";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  posterDetails: { id: number; username: string; email: string };
  createdAt: string;
}

interface Props {
  post: Post;
  featured?: boolean;
}

function excerpt(content: string, max = 160) {
  const plain = content.replace(/[#*`_>~\[\]]/g, "").trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post, featured }: Props) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      data-featured={featured}
    >
      <div className={styles.top}>
        <span className={styles.category}>{post.category}</span>
        {featured && <span className={styles.featuredBadge}>Featured</span>}
      </div>

      <h2 className={styles.title}>{post.title}</h2>

      <p className={styles.excerpt}>
        {excerpt(post.content, featured ? 240 : 120)}
      </p>

      <div className={styles.meta}>
        <span className={styles.author}>
          {post.posterDetails?.username ?? "Anonymous"}
        </span>
        <span className={styles.dot}>·</span>
        <span className={styles.date}>{formatDate(post.createdAt)}</span>
      </div>
    </Link>
  );
}