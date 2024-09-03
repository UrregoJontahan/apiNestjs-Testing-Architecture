import { Vehicle } from "./vehicle";

export abstract class VehicleRepository{

    abstract create(vehicle: Vehicle): Promise<void>
    abstract getByPlate(plate: string) : Promise<Vehicle | null>
    abstract findAll(): Promise<Vehicle[]>;
}     


