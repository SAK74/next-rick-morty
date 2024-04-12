export default function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const paramId = params.paramId;
  const searchId = searchParams.searchId;
  return (
    <main>
      Login page
      <p>Params: {JSON.stringify(params)}</p>
      <p>Search params: {JSON.stringify(searchParams)}</p>
    </main>
  );
}
