import type { Fact } from '../place.types';
import type { DailyCost, PlaceGuideData, TicketInfo } from '../travel.types';

export type FactRow = [
  Fact['category'],
  string,
  string,
  string,
  string,
  string,
  string,
];

export function makeFacts(id: string, source: string, rows: FactRow[]): Fact[] {
  return rows.map(([category, titleUz, titleRu, titleEn, textUz, textRu, textEn], index) => ({
    id: `${id}-${String(index + 1).padStart(2, '0')}`,
    category,
    title: { uz: titleUz, ru: titleRu, en: titleEn },
    text: { uz: textUz, ru: textRu, en: textEn },
    source,
  }));
}

export const emptyDailyCost: DailyCost = {
  currency: 'USD',
  budget: null,
  mid: null,
  comfort: null,
  averagePerPersonPerDay: null,
  basis: { uz: '', ru: '', en: '' },
  components: { lodging: null, food: null, localTransport: null, entry: null },
  source: null,
  verifiedAt: null,
  confidence: 'unverified',
};

export function ticketInfo(
  officialUrl: string | null,
  warnings: string[],
  options: Partial<TicketInfo> = {},
): TicketInfo {
  return {
    officialUrl,
    whereToBuy: officialUrl ? [officialUrl] : [],
    prices: [],
    warnings,
    verifiedAt: '2026-10-18',
    confidence: 'unverified',
    ...options,
  };
}

export function guideData(
  id: string,
  wiki: string,
  facts: Fact[],
  tickets: TicketInfo,
): PlaceGuideData {
  return {
    id,
    wiki,
    facts,
    tickets,
    dailyCost: emptyDailyCost,
    videos: [
      {
        id: `${id}-trailer`,
        title: { uz: 'Safar treyleri — bepul', ru: 'Трейлер поездки — бесплатно', en: 'Travel trailer — free' },
        provider: 'youtube',
        url: 'TODO_REAL_VIDEO_URL',
        poster: '/icon.svg',
        durationSec: 60,
        premium: false,
      },
      {
        id: `${id}-drone`,
        title: { uz: '4K dron sayri', ru: 'Съёмка с дрона в 4K', en: '4K drone tour' },
        provider: 'youtube',
        url: 'TODO_REAL_VIDEO_URL',
        poster: '/icon.svg',
        durationSec: 240,
        premium: true,
      },
      {
        id: `${id}-interior`,
        title: { uz: 'Ichkaridan sayr', ru: 'Прогулка внутри', en: 'Inside tour' },
        provider: 'youtube',
        url: 'TODO_REAL_VIDEO_URL',
        poster: '/icon.svg',
        durationSec: 300,
        premium: true,
      },
    ],
  };
}
