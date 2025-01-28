import { NextResponse } from "next/server";

// Get data from Twitch API
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "No username provided" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        "Authorization": `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
      },
    });

    
    if (response.status === 401) {
      return NextResponse.json({ error: "The OAuth token is invalid. Please regenerate the token." }, { status: 401 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error with Twitch request" }, { status: 500 });
  }
}
