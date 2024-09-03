import {IsNotEmpty, IsString} from "class-validator"

export class findVehicleByPlateHttpDto {
    
    @IsNotEmpty()
    @IsString()
    plate:string
} 