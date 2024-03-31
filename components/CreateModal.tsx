"use client";

import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";
import { MyTooltip } from "./Tooltip";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const CreateModal: FC<PropsWithChildren<{ tooltipText?: string }>> = ({
  children,
  tooltipText = "Close",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:backdrop-blur-sm px-4 pt-12 pb-3 rounded-sm shadow-xl"
      onClose={() => {
        router.back();
      }}
    >
      {children}
      <MyTooltip text={tooltipText}>
        <Button
          variant={"ghost"}
          className="absolute top-2 right-2 cursor-pointer p-2"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          <XIcon color="darkblue" strokeWidth={4} />
        </Button>
      </MyTooltip>
    </dialog>,
    document.body
  );
};

export default CreateModal;
