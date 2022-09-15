import type { location } from "@/types/book";
import type { initData } from "@/types/database";

export const getData = async (id: string, location: location) => {
  const data = await fetch(
    `./api/book/${id}?latitude=${location.latitude}&longitude=${location.longitude}`
  );
  return data.json() as Promise<initData>;
};
