import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap } from 'react-leaflet'
import { MapPin, Star } from 'lucide-react'

function FocusMap({ places, query, focusId }) {
  const map = useMap()

  useEffect(() => {
    const target = places.find((place) => place.id === focusId) ?? (query.trim() ? places[0] : null)
    if (target) map.flyTo([target.latitude, target.longitude], Math.max(map.getZoom(), 5), { duration: 0.8 })
  }, [focusId, map, places, query])

  return null
}

export default function WorldMap({ places, lang, t, query, focusId, onPick }) {
  return (
    <div className="map-shell">
      <MapContainer
        center={[24, 8]}
        zoom={2}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom={false}
        zoomControl={false}
        worldCopyJump
        className="world-map"
        aria-label={t.mapTitle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl zoomInTitle={t.zoomIn} zoomOutTitle={t.zoomOut} />
        <FocusMap places={places} query={query} focusId={focusId} />
        {places.map((place) => (
          <CircleMarker
            key={place.id}
            center={[place.latitude, place.longitude]}
            radius={8}
            pathOptions={{
              color: '#f8fafc',
              weight: 2,
              fillColor: '#a78bfa',
              fillOpacity: 0.95,
            }}
          >
            <Popup>
              <div className="map-popup">
                <img src={place.images[0]} alt="" loading="lazy" />
                <div className="map-popup-copy">
                  <span><MapPin size={12} /> {place.city[lang]}, {place.country[lang]}</span>
                  <strong>{place.name[lang]}</strong>
                  <span className="map-popup-rating"><Star size={12} fill="currentColor" /> {place.rating}</span>
                  <button type="button" onClick={() => onPick(place)}>{t.result} <span aria-hidden="true">↗</span></button>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
