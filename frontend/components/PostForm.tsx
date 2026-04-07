"use client";

import { useState } from "react";
import styles from "./PostForm.module.css";

export const POST_CATEGORIES = ["Tech", "Lifestyle", "Travel", "Sports"] as const;

export interface PostFormValues {
  title: string;
  content: string;
  category: string;
}

interface Props {
  initial?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => Promise<void>;
  submitLabel: string;
  loading?: boolean;
}

export default function PostForm({ initial, onSubmit, submitLabel, loading }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [errors, setErrors] = useState<Partial<PostFormValues>>({});
  const [serverError, setServerError] = useState("");

  const validate = (): boolean => {
    const e: Partial<PostFormValues> = {};
    if (!title.trim()) e.title = "Title is required.";
    else if (title.trim().length < 3) e.title = "Title must be at least 3 characters.";
    if (!content.trim()) e.content = "Content is required.";
    else if (content.trim().length < 10) e.content = "Content must be at least 10 characters.";
    if (!category) e.category = "Please select a category.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    try {
      await onSubmit({ title: title.trim(), content: content.trim(), category });
    } catch (err: any) {
      setServerError(err.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className={styles.serverError} role="alert">
          {serverError}
        </div>
      )}

      {/* Title */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="post-title">
          Title
        </label>
        <input
          id="post-title"
          className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
          type="text"
          placeholder="Give your story a title…"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
          maxLength={200}
          autoFocus
        />
        <div className={styles.fieldFooter}>
          {errors.title
            ? <span className={styles.error}>{errors.title}</span>
            : <span />
          }
          <span className={styles.charCount}>{title.length}/200</span>
        </div>
      </div>

      {/* Category */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="post-category">
          Category
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="post-category"
            className={`${styles.select} ${errors.category ? styles.inputError : ""}`}
            value={category}
            onChange={(e) => { setCategory(e.target.value); setErrors((p) => ({ ...p, category: "" })); }}
          >
            <option value="" disabled>Select a category…</option>
            {POST_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className={styles.selectChevron}>▾</span>
        </div>
        {errors.category && <span className={styles.error}>{errors.category}</span>}
      </div>

      {/* Content */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="post-content">
          Content
        </label>
        <textarea
          id="post-content"
          className={`${styles.textarea} ${errors.content ? styles.inputError : ""}`}
          placeholder="Tell your story…"
          value={content}
          onChange={(e) => { setContent(e.target.value); setErrors((p) => ({ ...p, content: "" })); }}
          rows={16}
        />
        {errors.content && <span className={styles.error}>{errors.content}</span>}
      </div>

      <div className={styles.formFooter}>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}