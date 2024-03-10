import { SearchList } from "@/components/home/SearchList";
import { Search } from "../layout";

export default function SummaryPage({ searchParams }: Search) {
  console.log({ searchParams });
  return (
    <div className="flex flex-col items-center">
      <SearchList searchParams={searchParams} />
    </div>
  );
}
