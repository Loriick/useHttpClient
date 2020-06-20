# @loriick/use-http-client

>

[![NPM](https://img.shields.io/npm/v/@loriick/use-http-client.svg)](https://www.npmjs.com/package/@loriick/use-http-client)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![.github/workflows/testandpublish.yml](https://github.com/Loriick/useHttpClient/workflows/.github/workflows/testandpublish.yml/badge.svg)

## Install

### npm

```bash
npm install --save @loriick/use-http-client
```

### yarn

```bash
yarn add @loriick/use-http-client
```

## Usage

### GET - method

```tsx
import React from "react";

import useHttpClient from "@loriick/use-http-client";

const GetExample = () => {
  const { data, status, error } = useHttpClient("http://myapi.fr/posts/");

  if (status === "pending") {
    return <p>Loading</p>;
  }

  if (status === "rejected") {
    return <p>{error.message}</p>;
  }
  return data.map((d) => <p key={d.id}>{d.title}</p>);
};
```

### POST - method

```tsx
import React, { useState } from "react";

import useHttpClient from "@loriick/use-http-client";

const PostExample = () => {
  const [title, setTitle] = useState("");

  const { data, status, error, executeRequest } = useHttpClient(
    "http://myapi.fr/posts/",
    {
      method: "POST",
      onRender: false,
      body: { title },
      options: {
        headers: {
          "Content-type": "application/json;",
        },
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    await executeRequest();
  };

  return (
    <form onSubmit={()=> handleSumit()}>
      <input
        name="title"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setvalue(e.target.value)
        }
        value={title}
        placeholder={Enter your title here}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

## License

MIT © [Loriick](https://github.com/Loriick)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
