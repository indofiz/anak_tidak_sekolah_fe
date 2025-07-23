import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { SuspenseLoaderSection } from '@/loader-suspense'

interface CardFormProps {
    title: string
    description: string
    content: React.ReactNode
}
const CardForm: React.FC<CardFormProps> = ({ title, description, content }) => {
    return (
        <Card className="shadow-none border-0 px-0 py-4 w-full">
            <CardHeader className="px-2 md:px-4">
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="px-2 md:px-4">
                <SuspenseLoaderSection>{content}</SuspenseLoaderSection>
            </CardContent>
        </Card>
    )
}

export default CardForm
