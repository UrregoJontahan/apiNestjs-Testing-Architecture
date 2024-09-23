import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { findVehicleByPlateController } from './find-vehicle-by-plate.controller';
import { findVehicleByPlateUseCase } from 'src/vehicles/application/find-Vehicle-by-plate/find-vehicle-by-plate.use-case';
import { PrimitiveVehicle } from 'src/vehicles/domain/vehicle';

describe("findVehicleByPlateController", ()=> {
    let app: INestApplication;
    let useCase: findVehicleByPlateUseCase;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          controllers: [findVehicleByPlateController],
          providers: [
            {
              provide: findVehicleByPlateUseCase,
              useValue: {
                findAll: jest.fn(),
                execute: jest.fn()
              },
            },
          ],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await app.init();
        useCase = moduleFixture.get<findVehicleByPlateUseCase>(findVehicleByPlateUseCase);
      });

      it("Get /vehicles", ()=> {
        const expectedVehicles = [{plate: "ABC123", model: "sedan"}];
        (useCase.findAll as jest.Mock).mockResolvedValue(expectedVehicles)

        return request(app.getHttpServer())
            .get("/vehicles")
            .expect(200)
            .expect(expectedVehicles)
      })

      afterEach(async () => {
        await app.close();
      });

      it("Get /vehicles:plates should return the corresponding vehicle", async()=> {
         const plate= "ABC123";
         const expectedVehicle: PrimitiveVehicle = { 
            plate:"ABC123", 
            model:"sedan", 
            brand:"chevrolet", 
            year:2004,
            km:0,
            color:"black"
        };

         (useCase.execute as jest.Mock).mockResolvedValue({ vehicle: expectedVehicle })

         await request(app.getHttpServer())
         .get(`/vehicles/${plate}`)
         .expect(200)
         .expect({ vehicle: expectedVehicle });
      })
})