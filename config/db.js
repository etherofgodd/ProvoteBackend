import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.italic);
  } catch (error) {
    console.error(`ERROR: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDb;
