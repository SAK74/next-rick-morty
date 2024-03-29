import { CreateFavForm } from "@/components/favorites/CreateFavForm";
import { CreateModal } from "@/components/CreateModal";
import { Card } from "@/components/ui/card";

export default function CreateFavorite() {
  return (
    <CreateModal tooltipText="Close form">
      <Card>
        <CreateFavForm />
      </Card>
    </CreateModal>
  );
}
