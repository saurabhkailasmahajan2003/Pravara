import mongoose from 'mongoose';

const analyticsSnapshotSchema = new mongoose.Schema(
  {
    period: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalSales: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    orders: {
      type: Number,
      default: 0,
    },
    newCustomers: {
      type: Number,
      default: 0,
    },
    returningCustomers: {
      type: Number,
      default: 0,
    },
    visitors: {
      type: Number,
      default: 0,
    },
    productViews: {
      type: Number,
      default: 0,
    },
    addToCart: {
      type: Number,
      default: 0,
    },
    checkout: {
      type: Number,
      default: 0,
    },
    completedOrders: {
      type: Number,
      default: 0,
    },
    avgOrderValue: {
      type: Number,
      default: 0,
    },
    lifetimeValue: {
      type: Number,
      default: 0,
    },
    retentionRate: {
      type: Number,
      default: 0,
    },
    churnRate: {
      type: Number,
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

export default mongoose.model('AnalyticsSnapshot', analyticsSnapshotSchema);

