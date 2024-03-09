import { SearchComponent } from "@/components/home/SearchComponent";
import { SearchList } from "@/components/home/SearchList";

export default function Home({ searchParams }: { searchParams: string }) {
  return (
    <main className="">
      <SearchComponent />
      <SearchList />
    </main>
  );
}

// export default function Page({
//   searchParams,
// }: {
//   searchParams: { id: string };
// }) {
//   const id = searchParams.id;
//   return <main></main>;
// }
