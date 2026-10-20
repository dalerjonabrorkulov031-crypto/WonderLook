import { guideData, makeFacts, ticketInfo } from './factFactory';
import type { Fact } from '../place.types';

const wiki = 'https://uz.wikipedia.org/wiki/Bali_oroli';
const facts: Fact[] = makeFacts('bali', wiki, [
  ['visit','Indoneziya provinsiyasi','Провинция Индонезии','An Indonesian province','Bali Indoneziyadagi provinsiya bo‘lib, uning ma’muriy markazi Denpasar.','Бали — провинция Индонезии с административным центром в Денпасаре.','Bali is an Indonesian province whose administrative centre is Denpasar.'],
  ['visit','Kichik Sunda provinsiyasi','Провинция Малых Зондских островов','Lesser Sunda province','Indoneziya mustaqilligining dastlabki davrida Bali Singaraja poytaxt bo‘lgan Kichik Sunda provinsiyasi tarkibiga kirgan.','В первые годы независимости Индонезии Бали входил в провинцию Малых Зондских островов со столицей в Сингарадже.','In the early years of Indonesian independence, Bali was part of the Lesser Sunda province, whose capital was Singaraja.'],
  ['visit','Java va Lombok oralig‘i','Между Явой и Ломбоком','Between Java and Lombok','Bali geografik jihatdan Java va Lombok orasida joylashgan.','Географически Бали расположен между Явой и Ломбоком.','Geographically, Bali lies between Java and Lombok.'],
  ['visit','Yaqin orollar','Ближайшие острова','Nearby islands','Provinsiya tarkibiga Nusa Penida, Nusa Lembongan, Nusa Ceningan, Serangan va Menjangan orollari ham kiradi.','В провинцию также входят острова Нуса-Пенида, Нуса-Лембонган, Нуса-Ченинган, Серанган и Менджанган.','The province also includes Nusa Penida, Nusa Lembongan, Nusa Ceningan, Serangan and Menjangan.'],
  ['science','Orol o‘lchami','Размеры острова','Island dimensions','Bali taxminan 153 km uzunlik va 112 km kenglikka ega.','Длина Бали составляет около 153 км, ширина — 112 км.','Bali is about 153 km long and 112 km wide.'],
  ['science','Aholisi va zichligi','Население и плотность','Population and density','2020-yilgi ma’lumotda Bali provinsiyasi aholisi 4 317 404 kishi, zichligi esa har km² ga 747 kishi deb berilgan.','По данным за 2020 год, население провинции Бали составляло 4 317 404 человека, плотность — 747 человек на км².','The 2020 figures give Bali province a population of 4,317,404 and a density of 747 people per km².'],
  ['science','Tropik iqlim','Тропический климат','Tropical climate','Bali koordinatalari va ekvatorga yaqinligi sababli tropik iqlimga ega.','Благодаря координатам и близости к экватору на Бали тропический климат.','Bali has a tropical climate due to its location near the equator.'],
  ['science','Agung tog‘i','Гора Агунг','Mount Agung','Agung tog‘i 3 148 metr balandlikdagi orolning eng baland nuqtasidir.','Гора Агунг высотой 3 148 метров — высшая точка острова.','Mount Agung, at 3,148 metres, is the island’s highest point.'],
  ['history','Agung otilishi','Извержение Агунга','Agung eruption','Agung vulqonining so‘nggi yirik otilishi 1963-yil martida yuz bergan.','Последнее крупное извержение вулкана Агунг произошло в марте 1963 года.','Mount Agung’s last major eruption occurred in March 1963.'],
  ['science','Batur kalderasi','Кальдера Батура','Batur caldera','Taxminan 30 000 yil avval Batur otilishi orolda katta o‘zgarishlarga sabab bo‘lgan.','Около 30 000 лет назад извержение Батура вызвало на острове крупные изменения.','About 30,000 years ago, an eruption of Batur caused major changes on the island.'],
  ['science','Koordinatalari','Координаты','Coordinates','Maqolada Bali 8°25′23″ janubiy kenglik va 115°14′55″ sharqiy uzunlikda joylashgani ko‘rsatilgan.','В статье указаны координаты Бали: 8°25′23″ южной широты и 115°14′55″ восточной долготы.','The article gives Bali’s coordinates as 8°25′23″ south and 115°14′55″ east.'],
  ['science','Markaziy tog‘ tizmasi','Центральная горная цепь','Central mountain chain','Orol o‘rtasidagi tog‘lar g‘arbdan sharqqa cho‘ziladi; ular orasida vulqonli va vulqonsiz tog‘lar bor.','Горы в центре острова тянутся с запада на восток; среди них есть вулканические и невулканические.','A mountain chain runs west to east across the island, including volcanic and non-volcanic mountains.'],
  ['science','Shimoliy pasttekislik','Северная низменность','Northern lowlands','Shimoliy qismda pasttekisliklar torroq va nishabi kamroq.','На севере низменности уже и имеют меньший уклон.','Northern lowlands are narrower and less steep.'],
  ['science','Janubiy pasttekislik','Южная низменность','Southern lowlands','Janubda pasttekisliklar kengroq va yotiqroq.','На юге низменности шире и положе.','Southern lowlands are broader and gentler.'],
  ['science','To‘rtta tog‘ ko‘li','Четыре горных озера','Four mountain lakes','Beratan, Buyan, Tamblingan va Batur ko‘llari tog‘li hududlarda joylashgan.','Озёра Бератан, Буян, Тамблинган и Батур находятся в горной местности.','Beratan, Buyan, Tamblingan and Batur lakes lie in the highlands.'],
  ['culture','Hindu aholisi','Индуистское население','Hindu population','Manbada Bali aholisining asosiy qismini hindu e’tiqodidagilar tashkil etishi qayd etiladi.','Источник отмечает, что большинство жителей Бали исповедуют индуизм.','The source notes that most of Bali’s population is Hindu.'],
  ['culture','San’at va madaniyat','Искусство и культура','Arts and culture','Bali san’ati va o‘ziga xos madaniyati bilan xalqaro miqyosda tanilgan.','Бали известен во всём мире своим искусством и самобытной культурой.','Bali is internationally known for its arts and distinctive culture.'],
  ['food','Mahalliy ekinlar','Местные культуры','Local crops','Manbada kokos, banan, sitrus va non daraxti tilga olinadi.','Источник упоминает кокосы, бананы, цитрусовые и хлебное дерево.','The source mentions coconuts, bananas, citrus and breadfruit.'],
  ['visit','Turizm yo‘nalishi','Туристическое направление','A tourism destination','Bali provinsiyasining tabiiy manzaralari uni sayyohlar orasida mashhur qilgan.','Природные ландшафты сделали провинцию Бали популярным направлением.','The province’s natural scenery has made Bali a popular destination.'],
  ['science','Tog‘ ko‘llari','Горные озёра','Mountain lakes','Beratan (Bedugul), Buyan, Tamblingan va Batur — provinsiyaning tog‘li hududlaridagi to‘rtta ko‘l.','Бератан (Бедугул), Буян, Тамблинган и Батур — четыре озера в горной части провинции.','Beratan (Bedugul), Buyan, Tamblingan and Batur are four lakes in the province’s mountain region.'],
]);

const tickets = ticketInfo(null, [
  'Bali has no single island-wide admission ticket; costs depend on the individual attraction and local rules.',
  'No official, current consolidated attraction tariff was available from the cited source.',
  'Buy attraction tickets at the venue or its official operator; avoid unsolicited reseller links.',
]);

export const baliGuide = guideData('bali', wiki, facts, tickets);
