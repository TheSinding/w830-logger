import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  console.error("No mongodb URI");
  process.exit(1);
}
export const WeatherMetricsDatastore = async () => {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const database = client.db("metrics");
  const collection = database.collection("weather");
  return { collection, client };
};
