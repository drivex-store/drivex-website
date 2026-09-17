const ALLOWED_HOSTNAME = "cdn.sanity.io";
const ALLOWED_ORIGIN = `https://${ALLOWED_HOSTNAME}`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing url parameter", { status: 400 });
  }

  let parsed;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return new Response("Invalid url parameter", { status: 400 });
  }

  if (
    parsed.protocol !== "https:" ||
    parsed.hostname !== ALLOWED_HOSTNAME ||
    parsed.username ||
    parsed.password ||
    parsed.port
  ) {
    return new Response("Host not allowed", { status: 403 });
  }

  const upstreamUrl = new URL(parsed.pathname + parsed.search, ALLOWED_ORIGIN);

  let upstream;
  try {
    upstream = await fetch(upstreamUrl.toString(), {
      headers: { Accept: "image/*" },
      next: { revalidate: 60 * 60 * 24 },
    });
  } catch {
    return new Response("Failed to fetch image", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("Failed to fetch image", { status: upstream.status || 502 });
  }

  const contentType = upstream.headers.get("content-type") || "image/webp";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
