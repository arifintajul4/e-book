import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@libs/dbConnect"
import Wishlist from "@models/Wishlist"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  await dbConnect()
  switch (method) {
    case "GET":
      const wishlistItems = await Wishlist.find()
      return res.json(wishlistItems)
    case "POST":
      const { book_id } = req.body
      const item = await Wishlist.findOne({ book_id })
      if (item) {
        return res.status(400).json({ error: "Book already in the wishlist" })
      }
      const newItem = new Wishlist(req.body)
      await newItem.save()
      return res.json({ success: true, message: "Book added to the wishlist" })
    default:
      return res.status(405).json({ error: "Method not allowed" })
  }
}
