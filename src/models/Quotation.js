import mongoose from 'mongoose';

const QuotationItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  notes: {
    type: String,
    default: '',
  },
});

const QuotationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please provide your company name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    items: [QuotationItemSchema],
    attachments: {
      type: [String], // URLs of uploaded tech packs or sketches
      default: [],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'responded', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Quotation || mongoose.model('Quotation', QuotationSchema);
