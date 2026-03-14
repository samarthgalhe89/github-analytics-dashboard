import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  fetchAuthenticatedUser,
  fetchUser,
  fetchRepos,
} from "@/lib/github";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    // Get session for access token
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    let user;
    let repos;

    if (username) {
      // Fetch a specific user (search feature)
      user = await fetchUser(username, token);
      repos = await fetchRepos(username, token);
    } else if (token) {
      // Fetch authenticated user's own data
      user = await fetchAuthenticatedUser(token);
      repos = await fetchRepos(user.login, token);
    } else {
      return NextResponse.json(
        { error: "Username required or login with GitHub" },
        { status: 400 }
      );
    }

    return NextResponse.json({ user, repos });
  } catch (error: any) {
    const status = error.message?.includes("not found")
      ? 404
      : error.message?.includes("rate limit")
        ? 429
        : 500;

    return NextResponse.json({ error: error.message }, { status });
  }
}
