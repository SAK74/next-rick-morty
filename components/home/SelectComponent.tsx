"use client";

import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FC, PropsWithChildren } from "react";

export const SelectComponent: FC<
  PropsWithChildren & SelectProps & { values: string[] }
> = ({ values, defaultValue }) => (
  <Select name="status" defaultValue={defaultValue}>
    <SelectTrigger>
      <SelectValue placeholder="Select hero status" />
    </SelectTrigger>
    <SelectContent>
      {values.map((value) => (
        <SelectItem key={value} value={value}>
          {value}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
