import fetch from "node-fetch";
import { api_url } from "../../config";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export async function post(req, res) {
  try {
    const { email, password } = req.body;

    const result = await fetch(`${api_url}/auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });
    console.log(result);
    const parsed = await result.json();

    if (typeof parsed.error !== "undefined") {
      throw new Error(parsed.error);
    }

    req.session.token = parsed.token;
    res.end(JSON.stringify({ token: parsed.token }));
  } catch (error) {
    res.end(JSON.stringify({ error: error.message }));
  }
}
