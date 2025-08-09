
import mongoose from 'mongoose';


export const connectToDB = async () => {
  const encodedPassword = encodeURIComponent(process.env.PASSWORD);
  const uri = process.env.MONGO_URI.replace("password",encodedPassword).replace("userName",process.env.USER);
    try {
        return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
  }

