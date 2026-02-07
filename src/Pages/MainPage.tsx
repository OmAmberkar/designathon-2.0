import About from '@/Components/About/About'
import Faqs from '@/Components/FAQs/Faqs'
import HeroSection from '@/Components/HeroSection/HeroSection'
import MissionGuidelines from '@/Components/MissionGuidelines/MissionGuidelines'
import MissionLogs from '@/Components/MissionLogs/MissionLogs'
import MissionRewards from '@/Components/MissionRewards/MissionRewards'
import Sponsors from '@/Components/Sponsors/Sponsors'
import TimeLine from '@/Components/TimeLine/TimeLine'

const MainPage = () => {
    return (
        <>
            <HeroSection />
            <MissionLogs />
            <MissionRewards />
            <TimeLine />
            <MissionGuidelines />
            <Sponsors />
            <Faqs />
            <About />
        </>
    )
}

export default MainPage