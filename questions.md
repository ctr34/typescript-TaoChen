# Regarding the interface design
Can we define a Vehicle class in current circumstance instead of implementing a Vehicle interface, so that we can simple pass a runtime input(vehicle type) as a property of a Vehicle instence, see details in [vehicleClass](./vehicleClass.ts). Then But of course we can benefit from the good type checking and code reusability when the app is getting bigger and bigger.