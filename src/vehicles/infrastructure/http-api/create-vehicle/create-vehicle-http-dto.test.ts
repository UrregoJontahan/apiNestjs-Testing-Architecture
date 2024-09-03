import { CreateVehicleHttpDto } from "./create-vehicle.http-dto";
import { validate } from "class-validator";

describe("CreateVehicleHttpDto", ()=> {
    let dto: CreateVehicleHttpDto;

    beforeEach(()=> {
        dto = new CreateVehicleHttpDto();
        dto.brand = 'Toyota';
        dto.model = 'Corolla';
        dto.year = 2021;
        dto.km = 15000;
        dto.plate = 'ABC123';
        dto.color = 'Red';
    })
    it("must be valid if every data is correct", async ()=> {
        const errors = await validate(dto)
        expect(errors.length).toBe(0)
    })

    //brand
    it("should throw error if the brand is empty", async ()=> {
        dto.brand = "";
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isNotEmpty).toBeDefined()
    })

    it("should throw error if the brand is not string", async ()=> {
        dto.brand = 1234 as unknown as string;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isString).toBeDefined()
    })

    //model
    it("should throw error if the model is empty", async ()=> {
        dto.model = "";
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isNotEmpty).toBeDefined()
    })

    it("should throw error if the model is not string", async ()=> {
        dto.model = 1234 as unknown as string;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isString).toBeDefined()
    })

    //year
    it("should throw error if the year is menor to 1950", async ()=> {
        dto.year = 0;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.min).toBeDefined()
        expect(error[0].constraints?.min).toBe("el año no puede ser anterior a 1950")
    })

    it("should throw error if the year is not number", async ()=> {
        dto.year = "2021" as unknown as number;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isNumber).toBeDefined()
    })

    //Km
    it("should throw error if the km is not number", async ()=> {
        dto.km = "2021" as unknown as number;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isNumber).toBeDefined()
    })

    //plate
    it("should throw error if the plate is empty", async ()=> {
        dto.plate = "";
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isNotEmpty).toBeDefined()
    })

    it("should throw error if the plate is not string", async ()=> {
        dto.plate = 1234 as unknown as string;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isString).toBeDefined()
    })

    //color
    it("should throw error if the color is empty", async ()=> {
        dto.color = "";
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isNotEmpty).toBeDefined()
    })

    it("should throw error if the color is not string", async ()=> {
        dto.color = 1234 as unknown as string;
        const error = await validate(dto)
        expect(error.length).toBeGreaterThan(0);
        expect(error[0].constraints?.isString).toBeDefined()
    })
})