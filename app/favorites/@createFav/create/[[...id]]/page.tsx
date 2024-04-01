import { CreateFavForm } from "@/components/favorites/CreateFavForm";
// import { CreateModal } from "@/components/CreateModal";
import { Card } from "@/components/ui/card";
import { getCustomFavById } from "@/services/getCustomFavById";
import dynamic from "next/dynamic";

const CreateModal = dynamic(() => import("@/components/CreateModal"), {
  ssr: false,
});

export default async function CreateFavorite({
  params: { id },
}: {
  params: { id?: string[] };
}) {
  const customFav = id ? await getCustomFavById(id[0]) : undefined;
  return (
    <CreateModal tooltipText="Close form">
      <Card className="p-2">
        <CreateFavForm hero={customFav} />
      </Card>
    </CreateModal>
  );
}