import { VehicleRepository } from "src/vehicles/domain/vehicle.repository";
import { CreateVehicleDto } from "./create-vehicle.dto";
import { PrimitiveVehicle, Vehicle } from "src/vehicles/domain/vehicle";
import { injectable } from "src/shared/dependency-injection/injectable";

@injectable()
export class CreateVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(dto: CreateVehicleDto): Promise<{ vehicle: PrimitiveVehicle }> {
    const vehicle = Vehicle.create(dto);
    await this.vehicleRepository.create(vehicle);
    return { vehicle: vehicle.toValue() };
  }

}