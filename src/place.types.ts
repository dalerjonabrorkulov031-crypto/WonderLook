export type Lang = 'uz' | 'ru' | 'en';
export type L10n = Record<Lang, string>;

export interface Fact {
  id: string;
  title: L10n;
  text: L10n;
  category: 'history' | 'architecture' | 'culture' | 'science' | 'food' | 'legend' | 'visit';
  source?: string;
}

export interface PlaceVideo {
  id: string;
  title: L10n;
  provider: 'youtube' | 'vimeo' | 'mux' | 'cloudinary' | 'file';
  url: string;
  poster: string;
  durationSec: number;
  premium: boolean;
}

export interface Landmark {
  id: string;
  name: L10n;
  built: string;
  summary: L10n;
  lat: number;
  lng: number;
  facts: Fact[];
  videos: PlaceVideo[];
}

export interface Place {
  id: string;
  name: L10n;
  country: L10n;
  lat: number;
  lng: number;
  category: string[];
  rating: number;
  heroImage: string;
  history: L10n;
  facts: Fact[];
  landmarks: Landmark[];
  videos: PlaceVideo[];
  bestSeason: L10n;
  howToGetThere: L10n;
  sources: string[];
}
