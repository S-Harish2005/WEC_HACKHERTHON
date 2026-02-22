import Hero from '@/components/sections/hero'
import CarouselSection from '@/components/sections/carousel-section'
import About from '@/components/sections/about'
import ProblemStatement from '@/components/sections/problem-statement'
import Teams from '@/components/sections/teams'
import WhyParticipate from '@/components/sections/why-participate'
import Timeline from '@/components/sections/timeline'
import Prizes from '@/components/sections/prizes'
import Rules from '@/components/sections/rules'
import FAQ from '@/components/sections/faq'
import Footer from '@/components/sections/footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <div id="about"><CarouselSection /></div>
      <About />
      <div id="problems"><ProblemStatement /></div>
      <Teams />
      <WhyParticipate />
      <div id="timeline"><Timeline /></div>
      <div id="prizes"><Prizes /></div>
      <div id="rules"><Rules /></div>
      <div id="faq"><FAQ /></div>
      <Footer />
    </main>
  )
}
