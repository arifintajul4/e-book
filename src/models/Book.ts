import mongoose from 'mongoose';

export interface Books extends mongoose.Document {
  book_id: string;
  author: string;
  title: string;
  image_url: string;
}

const BookSchema = new mongoose.Schema<Books>(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Book ||
  mongoose.model<Books>('Book', BookSchema);
