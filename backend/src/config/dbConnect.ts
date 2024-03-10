import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
  mongoose.connect(
    "mongodb+srv://admin:admin123@clustertodosis.xiv1drx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTodosis",
  );
  return mongoose.connection;
}

export default conectaNaDatabase;
