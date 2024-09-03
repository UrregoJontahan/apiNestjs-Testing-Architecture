import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehicleRepository } from 'src/vehicles/domain/vehicle.repository';
import { VehicleDocument, Vehicle as VehicleSchema } from "../schema/vehicle.schema";
import { Vehicle } from "../../domain/vehicle";

export class MongoVehicleRepository extends VehicleRepository {
  constructor(
    @InjectModel(VehicleSchema.name) private vehicleModel: Model<VehicleDocument>,
  ) { 
    super();
  }

  async create(vehicle: Vehicle): Promise<void> {
    await this.vehicleModel.create(vehicle.toValue());
  }

  async findAll(): Promise<Vehicle[]> {
    const vehicles = await this.vehicleModel.find().exec();
    return vehicles.map(vehicleDocument => Vehicle.create(vehicleDocument.toObject()));
  }

  async getByPlate(plate: string): Promise<Vehicle | null> {
    const vehicleDocument = await this.vehicleModel.findOne({ plate }).exec();
    return vehicleDocument ? Vehicle.create(vehicleDocument.toObject()) : null;
  }
}

