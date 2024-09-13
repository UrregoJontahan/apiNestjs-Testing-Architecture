import { Controller, Get, Param } from "@nestjs/common";
import { findVehicleByPlateUseCase } from "src/vehicles/application/find-Vehicle-by-plate/find-vehicle-by-plate.use-case";
import { findVehicleByPlateHttpDto } from "./find-vehicle-by-plate.http.dto";
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle";
import { SQSService } from "src/sqs.services";

@Controller()
export class findVehicleByPlateController {
    constructor(
        private readonly findVehicleByPlateUseCase: findVehicleByPlateUseCase,
        private sqsService : SQSService
    ) {}

    @Get("/")
    async findAll() {
        return this.findVehicleByPlateUseCase.findAll();
    }

    @Get("/vehicles/:plate")
    async run(@Param() params: findVehicleByPlateHttpDto): Promise<{vehicle: PrimitiveVehicle}> {
         return await this.findVehicleByPlateUseCase.execute({
            plate: params.plate
         })
    }
} 