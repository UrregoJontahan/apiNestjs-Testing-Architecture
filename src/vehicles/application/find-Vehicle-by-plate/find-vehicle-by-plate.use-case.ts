import { Injectable } from "@nestjs/common";
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle";
import { VehicleNotFoundException } from "src/vehicles/domain/vehicle-not-found.exception";
import { VehicleRepository } from "src/vehicles/domain/vehicle.repository";
import {findVehicleByPlateDto } from "src/vehicles/application/find-Vehicle-by-plate/find-vehicle-by-plate.dto"
import { RedisPort } from "src/vehicles/infrastructure/redis/redis.port.dto";

@Injectable()
export class findVehicleByPlateUseCase{
    constructor( 
        private readonly vehicleRepository:VehicleRepository,
        private readonly redis: RedisPort,
    ) {}

    async execute( findVehicleByPlateDto: findVehicleByPlateDto): Promise <{ vehicle: PrimitiveVehicle }>{

        const cachedVehicle = await this.redis.get(`vehicle: ${findVehicleByPlateDto.plate}`)
        
        if(cachedVehicle) {
            return { vehicle: cachedVehicle }
        }

        const vehicle = await this.vehicleRepository.getByPlate(findVehicleByPlateDto.plate)

        if(!vehicle){
            throw new VehicleNotFoundException(findVehicleByPlateDto.plate)
        }

        await this.redis.set(`vehicle: ${findVehicleByPlateDto.plate}`, vehicle.toValue())
        
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