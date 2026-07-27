export default {
  async fetch(request, env) {
    const authorization = request.headers.get("Authorization");

    const username = env.SITE_USER;
    const password = env.SITE_PASSWORD;

    const expected =
      "Basic " + btoa(`${username}:${password}`);

    if (authorization !== expected) {
      return new Response("Authentication required.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Private Tool"',
        },
      });
    }

    return await env.ASSETS.fetch(request);
  },
};
