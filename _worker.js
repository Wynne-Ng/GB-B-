
export default {
  async fetch(request, env) {

    const authorization = request.headers.get("Authorization");

    const expectedAuthorization =
      `Basic ${btoa(`${env.SITE_USER}:${env.SITE_PASSWORD}`)}`;

    if (authorization !== expectedAuthorization) {
      return new Response("Authorization required.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Private Tool"',
        },
      });
    }

    return await env.ASSETS.fetch(request);
  },
};
