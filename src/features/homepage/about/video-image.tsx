import BackgroundVideo from './bg-video'

const VideoImageAbout = () => {
    return (
        <div className="w-full flex items-center justify-center relative overflow-hidden min-h-[200px] sm:min-h-[250px]">
            {/* Left Image */}
            <img
                src="/screenshot/homepage.png"
                alt="Screenshot list anak ATS"
                className="w-28 sm:w-36 md:w-44 absolute z-0 left-2 sm:left-6 md:left-10 -bottom-12 sm:-bottom-16 md:-bottom-20"
            />

            {/* Video Center */}
            <div className="relative z-10">
                <div className="w-28 md:-mb-10 sm:w-36 md:w-48 rounded-2xl overflow-hidden">
                    <BackgroundVideo />
                </div>
            </div>

            {/* Right Image */}
            <img
                src="/screenshot/list-anak.png"
                alt="Screenshot list anak ATS"
                className="w-28 sm:w-36 md:w-44 absolute z-0 right-2 sm:right-6 md:right-10 -bottom-12 sm:-bottom-16 md:-bottom-20"
            />
        </div>
    )
}

export default VideoImageAbout
