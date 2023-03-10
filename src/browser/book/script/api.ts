import type { location, bookType } from "@/types/book";
import type { initData } from "@/types/database";

export const getData = async (id: string, location: location) => {
  const data = await fetch(
    `./api/book/${id}?latitude=${location.latitude}&longitude=${location.longitude}`
  );
  return data.json() as Promise<initData>;
};

export const postImg = async (img: string, limit: bookType, id: string) => {
  console.log("post");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const data = {
    id,
    img,
  };
  await fetch(`./api/${limit}/sent`, {
    method: "post",
    body: JSON.stringify(data),
    headers,
  });
  console.log("save", limit);
};
