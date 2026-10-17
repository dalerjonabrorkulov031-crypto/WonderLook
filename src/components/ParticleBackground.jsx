import { useEffect, useRef } from 'react'
// Live particle network that reacts to the mouse (repels + connects)
export default function ParticleBackground({ dark }) {
  const ref = useRef(null)
  const darkRef = useRef(dark)
  darkRef.current = dark
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext('2d')
    let w, h, raf, mouse = { x: -999, y: -999 }
    const resize = () => { w = cv.width = innerWidth; h = cv.height = innerHeight }
    resize()
    const N = Math.min(110, Math.floor((innerWidth * innerHeight) / 14000))
    const ps = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 1.8 + .6 }))
    const move = (e) => { mouse = { x: e.clientX, y: e.clientY } }
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      const c = darkRef.current ? '167,139,250' : '79,70,229'
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy)
        if (d < 140) { p.vx += dx / d * .05; p.vy += dy / d * .05 }
        p.vx *= .99; p.vy *= .99
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = `rgba(${c},.8)`; ctx.fill()
      }
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(ps[i].x - ps[j].x, ps[i].y - ps[j].y)
        if (d < 120) { ctx.strokeStyle = `rgba(${c},${.22 * (1 - d / 120)})`; ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y); ctx.stroke() }
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    addEventListener('resize', resize); addEventListener('mousemove', move)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', move) }
  }, [])
  return (
    <>
      <div className="fixed inset-0 -z-20 transition-opacity duration-700"
        style={{ background: dark
          ? 'radial-gradient(60% 50% at 20% 10%,#2b1b5e55,transparent),radial-gradient(50% 50% at 90% 80%,#0c4a6e66,transparent)'
          : 'radial-gradient(60% 50% at 20% 10%,#c7d2fe99,transparent),radial-gradient(50% 50% at 90% 80%,#bae6fd99,transparent)' }} />
      <canvas ref={ref} className="fixed inset-0 -z-10 pointer-events-none" />
    </>
  )
}
