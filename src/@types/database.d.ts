export type sightData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type bookData = {
  id: number;
  sight_ID: number;
  canvas: string;
  is_gentei: 0 | 1;
  edit_date: string;
};

type initData = {
  sightName: string;
  limitBreak: 0 | 1;
  unlimitedBookData: bookData[] | null;
  limitedBookData: bookData[] | null;
};
