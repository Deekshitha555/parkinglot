import connectToDB from "@/utils/connecttodb";
import Parking from "@/models/Parking";

async function getParkingRecords() {
  try {
    // Fetch all parking records
    const parkingRecords = await Parking.find();
    return { success: true, parkingRecords };
  } catch (error) {
    console.error("Error fetching parking records:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function GET(req, res) {
  // Connect to the database
  await connectToDB();
  const result = await getParkingRecords();
  console.log(result);
  if (result.success) {
    return new Response(
        JSON.stringify({
          message: "Parking records retrieved successfully",
          parkingRecords: result.parkingRecords,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
  } else {
    return res.status(500).json({ error: result.error });
  }
}
