import { parseSpending } from "@/lib";
import entries from "./spending.json";

export const SPENDING = parseSpending(entries);
