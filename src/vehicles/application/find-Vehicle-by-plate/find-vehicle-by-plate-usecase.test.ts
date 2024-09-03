import { VehicleNotFoundException } from "src/vehicles/domain/vehicle-not-found.exception";
import { findVehicleByPlateUseCase } from "./find-vehicle-by-plate.use-case"
import { Vehicle } from "src/vehicles/domain/vehicle";

describe("findVehicleByPLate", ()=>{
    let useCase: findVehicleByPlateUseCase;
   
    const mockVehicleRepository = {
        getByPlate: jest.fn(),
        findAll: jest.fn(),
    };
    
    beforeEach(()=>{
        useCase = new findVehicleByPlateUseCase(mockVehicleRepository as any)
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return a vehicle if exist the plate",async ()=>{
        const mockVehicle = Vehicle.create({
            brand: 'Toyota',
            model: 'Corolla',
            year: 2020,
            km: 5000,
            plate: 'ABC123',
            color: 'Red',
        });
        
        (mockVehicleRepository.getByPlate as jest.Mock).mockResolvedValue(mockVehicle)

        const result = await useCase.execute({plate:"ABC123"})

        expect(mockVehicleRepository.getByPlate).toHaveBeenCalledWith('ABC123')
        expect(result).toEqual({vehicle:mockVehicle.toValue()})
    })

    it("should throw an exception if the plate is not exist", async ()=> {
        (mockVehicleRepository.getByPlate as jest.Mock).mockResolvedValue(null)

        await expect(useCase.execute({plate:"ABC123"})).rejects.toThrow(VehicleNotFoundException)
        expect(mockVehicleRepository.getByPlate).toHaveBeenCalledWith("ABC123")
    })
})