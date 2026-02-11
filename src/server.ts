import { app } from "./app";
import { registerPlugins } from "./plugins";
import { connectDB } from "./config/db";

// Use PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

async function startServer() {
  // Register plugins (cookie, cors, etc.)
  await registerPlugins(app);

  // Connect to database
  await connectDB();

  // Start Fastify server
  try {
    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
