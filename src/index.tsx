import * as React from "react";
import { Arguments } from "./utils/interface";
import goFetch from "./goFetch";

function useHttpClient(
  url: string,
  { method, body, options }: Arguments = { method: "GET" }
) {
  const [loading, setLoading] = React.useState<boolean>(true);
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
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    callFunc();
  }, [url]);

  return {
    loading,
    error,
    data,
  };
}

export default useHttpClient;
