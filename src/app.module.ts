import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicles/infrastructure/vehicle.module';
import { SQSService } from './sqs.services';

@Module({
  imports:[VehicleModule],
  providers:[SQSService],
  exports:[SQSService],
})
export class AppModule {}
    