import React from "react";

import useHttpClient from "@loriick/use-http-client";

const App = () => {
  const { data, status, error } = useHttpClient(
    "https://jsonplaceholder.typicode.com/posts/"
  );

  if (status === "pending") {
    return <p>Loading</p>;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }
  return data.map((d) => <p key={d.id}>{d.title}</p>);
};
export default App;
