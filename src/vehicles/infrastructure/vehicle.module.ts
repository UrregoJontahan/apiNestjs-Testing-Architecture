// src/vehicles/infrastructure/vehicle.module.ts

import { Module } from '@nestjs/common';
import { CreateVehicleController } from './http-api/create-vehicle/create-vehicle.controller';
import { CreateVehicleUseCase } from '../application/create-vehicle-use-case/create-vehicle';
import { findVehicleByPlateController } from './find-vehicle-by-plate/find-vehicle-by-plate.controller';
import { findVehicleByPlateUseCase } from '../application/find-Vehicle-by-plate/find-vehicle-by-plate.use-case';
// import { SQSService } from 'src/sqs.services';
// import { ElasticCacheAdapter } from './redis/redis.adapter';
import { DynamoVehicleRepository } from './repositories/Dynamo.repository';
import { DynamoDBModule } from '../../shared/dynamo.module'; // Importar el módulo de DynamoDB
import { VehicleRepository } from '../domain/vehicle.repository';

@Module({
  imports: [DynamoDBModule], // Importar el módulo de DynamoDB
  controllers: [CreateVehicleController, findVehicleByPlateController],
  providers: [
    CreateVehicleUseCase,
    findVehicleByPlateUseCase,
    // SQSService,
    // ElasticCacheAdapter,
    // {
    // //   provide: 'CachePort',
    // //   useExisting: ElasticCacheAdapter,
    // },
    {
      provide: "VehicleRepository",
      useClass: DynamoVehicleRepository,
    },
  ],
  exports: [CreateVehicleUseCase, findVehicleByPlateUseCase, 'CachePort', "VehicleRepository"],
})
export class VehicleModule {}

