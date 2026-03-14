"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const features = [
  {
    icon: "📊",
    title: "Profile Analytics",
    description: "Deep dive into any developer's GitHub presence and activity.",
  },
  {
    icon: "🧬",
    title: "Developer DNA",
    description: "Discover developer type, consistency, and tech diversity.",
  },
  {
    icon: "🏥",
    title: "Repo Health Score",
    description: "Score each repository based on stars, forks, and activity.",
  },
  {
    icon: "🤖",
    title: "AI Insights",
    description: "Get AI-generated analysis of any developer's profile.",
  },
];

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleLogin = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <main className="relative min-h-screen grid-bg overflow-hidden">
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-[-10%] right-[5%] w-[400px] h-[400px] rounded-full animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
          animationDelay: "1.5s",
        }}
      />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Badge */}
        <div className="animate-fade-in mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open Source Intelligence
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-in animate-fade-in-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight tracking-tight max-w-4xl">
          <span className="gradient-text">GitHub Intelligence</span>
          <br />
          <span className="text-foreground">Dashboard</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in animate-fade-in-delay-2 text-muted-foreground text-base sm:text-lg text-center max-w-xl mt-5 leading-relaxed">
          Login with your GitHub account to unlock rich analytics,
          visualizations, and AI‑powered insights about your developer profile.
        </p>

        {/* Login Button */}
        <div className="animate-fade-in animate-fade-in-delay-3 mt-10">
          <button
            id="login-github-button"
            onClick={handleLogin}
            disabled={status === "loading"}
            className="glow-button text-base px-8 py-3.5 flex items-center gap-3"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {status === "loading" ? "Checking..." : "Login with GitHub"}
          </button>
        </div>

        {/* Feature cards */}
        <div className="animate-fade-in animate-fade-in-delay-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-20 max-w-5xl w-full px-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card p-5 flex flex-col items-start gap-3 group"
            >
              <span className="text-2xl group-hover:animate-float">
                {f.icon}
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="absolute bottom-6 text-xs text-muted">
          Built with Next.js · GitHub REST API · OpenAI
        </p>
      </div>
    </main>
  );
}
