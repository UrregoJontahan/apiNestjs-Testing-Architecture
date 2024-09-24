import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicles/infrastructure/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SQSService } from './sqs.services';

@Module({
  imports:[VehicleModule,  MongooseModule.forRoot('mongodb://3.17.153.163:27017/Api-Carts')],
  providers:[SQSService],
  exports:[SQSService],
})
export class AppModule {}
    