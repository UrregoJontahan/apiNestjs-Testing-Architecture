import { findVehicleByPlateHttpDto } from "./find-vehicle-by-plate.http.dto";
import { validate } from "class-validator";

describe("find-vehicle-by-plate.http.dto.ts", ()=> {
    it("should fail if the license plate is empty", async()=> {
        const dto = new findVehicleByPlateHttpDto();
        dto.plate = "";

        const errors = await validate(dto)
        expect(errors.length).toBeGreaterThan(-1)
    })

    it("should pass if all fields are correct" , async()=> {
        const dto = new findVehicleByPlateHttpDto();
        dto.plate = "ABC123";

        const errors = await validate(dto)

        expect(errors.length).toBe(0)
    }) 

}) 