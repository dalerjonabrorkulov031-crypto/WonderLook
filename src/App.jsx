import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, LayoutGrid, Map, SlidersHorizontal, X } from 'lucide-react'
import { LANGS, UI, CATS } from './i18n'
import { PLACES } from './data/places'
import { useLocalStorage, usePremium } from './hooks'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorldMap from './components/WorldMap'
import PlaceCard from './components/PlaceCard'
import PlaceModal from './components/PlaceModal'
import InfiniteMarquee from './components/InfiniteMarquee'
import Calculator from './components/Calculator'
import CalendarWidget from './components/CalendarWidget'
import PricingModal from './components/PricingModal'
import ProVideoModal from './components/ProVideoModal'
import PlaceGuidePage from './components/PlaceGuidePage'
import PlaceTravelGuidePage from './components/PlaceTravelGuidePage'
import { PremiumVideo } from './components/PremiumVideo'
import { samarkand } from './data/samarkand.data'
import PremiumPage from './components/PremiumPage'

export default function App() {
  const [lang, setLang] = useLocalStorage('wl-lang', 'uz')
  const [dark, setDark] = useLocalStorage('wl-dark', true)
  const [favs, setFavs] = useLocalStorage('wl-favs', [])
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [showSaved, setShowSaved] = useState(false)
  const [view, setView] = useState('grid')
  const [selected, setSelected] = useState(null)
  const [mapFocusId, setMapFocusId] = useState(null)
  const [plannerPlaceId, setPlannerPlaceId] = useLocalStorage('wl-planner-place', 'registan')
  const [savedDates, setSavedDates] = useLocalStorage('wl-trip-dates', null)
  const { isPremium: isProMember, activateDemoPremium } = usePremium()
  const [pricingOpen, setPricingOpen] = useState(false)
  const [videoPlace, setVideoPlace] = useState(null)
  const [pathname, setPathname] = useState(window.location.pathname)
  const t = UI[lang] ?? UI.en
  const closeSelected = useCallback(() => setSelected(null), [])

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  const navigate = useCallback((path) => {
    window.history.pushState({}, '', path)
    setPathname(window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openPlaceGuide = useCallback((place) => {
    const id = place.city.uz === 'Samarqand'
      ? 'samarkand'
      : place.id === 'eiffel-tower'
        ? 'eiffel'
        : place.id === 'swiss-alps'
          ? 'alps'
          : place.id
    setSelected(null)
    navigate(`/place/${id}`)
  }, [navigate])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.lang = lang
    if (pathname === '/') document.title = t.documentTitle
  }, [dark, lang, pathname, t.documentTitle])

  useEffect(() => {
    const key = `wl-pageviews-${new Date().toISOString().slice(0, 10)}`
    const pageviews = Number(sessionStorage.getItem(key) || '0')
    sessionStorage.setItem(key, String(pageviews + 1))
    window.dispatchEvent(new CustomEvent('wonderlook:pageview', { detail: { path: pathname } }))
  }, [pathname])

  const places = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    return PLACES.filter((place) => {
      if (showSaved && !favs.includes(place.id)) return false
      if (cat !== 'all' && !place.categories.includes(cat)) return false
      if (countryFilter !== 'all' && place.country.en !== countryFilter) return false
      if (place.rating < minRating) return false
      if (!search) return true
      const searchable = [
        ...LANGS.flatMap((locale) => [
          place.name[locale], place.city[locale], place.country[locale],
          ...place.categories.map((category) => UI[locale][category]),
        ]),
      ].join(' ').toLocaleLowerCase()
      return searchable.includes(search)
    })
  }, [cat, countryFilter, favs, lang, minRating, query, showSaved])

  const suggestions = useMemo(() => {
    const search = query.trim().toLocaleLowerCase()
    if (!search) return []
    return PLACES.filter((place) => LANGS.some((locale) => (
      `${place.name[locale]} ${place.city[locale]} ${place.country[locale]}`
        .toLocaleLowerCase()
        .includes(search)
    )))
  }, [query])

  const selectSuggestion = (place) => {
    setQuery(place.name[lang])
    setCat('all')
    setCountryFilter('all')
    setMinRating(0)
    setShowSaved(false)
    setMapFocusId(place.id)
    setView('map')
    document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleFavorite = (id) => {
    setFavs((current) => current.includes(id)
      ? current.filter((favorite) => favorite !== id)
      : [...current, id])
  }

  const clearFilters = () => {
    setQuery('')
    setCat('all')
    setCountryFilter('all')
    setMinRating(0)
    setShowSaved(false)
    setMapFocusId(null)
  }

  return (
    <div className="app-shell">
      <ParticleBackground dark={dark} />
      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        dark={dark}
        setDark={setDark}
        savedCount={favs.length}
        isProMember={isProMember}
        onUpgrade={() => navigate('/premium')}
        isGuide={pathname !== '/'}
        onMap={(event) => {
          event.preventDefault()
          setView('map')
          if (pathname !== '/') {
            navigate('/')
            window.setTimeout(() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }), 50)
          } else {
            document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        onSaved={() => {
          setShowSaved(true)
          if (pathname !== '/') {
            navigate('/')
            window.setTimeout(() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }), 50)
          } else {
            document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />
      <main>
        {pathname === '/' ? (
          <>
        <Hero
          t={t}
          lang={lang}
          query={query}
          places={PLACES}
          setQuery={(value) => {
            setQuery(value)
            const search = value.trim().toLocaleLowerCase()
            const exactPlace = search && PLACES.find((place) => LANGS.some((locale) => (
              [place.name[locale], place.city[locale], place.country[locale]]
                .some((text) => text.toLocaleLowerCase() === search)
            )))
            if (exactPlace) {
              setMapFocusId(exactPlace.id)
              setView('map')
              setCat('all')
              setCountryFilter('all')
              setMinRating(0)
              setShowSaved(false)
            } else if (!search) {
              setMapFocusId(null)
            }
          }}
          suggestions={suggestions}
          onSelectSuggestion={selectSuggestion}
          onPickPlace={setSelected}
        />

        <InfiniteMarquee places={PLACES} lang={lang} t={t} onPick={setSelected} />

        <section id="discover" className="discover-section page-width">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow"><span />{t.region}</span>
              <h2 className="section-title">{showSaved ? t.savedTitle : t.galleryTitle}</h2>
              <p className="section-subtitle">{places.length} {t.found}</p>
            </div>
            <div className="view-switch" role="group" aria-label={t.chooseView}>
              <button
                type="button"
                onClick={() => setView('grid')}
                className={view === 'grid' ? 'view-button is-active' : 'view-button'}
                aria-pressed={view === 'grid'}
              >
                <LayoutGrid size={16} /> <span>{t.gridView}</span>
              </button>
              <button
                type="button"
                onClick={() => setView('map')}
                className={view === 'map' ? 'view-button is-active' : 'view-button'}
                aria-pressed={view === 'map'}
              >
                <Map size={16} /> <span>{t.mapView}</span>
              </button>
            </div>
          </div>

          <div className="filter-bar">
            <div className="filter-categories" aria-label={t.galleryTitle}>
              {['all', ...CATS].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCat(category)}
                  className={`chip ${cat === category ? 'chip-on' : ''}`}
                  aria-pressed={cat === category}
                >
                  {category === 'all' ? t.all : t[category]}
                </button>
              ))}
            </div>
            <label className="rating-filter">
              <SlidersHorizontal size={15} aria-hidden="true" />
              <span className="sr-only">{t.minRating}</span>
              <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))}>
                <option value={0}>{t.minRating}: {t.all}</option>
                {[4.6, 4.7, 4.8, 4.9].map((rating) => (
                  <option key={rating} value={rating}>{t.minRating}: {rating}+</option>
                ))}
              </select>
            </label>
            <label className="rating-filter country-filter">
              <span className="sr-only">{lang === 'uz' ? 'Davlat bo‘yicha filtr' : lang === 'ru' ? 'Фильтр по стране' : 'Filter by country'}</span>
              <select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}>
                <option value="all">{lang === 'uz' ? 'Barcha davlatlar' : lang === 'ru' ? 'Все страны' : 'All countries'}</option>
                {[...new globalThis.Map(PLACES.map((place) => [place.country.en, place.country[lang]])).entries()].sort(([a], [b]) => a.localeCompare(b)).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            {(query || cat !== 'all' || countryFilter !== 'all' || minRating > 0 || showSaved) && (
              <button type="button" className="clear-filters" onClick={clearFilters}>
                <X size={14} /> {t.clear}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {view === 'map' ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <div className="map-heading">
                  <div><h3>{t.mapTitle}</h3><p>{t.mapHint}</p></div>
                  <span className="map-count"><Map size={14} /> {places.length}</span>
                </div>
                <WorldMap
                  places={places}
                  lang={lang}
                  t={t}
                  query={query}
                  focusId={mapFocusId}
                  onPick={setSelected}
                />
              </motion.div>
            ) : (
              <motion.div
                key="gallery"
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="places-grid"
              >
                <AnimatePresence mode="popLayout">
                  {places.map((place, index) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      index={index}
                      lang={lang}
                      t={t}
                      saved={favs.includes(place.id)}
                      onToggle={toggleFavorite}
                      onOpen={setSelected}
                      onOpenGuide={openPlaceGuide}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          {places.length === 0 && (
            <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="empty-icon"><Map size={22} /></div>
              <p>{showSaved && favs.length === 0 ? t.savedEmpty : t.noResults}</p>
              <button type="button" className="text-button" onClick={clearFilters}>{t.clear}</button>
            </motion.div>
          )}
        </section>

        <section className="planner-section page-width" id="planner">
          <div className="planner-section-heading">
            <span className="section-eyebrow"><span />{t.plannerEyebrow}</span>
            <h2>{t.plannerTitle}</h2>
          </div>
          <div className="planner-grid">
            <Calculator
              places={PLACES}
              lang={lang}
              t={t}
              selectedId={plannerPlaceId}
              onDestinationChange={setPlannerPlaceId}
            />
            <CalendarWidget
              places={PLACES}
              lang={lang}
              t={t}
              selectedId={plannerPlaceId}
              savedDates={savedDates}
              onDestinationChange={setPlannerPlaceId}
              onSave={setSavedDates}
            />
          </div>
        </section>
        <section className="guide-section page-width" id="videos">
          <div className="guide-section-heading">
            <span>WATCH / SAMARKAND</span>
            <h2>{lang === 'uz' ? 'Safardan oldin tomosha qiling' : lang === 'ru' ? 'Посмотрите перед поездкой' : 'Watch before you go'}</h2>
          </div>
          <div className="guide-video-grid">
            {samarkand.videos.map((video) => <PremiumVideo key={video.id} video={video} lang={lang} isPremium={isProMember} onUpgrade={() => setPricingOpen(true)} />)}
          </div>
        </section>
        <section className="guide-section page-width" id="about">
          <div className="guide-section-heading">
            <span>ABOUT WONDERLOOK</span>
            <h2>{lang === 'uz' ? 'DunyoKo‘z — dunyoni yaqindan ko‘ring.' : lang === 'ru' ? 'WonderLook — увидьте мир ближе.' : 'WonderLook — see the world more closely.'}</h2>
          </div>
          <p className="section-subtitle">{t.footer}</p>
        </section>
          </>
        ) : pathname === '/place/samarkand' ? (
          <PlaceGuidePage
            lang={lang}
            isPremium={isProMember}
            saved={favs.includes('samarkand')}
            onToggleFavorite={toggleFavorite}
            onUpgrade={() => setPricingOpen(true)}
            onHome={() => navigate('/')}
          />
        ) : pathname.startsWith('/place/') ? (
          <PlaceTravelGuidePage
            id={decodeURIComponent(pathname.slice('/place/'.length))}
            lang={lang}
            isPremium={isProMember}
            saved={favs.includes(
              pathname.endsWith('/eiffel') ? 'eiffel-tower'
                : pathname.endsWith('/alps') ? 'swiss-alps'
                  : pathname.endsWith('/samarkand') ? 'samarkand'
                    : decodeURIComponent(pathname.slice('/place/'.length)),
            )}
            onToggleFavorite={toggleFavorite}
            onUpgrade={() => setPricingOpen(true)}
            onHome={() => navigate('/')}
          />
        ) : pathname === '/premium' ? (
          <PremiumPage lang={lang} isPremium={isProMember} onActivate={activateDemoPremium} />
        ) : (
          <section className="not-found page-width">
            <span>404</span>
            <h1>{lang === 'uz' ? 'Sahifa topilmadi' : lang === 'ru' ? 'Страница не найдена' : 'Page not found'}</h1>
            <button type="button" onClick={() => navigate('/')}>{lang === 'uz' ? 'Bosh sahifaga qaytish' : lang === 'ru' ? 'На главную' : 'Back to home'}</button>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <a href="#top" className="footer-brand">W<span>·</span>L</a>
        <p>© {new Date().getFullYear()} WonderLook <span>— DunyoKo'z</span></p>
        <p>{t.footer}</p>
        <a className="back-top" href="#top" aria-label={t.backTop}><ArrowDown size={15} /></a>
      </footer>

      <PlaceModal
        place={selected}
        lang={lang}
        t={t}
        saved={selected ? favs.includes(selected.id) : false}
        isProMember={isProMember}
        onToggle={toggleFavorite}
        onUpgrade={() => setPricingOpen(true)}
        onPlayVideo={setVideoPlace}
        onClose={closeSelected}
        onOpenGuide={openPlaceGuide}
      />
      <PricingModal
        open={pricingOpen}
        t={t}
        isPro={isProMember}
        onClose={() => setPricingOpen(false)}
        onActivate={activateDemoPremium}
      />
      <ProVideoModal
        place={videoPlace}
        lang={lang}
        t={t}
        isProMember={isProMember}
        onClose={() => setVideoPlace(null)}
        onUpgrade={() => setPricingOpen(true)}
      />
    </div>
  )
}
