"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import PostForm, { PostFormValues } from "../../../components/PostForm";
import * as postService from "@/services/postService";
import styles from "./page.module.css";

function CreatePostInner() {
  const { token } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (values: PostFormValues) => {
    setSaving(true);
    try {
      const post = await postService.createPost(values, token!);
      router.push(`/posts/${post.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link href="/" className={styles.backLink}>All stories</Link>
          <h1 className={styles.heading}>New story</h1>
          <p className={styles.sub}>Share your ideas with the world.</p>
        </div>

        <PostForm
          submitLabel="Publish story"
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </main>
  );
}

export default function CreatePostPage() {
  return (
    <ProtectedRoute>
      <CreatePostInner />
    </ProtectedRoute>
  );
}