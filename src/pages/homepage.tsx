import AboutSection from '@/features/homepage/about'
import GridAbout from '@/features/homepage/about/about'
import ChartHome from '@/features/homepage/chart'
import { Footer } from '@/features/homepage/footer'
import Header from '@/features/homepage/header/hero'

const Homepage = () => {
    return (
        <>
            <Header />
            {/* <AboutSection /> */}
            <GridAbout />
            <ChartHome />
            <Footer />
        </>
    )
}

export default Homepage
