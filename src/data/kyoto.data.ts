import { guideData, makeFacts, ticketInfo } from './factFactory';
import type { Fact } from '../place.types';

const wiki = 'https://en.wikipedia.org/wiki/Kyoto';
const facts: Fact[] = makeFacts('kyoto', wiki, [
  ['visit','Kansai hududida','В регионе Кансай','In the Kansai region','Kyoto Yaponiyaning Honshu orolidagi Kansai hududida joylashgan.','Киото расположен в регионе Кансай на японском острове Хонсю.','Kyoto is in Japan’s Kansai region on Honshu.'],
  ['history','794-yildagi poytaxt','Столица с 794 года','Capital from 794','Imperator Kanmu 794-yilda yangi saroy markazi sifatida Heian-kyo shahrini tanlagan.','В 794 году император Камму выбрал Хэйан-кё новой столицей двора.','Emperor Kanmu selected Heian-kyo as the new court capital in 794.'],
  ['architecture','Chang’an namunasi','Образец Чанъаня','Chang’an model','Dastlabki shahar qadimgi Xitoy poytaxti Chang’an namunasi va feng shui tamoyillari asosida rejalangan.','Первоначальный город спланировали по образцу Чанъаня и принципам фэншуй.','The original city followed Chang’an’s model and feng shui principles.'],
  ['history','Heian-kyo nomi','Название Хэйан-кё','The name Heian-kyo','Shahar dastlab Heian-kyo — “Tinchlik poytaxti” deb atalgan.','Первоначально город назывался Хэйан-кё — «столица мира».','The city was first called Heian-kyo, “capital of peace.”'],
  ['history','Imperator saroyi','Императорский двор','Imperial court','Imperatorlar 1869-yilgacha asosan Kyotoda hukmronlik qilgan.','Императоры правили преимущественно из Киото до 1869 года.','Emperors ruled principally from Kyoto until 1869.'],
  ['history','Poytaxt ko‘chirilishi','Перенос столицы','Capital relocation','Meiji tiklanishidan so‘ng poytaxt Tokyoga ko‘chirilgan.','После реставрации Мэйдзи столицу перенесли в Токио.','The capital moved to Tokyo after the Meiji Restoration.'],
  ['history','Zamonaviy munitsipalitet','Современный муниципалитет','Modern municipality','Zamonaviy Kyoto munitsipaliteti 1889-yilda tashkil topgan.','Современный муниципалитет Киото создан в 1889 году.','Modern Kyoto municipality was established in 1889.'],
  ['history','Urush davrida saqlanishi','Сохранность во время войны','Preserved during the war','Shahar Ikkinchi jahon urushida keng ko‘lamli vayronagarchilikdan chetda qolgan.','Город избежал масштабных разрушений во время Второй мировой войны.','The city avoided large-scale destruction during World War II.'],
  ['culture','Yaponiyaning madaniy markazi','Культурный центр Японии','Japan’s cultural centre','Kyoto Yaponiyaning muhim madaniy markazlaridan biri sifatida qaraladi.','Киото считается одним из важнейших культурных центров Японии.','Kyoto is regarded as one of Japan’s major cultural centres.'],
  ['architecture','Ma’bad va ziyoratgohlar','Храмы и святилища','Temples and shrines','Shaharda ko‘plab buddaviy ibodatxonalar va sinto ziyoratgohlari joylashgan.','В городе находится множество буддийских храмов и синтоистских святилищ.','The city contains many Buddhist temples and Shinto shrines.'],
  ['architecture','Saroylar va bog‘lar','Дворцы и сады','Palaces and gardens','Kyoto tarixiy saroylari va bog‘lari bilan ham tanilgan.','Киото также известен историческими дворцами и садами.','Kyoto is also known for historic palaces and gardens.'],
  ['culture','Jahon merosi','Всемирное наследие','World Heritage','Shahardagi bir qancha diniy va tarixiy joylar UNESCO merosi majmuasiga kiradi.','Ряд религиозных и исторических мест города входят в объект наследия ЮНЕСКО.','Several religious and historic sites in the city form part of a UNESCO property.'],
  ['architecture','Imperator saroyi','Императорский дворец','Imperial Palace','Kyoto Imperial Palace shaharning muhim tarixiy obidalaridan biridir.','Императорский дворец Киото — одна из важных исторических достопримечательностей.','The Kyoto Imperial Palace is a prominent historic landmark.'],
  ['architecture','Kiyomizu-dera','Киёмицу-дэра','Kiyomizu-dera','Kiyomizu-dera shaharda tilga olingan mashhur buddaviy ibodatxonalardan biridir.','Киёмицу-дэра — один из известных буддийских храмов города.','Kiyomizu-dera is one of the city’s noted Buddhist temples.'],
  ['architecture','Kinkaku-ji va Ginkaku-ji','Кинкакудзи и Гинкакудзи','Kinkaku-ji and Ginkaku-ji','Oltin va Kumush pavilyonlar shaharning muhim diqqatga sazovor joylari qatorida.','Золотой и Серебряный павильоны входят в число важных достопримечательностей.','The Golden and Silver Pavilions are among the city’s notable attractions.'],
  ['history','Ming yillik poytaxt','Тысячелетняя столица','A millennium capital','794–1868-yillardagi uzoq poytaxtlik davri sabab Kyoto ba’zan “ming yillik poytaxt” deyiladi.','Из-за длительного столичного периода 794–1868 годов Киото называют «тысячелетней столицей».','Its long capital era from 794 to 1868 has earned Kyoto the label “thousand-year capital.”'],
  ['culture','Eski nomlari','Прежние названия','Former names','Shahar tarixda Kyo, Miyako, Kyo no Miyako va Keishi nomlari bilan ham atalgan.','Исторические названия города включали Кё, Мияко, Кё-но-Мияко и Кэйси.','Historical names include Kyo, Miyako, Kyo no Miyako and Keishi.'],
  ['history','Saikyō nomi','Название Сайкё','The name Saikyo','Tokyoga “sharqiy poytaxt” nomi berilgach, Kyoto qisqa muddat “g‘arbiy poytaxt” deb atalgan.','После появления Токио как «восточной столицы» Киото недолго называли «западной столицей».','After Tokyo became the “eastern capital,” Kyoto was briefly called the “western capital.”'],
  ['culture','Oliy ta’lim','Высшее образование','Higher education','Kyoto yirik oliy ta’lim markazi bo‘lib, Kyoto universiteti shu yerda joylashgan.','Киото — крупный образовательный центр; здесь находится Киотский университет.','Kyoto is a major higher-education centre and home to Kyoto University.'],
  ['culture','Nintendo shahri','Город Nintendo','Home of Nintendo','Xalqaro videoo‘yin kompaniyasi Nintendo bosh qarorgohi Kyotoda joylashgan.','Штаб-квартира международной компании Nintendo находится в Киото.','International video game company Nintendo is headquartered in Kyoto.'],
]);

const tickets = ticketInfo(null, [
  'Kyoto is a city with many separately operated attractions; there is no single city admission ticket.',
  'No current official price schedule for a specific attraction was verified in this pass.',
  'Purchase tickets directly from each temple, museum or attraction’s official site.',
]);

export const kyotoGuide = guideData('kyoto', wiki, facts, tickets);
