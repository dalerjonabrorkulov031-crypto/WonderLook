import { guideData, makeFacts, ticketInfo } from './factFactory';
import type { Fact } from '../place.types';

const wiki = 'https://uz.wikipedia.org/wiki/Machu-Pikchu';
const facts: Fact[] = makeFacts('machu-picchu', wiki, [
  ['history','XV asr shahri','Город XV века','A 15th-century city','Machu Picchu XV asrda bunyod etilgan Inka yodgorligidir.','Мачу-Пикчу — памятник инков, построенный в XV веке.','Machu Picchu is an Inca site built in the 15th century.'],
  ['visit','Baland tog‘ manzili','Высокогорное место','A high mountain setting','Yodgorlik Peru janubidagi Kordilyera tog‘larida, taxminan 2 430 metr balandlikda joylashgan.','Памятник находится в Кордильерах на юге Перу, примерно на высоте 2 430 метров.','The site lies in Peru’s southern Cordillera at about 2,430 metres.'],
  ['visit','Muqaddas vodiydan masofa','Расстояние от Священной долины','Distance from the Sacred Valley','Machu Picchu Muqaddas vodiydan taxminan 80 km shimoli-g‘arbda.','Мачу-Пикчу находится примерно в 80 км к северо-западу от Священной долины.','Machu Picchu is about 80 km northwest of the Sacred Valley.'],
  ['architecture','Ikki cho‘qqi oralig‘i','Между двумя вершинами','Between two peaks','Qadimiy shahar Machu Picchu va Huayna Picchu cho‘qqilari orasidagi egarda joylashgan.','Древний город расположен на седловине между вершинами Мачу-Пикчу и Уайна-Пикчу.','The ancient city sits on a saddle between Machu Picchu and Huayna Picchu peaks.'],
  ['history','Arxeologik davrlash','Археологическая датировка','Archaeological dating','Radiokarbon tadqiqoti qurilish davrini taxminan 1420–1530-yillarga joylashtiradi.','Радиоуглеродное исследование относит строительство примерно к 1420–1530 годам.','Radiocarbon research places construction around 1420–1530.'],
  ['history','Inka hukmdorlari','Правители инков','Inca rulers','Qurilish Pachacutec va Tupac Inca Yupanqui hukmronlik qilgan davrga to‘g‘ri keladi.','Строительство относится ко времени правления Пачакутека и Тупак Инки Юпанки.','Construction belongs to the reigns of Pachacutec and Tupac Inca Yupanqui.'],
  ['history','Qirollik mulki','Королевское владение','A royal estate','Arxeologik talqinlarda yodgorlik Inka hukmdori uchun qirollik mulki sifatida qaraladi.','В археологических интерпретациях комплекс рассматривается как королевское владение правителя инков.','Archaeological interpretations describe the site as an Inca ruler’s royal estate.'],
  ['history','Aholi yashagan davr','Период заселения','Period of occupation','Machu Picchu tashlab ketilishidan oldin taxminan 80 yil yashab turilgan.','До оставления Мачу-Пикчу здесь жили около 80 лет.','Machu Picchu was occupied for about 80 years before it was abandoned.'],
  ['history','1911-yilgi ekspeditsiya','Экспедиция 1911 года','The 1911 expedition','Amerikalik tarixchi Hiram Bingham yodgorlikka 1911-yilda kelgan.','Американский историк Хайрам Бингем прибыл к памятнику в 1911 году.','American historian Hiram Bingham reached the site in 1911.'],
  ['culture','Kechua nomi','Название на кечуа','Quechua name','Machu so‘zi “qari”, Picchu esa tog‘ yoki uchli shakl ma’nolarida talqin qilinadi.','Слово machu толкуют как «старый», а picchu — как гора или остроконечная форма.','Machu is interpreted as “old,” while picchu can refer to a mountain or pointed form.'],
  ['visit','Yangi yetti mo‘jiza','Новые семь чудес','New Seven Wonders','Machu Picchu 2007-yilda Yangi Dunyoning yetti mo‘jizasidan biri deb tan olingan.','В 2007 году Мачу-Пикчу признали одним из новых семи чудес света.','Machu Picchu was named one of the New Seven Wonders in 2007.'],
  ['history','Tarixiy qo‘riqxona','Исторический заповедник','A historic sanctuary','Peru yodgorlikni 1981-yilda tarixiy qo‘riqxona deb e’lon qilgan.','В 1981 году Перу объявило памятник историческим заповедником.','Peru declared the site a historic sanctuary in 1981.'],
  ['culture','UNESCO ro‘yxati','Список ЮНЕСКО','UNESCO listing','Machu Picchu 1983-yilda UNESCO Jahon merosi ro‘yxatiga kiritilgan.','В 1983 году Мачу-Пикчу включили в список Всемирного наследия ЮНЕСКО.','Machu Picchu joined the UNESCO World Heritage List in 1983.'],
  ['visit','Urubamba daryosi','Река Урубамба','The Urubamba River','Urubamba daryosi hududni uch tomondan aylanib o‘tib, chuqur kanyon hosil qiladi.','Река Урубамба огибает местность с трёх сторон и образует глубокий каньон.','The Urubamba River bends around the site on three sides, forming a deep canyon.'],
  ['science','Tropik tog‘ iqlimi','Тропический горный климат','Tropical mountain climate','Daryo bo‘ylab joylashgan kanyonda tropik tog‘ iqlimi hukm suradi.','В каньоне у реки преобладает тропический горный климат.','The river canyon has a tropical mountain climate.'],
  ['visit','Yomg‘irli mavsum','Сезон дождей','Rainy season','Yillik yomg‘irning asosiy qismi oktyabrdan martgacha yog‘adi.','Основная часть годовых осадков выпадает с октября по март.','Most annual rainfall occurs from October through March.'],
  ['visit','Kusko bilan temir yo‘l','Поезд из Куско','Rail from Cusco','Sahifada Kuskodan poyezdda borish yo‘li taxminan uch soat davom etishi ko‘rsatilgan.','На странице указано, что поездка поездом из Куско занимает около трёх часов.','The page gives a rail journey of about three hours from Cusco.'],
  ['visit','Piyoda yo‘li','Пеший маршрут','Walking route','Inklar so‘qmog‘i orqali piyoda chiqish bir necha kun olishi mumkin.','Подъём пешком по Тропе инков может занять несколько дней.','Hiking via the Inca Trail can take several days.'],
  ['architecture','Saqlangan shahar qismlari','Сохранившиеся части города','Surviving urban remains','Qazishmalar ko‘p qavatli uylar, ko‘chalar va maydonlarni ochib bergan.','Раскопки выявили многоэтажные здания, улицы и площади.','Excavations revealed multi-storey buildings, streets and squares.'],
  ['science','Kuchli tosh devorlar','Каменные стены','Stone walls','Ayrim devorlar sakkiz metrgacha balandlikda saqlanib qolgan.','Некоторые стены сохранились высотой до восьми метров.','Some walls survive to heights of up to eight metres.'],
]);

const tickets = ticketInfo('https://tuboleto.cultura.pe/', [
  'The official Peru Cultura ticket portal loaded only its “loading” shell during verification; no current price could be confirmed.',
  'Use only the official government ticket portal. Avoid reseller pages that claim guaranteed entry.',
], { whereToBuy: ['Official Peru Cultura ticket portal: https://tuboleto.cultura.pe/'] });

export const machuPicchuGuide = guideData('machu-picchu', wiki, facts, tickets);
