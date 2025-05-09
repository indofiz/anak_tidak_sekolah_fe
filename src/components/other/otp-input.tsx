import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const OTPInput = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    const inputRefs = useRef<HTMLInputElement[]>([])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (index: number, value: string) => {
        // Allow numbers or empty strings
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Move focus forward only when entering a number
            if (value && index < 5) {
                inputRefs.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            // Immediately delete the current digit
            if (otp[index]) {
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
            }
            // Move focus backward when backspacing empty input
            else if (index > 0) {
                inputRefs.current[index - 1].focus()
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData
            .getData('text/plain')
            .replace(/\D/g, '')
            .slice(0, 6)

        if (pastedData.length === 6) {
            const pastedArray = pastedData.split('')
            setOtp(pastedArray)
            inputRefs.current[5].focus()
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <Label htmlFor="otp-0">Enter 6-digit verification code</Label>
            <div className="flex items-center justify-center gap-2">
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        ref={(el) => {
                            if (el) inputRefs.current[index] = el
                        }}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-16 text-2xl text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        maxLength={1}
                        autoComplete="one-time-code"
                        aria-label={`Digit ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default OTPInput
