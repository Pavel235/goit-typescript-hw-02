import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export interface PhotoData {
  id: number;
  urls: {
    regular: string;
  };
  alt_description: string;
  likes: number;
  user: {
    location: string;
  };
}

const searchPhotos = async (
  searchQuery: string,
  page: number,
  allPages: (totalPages: number) => void
): Promise<PhotoData[]> => {
  const response: AxiosResponse<any> = await axios.get("search/photos", {
    params: {
      page,
      per_page: 12,
      query: searchQuery,
      orientation: "landscape",
    },
    headers: {
      Authorization: "Client-ID YtyR8pl1Odc7UXTUrYU8ZMd8gTaxr9_n7lJZp1CUEEU",
      "Accept-Version": "v1",
    },
  });

  const totalPages: number = response.data.total_pages;

  allPages(totalPages);

  return response.data.results;
};

export default searchPhotos;
