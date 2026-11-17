import { weekdayOf } from "@/lib";
import { useSyncExternalStore } from "react";

function subscribe(onVisibilityChange: () => void) {
  document.addEventListener("visibilitychange", onVisibilityChange);
  return () =>
    document.removeEventListener("visibilitychange", onVisibilityChange);
}

const getToday = () => weekdayOf(new Date());
const todayIsUnknownOnTheServer = () => null;

export function useToday() {
  return useSyncExternalStore(subscribe, getToday, todayIsUnknownOnTheServer);
}
