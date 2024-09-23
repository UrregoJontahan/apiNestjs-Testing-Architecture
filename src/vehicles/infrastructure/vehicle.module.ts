import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { CreateVehicleController } from "./http-api/create-vehicle/create-vehicle.controller";
import { CreateVehicleUseCase } from "../application/create-vehicle-use-case/create-vehicle";
import { MongoVehicleRepository } from "./repositories/MongoVehicleRepository";
import { VehicleSchema, Vehicle } from "./schema/vehicle.schema";
import { VehicleRepository } from "../domain/vehicle.repository";
import { findVehicleByPlateController } from "./find-vehicle-by-plate/find-vehicle-by-plate.controller";
import { findVehicleByPlateUseCase } from "../application/find-Vehicle-by-plate/find-vehicle-by-plate.use-case";
import { SQSService } from "src/sqs.services";
import { RedisAdapter } from "./redis/redis.adapter";
import { RedisPort } from "./redis/redis.port.dto";

@Module({
    imports:[MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])],
    controllers:[CreateVehicleController, findVehicleByPlateController],
    providers:[ CreateVehicleUseCase, MongoVehicleRepository, findVehicleByPlateUseCase, CreateVehicleUseCase, SQSService,
        {
            provide: VehicleRepository,
            useExisting: MongoVehicleRepository
        },{
            provide: "RedisPort",
            useClass:RedisAdapter
        }
    ],
    exports: [ CreateVehicleUseCase, findVehicleByPlateUseCase, "RedisPort"]

})
export class VehicleModule {} 