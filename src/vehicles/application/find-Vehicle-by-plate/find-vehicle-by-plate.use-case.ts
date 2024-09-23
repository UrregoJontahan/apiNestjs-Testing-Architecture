import { Inject, Injectable } from "@nestjs/common";
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle";
import { VehicleNotFoundException } from "src/vehicles/domain/vehicle-not-found.exception";
import { VehicleRepository } from "src/vehicles/domain/vehicle.repository";
import {findVehicleByPlateDto } from "src/vehicles/application/find-Vehicle-by-plate/find-vehicle-by-plate.dto"
import { RedisPort } from "src/vehicles/infrastructure/redis/redis.port.dto";

@Injectable()
export class findVehicleByPlateUseCase{
    constructor( 
        private readonly vehicleRepository:VehicleRepository,
        @Inject("CachePort") private readonly cache: RedisPort
    ) {}

    async execute( findVehicleByPlateDto: findVehicleByPlateDto): Promise <{ vehicle: PrimitiveVehicle }>{

        const cacheKey = `vehicle:${findVehicleByPlateDto.plate}`
        const cacheVehicle = await this.cache.get(cacheKey)

        if(cacheVehicle){
            console.log("se obtuvo desde la cache")
            return {
                vehicle: cacheVehicle
            }
        }
        
        const vehicle = await this.vehicleRepository.getByPlate(findVehicleByPlateDto.plate)

        if(!vehicle){
            throw new VehicleNotFoundException(findVehicleByPlateDto.plate)
        }

        await this.cache.set(cacheKey, vehicle.toValue())


        console.log("se almaceno en cache")
        
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