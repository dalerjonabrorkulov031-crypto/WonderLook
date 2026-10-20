export type Confidence = 'official' | 'secondary' | 'unverified';

export interface Money {
  amount: number;
  currency: 'EUR' | 'USD' | 'JPY' | 'UZS' | string;
  note?: string;
}

export interface TicketInfo {
  officialUrl: string | null;
  whereToBuy: string[];
  prices: { label: string; price: Money }[];
  conflictingReports?: string[];
  warnings: string[];
  verifiedAt: string | null;
  confidence: Confidence;
  priceSources?: string[];
}

export interface DailyCost {
  currency: 'USD';
  budget: number | null;
  mid: number | null;
  comfort: number | null;
  averagePerPersonPerDay: number | null;
  basis: import('./place.types').L10n;
  components: {
    lodging: number | null;
    food: number | null;
    localTransport: number | null;
    entry: number | null;
  };
  source: string | null;
  verifiedAt: string | null;
  confidence: Confidence;
}

export interface DailyCostReference {
  amount: number | null;
  currency: 'USD';
  source: string | null;
  verifiedAt: string;
  basis: import('./place.types').L10n;
}

export interface PlaceGuideData {
  id: string;
  wiki: string;
  facts: import('./place.types').Fact[];
  tickets: TicketInfo;
  dailyCost: DailyCost;
  videos: import('./place.types').PlaceVideo[];
}
