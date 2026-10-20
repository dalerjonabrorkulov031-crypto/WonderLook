import { guideData, ticketInfo } from './factFactory';
import { samarkand } from './samarkand.data';
import { santoriniGuide } from './santorini.data';
import { mountFujiGuide } from './mount-fuji.data';
import { machuPicchuGuide } from './machu-picchu.data';
import { tajMahalGuide } from './taj-mahal.data';
import { colosseumGuide } from './colosseum.data';
import { eiffelGuide } from './eiffel.data';
import { baliGuide } from './bali.data';
import { grandCanyonGuide } from './grand-canyon.data';
import { kyotoGuide } from './kyoto.data';
import { maldivesGuide } from './maldives.data';
import { greatWallGuide } from './great-wall.data';
import { tokyoGuide } from './tokyo.data';
import { alpsGuide } from './alps.data';
import type { PlaceGuideData } from '../travel.types';
import { DAILY_COST_REFERENCES } from './dailyCosts.data';

export const placesIndex = [
  { id: 'samarkand', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Samarqand' },
  { id: 'santorini', status: 'done', wiki: 'https://en.wikipedia.org/wiki/Santorini' },
  { id: 'mount-fuji', status: 'done', wiki: 'https://en.wikipedia.org/wiki/Mount_Fuji' },
  { id: 'machu-picchu', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Machu-Pikchu' },
  { id: 'taj-mahal', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Toj_Mahal' },
  { id: 'colosseum', status: 'done', wiki: 'https://ru.wikipedia.org/wiki/Колизей' },
  { id: 'eiffel', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Eiffel_minorasi' },
  { id: 'bali', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Bali_oroli' },
  { id: 'grand-canyon', status: 'todo', wiki: 'https://uz.wikipedia.org/wiki/Katta_Kanyon' },
  { id: 'kyoto', status: 'done', wiki: 'https://en.wikipedia.org/wiki/Outline_of_Kyoto' },
  { id: 'maldives', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Maldiv_orollari' },
  { id: 'great-wall', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Buyuk_Xitoy_devori' },
  { id: 'tokyo', status: 'done', wiki: 'https://en.wikipedia.org/wiki/Tokyo' },
  { id: 'alps', status: 'done', wiki: 'https://uz.wikipedia.org/wiki/Alplar' },
] as const;

const samarkandTickets = ticketInfo(null, [
  'No current official ticket tariff was verified for a single Samarkand-wide attraction pass.',
  'Check each monument operator or official ticket office for current admission charges.',
]);

function withDailyCost(guide: PlaceGuideData, referenceId: string): PlaceGuideData {
  const reference = DAILY_COST_REFERENCES[referenceId];
  return {
    ...guide,
    dailyCost: {
      ...guide.dailyCost,
      averagePerPersonPerDay: reference.amount,
      basis: reference.basis,
      source: reference.source,
      verifiedAt: reference.verifiedAt,
      confidence: reference.amount == null ? 'unverified' : 'secondary',
    },
  };
}

export const placeGuides: Record<string, PlaceGuideData> = {
  samarkand: withDailyCost(guideData('samarkand', samarkand.sources[0], samarkand.facts, samarkandTickets), 'samarkand'),
  santorini: withDailyCost(santoriniGuide, 'santorini'),
  'mount-fuji': withDailyCost(mountFujiGuide, 'mount-fuji'),
  'machu-picchu': withDailyCost(machuPicchuGuide, 'machu-picchu'),
  'taj-mahal': withDailyCost(tajMahalGuide, 'taj-mahal'),
  colosseum: withDailyCost(colosseumGuide, 'colosseum'),
  eiffel: withDailyCost(eiffelGuide, 'eiffel-tower'),
  bali: withDailyCost(baliGuide, 'bali'),
  'grand-canyon': withDailyCost(grandCanyonGuide, 'grand-canyon'),
  kyoto: withDailyCost(kyotoGuide, 'kyoto'),
  maldives: withDailyCost(maldivesGuide, 'maldives'),
  'great-wall': withDailyCost(greatWallGuide, 'great-wall'),
  tokyo: withDailyCost(tokyoGuide, 'tokyo'),
  alps: withDailyCost(alpsGuide, 'swiss-alps'),
};

export function getPlaceGuide(id: string) {
  return placeGuides[id];
}
