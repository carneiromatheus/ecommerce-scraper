import puppeteer, { Browser, Page } from "puppeteer";
import { Product } from "../types/Product.js";

const AMAZON_BESTSELLERS_URL: string = "https://www.amazon.com.br/gp/bestsellers/books/7842670011";

const getBestsellers = async (): Promise<Product[]> => {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch();
    const page: Page = await browser.newPage();
    await page.goto(AMAZON_BESTSELLERS_URL, { waitUntil: "domcontentloaded" });

    const products: Product[] = await page.evaluate(async () => {
      const productElements = document.querySelectorAll(".p13n-sc-uncoverable-faceout");
      const extractedProducts: Product[] = [];

      productElements.forEach((productElement, rank) => {
        const code = productElement.id ?? "UNKNOWN";

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
        
        rank++;
        extractedProducts.push({ code, rank, image, name, author, rating, price, link });
      });

      return extractedProducts;
    });

    return products;
  } catch (error) {
    console.error("Error while scraping Amazon bestsellers:", error);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

const amazon = { getBestsellers };
export default amazon;
