const BackgroundVideo = () => {
    return (
        <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/fallback.jpg"
            style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
            }}
        ></video>
    )
}

export default BackgroundVideo
