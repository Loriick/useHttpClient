import { renderHook, cleanup } from "@testing-library/react-hooks";

import useHttpClient from "./index";

afterEach(cleanup);

describe("useHttpClient - GET", () => {
  it("should loading the app and should return data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/posts/")
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it("Should return an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/post/")
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeDefined();
  });
});

describe("useHttpClient - POST", () => {
  it("should loading and return data object", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/posts/", {
        method: "POST",
        body: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
        options: {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      })
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it("should return an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/po/", {
        method: "POST",
        body: {
          title: "foo",
          body: "bar",
          userId: 1,
        },
        options: {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      })
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeDefined();
  });
});

describe("useHttpClient - PUT", () => {
  it("should loading and return data object after update", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        body: {
          id: 1,
          title: "foo",
          body: "bar",
          userId: 1,
        },
        options: {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      })
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it("should return an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/po/1", {
        method: "PUT",
        body: {
          id: 1,
          title: "foo",
          body: "bar",
          userId: 1,
        },
        options: {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
      })
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeDefined();
  });
});

describe("useHttpClient - DELETE", () => {
  it("should loading and return data after delete", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE",
      })
    );

    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it("should return an error after loading", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttpClient("https://jsonplaceholder.typicode.com/pe/", {
        method: "DELETE",
      })
    );
    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeDefined();
  });
});
