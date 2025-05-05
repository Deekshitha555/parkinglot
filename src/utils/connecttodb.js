import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (!process.env.DBURI) {
      throw new Error("DBURI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application if the connection fails
  }
};

export default connectToDB;
