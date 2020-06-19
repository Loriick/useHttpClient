import { setupWorker, rest } from "msw";

const mocks = [
  // Handles a POST /login request
  rest.post("/post", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  // Handles a GET /user request
  rest.get("/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: "post 1",
        body: "body post 1",
      })
    );
  }),
];

const worker = setupWorker(...mocks);
worker.start();
