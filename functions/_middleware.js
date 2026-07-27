export async function onRequest(context) {

  return new Response(
    JSON.stringify({
      user: context.env.SITE_USER,
      pass: context.env.SITE_PASSWORD
    }),
    {
      headers:{
        "Content-Type":"application/json"
      }
    }
  );

}
