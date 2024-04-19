export interface Image {
  urls: {
    small: string;
  };

  alt_description: string;
}

interface ImageData {
  imageUrl: string;
  description: string;
  likes: number;
  location: string;
}

export interface Props {
  image: Image;
  onClick: (data: ImageData) => void;
  imageData: ImageData;
}
