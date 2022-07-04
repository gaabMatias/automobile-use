import { Schema, Document, model, Model } from 'mongoose';

export interface IDriverInterface {
  id: string;
  name: string;
}

export type DriverDocument = Document & IDriverInterface;

type DriverModel = Model<DriverDocument>;

const DriverSchema = new Schema(
  {
    _id: {
      type: String,
    },
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Driver = model<DriverDocument, DriverModel>(
  'Driver',
  DriverSchema,
  'Driver',
);
