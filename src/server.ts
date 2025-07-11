import express from "express";
import { createServer } from "http";
import puppeteer from "puppeteer";
import { startServer } from "./createServer";
import handler from "./api/meta";
const app = express();
//@ts-ignore
app.get("/metadata", handler);
startServer(app);
