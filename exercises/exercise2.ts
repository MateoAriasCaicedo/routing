/*
    1. Start a new Deno workspace and create a
       server.ts file

    2. Create a web server in Deno and listen
       on the default port (8000)

    3. Use the URLPattern API to match the following
       routes and respond accordingly:
       - http://localhost:8000/profile/:username
         -> Return `Hello, ${username}!` as a String
            depending on the username in the pathname
       - http://localhost:8000/posts/:postId/:userId
         -> Return `All Posts for: {userId} and ${postId}`
            as a String depending on the pathnames given

    4. Test these routes in both your Browser and
       Insomnia to see if they work.
*/

const profileUsernamePattern = new URLPattern({
  pathname: "/profile/:username",
});

const userPostPattern = new URLPattern({ pathname: "/posts/:postId/:userId" });

function profileUsernameHandler(url: URL): Response {
  const patternResult = profileUsernamePattern.exec(url);

  if (patternResult === null) {
    throw new Error(
      "The url does not matches the pattern " + profileUsernamePattern.pathname,
    );
  }

  const username = patternResult.pathname.groups.username;
  return new Response(`Hello, ${username}!`);
}

function userPostHandler(url: URL): Response {
  const patternResult = userPostPattern.exec(url);

  if (patternResult === null) {
    throw new Error(
      "The url does not matches the pattern " + userPostPattern.pathname,
    );
  }

  const userId = patternResult.pathname.groups.userId;
  const postId = patternResult.pathname.groups.postId;

  return new Response(`All Posts for: ${userId} and ${postId}`);
}

function postsApplicationRouter(request: Request): Response {
  const url = new URL(request.url);

  if (profileUsernamePattern.test(url)) {
    return profileUsernameHandler(url);
  } else if (userPostPattern.test(url)) {
    return userPostHandler(url);
  }

  return new Response("Not Found", { status: 404 });
}

Deno.serve(postsApplicationRouter);
