"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import * as commentService from "../services/commentService";
import styles from "./CommentSection.module.css";

interface Comment {
  id: string;
  comment: string;
  commenter: string;
  createdAt: string;
  commenterDetails?: { username: string };
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CommentSection({ postId }: { postId: string }) {
  const { user, token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await commentService.getCommentsByPost(postId);
      setComments(data.comments);
      setTotal(data.total);
    } catch {
      // silently fail — comments aren't critical
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [postId]);

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (!token) return;
    setSubmitting(true);
    setError("");
    try {
      await commentService.createComment({ comment: trimmed, post: postId }, token);
      setText("");
      await load();
    } catch {
      setError("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!token) return;
    try {
      await commentService.deleteComment(String(commentId), token);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setTotal((t) => t - 1);
    } catch {
      alert("Failed to delete comment.");
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Discussion
        {total > 0 && <span className={styles.count}>{total}</span>}
      </h2>

      {/* Compose box */}
      {user ? (
        <div className={styles.compose}>
          <span className={styles.composeAvatar}>
            {user.username[0].toUpperCase()}
          </span>
          <div className={styles.composeRight}>
            <textarea
              className={styles.textarea}
              placeholder="Share your thoughts…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={1000}
            />
            {error && <p className={styles.errorMsg}>{error}</p>}
            <div className={styles.composeFooter}>
              <span className={styles.charCount}>{text.length}/1000</span>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={submitting || !text.trim()}
              >
                {submitting ? "Posting…" : "Post comment"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.authPrompt}>
          <span>Sign in to join the discussion.</span>
          <a href="/login" className={styles.authLink}>Sign in →</a>
        </div>
      )}

      {/* Comment list */}
      {loading ? (
        <div className={styles.skeletonList}>
          {[1, 2, 3].map((i) => <div key={i} className={styles.skeletonComment} />)}
        </div>
      ) : comments.length === 0 ? (
        <p className={styles.empty}>No comments yet. Be the first to respond.</p>
      ) : (
        <ul className={styles.list}>
          {comments.map((c) => {
            const isOwner = user && c.commenter === (user as any).id;
            return (
              <li key={c.id} className={styles.comment}>
                <div className={styles.commentBody}>
                  <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>
                      {c.commenterDetails?.username ?? `User #${c.commenter}`}
                    </span>
                    <span className={styles.commentTime}>{timeAgo(c.createdAt)}</span>
                    {isOwner && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(c.id)}
                        aria-label="Delete comment"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <p className={styles.commentText}>{c.comment}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}