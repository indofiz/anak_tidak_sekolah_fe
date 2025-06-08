import BackgroundVideo from './bg-video'

const VideoImageAbout = () => {
    return (
        <div className="col-span-12 md:col-span-6">
            <div className="w-full  bg-gray-50 border rounded-3xl flex items-center justify-center  pt-20 overflow-hidden">
                <img
                    src="/screenshot/homepage.png"
                    className="w-[200px] -mr-12 -mb-50"
                    alt="Screenshot list anak ATS"
                />
                <div className="w-[200px] overflow-hidden">
                    <BackgroundVideo />
                </div>
                <img
                    src="/screenshot/list-anak.png"
                    className="w-[200px] -ml-12 -mb-50"
                    alt="Screenshot list anak ATS"
                />
            </div>
        </div>
    )
}

export default VideoImageAbout
