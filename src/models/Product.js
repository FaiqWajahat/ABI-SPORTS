import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a product slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    images: {
      type: [String],
      default: [],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a main category'],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    minOrderQuantity: {
      type: Number,
      default: 50, // Standard MOQ is 50 as in Limton Corp
    },
    specifications: {
      material: { type: String, default: '' },       // e.g. "100% Polyester / Lycra Blend"
      weight: { type: String, default: '' },         // e.g. "180 GSM"
      sizing: { type: String, default: 'S - XXL' },
      customization: { type: String, default: '' },  // e.g. "Embroidery, Sublimation, Screen Printing"
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'archive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
