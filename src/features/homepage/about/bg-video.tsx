const BackgroundVideo = () => {
    return (
        <video
            src="/video.webm" // ganti dengan path/URL video .webm kamu
            autoPlay
            loop
            muted
            playsInline
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                marginBottom: '-58px',
                position: 'relative',
                zIndex: 10,
            }}
        />
    )
}

export default BackgroundVideo
