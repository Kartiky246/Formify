
import mongoose from 'mongoose';


export const connectToDB = async () => {
  const encodedPassword = encodeURIComponent(process.env.DB_PASSWORD);
  const uri = process.env.MONGO_URI.replace("DB_PASSWORD",encodedPassword).replace("DB_USER_NAME",process.env.DB_USER_NAME);
    try {
        return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
  }

