import { guideData, ticketInfo } from './factFactory';
import type { Fact } from '../place.types';

const wiki = 'https://uz.wikipedia.org/wiki/Katta_Kanyon';

// The requested Uzbek Wikipedia page returned only the encyclopedia header.
// Facts are intentionally empty until a readable source page is supplied.
const facts: Fact[] = [];

const tickets = ticketInfo('https://www.nps.gov/grca/planyourvisit/fees.htm', [
  'The requested Uzbek Wikipedia page returned only a header, so no destination facts were inferred.',
  'The National Park Service fee page is official; check current admission and seasonal access before travel.',
], {
  whereToBuy: ['Grand Canyon National Park entrance stations; current details: https://www.nps.gov/grca/planyourvisit/fees.htm'],
  prices: [{ label: 'Single-vehicle fee (as referenced on the official page)', price: { amount: 35, currency: 'USD', note: 'NPS fee page; confirm current conditions before travel.' } }],
  verifiedAt: '2026-10-18',
  confidence: 'official',
  priceSources: ['https://www.nps.gov/grca/planyourvisit/fees.htm'],
});

export const grandCanyonGuide = guideData('grand-canyon', wiki, facts, tickets);
