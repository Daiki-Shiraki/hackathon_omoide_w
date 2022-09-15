import type { location } from "@/types/book";

export const getData = async (id: string, location: location) => {
  const data = await fetch(
    `./api/book/${id}?latitude=${location.latitude}&longitude=${location.longitude}`
  );
  return await data.json();
};
