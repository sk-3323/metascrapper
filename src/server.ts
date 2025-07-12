import express from "express";
import { createServer } from "http";
import puppeteer from "puppeteer";
import { startServer } from "./createServer";
import handler from "./api/meta";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*", credentials: true }));
//@ts-ignore
app.get("/metadata", handler);
startServer(app);
