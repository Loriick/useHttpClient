import * as React from 'react';

type Method = "GET" | "POST" | "PUT" | "DELETE";
interface Arguments {
  method?: Method;
  body?: object;
  options?: object;
}

function useHttpClient(url: string, { method = "GET", body, options }: Arguments) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<null | object>(null);
  const [data, setData] = React.useState<null | object>(null);



  const gofetch = async (url: string, args: Arguments): Promise<any> => {
    const httpVerb: string | undefined = args.method && args.method.toLowerCase()
    const needBody: boolean = ['put', 'post'].includes(httpVerb as any);
    if (args.body === null && needBody) return undefined;
    const parameters = needBody ? { ...args, body: JSON.stringify(args.body) } : { method: args.method }
    return await fetch(url, { ...parameters })
  }

  React.useEffect(() => {
    const callFunc = async () => {
      try {
        method = method ? method : "GET"
        const res = await gofetch(url, { method, body, options });
        const json = await res.json()
        setData(json)
        setLoading(false)
      } catch (error) {
        setError(error);
        setLoading(false)
      }
    }
    callFunc()
  }, [url])

  return {
    loading, error, data
  }

};




export default useHttpClient