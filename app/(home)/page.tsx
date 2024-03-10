import { SearchComponent } from "@/components/home/SearchComponent";
import { Search } from "./layout";

export default function HomePage({ searchParams }: Search) {
  return (
    <section>
      <SearchComponent searchParams={searchParams} />
    </section>
  );
}
