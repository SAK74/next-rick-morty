"use client";

import { usePathname } from "next/navigation";

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return pathName === "/" ? null : (
    <div className="animate-slide-up px-6 flex flex-col gap-4">
      <div className="h-6"></div>
      {children}
    </div>
  );
}
