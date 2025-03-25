import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Book } from "../types/product.ts";

const client = new DynamoDBClient({
  region: "sa-east-1"
});
const dynamoClient = DynamoDBDocumentClient.from(client);

export async function saveBooksToDynamoDB(books: Book[]) {
  const promises = books.map((book) =>
    dynamoClient.send(
      new PutCommand({
        TableName: "Amazon-Books-Bestsellers-DB",
        Item: book,
      })
    )
  );
  await Promise.all(promises);
}
