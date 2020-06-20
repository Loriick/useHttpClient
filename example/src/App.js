import React from "react";

import useHttpClient from "@loriick/use-http-client";

const App = () => {
  const { data, status, error } = useHttpClient(
    "https://jsonplaceholder.typicode.com/posts?userId=1"
  );

  const { data: postData, status: postStatus, executeRequest } = useHttpClient(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      onRender: false,
      body: { title: "title 1", content: "1" },
      options: {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        mode: "cors",
      },
    }
  );

  if (status === "pending") {
    return <p>Loading</p>;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <button
        onClick={async () => {
          await executeRequest();
        }}
      >
        Post to server
      </button>
      {postStatus === "pending" ? <p>Loading</p> : <p>{postData?.id}</p>}
      {data.map((d) => (
        <p key={d.id}>{d.title}</p>
      ))}
    </>
  );
};
export default App;
