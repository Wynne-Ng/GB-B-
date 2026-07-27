export async function onRequest(context) {

  const { request, env } = context;

  const auth = request.headers.get("Authorization");

  const valid =
    "Basic " + btoa(`${env.SITE_USER}:${env.SITE_PASSWORD}`);

  if (auth !== valid) {
    return new Response("Login Required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Private Tool"',
      },
    });
  }

  return context.next();
}
