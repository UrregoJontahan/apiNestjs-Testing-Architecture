import  request from "supertest"
import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import { CreateVehicleController } from "./create-vehicle.controller"
import { CreateVehicleUseCase } from "src/vehicles/application/create-vehicle-use-case/create-vehicle"
import { CreateVehicleHttpDto } from "./create-vehicle.http-dto"
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle"

const mockCreateVehicleUseCase = {
    execute: jest.fn().mockResolvedValue({
        vehicle: {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2021,
            km: 15000,
            plate: 'ABC123',
            color: 'Red',
          },
    })
}

describe("CreateVehicleController", ()=> {
    let app:INestApplication;

    beforeAll(async ()=> {
        const moduleRef:TestingModule = await Test.createTestingModule({
            controllers: [CreateVehicleController],
            providers:[
                {provide: CreateVehicleUseCase, useValue:mockCreateVehicleUseCase}
            ]
        }).compile()

        app = moduleRef.createNestApplication()
        await app.init()
    })

    it("POST createVehicle", async()=> {
        const createVehicleDto: CreateVehicleHttpDto = {
            brand: 'Toyota',
            model: 'Corolla',
            year: 2021,
            km: 15000,
            plate: 'ABC123',
            color: 'Red',
        }

        const response = await request(app.getHttpServer())
        .post("/vehicles")
        .send(createVehicleDto)
        .expect(201)

        expect(mockCreateVehicleUseCase.execute).toHaveBeenLastCalledWith(createVehicleDto)
        expect(mockCreateVehicleUseCase.execute).toHaveBeenCalledTimes(1);
    })

    afterAll(async ()=> {
        await app.close()
    })
})