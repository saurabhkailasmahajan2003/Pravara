import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    left: {
      type: Number,
      min: 0,
      default: 0,
    },
    type: {
      type: String,
      enum: ['public', 'national', 'observance', 'company'],
      default: 'public',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

export default mongoose.model('Holiday', holidaySchema);
