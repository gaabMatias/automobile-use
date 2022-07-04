import { Schema, Document, model, Model } from 'mongoose';

export interface ICarInterface {
  color: string;
  licensePlate: string;
  brand: string;
}

export type CarDocument = Document & ICarInterface;

type CarModel = Model<CarDocument>;

const CarSchema = new Schema(
  {
    _id: {
      type: String,
    },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Car = model<CarDocument, CarModel>(
  'Car',
  CarSchema,
  'Car',
);
