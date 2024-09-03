import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  km: number;
 
  @Prop({ required: true, unique: true })
  plate: string;

  @Prop({ required: true })
  color: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
