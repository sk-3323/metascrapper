import type { VercelRequest, VercelResponse } from "@vercel/node";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: "shell",
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const meta = await page.evaluate(() => {
      const get = (selector: string) =>
        document.querySelector(selector)?.getAttribute("content") || null;

      return {
        metaData: get("meta"),
        title: document.title || null,
        description:
          get('meta[name="description"]') ||
          get('meta[property="og:description"]'),
        image:
          get('meta[property="og:image"]') || get('meta[name="twitter:image"]'),
      };
    });

    await browser.close();
    res.status(200).json({ meta });
  } catch (error) {
    console.error("Scraping failed:", error);
    return res.status(500).json({ error: "Failed to fetch metadata" });
  }
}
