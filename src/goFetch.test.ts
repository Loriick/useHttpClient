import "whatwg-fetch";
import goFetch from "./goFetch";
import { server, rest, BASE_URL } from "./testServer";
import { cleanup } from "@testing-library/react-hooks";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
afterEach(cleanup);

const message = (res: any) => JSON.parse(res._bodyInit);

describe("goFetch", () => {
  describe("- GET", () => {
    it("should works", async () => {
      const res = await goFetch(BASE_URL, { method: "GET" });

      const data = JSON.parse(res._bodyInit);
      expect(res.status).toBe(200);
      expect(data.posts.length).toBe(1);
    });

    it("should failed", async () => {
      server.use(
        rest.get(`${BASE_URL}/FAILED`, (_req, res, ctx) => res(ctx.status(404)))
      );
      const res = await goFetch(`${BASE_URL}/FAILED`, {
        method: "GET",
      });

      expect(res.status).toBe(404);
    });

    it("should return a 500 status", async () => {
      const res = await goFetch(`${BASE_URL}/500`, {
        method: "GET",
      });
      expect(res.status).toBe(500);
    });
  });

  describe("- POST", () => {
    it("should work", async () => {
      const res = await goFetch(BASE_URL, {
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
      expect(message(res).success).toBeTruthy();
    });

    it("should failed", async () => {
      const res = await goFetch(BASE_URL, {
        method: "POST",
        options: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      });
      expect(res.status).toBe(404);
      expect(message(res).error).toBe("Post is not provied");
    });
  });

  describe("- DELETE", () => {
    it("should failed", async () => {
      const res = await goFetch(`${BASE_URL}/FAILED`, {
        method: "DELETE",
      });
      expect(res.status).toBe(404);
      expect(message(res).error).toBe("ID must be provied");
    });

    it("should works", async () => {
      const res = await goFetch(`${BASE_URL}/1`, {
        method: "DELETE",
      });

      expect(res.status).toBe(200);
      expect(message(res).success).toBe("Post deleted");
    });
  });

  describe("- PUT", () => {
    it("should failed with fake id ", async () => {
      const res = await goFetch(`${BASE_URL}/FAILED`, {
        method: "PUT",
        body: { title: "title 1", content: "content 3" },
        options: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      });
      expect(res.status).toBe(404);
      expect(message(res).error).toBe("ID must be provied");
    });
    it("should failed with no body provided", async () => {
      const res = await goFetch(`${BASE_URL}/1`, {
        method: "PUT",
        options: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      });
      expect(res.status).toBe(404);
      expect(message(res).error).toBe("Post is not provied");
    });

    it("should works", async () => {
      const res = await goFetch(`${BASE_URL}/1`, {
        method: "PUT",
        body: { title: "title 1", content: "content 3" },
        options: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      });

      expect(res.status).toBe(200);
      expect(message(res)).toMatchObject({
        title: "title 1",
        content: "content 3",
      });
    });
  });
});
