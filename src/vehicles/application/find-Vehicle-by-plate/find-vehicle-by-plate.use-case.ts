import { Injectable } from "@nestjs/common";
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle";
import { VehicleNotFoundException } from "src/vehicles/domain/vehicle-not-found.exception";
import { VehicleRepository } from "src/vehicles/domain/vehicle.repository";
import {findVehicleByPlateDto } from "src/vehicles/application/find-Vehicle-by-plate/find-vehicle-by-plate.dto"

@Injectable()
export class findVehicleByPlateUseCase{
    constructor( 
        private readonly vehicleRepository:VehicleRepository,
    ) {}

    async execute( findVehicleByPlateDto: findVehicleByPlateDto): Promise <{ vehicle: PrimitiveVehicle }>{
        
        const vehicle = await this.vehicleRepository.getByPlate(findVehicleByPlateDto.plate)

        if(!vehicle){
            throw new VehicleNotFoundException(findVehicleByPlateDto.plate)
        }
        
        return {
            vehicle: vehicle.toValue()
        }
    
    }

    async findAll(): Promise<{ vehicles: PrimitiveVehicle[] }> {
        const vehicles = await this.vehicleRepository.findAll();
        return {
            vehicles: vehicles.map(vehicle => vehicle.toValue())
        };
    }
}