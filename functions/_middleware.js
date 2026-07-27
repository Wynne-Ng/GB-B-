export async function onRequest(context) {

  const { request, env } = context;

  const authorization = request.headers.get("Authorization");

  const expected =
    "Basic " + btoa(`${env.SITE_USER}:${env.SITE_PASSWORD}`);

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
// redeploy
