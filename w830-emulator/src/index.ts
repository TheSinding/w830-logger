require("dotenv").config();
import FormData from "form-data";
import axios, { AxiosError } from "axios";
import { PackageGenerator } from "./packageGenerator";
const pkgGen = new PackageGenerator();

if (!("POST_FREQUENCY" in process.env) || !("BACKEND_URL" in process.env)) {
  console.error("Exiting: missing config key(s)");
  process.exit(1);
}

console.log("Emulator Running");

setInterval(async () => {
  console.log("Posting metric");

  const metric = pkgGen.generate();
  const data: string[] = [];
  for (const key of Object.keys(metric)) {
    //@ts-ignore
    data.push(`${key}=${metric[key]}`);
  }
  try {
    await axios.post(`${process.env.BACKEND_URL as string}/data/report/`, data.join("&"));
  } catch (error: any) {
    console.log("Error", error.message);
  }
}, Number(process.env.POST_FREQUENCY));
