import { MongoClient } from "mongodb";

let useMongo = !!process.env.MONGODB_URI;

if (!useMongo) {
  console.error("No mongodb URI - MongoDB wont be enabled");
}

export const WeatherMetricsDataStore = async () => {
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const database = client.db("metrics");
  const collection = database.collection("weather");
  return { collection, client };
};
