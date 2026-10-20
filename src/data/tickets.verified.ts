import { ticketInfo } from './factFactory';

export const colosseumTickets = ticketInfo('https://ticketing.colosseo.it/en', [
  'The official ticket portal displayed an anti-bot verification page; its live tariff could not be checked.',
  'Previously supplied secondary reports conflict (EUR 16 + fee, EUR 18, and EUR 20); no amount is selected as verified.',
  'Buy only through the official Colosseum ticketing portal; beware of reseller markups and imitation domains.',
], {
  conflictingReports: ['Secondary reports supplied for this project list EUR 16 + EUR 2 fee, EUR 18, and EUR 20 including reservation. The original report URLs were not supplied, so none is treated as verified.'],
});

export const eiffelTickets = ticketInfo('https://www.toureiffel.paris/en/rates-opening-times', [
  'The official Eiffel Tower tariff page returned HTTP 403 during verification; current prices could not be confirmed there.',
  'The supplied secondary figures conflict on summit lift pricing (EUR 28.30 versus EUR 36.70) and must not be treated as current.',
  'Use toureiffel.paris only. Avoid unofficial lookalike ticket domains and resellers.',
], {
  conflictingReports: ['Supplied older figures: EUR 14.80 stairs to level 2; EUR 22.40 lift to level 2; EUR 26.10 stairs plus lift to summit; EUR 36.70 summit by lift. A separate supplied report says EUR 28.30 for the summit lift. No amount selected because the official tariff page was inaccessible.'],
});
