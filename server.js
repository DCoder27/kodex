import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
dotenv.config();

const port = process.env.PORT || 4000; 

await connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
