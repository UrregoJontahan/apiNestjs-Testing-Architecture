import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicles/infrastructure/vehicle.module';
import { SQSService } from './sqs.services';
import { DynamoVehicleRepository } from './vehicles/infrastructure/repositories/Dynamo.repository';

@Module({
  imports:[VehicleModule],
  providers:[SQSService, DynamoVehicleRepository],
  exports:[SQSService],
})
export class AppModule {}
    