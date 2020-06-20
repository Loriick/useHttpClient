type Method = "GET" | "POST" | "PUT" | "DELETE";
export interface Arguments {
  method?: Method;
  body?: object;
  options?: object;
  onRender?: boolean;
}
