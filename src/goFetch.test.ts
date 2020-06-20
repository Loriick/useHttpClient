import "whatwg-fetch";
import goFetch from "./goFetch";
import { server, rest } from "./testServer";
import { cleanup } from "@testing-library/react-hooks";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
afterEach(cleanup);

describe("goFetch - GET", () => {
  it("should works", async () => {
    const res = await goFetch("https://jsonplaceholder.typicode.com/", {
      method: "GET",
    });

    const data = JSON.parse(res._bodyInit);
    expect(res.status).toBe(200);
    expect(data.posts.length).toBe(1);
  });

  it("should failed", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/failed",
        (_req, res, ctx) => res(ctx.status(404))
      )
    );
    const res = await goFetch("https://jsonplaceholder.typicode.com/failed", {
      method: "GET",
    });

    expect(res.status).toBe(404);
  });

  it("should return a 500 status", async () => {
    const res = await goFetch("https://jsonplaceholder.typicode.com/500", {
      method: "GET",
    });
    expect(res.status).toBe(500);
  });
});

describe("goFetch - POST", () => {
  it("should work", async () => {
    const res = await goFetch("https://jsonplaceholder.typicode.com/", {
      method: "POST",
      body: { title: "title 1", content: "content 1" },
      options: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.status).toBe(200);
  });

  it("should failed", async () => {
    const res = await goFetch("https://jsonplaceholder.typicode.com/", {
      method: "POST",
      options: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });
    const message = JSON.parse(res._bodyInit);
    expect(res.status).toBe(500);
    expect(message.error).toBe("Post is not provied");
  });
});
