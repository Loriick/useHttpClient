import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/", (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ posts: [{ title: "title 1", content: "content 1" }] })
    );
  }),
  rest.get("*", (req, res, ctx) => {
    console.error(`please add a request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: "Please add request handler" })
    );
  }),
  rest.post("https://jsonplaceholder.typicode.com/", (req, res, ctx) => {
    if (!req.body) {
      return res(ctx.status(500), ctx.json({ error: "Post is not provied" }));
    }

    return res(ctx.status(200), ctx.json({ succes: true }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
