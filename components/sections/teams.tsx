'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { Users, ChevronLeft, ChevronRight } from 'lucide-react'

type TeamMember = {
  name: string
  role: string
  image: string
  bio: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Chairperson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Leading the initiative with vision and innovation',
  },
  {
    name: 'Prof. Rajesh Kumar',
    role: 'Faculty Coordinator',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Overseeing technical excellence and mentorship',
  },
  {
    name: 'Prof. Anjali Singh',
    role: 'Faculty Coordinator',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Supporting student innovation and growth',
  },
  {
    name: 'Prof. Vikram Patel',
    role: 'Faculty Coordinator',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Ensuring quality and industry standards',
  },
  {
    name: 'Sneha Reddy',
    role: 'Student Council Joint Secretary',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    bio: 'Coordinating student engagement and outreach',
  },
]

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 20
const SPRING_OPTIONS = { type: 'spring' as const, stiffness: 300, damping: 30 }
const BASE_WIDTH = 300
const CONTAINER_PADDING = 16
const ITEM_WIDTH = BASE_WIDTH - CONTAINER_PADDING * 2
const TRACK_ITEM_OFFSET = ITEM_WIDTH + GAP

interface MemberCardProps {
  member: TeamMember
  index: number
  x: ReturnType<typeof useMotionValue<number>>
  transition: object
}

function MemberCard({ member, index, x, transition }: MemberCardProps) {
  const range = [
    -(index + 1) * TRACK_ITEM_OFFSET,
    -index * TRACK_ITEM_OFFSET,
    -(index - 1) * TRACK_ITEM_OFFSET,
  ]
  const rotateY = useTransform(x, range, [90, 0, -90], { clamp: false })

  return (
    <motion.div
      style={{
        width: ITEM_WIDTH,
        flexShrink: 0,
        rotateY,
      }}
      transition={transition}
      className="relative flex flex-col items-start justify-between border border-primary/25 rounded-xl bg-card/80 backdrop-blur-sm overflow-hidden cursor-grab active:cursor-grabbing h-72 group hover:border-primary/50 transition-colors duration-300"
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header with image */}
      <div className="p-5 pb-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-14 h-14 rounded-xl object-cover border-2 border-primary/30 group-hover:border-primary/60 shadow-md transition-all duration-300"
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="p-5 pt-4 flex flex-col gap-1 flex-1 justify-end">
        <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest">{member.role}</p>
        <h3 className="text-lg font-bold text-foreground leading-tight">{member.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-1">{member.bio}</p>
        <div className="mt-3 h-0.5 w-8 bg-gradient-to-r from-primary to-secondary rounded-full" />
      </div>
    </motion.div>
  )
}

function TeamCarousel() {
  const items = teamMembers
  const loop = true

  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items
    return [items[items.length - 1], ...items, items[0]]
  }, [items, loop])

  const [position, setPosition] = useState(loop ? 1 : 0)
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      if (!isHovered) {
        setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1))
      }
    }, 3200)
  }
  const stopAuto = () => { if (autoRef.current) clearInterval(autoRef.current) }

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [itemsForRender.length, isHovered])

  useEffect(() => {
    setPosition(loop ? 1 : 0)
    x.set(-(loop ? 1 : 0) * TRACK_ITEM_OFFSET)
  }, [items.length, loop])

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) { setIsAnimating(false); return }
    const last = itemsForRender.length - 1
    if (position === last) {
      setIsJumping(true)
      setPosition(1)
      x.set(-1 * TRACK_ITEM_OFFSET)
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false) })
      return
    }
    if (position === 0) {
      setIsJumping(true)
      const target = items.length
      setPosition(target)
      x.set(-target * TRACK_ITEM_OFFSET)
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false) })
      return
    }
    setIsAnimating(false)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const dir =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1
      : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1
      : 0
    if (dir === 0) return
    setPosition(prev => Math.max(0, Math.min(prev + dir, itemsForRender.length - 1)))
  }

  const activeIndex = loop
    ? (position - 1 + items.length) % items.length
    : Math.min(position, items.length - 1)

  return (
    <div
      ref={containerRef}
      style={{ width: `${BASE_WIDTH}px` }}
      className="relative overflow-hidden border border-primary/20 rounded-2xl p-4 bg-card/30 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        dragConstraints={loop ? undefined : {
          left: -TRACK_ITEM_OFFSET * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        }}
        style={{
          width: ITEM_WIDTH,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * TRACK_ITEM_OFFSET + ITEM_WIDTH / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * TRACK_ITEM_OFFSET) }}
        transition={effectiveTransition}
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((member, i) => (
          <MemberCard
            key={`${member.name}-${i}`}
            member={member}
            index={i}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      {/* Arrows + Dot indicators */}
      <div className="flex items-center justify-center gap-4 mt-5">
        {/* Prev arrow */}
        <button
          onClick={() => {
            stopAuto()
            setPosition(prev => Math.max(0, prev - 1))
            startAuto()
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/25 hover:border-primary/50 hover:scale-110 transition-all duration-200"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <motion.button
              key={i}
              className={`h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                activeIndex === i ? 'bg-primary' : 'bg-primary/30'
              }`}
              animate={{ width: activeIndex === i ? 24 : 8, scale: activeIndex === i ? 1.1 : 1 }}
              onClick={() => {
                stopAuto()
                setPosition(loop ? i + 1 : i)
                startAuto()
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => {
            stopAuto()
            setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1))
            startAuto()
          }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/25 hover:border-primary/50 hover:scale-110 transition-all duration-200"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default function Teams() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-background via-[#1a1a2e] to-background overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-gradient-to-l from-secondary/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Meet The Team</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
            Leadership & Coordination
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated team driving HACKHERTHON forward with passion, expertise, and commitment to empowering innovators.
          </p>
        </div>

        {/* Carousel — centred on page */}
        <div className={`flex justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <TeamCarousel />
        </div>
      </div>
    </section>
  )
}