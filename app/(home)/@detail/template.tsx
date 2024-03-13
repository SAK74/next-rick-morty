"use client";

import { usePathname } from "next/navigation";

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return pathName === "/" ? null : (
    <div className="animate-slide-up px-6">{children}</div>
  );
}
