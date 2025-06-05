import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import useFilterAnak from '@/store/filter-anak-store'

const PaginationAnak = ({ totalAnak }: { totalAnak: number }) => {
    const { page, per_page, setFilter } = useFilterAnak()
    const totalPages = Math.ceil(totalAnak / per_page)

    if (totalPages <= 1) return null

    // Handlers for navigation
    const handlePreviousPage = () => page > 1 && setFilter({ page: page - 1 })
    const handleNextPage = () =>
        page < totalPages && setFilter({ page: page + 1 })
    const handlePageChange = (newPage: number) => setFilter({ page: newPage })

    // Generate pagination items with ellipsis logic
    const getPaginationItems = () => {
        const items: (number | string)[] = []
        const maxAdjacent = 1 // Number of pages to show around current page

        // Always show first page
        items.push(1)

        // Calculate start and end of middle pages
        const start = Math.max(2, page - maxAdjacent)
        const end = Math.min(totalPages - 1, page + maxAdjacent)

        // Add left ellipsis if needed
        if (start > 2) items.push('ellipsis-left')

        // Add middle pages
        for (let i = start; i <= end; i++) {
            items.push(i)
        }

        // Add right ellipsis if needed
        if (end < totalPages - 1) items.push('ellipsis-right')

        // Always show last page if there's more than 1 page
        if (totalPages > 1) items.push(totalPages)

        return items
    }

    const paginationItems = getPaginationItems()

    return (
        <div className="w-full grid grid-cols-12 gap-2 md:mt-4">
            <div className="col-span-12 md:col-span-6 text-sm text-gray-600 flex items-center justify-center md:justify-start">
                Halaman <strong className="mx-2">{page}</strong> dari{' '}
                <strong className="mx-2">{totalPages}</strong> ({totalAnak}{' '}
                Anak)
            </div>
            <div className="order-first md:order-last pb-4 md:pb-0 col-span-12 md:col-span-6 flex items-center justify-center md:justify-end">
                <Pagination className=" flex items-center justify-center md:justify-end">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={
                                    page === 1
                                        ? (e) => e.preventDefault()
                                        : handlePreviousPage
                                }
                                aria-disabled={page === 1}
                                tabIndex={page === 1 ? -1 : 0}
                                className={
                                    page === 1
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }
                            />
                        </PaginationItem>

                        {paginationItems.map(
                            (item: number | string, index: number) => {
                                if (typeof item === 'string') {
                                    return (
                                        <PaginationItem
                                            key={`${item}-${index}`}
                                        >
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )
                                }
                                return (
                                    <PaginationItem key={item}>
                                        <PaginationLink
                                            href="#"
                                            onClick={() =>
                                                handlePageChange(item)
                                            }
                                            isActive={page === item}
                                        >
                                            {item}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            }
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={
                                    page === totalPages
                                        ? (e) => e.preventDefault()
                                        : handleNextPage
                                }
                                aria-disabled={page === totalPages}
                                tabIndex={page === totalPages ? -1 : 0}
                                className={
                                    page === totalPages
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default PaginationAnak
