import { findVehicleByPlateDto } from "./find-vehicle-by-plate.dto";

describe("findVehicleByPlateDto" , ()=> {
    
    it(" should to be correct if plate is string", ()=> {
            const dto: findVehicleByPlateDto = {plate: "abc123"}
            expect(typeof dto.plate).toBe("string")
        })
    
        it(" should fail if plate is not string", ()=> {
            const dto: any = {plate: 425123}
            expect(typeof dto.plate).not.toBe("string")
        })
})