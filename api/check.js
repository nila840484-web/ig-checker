import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const username = req.query.username?.trim();
    if (!username) {
      return res.status(400).json({ error: "Username required" });
    }

    const igURL = `https://www.instagram.com/${username}/`;
    const response = await fetch(igURL, { method: "GET" });

    if (response.status === 200) {
      return res.status(200).json({ username, status: "exists" });
    } else if (response.status === 404) {
      return res.status(200).json({ username, status: "not-found" });
    } else {
      return res.status(200).json({ username, status: "unknown" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
