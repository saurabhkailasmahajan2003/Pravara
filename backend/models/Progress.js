import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    percent: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    range: {
      type: String,
      default: '',
      trim: true,
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

progressSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({ percent: 49, range: 'Jan 23-29, 2023' });
  }
  return doc;
};

export default mongoose.model('Progress', progressSchema);

