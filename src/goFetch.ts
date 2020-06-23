import { Arguments } from "./utils/interface";

const goFetch = async (url: string, args: Arguments): Promise<any> => {
  const { method, options, body } = args;

  const httpVerb: string | undefined = args?.method?.toLowerCase();

  if (!httpVerb) throw new Error("Method must be provide");
  const needBody: boolean = ["put", "post"].includes(httpVerb);

  if (args.body === null && needBody) return undefined;

  const parameters = needBody
    ? { method, body: JSON.stringify(body), ...options }
    : { method, ...options };

  return await fetch(url, { ...parameters });
};

export default goFetch;
