import { Controller, Body, Post } from "@nestjs/common";
import { CreateVehicleUseCase } from "src/vehicles/application/create-vehicle-use-case/create-vehicle";
import { CreateVehicleHttpDto } from "./create-vehicle.http-dto";
import { PrimitiveVehicle } from "src/vehicles/domain/vehicle";

@Controller("vehicles")
export class CreateVehicleController {
    constructor(private createVehicleUseCase: CreateVehicleUseCase) {}

    @Post()
    async run(
        @Body() createVehicleHttpDto: CreateVehicleHttpDto
    ): Promise<{ vehicle: PrimitiveVehicle }> {
        return await this.createVehicleUseCase.execute({
            brand: createVehicleHttpDto.brand,
            model: createVehicleHttpDto.model,
            year: createVehicleHttpDto.year,
            km: createVehicleHttpDto.km,
            plate: createVehicleHttpDto.plate,
            color: createVehicleHttpDto.color,
        });
    }
}
