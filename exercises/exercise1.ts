/*
    1. Start a new Deno workspace and create a
       server.ts file

    2. Create a web server in Deno and listen
       on the default port (8000)

    3. Use the URLPattern API to match the following
       routes and respond accordingly:
       - http://localhost:8000/register -> "Registered!"
       - http://localhost:8000/login -> "Logged in!"
       - http://localhost:8000/logout -> "Logged out!"
       - Every other route -> "Not Found"

    4. Test these routes in both your Browser and
       Insomnia to see if they work.
*/

const registerPattern = new URLPattern({ pathname: "/register" });
const loginPattern = new URLPattern({ pathname: "/login" });
const logoutPatter = new URLPattern({ pathname: "/logout" });

function userManagementHandler(request: Request) {
  const url = new URL(request.url);

  if (registerPattern.test(url)) {
    return new Response("Registered!");
  } else if (loginPattern.test(url)) {
    return new Response("Logged in!");
  } else if (logoutPatter.test(url)) {
    return new Response("Logged out!");
  }

  return new Response("Not Found", { status: 404 });
}

Deno.serve(userManagementHandler);
