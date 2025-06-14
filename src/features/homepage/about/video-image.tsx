import BackgroundVideo from './bg-video'

const VideoImageAbout = () => {
    return (
        <div className="w-full flex items-center justify-center  pt-20 overflow-hidden">
            <img
                src="/screenshot/homepage.png"
                className="w-[200px] relative z-0 -mr-12 -mb-60"
                alt="Screenshot list anak ATS"
            />
            <div className="w-[200px] rounded-4xl -mb-20 relative z-10 overflow-hidden">
                <BackgroundVideo />
            </div>
            <img
                src="/screenshot/list-anak.png"
                className="w-[200px] relative z-0 -ml-12 -mb-60"
                alt="Screenshot list anak ATS"
            />
        </div>
    )
}

export default VideoImageAbout
