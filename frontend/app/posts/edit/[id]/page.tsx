"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import PostForm, { PostFormValues } from "../../../../components/PostForm";
import * as postService from "@/services/postService";
import styles from "./page.module.css";

function EditPostInner() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, token } = useAuth();

  const [post, setPost] = useState<any>(null);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    postService
      .getPost(id)
      .then((data) => {
        // Only the owner can edit — redirect others away
        if (data.posterDetails?.username !== user?.username) {
          router.replace(`/posts/${id}`);
          return;
        }
        setPost(data);
      })
      .catch(() => setLoadError("Post not found."));
  }, [id, user]);

  const handleSubmit = async (values: PostFormValues) => {
    setSaving(true);
    try {
      await postService.updatePost(id, values, token!);
      router.push(`/posts/${id}`);
    } finally {
      setSaving(false);
    }
  };

  if (loadError) {
    return (
      <main className={styles.main}>
        <div className={styles.errorState}>
          <p>{loadError}</p>
          <Link href="/" className={styles.backLink}>Back to stories</Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonField} />
          <div className={styles.skeletonBody} />
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link href={`/posts/${id}`} className={styles.backLink}>Back to post</Link>
          <h1 className={styles.heading}>Edit story</h1>
          <p className={styles.sub}>Make changes and republish.</p>
        </div>

        <PostForm
          initial={{
            title: post.title,
            content: post.content,
            category: post.category,
          }}
          submitLabel="Save changes"
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </main>
  );
}

export default function EditPostPage() {
  return (
    <ProtectedRoute>
      <EditPostInner />
    </ProtectedRoute>
  );
}