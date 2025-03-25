import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function handler() {
  try {
    const result = await dynamoClient.send(new ScanCommand({ TableName: "Amazon-Books-Bestsellers-DB" }));
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items || []),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
}
