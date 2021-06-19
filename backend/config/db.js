import mongoose from 'mongoose';

// this function connects to MongoDB.
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `MongoDB is connected ... ${connect.connection.host}`.cyan.underline
    );
  } catch (err) {
    console.error(`Error: ${err.message}`.red.underline.bold);
    //exit process by force if error.
    process.exit(1);
  }
};

export default connectDB;
