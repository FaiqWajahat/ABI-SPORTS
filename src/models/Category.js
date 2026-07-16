import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a category slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    image: {
      type: String, // URL to category image
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
