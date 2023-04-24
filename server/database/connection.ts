import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      //      `mongodb+srv://maudyluhulima:${process.env.MONGODB_PASSWORD}@joke-generator.dfhuaxz.mongodb.net/?retryWrites=true&w=majority`
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@joke-generator.dfhuaxz.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Database is connected");
  } catch (err) {
    console.log(`Error connecting to MongoDB: ${err}`);
  }
};

export default connectDB;
