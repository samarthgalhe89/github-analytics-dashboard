"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import { GitHubUser, GitHubRepo } from "@/lib/github";

interface DashboardData {
  user: GitHubUser;
  repos: GitHubRepo[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect to homepage if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Fetch GitHub data when session is available
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/github");
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch data");
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status]);

  // Loading states
  if (status === "loading" || (status === "authenticated" && loading)) {
    return (
      <div className="min-h-screen grid-bg">
        <header className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="skeleton w-32 h-5" />
          <div className="skeleton w-24 h-5" />
        </header>
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="skeleton w-24 h-24 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="skeleton w-40 h-5" />
                    <div className="skeleton w-24 h-4" />
                    <div className="skeleton w-full h-3" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center space-y-1">
                      <div className="skeleton w-12 h-6 mx-auto" />
                      <div className="skeleton w-16 h-3 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="skeleton w-full h-48 rounded-2xl" />
              <div className="skeleton w-full h-48 rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid-bg flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md animate-fade-in">
          <p className="text-3xl mb-3">⚠️</p>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="glow-button text-sm px-5 py-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen grid-bg">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-bold">
            <span className="gradient-text">GitHub Intelligence</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {session?.user?.name || data.user.login}
          </span>
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="avatar"
              className="w-7 h-7 rounded-full ring-1 ring-border"
            />
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-border-hover"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — Profile */}
          <div className="lg:col-span-1">
            <ProfileCard user={data.user} />
          </div>

          {/* Right column — Analytics (placeholder for Phase 3+) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 text-center animate-fade-in animate-fade-in-delay-1">
              <p className="text-2xl mb-2">📊</p>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Repository Analytics
              </h3>
              <p className="text-sm text-muted-foreground">
                Stats and charts coming in Phase 3
              </p>
            </div>
            <div className="glass-card p-8 text-center animate-fade-in animate-fade-in-delay-2">
              <p className="text-2xl mb-2">📈</p>
              <h3 className="text-base font-semibold text-foreground mb-1">
                Activity & Health Scores
              </h3>
              <p className="text-sm text-muted-foreground">
                Charts and tables coming in Phase 4
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
