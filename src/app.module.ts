import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicles/infrastructure/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SQSService } from './sqs.services';
import { AppController } from './app.controller';

@Module({
  imports:[VehicleModule,  MongooseModule.forRoot('mongodb://3.21.114.56:27017/Api-Carts')],
  providers:[SQSService],
  controllers: [AppController],
  exports:[SQSService],
})
export class AppModule {}
    