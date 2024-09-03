import { CreateVehicleUseCase } from "./create-vehicle";
import { VehicleRepository } from "src/vehicles/domain/vehicle.repository";
import { CreateVehicleDto } from "./create-vehicle.dto";
import { Vehicle } from "src/vehicles/domain/vehicle";


describe("CreateVehicleUseCase", ()=> {
    let createVehicleUseCase: CreateVehicleUseCase;
    let mockVehicleRepository : jest.Mocked<VehicleRepository>

    beforeEach(()=>{
        mockVehicleRepository = {
            create:jest.fn(),
        } as unknown as jest.Mocked<VehicleRepository>;

        createVehicleUseCase = new CreateVehicleUseCase(mockVehicleRepository);
    })

    afterEach(()=> {
        jest.clearAllMocks()
    })

    it("should create a new car and store it in the repository", async()=> {
        const dto: CreateVehicleDto ={
            brand: 'Toyota',
            model: 'Corolla',
            year: 2021,
            km: 15000,
            plate: 'ABC123',
            color: 'Red',
        }

        const vehicle = Vehicle.create(dto)

        mockVehicleRepository.create.mockResolvedValue()

        const result = await createVehicleUseCase.execute(dto);

        expect(mockVehicleRepository.create).toHaveBeenCalledWith(vehicle)
        expect(result).toEqual({vehicle:vehicle.toValue()})
    })
})