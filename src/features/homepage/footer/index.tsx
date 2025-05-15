import { LogoFooter } from './logo'
import MapKontak from './map-kontak'
import MenuFooter from './menu-footer'
import { PetaFooter } from './peta'

export const Footer = () => {
    return (
        <>
            <div className="md:px-12 md:container md:justify-center md:items-center md:mx-auto md:flex md:gap-8 mt-12 md:mt-24 text-white -mb-40 pb-8 mx-4 bg-gradient-to-b overflow-clip before:content-[''] before:absolute before:-z-10 before:bg-auto before:inset-0 before:bg-gradient-fot before:bg-right-bottom before:bg-no-repeat from-[#59BBE8] to-[#0E75A5] relative z-20 p-4 md:p-12 md:py-16 rounded-3xl">
                <PetaFooter />
                <MapKontak />
            </div>
            <footer className="bg-black text-white pt-52">
                <div className="container mx-auto lg:flex lg:justify-between">
                    <LogoFooter />
                    <MenuFooter />
                </div>
                <h5 className="bg-blue-primary text-center py-4 mt-12 px-6 md:px-0">
                    Copyright &copy; Pangkalpinang {new Date().getFullYear()}{' '}
                    Pangkalpinang, Pangkal Kemenangan
                </h5>
            </footer>
        </>
    )
}
