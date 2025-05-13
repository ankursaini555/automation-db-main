import { AppDataSource } from "../data-source";


export const checkDatabaseHealth = async (): Promise<{name: string, status: string; message: string, timestamp:string }> => {
  try {
    // Check if the database connection is initialized and connected
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // query to ensure the database is responsive
    await AppDataSource.query("SELECT 1");

    return {
      name: process.env.DB_USERNAME || "Database Service",
      status: "up",
      message: "Database is running and responsive.",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Database health check failed:", error);
    return {
      name: process.env.DB_USERNAME || "Database Service",
      status: "down",
      message: "Database is not reachable.",
      timestamp: new Date().toISOString(),
    };
  }
};

export const JsonResponseToText = (json: any) => {
  let text = "";

  // Add the main service name and status
  text += `${json.name
    .replace(/\s+/g, "_")
    .toUpperCase()}=${json.status.toUpperCase()}\n`;

  // Process dependency services
  if (Array.isArray(json.dependencyServices)) {
    json.dependencyServices.forEach((service: any) => {
      text += `${service.name
        .replace(/\s+/g, "_")
        .toUpperCase()}=${service.status.toUpperCase()}\n`;
    });
  }

  // Add the timestamp
  text += `TIME=${json.timestamp}`;

  return text.trim();
};