import { headlineData } from "@/types/home";

export const getRecent = async (num: number = 1) => {
  const data = await fetch(`./api/recent?num=${num}`);
  return data.json() as Promise<headlineData[]>;
};

export const getSearchResults = async (text: string) => {
  const data = await fetch(`./api/search?word=${text}`);
  return data.json() as Promise<headlineData[]>;
};
