import puppeteer, { Browser, Page } from "puppeteer";
import { Book } from "../types/product.ts";

const AMAZON_BESTSELLERS_URL: string = "https://www.amazon.com.br/gp/bestsellers";
const DEFAULT_RESULT_LIMIT: number = 30;

const fetchBestSellers = async (path: string, limit?: number): Promise<Book[]> => {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch();
    const page: Page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(AMAZON_BESTSELLERS_URL + `${path}`);
    await page.waitForFunction(() => document.readyState === "complete");

    const bestsellers: Book[] = await page.evaluate((limit) => {
      return Array.from(document.querySelectorAll(".p13n-sc-uncoverable-faceout"))
        .slice(0, limit)
        .map((productElement, rank) => {
          const code = productElement.id;

          const image = productElement
            .querySelector("img")
            ?.getAttribute("src") ?? "No image";

          const name = productElement
            .querySelector(".a-link-normal span div")
            ?.textContent?.trim() ?? "No name";

          const author = productElement
            .querySelector(".a-row.a-size-small div")
            ?.textContent?.trim() ?? "Unknown author";

          const rating = parseFloat((productElement
            .querySelector(".a-icon-row a.a-link-normal")
            ?.getAttribute("title") ?? "0").split(" ")[0].replace(",", ".")) ?? 0;

          const price = parseFloat((productElement
            .querySelector(".a-size-base.a-color-price")
            ?.textContent?.trim() ?? "0").replace("R$", "").replace(",", ".")) ?? 0;

          const href = productElement.querySelector("a")?.getAttribute("href") ?? "UNKNOWN";
          const link = "https://www.amazon.com.br" + href;

          return { code, rank: rank + 1, image, name, author, rating, price, link };
        });
    }, limit ?? DEFAULT_RESULT_LIMIT);

    return bestsellers;
  } catch (error) {
    console.error("Error while scraping Amazon bestsellers:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const amazon = { fetchBestSellers };
export default amazon;
