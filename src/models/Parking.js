import mongoose from "mongoose";

const ParkingSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  vehicleName: { type: String, required: true },
  vehicleNumber: { type: String, required: true,unique:true },
  entryDate: { type: Date, required: true },
  exitDate: { type: Date, required: true },
  parkingFee: Number,
  createdAt: { type: Date, default: Date.now },
});

const Parking = mongoose.models.Parking || mongoose.model("Parking", ParkingSchema);
export default Parking;
