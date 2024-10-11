// src/vehicles/infrastructure/vehicle.module.ts

import { Module } from "@nestjs/common";
import { CreateVehicleController } from "./http-api/create-vehicle/create-vehicle.controller";
import { CreateVehicleUseCase } from "../application/create-vehicle-use-case/create-vehicle";
import { findVehicleByPlateController } from "./find-vehicle-by-plate/find-vehicle-by-plate.controller";
import { findVehicleByPlateUseCase } from "../application/find-Vehicle-by-plate/find-vehicle-by-plate.use-case";
import { SQSService } from "src/sqs.services";
import { ElasticCacheAdapter } from "./redis/redis.adapter";
import { DynamoVehicleRepository } from "./repositories/Dynamo.repository"; // Repositorio de DynamoDB
import { dynamoDbDocumentClient } from "./config/dynamodb.config"; // Cliente DynamoDB configurado

@Module({
  imports: [],
  controllers: [CreateVehicleController, findVehicleByPlateController],
  providers: [
    CreateVehicleUseCase,
    findVehicleByPlateUseCase,
    SQSService,
    ElasticCacheAdapter,
    {
      provide: 'CachePort',
      useExisting: ElasticCacheAdapter,
    },
    {
      provide: 'DYNAMODB_CLIENT', // Proveedor del cliente DynamoDB
      useValue: dynamoDbDocumentClient,
    },
    {
      provide: 'VehicleRepository', // Usar un identificador de cadena en lugar de la interfaz
      useClass: DynamoVehicleRepository,
    },
  ],
  exports: [
    CreateVehicleUseCase,
    findVehicleByPlateUseCase,
    'CachePort',
    'VehicleRepository', // Exportar el token del repositorio
  ],
})
export class VehicleModule {}
