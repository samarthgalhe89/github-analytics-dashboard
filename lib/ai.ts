import { Groq } from "groq-sdk";
import { GitHubRepo, GitHubUser } from "@/lib/github";
import { RepoStats, LanguageStat } from "@/lib/analytics";

export interface DeveloperDNA {
  archetype: string;
  summary: string;
  strengths: string[];
  growthAreas: string[];
  personality: string[];
  careerRoadmap: string[];
}

// Fallback in case of API failure or missing key
export const placeholderDNA: DeveloperDNA = {
  archetype: "Unknown Entity",
  summary: "We couldn't generate your intelligent profile at this time. Please ensure the GROQ_API_KEY is configured correctly.",
  strengths: ["Code Implementation", "Problem Solving"],
  growthAreas: ["Portfolio Expansion", "Advanced Frameworks"],
  personality: ["Determined", "Methodical"],
  careerRoadmap: ["Next.js Deep Dive", "Cloud Architecture"],
};

export async function generateDeveloperDNA(
  user: GitHubUser,
  repos: GitHubRepo[],
  stats: RepoStats,
  languages: LanguageStat[]
): Promise<DeveloperDNA> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("GROQ_API_KEY is missing. Returning placeholder DNA.");
    return placeholderDNA;
  }

  try {
    const groq = new Groq({ apiKey });

    // Prepare a condensed prompt to save tokens
    const prompt = `
      You are an expert engineering manager profiling a software developer based on their public GitHub data. 
      Analyze the following data and return a JSON object containing their "Developer DNA".
      
      Developer Name: ${user.name || user.login}
      Bio: ${user.bio || "No bio provided"}
      Public Repos: ${user.public_repos}
      Followers: ${user.followers}
      
      Total Stars: ${stats.totalStars}
      Total Forks: ${stats.totalForks}
      
      Top Languages (by byte size):
      ${languages.slice(0, 5).map(l => `${l.name}: ${l.percentage}%`).join("\n")}
      
      Recent Repositories:
      ${repos.slice(0, 5).map(r => `- ${r.name}: ${r.description || "N/A"} (${r.language})`).join("\n")}

      Based on this data, provide a JSON response with exactly this structure, nothing else:
      {
        "archetype": "A creative title representing their coding style (e.g., 'The Full-Stack Polyglot')",
        "summary": "A highly detailed summary of their experience (4-6 sentences long). Analyze what their work says about them.",
        "strengths": ["3 specific technical strengths"],
        "growthAreas": ["2 realistic areas they could explore"],
        "personality": ["2-3 personality traits like 'The Perfectionist', 'The Pioneer', 'The Collaborator'"],
        "careerRoadmap": ["3 specific technologies or skills they should learn next to grow"]
      }
    `;

    const result = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    let text = result.choices[0]?.message?.content || "";

    // Clean up Markdown formatting if the model still accidentally prepends it
    text = text.replace(/```json\n/g, "").replace(/```/g, "").trim();

    const dna = JSON.parse(text) as DeveloperDNA;
    return dna;
  } catch (error: any) {
    if (error?.status === 429) {
      console.warn("Groq API Rate Limit reached (429). Generating fallback placeholder.");
      return {
        ...placeholderDNA,
        archetype: "Rate Limited",
        summary: "You've sent too many requests to the AI API. Please wait a minute before trying again."
      };
    }
    console.error("Error generating developer DNA with Groq:", error);
    return placeholderDNA;
  }
}
