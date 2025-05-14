import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

interface CardFormProps {
    title: string
    description: string
    content: React.ReactNode
}
const CardForm: React.FC<CardFormProps> = ({ title, description, content }) => {
    return (
        <Card className="shadow-none border-0 px-0 py-4 w-full">
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{content}</CardContent>
        </Card>
    )
}

export default CardForm
