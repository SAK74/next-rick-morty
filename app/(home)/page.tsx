import { Loading } from "@/components/Loading";
import { SearchComponent } from "@/components/home/SearchComponent";
import { SearchList } from "@/components/home/SearchList";
import { Suspense } from "react";

export type Search = { searchParams: { name?: string; status?: string } };

export default function Home({ searchParams }: Search) {
  console.log({ searchParams });
  return (
    <>
      <SearchComponent searchParams={searchParams} />
      <Suspense fallback={<Loading />}>
        <SearchList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
