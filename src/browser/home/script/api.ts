import { headlineData } from "@/types/home";

export const getRecent = async () => {
  const name = "テスト用観光地";
  const unlimitedBook =
    "https://img.kb-cdn.com/imgviewer/NVpIM2ptOHhYRzVmUk5rM1NrNlFxYVV6enV4aGk2UFRJMmxPckdDUUVNYjFpUnBWclNERWpVZjhHdE1ONHRzenVkZTVqZUpFU041bzRUaVovbWFoVVl5eEZPeXBsV2ZXMWpla2JxWWVUbUxZUlBMYkI0S2ZzdXdjVkdtUDlLY3Z2TVlEREE1M3d4NWE3NmZVUXZOTHhWTER3Z1ZndU1XNUhUTVhYdXpPM05TMVByUWdKNG5rQWNybFlxQUVjNVNYazBCeS9DMGpyYUVQQklrWmhoZG5zdEpyNjVleG54c0tyRS9nTzVuQ3I5RT0=?square=0";
  const test = [...Array(30).fill({ name, unlimitedBook })];
  return test;
  const data = await fetch("./api/recent");
  return data.json() as Promise<headlineData[]>;
};

export const getSearchResults = async (text: string) => {
  const name = "検索用観光地";
  const unlimitedBook =
    "https://img.kb-cdn.com/imgviewer/NVpIM2ptOHhYRzVmUk5rM1NrNlFxYVV6enV4aGk2UFRJMmxPckdDUUVNYjFpUnBWclNERWpVZjhHdE1ONHRzenVkZTVqZUpFU041bzRUaVovbWFoVVl5eEZPeXBsV2ZXMWpla2JxWWVUbUxZUlBMYkI0S2ZzdXdjVkdtUDlLY3Z2TVlEREE1M3d4NWE3NmZVUXZOTHhWTER3Z1ZndU1XNUhUTVhYdXpPM05TMVByUWdKNG5rQWNybFlxQUVjNVNYazBCeS9DMGpyYUVQQklrWmhoZG5zdEpyNjVleG54c0tyRS9nTzVuQ3I5RT0=?square=0";
  const test = [
    ...Array(30)
      .fill(null)
      .map((_, i) => {
        return { name: `${name}${i}`, unlimitedBook };
      }),
  ].filter((d) => new RegExp(`${text}`, "g").test(d.name));
  return test;
  const data = await fetch(`./api/search/${text}`);
  return data.json() as Promise<headlineData[]>;
};
