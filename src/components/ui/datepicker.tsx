import { useState, useEffect } from 'react'
import { Calendar, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    isToday,
    isSameDay,
    addMonths,
    subMonths,
} from 'date-fns'
import { id } from 'date-fns/locale'

interface BirthDatePickerProps {
    value?: Date | null
    onChange: (date: Date | null) => void
    name?: string
}

const BirthDatePicker = ({ value, onChange, name }: BirthDatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [viewMode, setViewMode] = useState<'date' | 'month' | 'year'>('date')
    const [tempDate, setTempDate] = useState<Date | null>(value || null)

    // Sync tempDate with external value
    useEffect(() => {
        setTempDate(value || null)
    }, [value])

    // Reset calendar view when dialog opens
    useEffect(() => {
        if (isOpen && value) {
            setCurrentMonth(value.getMonth())
            setCurrentYear(value.getFullYear())
        }
    }, [isOpen, value])

    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

    const generateYears = () => {
        const currentYear = new Date().getFullYear()
        const years = []
        for (let year = currentYear - 100; year <= currentYear; year++) {
            years.push(year)
        }
        return years.reverse()
    }

    const getCurrentMonthDays = () => {
        const start = startOfMonth(new Date(currentYear, currentMonth))
        const end = endOfMonth(new Date(currentYear, currentMonth))
        return eachDayOfInterval({ start, end })
    }

    const handleDateSelect = (date: Date) => {
        setTempDate(date)
    }

    const handleMonthSelect = (monthIndex: number) => {
        setCurrentMonth(monthIndex)
        setViewMode('date')
    }

    const handleYearSelect = (year: number) => {
        setCurrentYear(year)
        setViewMode('month')
    }

    const handleConfirm = () => {
        if (tempDate) {
            onChange(tempDate)
        }
        setIsOpen(false)
    }

    const navigateMonth = (direction: 'next' | 'prev') => {
        const currentDate = new Date(currentYear, currentMonth)
        const newDate =
            direction === 'next'
                ? addMonths(currentDate, 1)
                : subMonths(currentDate, 1)
        setCurrentMonth(newDate.getMonth())
        setCurrentYear(newDate.getFullYear())
    }

    const renderDateView = () => {
        const days = getCurrentMonthDays()
        const firstDayOfMonth = startOfMonth(
            new Date(currentYear, currentMonth)
        )
        const startingDayOfWeek = getDay(firstDayOfMonth)

        const emptyCells = Array(startingDayOfWeek).fill(null)

        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <button
                        onClick={() => navigateMonth('prev')}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        type="button"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <div className="flex space-x-1 sm:space-x-2">
                        <button
                            onClick={() => setViewMode('month')}
                            className="px-2 py-1 sm:px-3 sm:py-1 hover:bg-gray-100 rounded-md font-medium text-sm sm:text-base transition-colors"
                            type="button"
                        >
                            {months[currentMonth]}
                        </button>
                        <button
                            onClick={() => setViewMode('year')}
                            className="px-2 py-1 sm:px-3 sm:py-1 hover:bg-gray-100 rounded-md font-medium text-sm sm:text-base transition-colors"
                            type="button"
                        >
                            {currentYear}
                        </button>
                    </div>

                    <button
                        onClick={() => navigateMonth('next')}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        type="button"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm font-medium text-gray-500 mb-2">
                    {dayNames.map((day) => (
                        <div key={day} className="py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {emptyCells.map((_, index) => (
                        <div
                            key={`empty-${index}`}
                            className="w-8 h-8 sm:w-10 sm:h-10"
                        ></div>
                    ))}

                    {days.map((day) => {
                        const isSelected = tempDate && isSameDay(day, tempDate)
                        const isTodayDate = isToday(day)

                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => handleDateSelect(day)}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-gray-100 ${
                                    isSelected
                                        ? 'bg-blue-primary text-white hover:bg-yellow-primary'
                                        : isTodayDate
                                        ? 'bg-gray-200 text-gray-900'
                                        : 'text-gray-700'
                                }`}
                                type="button"
                            >
                                {format(day, 'd')}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }

    const renderMonthView = () => {
        return (
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <button
                        onClick={() => setCurrentYear(currentYear - 1)}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        type="button"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <button
                        onClick={() => setViewMode('year')}
                        className="px-3 py-1 hover:bg-gray-100 rounded-md font-medium text-sm sm:text-base transition-colors"
                        type="button"
                    >
                        {currentYear}
                    </button>

                    <button
                        onClick={() => setCurrentYear(currentYear + 1)}
                        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        type="button"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {months.map((month, index) => (
                        <button
                            key={month}
                            onClick={() => handleMonthSelect(index)}
                            className={`p-2 sm:p-3 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-gray-100 ${
                                currentMonth === index
                                    ? 'bg-blue-primary text-white hover:bg-yellow-primary'
                                    : 'text-gray-700'
                            }`}
                            type="button"
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    const renderYearView = () => {
        const years = generateYears()

        return (
            <div className="space-y-4">
                <div className="text-center font-medium text-sm sm:text-base">
                    Pilih Tahun
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 sm:max-h-64 overflow-y-auto">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => handleYearSelect(year)}
                            className={`p-2 rounded-md text-xs sm:text-sm font-medium transition-colors hover:bg-gray-100 ${
                                currentYear === year
                                    ? 'bg-blue-primary text-white hover:bg-yellow-primary'
                                    : 'text-gray-700'
                            }`}
                            type="button"
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal h-10 sm:h-11"
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="text-sm sm:text-base">
                            {value
                                ? format(value, 'dd MMMM yyyy', { locale: id })
                                : 'Pilih tanggal lahir'}
                        </span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] w-[95vw] max-w-none sm:w-full">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                            <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
                            Pilih Tanggal Lahir
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-4">
                        {viewMode === 'date' && renderDateView()}
                        {viewMode === 'month' && renderMonthView()}
                        {viewMode === 'year' && renderYearView()}
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="w-full sm:w-auto order-2 sm:order-1"
                            type="button"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={!tempDate}
                            className="w-full sm:w-auto order-1 sm:order-2"
                            type="button"
                        >
                            Konfirmasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Hidden input for form submission */}
            <input
                type="hidden"
                name={name}
                value={value ? value.toISOString() : ''}
            />
        </div>
    )
}

export default BirthDatePicker
