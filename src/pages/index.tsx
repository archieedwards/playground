import Image from "next/image";
import calendar from "@/../public/calendar.png";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-16">Hello World</h1>
      <Image
        src={calendar}
        alt="Calendar with interview books across the week"
        placeholder="blur"
        width={1078}
        height={522}
      />
    </div>
  );
}
