/*
    1. Start a new Deno workspace and create a
       server.ts file

    2. Create a web server in Deno and listen
       on the default port (8000)

    3. Respond to and create the following routes:
       - http://localhost:8000/hello -> "Hello!"
       - http://localhost:8000/bye -> "See ya!"
       - All other routes -> "Not Found"

    4. Test these routes in both your Browser and
       Insomnia to see if they work.
*/

function greetingRequestHandler(request: Request) {
  const pathname = new URL(request.url).pathname;

  if (pathname === "/hello") {
    return new Response("Hello!");
  } else if (pathname === "/bye") {
    return new Response("See ya!");
  } else {
    return new Response("Not Found");
  }
}

Deno.serve(greetingRequestHandler);
