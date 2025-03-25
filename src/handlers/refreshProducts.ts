import { scraper } from "../web-scraper/index.ts";
import { saveBooksToDynamoDB } from "../database/dynamoDB.ts";

export async function handler() {
  try {
    const books = await scraper();
    await saveBooksToDynamoDB(books);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Products refreshed successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
}
