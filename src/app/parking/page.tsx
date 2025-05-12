"use client"
import { useEffect, useState } from "react";

interface ParkingRecord {
    _id: string;
    ownerName: string;
    vehicleName: string;
    vehicleNumber: string;
    entryDate: string;
    exitDate: string;
    parkingfee:string
  }
  
const ParkingRecords = () => {
  const [parkingRecords, setParkingRecords] = useState<ParkingRecord[]>([]);
  const [message, setMessage] = useState<string>("");
  // Fetch parking records from the API
 useEffect(() => {
    const fetchParkingRecords = async () => {
      try {
        const response = await fetch("/api/proxy", {
          method: "GET",
        });
        const data = await response.json();

        if (response.ok) {
          setParkingRecords(data.parkingRecords); // Ensure your proxy returns `parkingRecords`
        } else {
          setMessage(data.error || "Failed to fetch parking records.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching the records.");
        console.error("Error:", error);
      }
    };

    fetchParkingRecords();
  }, []);
  // Handle delete request
  const handleDelete = async (id: string) => {
    console.log(id)
    try {
      const response = await fetch(`/api/park/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Parking record deleted successfully!");
        // Remove the deleted record from the state
        setParkingRecords(parkingRecords.filter(record => record._id !== id));
      } else {
        setMessage(data.error || "Failed to delete parking record.");
      }
    } catch (error) {
      setMessage("An error occurred while deleting the record.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-20">
      <h1 className="text-xl font-bold mb-4 text-center">Parking Records</h1>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Owner Name</th>
            <th className="border p-2">Vehicle Name</th>
            <th className="border p-2">Vehicle Number</th>
            <th className="border p-2">Entry Date</th>
            <th className="border p-2">Exit Date</th>
            <th className="border p-2">Paid amount</th>
            <th className="border p-2">Delete Record</th>
          </tr>
        </thead>
        <tbody>
          {parkingRecords.map((record) => (
            <tr key={record._id}>
              <td className="border p-2">{record.ownerName}</td>
              <td className="border p-2">{record.vehicleName}</td>
              <td className="border p-2">{record.vehicleNumber}</td>
              <td className="border p-2">{new Date(record.entryDate).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(record.exitDate).toLocaleDateString()}</td>
              <td className="border p-2">{record.parkingfee}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(record._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParkingRecords;
