"use client";

import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FC, PropsWithChildren } from "react";

export const SelectComponent: FC<
  PropsWithChildren & SelectProps & { values: string[] }
> = ({ values, defaultValue }) => (
  <Select name="status" defaultValue={defaultValue}>
    <SelectTrigger className="">
      <SelectValue placeholder="Select hero status" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status</SelectLabel>
        {values.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
);
