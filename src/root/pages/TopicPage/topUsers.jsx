import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";

export function TopUsers() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((topUser, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <li className="flex flex-col items-center gap-2 font-semibold">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback delayMs={600}>VC</AvatarFallback>
              </Avatar>
              <h6 className="px-2 py-1 text-xs rounded-md bg-slate-500/30">
                {"salem mohsen".slice(0, 6) + "..."}
              </h6>
              <span className="text-xs text-blue-300/50">{5} Posts</span>
            </li>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
