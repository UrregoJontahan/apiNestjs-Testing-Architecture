import { Controller, Body, Post } from "@nestjs/common";
import { CreateVehicleUseCase } from "src/vehicles/application/create-vehicle-use-case/create-vehicle";
import { CreateVehicleHttpDto } from "./create-vehicle.http-dto";
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle";
import { SQSService } from "src/sqs.services";

@Controller("vehicles")
export class CreateVehicleController {
    constructor(
        private createVehicleUseCase: CreateVehicleUseCase,
        private sqsService: SQSService
    ) {}

    @Post()
    async create(
        @Body() createVehicleHttpDto: CreateVehicleHttpDto
    ): Promise<{ vehicle: PrimitiveVehicle }> {
        const vehicle = await this.createVehicleUseCase.execute({
            brand: createVehicleHttpDto.brand,
            model: createVehicleHttpDto.model,
            year: createVehicleHttpDto.year,
            km: createVehicleHttpDto.km,
            plate: createVehicleHttpDto.plate,
            color: createVehicleHttpDto.color,
        });

        const messageBody = JSON.stringify({
            action : "create",
            vehicle 
        })
        await this.sqsService.sendMessage(messageBody)

        return vehicle 
    }
} 
