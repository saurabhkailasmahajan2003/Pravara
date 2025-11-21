import mongoose from 'mongoose';

const deadlineSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
    },
    month: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    team: {
      type: String,
      trim: true,
      default: '',
    },
    left: {
      type: Number,
      min: 0,
      default: 0,
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

export default mongoose.model('Deadline', deadlineSchema);
