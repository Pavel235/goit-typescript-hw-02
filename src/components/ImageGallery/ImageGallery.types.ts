interface ImageItem {
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

interface ImageData {
  imageUrl: string;
  description: string;
  likes: number;
  location: string;
}

export interface Props {
  items: ImageItem[];
  onImageInfo: (data: ImageData) => void;
}
