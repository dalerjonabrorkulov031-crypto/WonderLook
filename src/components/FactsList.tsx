import { motion } from 'framer-motion';
import type { Fact, Lang } from '../place.types';

const categoryLabels: Record<Lang, Record<Fact['category'], string>> = {
  uz: { history: 'tarix', architecture: 'me’morchilik', culture: 'madaniyat', science: 'fan', food: 'taom', legend: 'afsona', visit: 'tashrif' },
  ru: { history: 'история', architecture: 'архитектура', culture: 'культура', science: 'наука', food: 'еда', legend: 'легенда', visit: 'советы' },
  en: { history: 'history', architecture: 'architecture', culture: 'culture', science: 'science', food: 'food', legend: 'legend', visit: 'visit' },
};

export function FactsList({ facts, lang }: { facts: Fact[]; lang: Lang }) {
  return (
    <ol className="facts-grid">
      {facts.map((fact, index) => (
        <motion.li
          key={fact.id}
          className="guide-fact"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
        >
          <span className="guide-fact-kicker">{String(index + 1).padStart(2, '0')} · {categoryLabels[lang][fact.category]}</span>
          <h3>{fact.title[lang] || fact.title.uz}</h3>
          <p>{fact.text[lang] || fact.text.uz}</p>
          {fact.source && <a href={fact.source} target="_blank" rel="noreferrer">{lang === 'uz' ? 'Manba' : lang === 'ru' ? 'Источник' : 'Source'} ↗</a>}
        </motion.li>
      ))}
    </ol>
  );
}
