import { FC, ReactNode } from "react";

export const Tree: FC<{
  data: ReactNode | { [k: string]: any };
}> = ({ data }) => {
  switch (typeof data) {
    case "function":
      return "Function " + data.name;
    case "object": {
      return !data
        ? null
        : Object.entries(data).map(([prop, value]) => {
            return (
              <div key={prop} className="ml-8">
                <span className="font-extrabold">{prop}: </span>
                <Tree data={value} />
              </div>
            );
          });
    }
    case "symbol":
      return "Symbol";

    default:
      return data;
  }
};
