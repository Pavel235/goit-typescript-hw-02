import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

const searchPhotos = async (searchQuery, page) => {
  const response = await axios.get("search/photos", {
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

  return response.data.results;
};

export default searchPhotos;
