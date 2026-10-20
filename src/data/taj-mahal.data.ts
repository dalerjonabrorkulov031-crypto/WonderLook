import { guideData, makeFacts, ticketInfo } from './factFactory';
import type { Fact } from '../place.types';

const wiki = 'https://uz.wikipedia.org/wiki/Toj_Mahal';
const facts: Fact[] = makeFacts('taj-mahal', wiki, [
  ['history','Boburiylar davri','Эпоха Великих Моголов','Mughal-era monument','Toj Mahal Hindistonda Boburiylar sulolasi davrida qurilgan me’moriy yodgorlikdir.','Тадж-Махал — архитектурный памятник эпохи Великих Моголов в Индии.','The Taj Mahal is an architectural monument from India’s Mughal era.'],
  ['history','Qurilish yillari','Годы строительства','Construction dates','Qurilish 1631-yilda boshlangan va 1652-yilda yakunlangan deb ko‘rsatiladi.','Строительство началось в 1631 и завершилось в 1652 году.','Construction is dated from 1631 to 1652.'],
  ['history','Mumtoz Mahal xotirasi','Памяти Мумтаз-Махал','In memory of Mumtaz Mahal','Shoh Jahon maqbarani Arjumand Banu Begim — Mumtoz Mahal xotirasiga bunyod ettirgan.','Шах-Джахан построил мавзолей в память об Арджуманд Бану Бегум, известной как Мумтаз-Махал.','Shah Jahan commissioned the mausoleum in memory of Arjumand Banu Begum, known as Mumtaz Mahal.'],
  ['visit','Jamna daryosi bo‘yida','У реки Джамна','By the Yamuna River','Majmua Agra yaqinida Jamna daryosi bo‘yida joylashgan.','Комплекс расположен у реки Джамна близ Агры.','The complex stands beside the Yamuna River near Agra.'],
  ['history','Shoh Jahon ham shu yerda','Шах-Джахан похоронен здесь','Shah Jahan is buried here','Shoh Jahon vafotidan keyin maqbaraga dafn etilgan.','После смерти Шах-Джахана похоронили в мавзолее.','Shah Jahan was buried in the mausoleum after his death.'],
  ['architecture','Me’mor nomi','Имя архитектора','Architect attribution','Manbada loyiha me’mori Usta Ahmad Lahori deb ko‘rsatiladi.','В источнике архитектором проекта назван Устад Ахмад Лахори.','The source names Ustad Ahmad Lahori as the project architect.'],
  ['architecture','Murabba tarh','Квадратный план','Square plan','Maqbara kvadrat reja va uch qavatli tuzilishga ega.','Мавзолей имеет квадратный план и три уровня.','The mausoleum has a square plan and three levels.'],
  ['architecture','Besh gumbaz','Пять куполов','Five domes','Bino besh gumbazli qilib tasvirlangan.','Здание описывается как сооружение с пятью куполами.','The building is described as having five domes.'],
  ['architecture','Marmar supa','Мраморная платформа','Marble platform','Maqbara marmar supa ustiga ko‘tarilgan.','Мавзолей возвышается на мраморной платформе.','The mausoleum rises on a marble platform.'],
  ['architecture','Burchak minoralari','Угловые минареты','Corner minarets','To‘rt burchakdagi ingichka minoralar majmuaning ko‘rinishini belgilaydi.','Стройные минареты по углам формируют облик комплекса.','Slender minarets at the four corners define the complex’s silhouette.'],
  ['architecture','Oq marmar qoplama','Облицовка белым мрамором','White marble facing','Maqbara devorlari oq marmar bilan qoplangan.','Стены мавзолея облицованы белым мрамором.','The mausoleum walls are faced with white marble.'],
  ['architecture','Qadama bezaklar','Каменная инкрустация','Stone inlay','Rangli qimmatbaho toshlardan devorlarga qadama naqshlar ishlangan.','В стены вмонтированы узоры из цветных драгоценных камней.','Coloured precious stones are inlaid into decorative patterns on the walls.'],
  ['architecture','Bog‘ yo‘lagi','Садовая ось','Garden axis','Old bog‘da daraxtlar, favvorali hovuz va uzun yo‘lak joylashgan.','Перед мавзолеем находятся деревья, бассейн с фонтанами и длинная дорожка.','The forecourt garden contains trees, a fountain pool and a long pathway.'],
  ['architecture','Markaziy maqbara xonasi','Центральная камера','Central chamber','Katta gumbazli markaziy xonada marmar sag‘analar joylashgan.','В центральном зале под большим куполом находятся мраморные кенотафы.','Marble cenotaphs stand in the central chamber beneath the large dome.'],
  ['culture','Nom ma’nosi','Значение названия','Meaning of the name','Manbada “Toj” toj, “Mahal” esa saroy ma’nosi bilan izohlanadi.','В источнике «Тадж» объясняется как «корона», а «Махал» — как «дворец».','The source interprets “Taj” as “crown” and “Mahal” as “palace”.'],
  ['culture','“Nurli maqbara” atamasi','Название «Светлая гробница»','The “illuminated tomb” name','“Padshahnoma”da yodgorlik “rauza-i munavvara” — nurli maqbara deb atalgan.','В «Падшахнаме» памятник назван «рауза-и мунаввара» — светлой гробницей.','The Padshahnama refers to it as “rawdah-i munawwara,” an illuminated tomb.'],
  ['culture','Ko‘p mamlakat ustalari','Мастера из разных регионов','Craftspeople from many regions','Qurilishda Hindiston bilan birga O‘rta Osiyo va boshqa hududlar ustalari qatnashgan.','В строительстве участвовали мастера из Индии, Центральной Азии и других регионов.','Craftspeople from India, Central Asia and other regions took part in construction.'],
  ['visit','Qish oylaridagi tashrif','Посещение в прохладные месяцы','Cool-season visits','Sahifa oktyabr, noyabr va fevralni salqin tashrif oylariga misol qiladi.','В статье октябрь, ноябрь и февраль названы прохладными месяцами для посещения.','The page cites October, November and February as cooler months to visit.'],
  ['visit','Yaqin transport','Транспорт у комплекса','Nearby transport','Majmua yaqinida ifloslantiruvchi transportga cheklov bor; avtoturargohdan piyoda yoki elektr avtobusda boriladi.','Для загрязняющего транспорта введены ограничения; от парковки идут пешком или на электробусе.','Polluting vehicles are restricted nearby; visitors walk or take an electric bus from parking.'],
  ['history','YUNESKO merosi','Наследие ЮНЕСКО','UNESCO heritage','Toj Mahal UNESCO Jahon merosi ro‘yxatidagi mashhur obidadir.','Тадж-Махал — известный объект Всемирного наследия ЮНЕСКО.','The Taj Mahal is a renowned UNESCO World Heritage Site.'],
]);

const tickets = ticketInfo(null, [
  'The cited Archaeological Survey of India URL redirected to the ASI homepage and did not expose a current Taj Mahal price table.',
  'Do not rely on old Wikipedia ticket prices; confirm the current tariff with ASI before payment.',
  'Avoid unofficial ticket-reseller sites.',
]);

export const tajMahalGuide = guideData('taj-mahal', wiki, facts, tickets);
