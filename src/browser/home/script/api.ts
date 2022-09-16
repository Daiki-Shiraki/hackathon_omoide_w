import { bookData } from "@/types/database";

export const getRecent = async (num: number = 1) => {
  const data = await fetch(`./api/recent?num=${num}`);
  return data.json() as Promise<bookData[]>;
};

export const getSearchResults = async (text: string) => {
  const data = await fetch(`./api/book-search?word=${text}`);
  return data.json() as Promise<bookData[]>;
};
