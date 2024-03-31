import { CreateFavForm } from "@/components/favorites/CreateFavForm";
// import { CreateModal } from "@/components/CreateModal";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

const CreateModal = dynamic(() => import("@/components/CreateModal"), {
  ssr: false,
});

export default function CreateFavorite() {
  return (
    <CreateModal tooltipText="Close form">
      <Card className="p-2">
        <CreateFavForm />
      </Card>
    </CreateModal>
  );
}
