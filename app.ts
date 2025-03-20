import { Product } from "./src/types/Product.ts";
import amazon from "./src/web-scraper/amazon.ts";

export const amazonProducts = await (async (): Promise<Product[]> => {
  try {
    console.log("Starting scraping...");
    const products: Product[] = await amazon.getBestsellers();

    if (products.length === 0) {
      console.log("No products found.");
    } else {
      console.log(`Found ${products.length} products:`);
    }

    console.log("Products List:", products);
    console.log("End of scraping.");

    return products;

  } catch (error) {
    console.error("Error while executing scraping:", error);
    return [];
  }
})();