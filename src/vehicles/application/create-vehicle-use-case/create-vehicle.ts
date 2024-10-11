import { Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from 'src/vehicles/domain/vehicle.repository';
import { CreateVehicleDto } from './create-vehicle.dto';
import { PrimitiveVehicle, Vehicle } from 'src/vehicles/domain/vehicle';

@Injectable() // Cambié el decorador a @Injectable()
export class CreateVehicleUseCase {
  // Usar @Inject() con el identificador de cadena 'VehicleRepository'
  constructor(
    @Inject('VehicleRepository') // Indicar a NestJS que se inyecte 'VehicleRepository' como token
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async execute(dto: CreateVehicleDto): Promise<{ vehicle: PrimitiveVehicle }> {
    const vehicle = Vehicle.create(dto);
    await this.vehicleRepository.create(vehicle);
    return { vehicle: vehicle.toValue() };
  }
}
