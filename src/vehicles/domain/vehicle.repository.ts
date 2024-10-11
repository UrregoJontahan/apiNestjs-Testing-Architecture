// src/vehicles/domain/vehicle.repository.ts

import { Vehicle } from './vehicle';

export interface VehicleRepository {
  create(vehicle: Vehicle): Promise<void>;
  findById(vehicleId: string): Promise<Vehicle | null>; 
  findAll(): Promise<Vehicle[]>;                      
  delete(vehicleId: string): Promise<void>;           
  getByPlate(plate: string): Promise<Vehicle | null>; 
}
