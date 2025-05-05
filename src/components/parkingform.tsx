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

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/parking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        const result = await response.json();
        setMessage("Parking record added successfully!");
        console.log("Success:", result);
      } else {
        setResponseMessage(data.error || 'Failed to add question.');
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
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ParkingForm;
