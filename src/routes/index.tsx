import ExpandingSections from '#/components/ExpandingSections'
import ContactSection from '#/components/ContactSection'
import RCheckSection from '#/components/RCheckSection'
import SkillsSection from '#/components/SkillsSection'
import ProjectsSection from '#/components/ProjectsSection'
import StatsSection from '#/components/StatsSection'
import HeroSection from '#/components/HeroSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="page-wrap font-inter">
      <ExpandingSections sections={[
        { label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>HOME</p>, content: <HeroSection />, color: "bg-black" },
        { label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>BIOGRAPHY</p>, content: <StatsSection />, color: "bg-green-900" },
        { label: <img className='w-100 object-cover' src='https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779206276/RCHECK_LOGO_1_nhnahq.png'></img>, content: <RCheckSection />, color: "bg-[#E0C337]" },
        { label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>SKILLS</p>, content: <SkillsSection />, color: "bg-[#EE3A3D]" },
        { label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14 text-[#111111]'>PROJECTS</p>, content: <ProjectsSection />, color: "bg-[#f4f4f4]" },
        { label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>CONTACT</p>, content: <ContactSection />, color: "bg-blue-800" },
      ]} />
    </main>
  )
}
