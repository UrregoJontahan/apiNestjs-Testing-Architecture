import { Module } from '@nestjs/common';
import { VehicleModule } from './vehicles/infrastructure/vehicle.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[VehicleModule,  MongooseModule.forRoot('mongodb://127.0.0.1:27017/Api-Carts')]
  //127.0.0.1:27017 uri de conexion local mongodb://127.0.0.1:27017/Api-Carts || mongodb://mongo:27017/Api-Carts mongodb://host.docker.internal:27017/Api-Carts
})
export class AppModule {}
    