interface ImageData {
  imageUrl: string;
  description: string;
  likes: number;
  location?: string;
}

export interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  imageData?: ImageData;
}
