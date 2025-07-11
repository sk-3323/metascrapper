import { Application } from "express";
import { createServer } from "http";

export const startServer = async (app: Application) => {
  try {
    const server = createServer(app);
    console.log("Server running");

    server.listen(3000);
  } catch (error) {
    console.log(error, "error while startServer");
  }
};
