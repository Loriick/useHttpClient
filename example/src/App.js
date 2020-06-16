import React from "react";

import useHttpClient from "@loriick/use-http-client";

const App = () => {
  const { data, loading, error } = useHttpClient("https://randomuser.me/api/", {
    method: "GET",
  });
  console.log({ data, loading, error });
  return <div>{"example"}</div>;
};
export default App;
