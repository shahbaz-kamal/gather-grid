import app from "./app";
import connectDB from "./app/utils/connectDb";

const port = process.env.PORT || 5000;
const bootstrap = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🔥 Gathergrid  server is running on port ${port}`);
    console.log(`🚩 Connected to MONGODB`);
  });
};
bootstrap();
