import connectToDB from "@/utils/connecttodb";
import Parking from "@/models/Parking";

export async function DELETE(request:Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Retrieve the ID from the URL query

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Parking record ID is required" }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Delete the parking record by its ID
    const result = await Parking.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "Parking record not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Parking record deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting parking record:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete parking record" }),
      { status: 500 }
    );
  }
}
