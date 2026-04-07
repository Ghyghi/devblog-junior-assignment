"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import styles from "./page.module.css";
import * as postService from "../services/postService";

const POSTS_PER_PAGE = 10;

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await postService.getPosts({ page, search, category, limit: POSTS_PER_PAGE });
      setPosts(data.posts);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroLabel}>The Publication</span>
            <h1 className={styles.heroTitle}>
              Ideas worth <em>reading.</em>
            </h1>
            <p className={styles.heroSub}>
              Stories on technology, lifestyle, travel, and the spaces in between.
            </p>
          </div>
          <div className={styles.heroDivider} />
        </section>

        <div className={styles.controls}>
          <SearchBar value={search} onChange={handleSearch} />
          <CategoryFilter value={category} onChange={handleCategory} />
        </div>

        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className={styles.empty}>
            <p>No stories found. Try a different search or category.</p>
          </div>
        ) : (
          <>
            {(search || category) && (
              <p className={styles.resultsMeta}>
                {total} {total === 1 ? "result" : "results"}
                {search && <> for &ldquo;<strong>{search}</strong>&rdquo;</>}
                {category && <> in <strong>{category}</strong></>}
              </p>
            )}
            <div className={styles.grid}>
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} featured={i === 0 && page === 1 && !search && !category} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination current={page} total={totalPages} onChange={setPage} />
            )}
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>The Publication</span>
          <p className={styles.footerCopy}>© {new Date().getFullYear()} · All rights reserved</p>
        </div>
      </footer>
    </>
  );
}