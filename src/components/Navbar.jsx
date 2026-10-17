import { Bookmark, Crown, Globe2, Moon, Sun } from 'lucide-react'
import { LANGS } from '../i18n'

export default function Navbar({
  t, lang, setLang, dark, setDark, savedCount, onSaved, onMap, isProMember, onUpgrade,
}) {
  return (
    <header className="site-header">
      <nav className="nav-bar" aria-label={t.navLabel}>
        <a href="#top" className="brand" aria-label={t.homeLabel}>
          <span className="brand-mark"><Globe2 size={20} strokeWidth={1.7} /></span>
          <span>WonderLook<span className="brand-period">.</span></span>
        </a>
        <div className="nav-links">
          <a href="#discover">{t.gallery}</a>
          <a href="#discover" onClick={onMap}>{t.map}</a>
          <a href="#planner">{t.plannerNav}</a>
        </div>
        <div className="nav-actions">
          <button type="button" className={`nav-pro-button${isProMember ? ' is-member' : ''}`} onClick={onUpgrade}>
            <Crown size={14} /> <span>{isProMember ? t.proActive : t.upgradePro}</span>
          </button>
          <div className="language-switch" role="group" aria-label={t.languageLabel}>
            {LANGS.map((locale) => (
              <button
                key={locale}
                type="button"
                onClick={() => setLang(locale)}
                className={lang === locale ? 'language-button is-active' : 'language-button'}
                aria-pressed={lang === locale}
                lang={locale}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
          <button type="button" className="icon-button saved-nav" onClick={onSaved} aria-label={`${t.saved} (${savedCount})`}>
            <Bookmark size={17} />
            {savedCount > 0 && <span className="saved-badge">{savedCount}</span>}
          </button>
          <button
            type="button"
            className="icon-button theme-button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? t.themeLight : t.themeDark}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
