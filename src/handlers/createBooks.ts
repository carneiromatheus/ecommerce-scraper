import { v4 as uuid } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchExecuteStatementCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { scraper } from "../web-scraper/index.ts";
import { Book } from "../types/product.ts";

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

async function saveBooksToDynamoDB(books: Book[]) {
  const params = {
    Statements: books.map((book) => ({
      Statement: `INSERT INTO Books VALUE {'id': ?, 'code_book': ? 'name': ?, 'author': ?, 'price': ?, 'rank': ?, 'link': ?}`,
      Parameters: [
        { S: uuid() },
        { S: book.code },
        { S: book.name },
        { S: book.author },
        { N: book.price },
        { N: book.rank },
        { S: book.link },
      ],
    })),
  };

  await dynamoClient.send(new BatchExecuteStatementCommand(params));
}

export async function handler(event: any) {
  try {
    console.log("Starting scraping process...");
    const books = await scraper();
    console.log("Scraping completed. Saving to DynamoDB...");
    await saveBooksToDynamoDB(books);
    console.log("Books saved successfully.");
    return { statusCode: 200, body: JSON.stringify({ message: "Books saved successfully!" }) };
  } catch (error) {
    console.error("Error in createBooks handler:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
  }
}
