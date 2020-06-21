import React, { useState, useEffect } from "react";

import useHttpClient from "@loriick/use-http-client";

const App = () => {
  const [values, setValues] = useState({ title: "", content: "" });
  const { data, status, error } = useHttpClient("http://localhost:7777/posts");

  const {
    data: postData,
    status: postStatus,
    executeRequest,
    error: postError,
  } = useHttpClient("http://localhost:7777/post", {
    method: "POST",
    onRender: false,
    body: { title: values.title, content: values.content },
    options: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });

  if (status === "pending") {
    return <p>Loading</p>;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await executeRequest();
        }}
      >
        <input
          type="text"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
        />
        <input
          type="text"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
        />
        <button type="submit">submit</button>
      </form>

      {data.posts.map((d) => (
        <p key={d.id}>{d.title}</p>
      ))}
    </>
  );
};
export default App;
