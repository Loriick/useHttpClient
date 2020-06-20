import * as React from "react";
import { Arguments } from "./utils/interface";
import goFetch from "./goFetch";

type Status = "pending" | "resolved" | "rejected"

function useHttpClient(
  url: string,
  { method, body, options }: Arguments = { method: "GET" }
) {
  const [status, setStatus] = React.useState<Status>("pending");
  const [error, setError] = React.useState<null | object>(null);
  const [data, setData] = React.useState<null | object>(null);

  React.useEffect(() => {
    const callFunc = async () => {
      try {
        const res = await goFetch(url, { method, body, options });
        if (!res.ok)
          throw new Error(`Request failed with ${res.status} status`);
        const json = await res.json();
        setData(json);
        setStatus("resolved");
      } catch (error) {
        setError(error);
        setStatus("rejected");
      }
    };
    callFunc();
  }, [url]);

  return {
    status,
    error,
    data,
  };
}

export default useHttpClient;
