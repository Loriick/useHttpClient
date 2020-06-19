import { Arguments } from "./utils/interface";

const goFetch = async (url: string, args: Arguments): Promise<any> => {
  const httpVerb: string | undefined = args?.method?.toLowerCase();
  if (!httpVerb) throw new Error("Method must be provide");
  const needBody: boolean = ["put", "post"].includes(httpVerb as any);
  if (args.body === null && needBody) return undefined;
  const parameters = needBody
    ? { ...args, body: JSON.stringify(args.body) }
    : { method: args.method };
  return await fetch(url, { ...parameters });
};

export default goFetch;
