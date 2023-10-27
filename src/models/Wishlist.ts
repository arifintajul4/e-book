import mongoose from "mongoose"

export interface Wishlists extends mongoose.Document {
  book_id: string
  author: string
  title: string
  image_url: string
  rating: number
}

const WishlistSchema = new mongoose.Schema<Wishlists>(
  {
    book_id: {
      type: String,
    },
    author: {
      type: String,
    },
    title: {
      type: String,
    },
    image_url: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Wishlists ||
  mongoose.model<Wishlists>("Wishlists", WishlistSchema)
