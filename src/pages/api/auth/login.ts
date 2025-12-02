import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const backend = process.env.NEXT_PUBLIC_API + "/api/authentication/login";

    const response = await axios.post(
      backend,
      req.body,
      {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      }
    );

    return res.status(200).json(response.data);
  } catch (err) {
    const e = err as AxiosError;
    console.log(e.response?.data);
    return res.status(500).json({ error: "Proxy login error" });
  }
}
