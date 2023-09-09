import "./config/init-env-config";
import app from "./app";
import connectDB from "./db";
import { config } from "./config/config";
const { port } = config.server;

async function bootstrap() {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
