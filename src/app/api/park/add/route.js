import connectToDB from "@/utils/connecttodb";
import Parking from "@/models/Parking";
import { cors } from "../../../../libs/cors";
const PARKING_LIMIT = 5; // Define the parking limit
const HOURLY_RATE = 50; // Define hourly rate for parking

export async function POST(req) {
   await cors(req, new Response());
  // Connect to the database
  await connectToDB();

  try {
    const { ownerName, vehicleName, vehicleNumber, entryDate, exitDate } = await req.json();

    // Validate the input
    if (!ownerName || !vehicleName || !vehicleNumber || !entryDate || !exitDate) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if the parking limit is reached
    const currentCount = await Parking.countDocuments();
    if (currentCount >= PARKING_LIMIT) {
      return new Response(
        JSON.stringify({ error: "Parking space is full. Please wait for some time." }),
        {
          status: 403, // Forbidden
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Calculate parking fee
    const durationInMilliseconds = new Date(exitDate) - new Date(entryDate);
    const durationInHours = Math.ceil(durationInMilliseconds / (1000 * 60 * 60));
    const parkingFee = durationInHours * HOURLY_RATE;
    console.log(parkingFee)
    // Create a new parking record
    const parking = new Parking({
      ownerName,
      vehicleName,
      vehicleNumber,
      entryDate: new Date(entryDate),
      exitDate: new Date(exitDate),
      parkingFee, // Save the calculated fee
    });

    // Save the record to the database
    await parking.save();

    return new Response(
      JSON.stringify({
        message: "Parking record added successfully",
        parking,
        fee: parkingFee, // Return the fee in the response
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding parking record:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ error: "Failed to add parking record" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
