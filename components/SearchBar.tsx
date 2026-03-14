"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    router.push(`/dashboard?user=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div
        className={`
          relative flex items-center gap-2
          rounded-xl border transition-all duration-300
          ${
            isFocused
              ? "border-accent shadow-[0_0_24px_rgba(99,102,241,0.15)]"
              : "border-border hover:border-border-hover"
          }
          bg-surface p-1.5
        `}
      >
        {/* GitHub icon */}
        <div className="pl-3 text-muted">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </div>

        {/* Input */}
        <input
          id="github-username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter GitHub username..."
          className="
            flex-1 bg-transparent text-foreground
            placeholder:text-muted text-sm
            outline-none py-2.5 px-1
          "
          autoComplete="off"
          spellCheck={false}
        />

        {/* Button */}
        <button
          id="analyze-button"
          type="submit"
          disabled={!username.trim()}
          className="glow-button text-sm px-5 py-2.5 whitespace-nowrap"
        >
          Analyze
        </button>
      </div>

      <p className="text-center text-muted text-xs mt-3">
        Try{" "}
        <button
          type="button"
          onClick={() => setUsername("torvalds")}
          className="text-accent hover:text-accent-hover transition-colors underline underline-offset-2"
        >
          torvalds
        </button>
        ,{" "}
        <button
          type="button"
          onClick={() => setUsername("gaearon")}
          className="text-accent hover:text-accent-hover transition-colors underline underline-offset-2"
        >
          gaearon
        </button>
        , or{" "}
        <button
          type="button"
          onClick={() => setUsername("sindresorhus")}
          className="text-accent hover:text-accent-hover transition-colors underline underline-offset-2"
        >
          sindresorhus
        </button>
      </p>
    </form>
  );
}
