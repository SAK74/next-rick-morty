"use client";

import { usePathname } from "next/navigation";

export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return pathName === "/" ? null : (
    <div className="absolute top-0 right-0 left-0 bottom-0 bg-gray-400 bg-opacity-50 md:static md:bg-inherit">
      <div className="absolute right-1/3 translate-x-2/4 top-0 mt-8 md:mt-24 md:static md:translate-x-0">
        {children}
      </div>
    </div>
  );
}
