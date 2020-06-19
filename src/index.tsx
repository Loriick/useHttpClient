import * as React from 'react';

if (process.env.NODE_ENV === 'development') {
  require('./mock/mock')
}

type Method = "GET" | "POST" | "PUT" | "DELETE";
interface Arguments {
  method?: Method;
  body?: object;
  options?: object;
}

function useHttpClient(url: string, { method, body, options }: Arguments = { method: "GET" }) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<null | object>(null);
  const [data, setData] = React.useState<null | object>(null);

  const gofetch = async (url: string, args: Arguments): Promise<any> => {
    const httpVerb: string | undefined = args?.method?.toLowerCase()
    if (!httpVerb) throw new Error('Method must be provide')
    const needBody: boolean = ['put', 'post'].includes(httpVerb as any);
    if (args.body === null && needBody) return undefined;
    const parameters = needBody ? { ...args, body: JSON.stringify(args.body) } : { method: args.method }
    return await fetch(url, { ...parameters })
  }

  React.useEffect(() => {
    const callFunc = async () => {
      try {
        const res = await gofetch(url, { method, body, options });
        if (!res.ok) throw new Error(`Request failed with ${res.status} status`);
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
