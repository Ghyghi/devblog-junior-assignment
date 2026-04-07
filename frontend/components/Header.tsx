"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          The Publication
        </Link>

        <div className={styles.right}>
          {user ? (
            <>
              <span className={styles.greeting}>
                {user.username}
              </span>
              <Link href="/posts/create" className={styles.btnPrimary}>
                Write
              </Link>
              <button onClick={handleLogout} className={styles.btnGhost}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.btnGhost}>
                Sign in
              </Link>
              <Link href="/register" className={styles.btnPrimary}>
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}