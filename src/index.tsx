import * as React from "react";
import { Arguments } from "./utils/interface";
import goFetch from "./goFetch";

type Status = "pending" | "resolved" | "rejected"

function useHttpClient(
  url: string,
  { method, body, options, onRender }: Arguments = { method: "GET", onRender: true }
) {
  const [status, setStatus] = React.useState<Status>("pending");
  const [error, setError] = React.useState<null | object>(null);
  const [data, setData] = React.useState<null | object>(null);
  const [hasToRender, setHasTorender] = React.useState(onRender)

  const executeRequest = async () => {
    setHasTorender(true)
    try {
      setStatus("pending")
      const res = await goFetch(url, { method, body, options });
      if (!res.ok) {
        setStatus("rejected");
        setError(res);
        throw new Error();
      }
      const json = await res.json();
      setHasTorender(false)
      setData(json);
      setStatus("resolved");
    } catch (error) {
      setError(error);
      setStatus("rejected");
      setHasTorender(false)
    }
  };

  React.useEffect(() => {
    if (hasToRender) {
      executeRequest();
      setHasTorender(false)

    }
  }, [url, hasToRender, status]);

  return {
    status,
    error,
    data,
    executeRequest
  };
}

export default useHttpClient;
