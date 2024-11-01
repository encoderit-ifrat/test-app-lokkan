// pages/api/check-session.js
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    // Session is invalid or missing
    res.status(401).json({ message: "Session expired" });
  } else {
    res.status(200).json({ message: "Session valid" });
  }
}
