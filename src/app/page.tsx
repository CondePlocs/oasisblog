import Header from '@/components/Header'
import HeroCarousel from '@/components/HeroCarousel'
import BandHistory from '@/components/BandHistory'
import Reunion from '@/components/Reunion'
import BrothersFight from '@/components/BrothersFight'
import FamousSongs from '@/components/FamousSongs'
import BandMilestones from '@/components/BandMilestones'
import Influences from '@/components/Influences'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <Header />
      <HeroCarousel />
      
      <main className="container mx-auto px-4 py-8 space-y-16">
        <BandHistory />
        <Reunion />
        <BrothersFight />
        <FamousSongs />
        <BandMilestones />
        <Influences />
      </main>
      
      <Footer />
    </div>
  )
}
