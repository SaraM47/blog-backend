import { app } from "./app";
import "./config/db";

// Start the server 
const PORT = process.env.PORT || 3000;

// Listen on all network interfaces
app.listen({ port: Number(PORT), host: "0.0.0.0" });
