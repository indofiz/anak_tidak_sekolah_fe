const TopCard = () => {
    return (
        <div className="col-span-8 bg-yellow-primary bg-[url('/bg-to-dashboard.png')] bg-top-right bg-no-repeat bg-size-[200px] px-14 py-8 rounded-lg text-black flex flex-col gap-2">
            <div className="text-3xl font-semibold">
                “Kenali. Peduli. Laporkan.”
            </div>
            <div className="text-lg">
                Mari ambil peran kecil untuk masa depan besar anak-anak kita.
            </div>
            <button className="w-fit py-3 mt-4 bg-blue-primary font-semibold px-8 text-white rounded-md hover:bg-gray-800">
                Laporkan Sekarang
            </button>
        </div>
    )
}

export default TopCard
