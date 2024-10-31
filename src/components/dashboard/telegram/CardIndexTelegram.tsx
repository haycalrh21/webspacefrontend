import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertToWIB } from "@/lib/dateHelpers";

export default function CardIndexTelegram({ data }: any) {
  return (
    <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.messages.map(
        (message: { id: number; text: string; date: number; from: string }) => (
          <Card key={message.id}>
            <CardHeader>
              <CardTitle className="text-md">{message.from}</CardTitle>
              <CardDescription>{message.text}</CardDescription>
            </CardHeader>

            <CardFooter>
              <p>{convertToWIB(message.date)}</p>
            </CardFooter>
          </Card>
        )
      )}
    </div>
  );
}
