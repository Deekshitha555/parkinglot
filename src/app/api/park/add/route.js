import { NextResponse } from "next/server";
import connectToDB from "@/utils/connecttodb";
import Parking from "@/models/Parking";

export default async function POST(req, res) {
  // Connect to the database
  await connectToDB();
    try {
      const { ownerName, vehicleName, vehicleNumber, entryDate, exitDate } = await req.json();

      // Validate the input
      if (!ownerName || !vehicleName || !vehicleNumber || !entryDate || !exitDate) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Create a new parking record
      const parking = new Parking({
        ownerName,
        vehicleName,
        vehicleNumber,
        entryDate: new Date(entryDate),
        exitDate: new Date(exitDate),
      });

      // Save the record to the database
      await parking.save();

      return new Response(JSON.stringify({ message: "Parking record added successfully", parkingRecord }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error adding parking record:", error);
  
      // Return an error response
      return new Response(JSON.stringify({ error: "Failed to add parking record" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
