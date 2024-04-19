const homePagePattern = new URLPattern({ pathname: "/home" });
const defaultPagePattern = new URLPattern({ pathname: "/" });
const imageRequestPattern = new URLPattern({
  pathname: "/assets/:filename(.+\\.jpeg)",
});

async function notFoundHandler(): Promise<Response> {
  const notFoundHTML = await Deno.open("./not-found.html");
  return new Response(notFoundHTML.readable, {
    status: 404,
    headers: { "Content-Type": "text/html" },
  });
}

async function pageHTMLHandler(): Promise<Response> {
  const indexHTML = await Deno.open("./index.html");
  return new Response(indexHTML.readable, {
    headers: { "Content-Type": "text/html" },
  });
}

async function imageRequestHandler(url: URL): Promise<Response> {
  const patternResult = imageRequestPattern.exec(url);

  if (patternResult === null) {
    throw new Error(
      "url does not matches the pattern " + imageRequestPattern.pathname,
    );
  }

  try {
    const image = await Deno.open("." + url.pathname, { read: true });

    return new Response(image.readable, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch (_error) {
    return new Response("The image does not exists!", { status: 404 });
  }
}

async function htmlApplicationRouter(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (defaultPagePattern.test(url) || homePagePattern.test(url)) {
    return await pageHTMLHandler();
  } else if (imageRequestPattern.test(url)) {
    return imageRequestHandler(url);
  }

  return await notFoundHandler();
}

Deno.serve(htmlApplicationRouter);
