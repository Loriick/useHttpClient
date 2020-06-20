import React from "react";

import useHttpClient from "@loriick/use-http-client";

const App = () => {
  const { data, loading, error } = useHttpClient(
    "https://jsonplaceholder.typicode.com/posts/"
  );
  console.log({ data, loading, error });
  return <div>{"example"}</div>;
};
export default App;
