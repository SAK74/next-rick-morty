export default function FavoriteLayout({
  children,
  createFav,
}: {
  children: React.ReactNode;
  createFav: React.ReactNode;
}) {
  return (
    <>
      <main>
        {children}
        {createFav}
      </main>
    </>
  );
}
