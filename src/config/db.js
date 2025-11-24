import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Lien ket DB thanh cong");
  } catch (error) {
    console.error("Loi khi ket noi DB: ", error);
    process.exit(1);
  }
};
