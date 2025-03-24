import { Book } from "../types/product.ts";
import amazon from "./amazon.ts";

(async () => {
  try {
    console.log("Fetching the top 3 bestsellers programming books on Amazon...");
    const amazonTopProgrammingBooks: Book[] = await amazon.fetchBestSellers("/books/7842670011", 3);
    if (amazonTopProgrammingBooks.length > 0) {
      amazonTopProgrammingBooks.forEach(book => console.log(book));
    } else {
      console.log("No books found!");
    }
  } catch (error) {
    console.error("An error occurred while fetching or processing Amazon books:", error);
  }
})();