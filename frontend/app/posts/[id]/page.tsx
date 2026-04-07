"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import * as postService from "@/services/postService";
import CommentSection from "../../../components/CommentSection";
import styles from "./page.module.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, token } = useAuth();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    postService
      .getPost(id)
      .then(setPost)
      .catch(() => setError("Post not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner = user && post && post.posterDetails?.username === user.username;

  const handleDelete = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await postService.deletePost(id, token!);
      router.push("/");
    } catch {
      alert("Failed to delete post.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonMeta} />
        <div className={styles.skeletonBody} />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className={styles.main}>
        <div className={styles.errorState}>
          <span className={styles.errorIcon}>✦</span>
          <p>{error || "Something went wrong."}</p>
          <Link href="/" className={styles.backLink}>← Back to stories</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Back nav */}
        <Link href="/" className={styles.backLink}>All stories</Link>

        {/* Header */}
        <header className={styles.header}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <div className={styles.metaLeft}>
              <div className={styles.metaText}>
                <span className={styles.author}>{post.posterDetails?.username}</span>
                <span className={styles.date}>{formatDate(post.createdAt)}</span>
              </div>
            </div>

            {isOwner && (
              <div className={styles.actions}>
                <Link href={`/posts/edit/${id}`} className={styles.btnEdit}>
                  Edit
                </Link>
                <button
                  className={styles.btnDelete}
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            )}
          </div>
        </header>

        <hr className={styles.divider} />

        {/* Body */}
        <article className={styles.body}>
          {post.content.split("\n").map((para: string, i: number) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </article>

        <hr className={styles.divider} />

        {/* Comments */}
        <CommentSection postId={id} />
      </div>
    </main>
  );
}