import { AppDataSource } from "../data-source";


export const checkDatabaseHealth = async (): Promise<{ status: string; message: string }> => {
  try {
    // Check if the database connection is initialized and connected
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    // query to ensure the database is responsive
    await AppDataSource.query("SELECT 1");

    return {
      status: "up",
      message: "Database is running and responsive.",
    };
  } catch (error) {
    console.error("Database health check failed:", error);
    return {
      status: "down",
      message: "Database is not reachable.",
    };
  }
};