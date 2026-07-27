export async function onRequest(context) {

  const { request, env } = context;

  const authorization = request.headers.get("Authorization");

  const username = env.SITE_USER;
  const password = env.SITE_PASSWORD;

  const expected = `Basic ${btoa(
    username + ":" + password
  )}`;

  if (authorization !== expected) {
    return new Response("Authorization required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Private Tool"',
        "Cache-Control": "no-store"
      },
    });
  }

  return context.next();
}
