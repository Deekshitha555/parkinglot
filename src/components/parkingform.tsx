"use client";
import { useState } from "react";

const ParkingForm = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    vehicleName: "",
    vehicleNumber: "",
    entryDate: "",
    exitDate: "",
  });

  const [message, setMessage] = useState<string>("");
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  // Define types for events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/park/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data.fee)
      if (response.ok) {
        setMessage("Parking record added successfully!");
        setCalculatedFee(data.fee);
      } else {
        setMessage(data.error || "Failed to add parking record.");
      }
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 w-96 mx-auto">
        <label className="block">
          Owner Name:
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </label>
        <label className="block">
          Vehicle Name:
          <input
            type="text"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </label>
        <label className="block">
          Vehicle Number:
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </label>
        <label className="block">
          Entry Date:
          <input
            type="date"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </label>
        <label className="block">
          Exit Date:
          <input
            type="date"
            name="exitDate"
            value={formData.exitDate}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded text-black"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-red-500">
          {message}
          {calculatedFee !== null && (
            <span className="block text-green-500 mt-2">
              Parking Fee: {calculatedFee}/-
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default ParkingForm;
