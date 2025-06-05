import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useFilterAnak from '@/store/filter-anak-store'
import { Search } from 'lucide-react'
const SearchForm = () => {
    const { setFilter, parameter } = useFilterAnak()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const searchValue = formData.get('search') as string
        setFilter({ parameter: searchValue, page: 1 })
    }

    return (
        <div className="w-full flex items-center space-x-2">
            <form
                className="flex w-full max-w-lg items-center space-x-2"
                onSubmit={handleSearch}
            >
                <Input
                    type="text"
                    name="search"
                    placeholder="Cari nama anak atau nik"
                    className="w-full placeholder:text-xs md:placeholder:text-base"
                    defaultValue={parameter || ''}
                />
                <Button type="submit" variant={'default'}>
                    <Search className="size-4" />
                    <span className="hidden md:inline">Cari</span>
                </Button>
            </form>
        </div>
    )
}

export default SearchForm
