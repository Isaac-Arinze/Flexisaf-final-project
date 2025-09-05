import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.connection.on('connected', () => {
    console.log("✅ MongoDB Connected Successfully");
  });

  mongoose.connection.on('error', (err) => {
    console.error("❌ Database connection error:", err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log("⚠️ Database disconnected");
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("💥 MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
