export default function Page({ params: { id } }: { params: { id: string } }) {
  // const id = params.id;
  return <section>Detail with {id} id</section>;
}
