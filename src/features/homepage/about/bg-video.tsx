const BackgroundVideo = () => {
    return (
        <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/fallback.jpg"
            className="w-full h-full object-cover"
        />
    )
}

export default BackgroundVideo
