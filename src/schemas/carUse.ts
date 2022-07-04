import { Schema, Document, model, Model } from 'mongoose';

export interface ICarUseInterface {
  reason: string;
  car: string;
  driver: string;
  startDate?: string;
  endDate?: string;
}

export type CarUseDocument = Document & ICarUseInterface;

type CarUseModel = Model<CarUseDocument>;

const CarUseSchema = new Schema(
  {
    id: {
      type: String,
      unique: true
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    reason: {
      type: String,
      required: true,
    },
    car: {
      type: String,
      required: true,
      ref: 'Car',
    },
    driver: {
      type: String,
      required: true,
      ref: 'Driver',
    },
  },
);

export const CarUse = model<CarUseDocument, CarUseModel>(
  'CarUse',
  CarUseSchema,
  'CarUse',
);
