import { Disc3, Shell } from "lucide-react";

export const Loading = () => {
  return (
    <div className="w-full flex justify-center">
      <Shell className="animate-spin" size={50} color="blue" />
      {/* <Disc3 className="animate-spin" size={50} color="blue" /> */}
      {/* ...Loading... */}
    </div>
  );
};
