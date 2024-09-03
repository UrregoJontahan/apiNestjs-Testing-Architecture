import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator"

export class CreateVehicleHttpDto {
    
    @IsString()
    @IsNotEmpty()
    brand:string

    @IsString()
    @IsNotEmpty()
    model:string

    @IsNotEmpty()
    @IsNumber()
    @Min(1950,{message: "el año no puede ser anterior a 1950"})
    year:number
    
    @IsNotEmpty()
    @IsNumber()
    km:number

    @IsNotEmpty()
    @IsString()
    plate:string

    @IsNotEmpty()
    @IsString()
    color:string

}