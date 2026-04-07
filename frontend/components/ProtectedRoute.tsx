"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // While auth state is being restored from localStorage, render nothing
  if (loading) return null;

  // If not authenticated, render nothing (redirect is in flight)
  if (!user) return null;

  return <>{children}</>;
}