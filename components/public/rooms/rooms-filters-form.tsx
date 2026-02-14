"use client";

import { useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RoomsUnitTypeFilterOption } from "@/lib/domain/rooms-listing";
import { cn } from "@/lib/utils";

type RoomsFiltersFormProps = {
  defaultCheckInDate: string;
  defaultCheckOutDate: string;
  defaultGuests: number;
  defaultUnitTypeId?: string;
  unitTypeOptions: RoomsUnitTypeFilterOption[];
  hasActiveFilters: boolean;
};

function parseDateInput(value: string): Date {
  const [year, month, day] = value.split("-").map((part) => Number(part));
  return new Date(year, month - 1, day);
}

function toDateInputValue(value: Date): string {
  return format(value, "yyyy-MM-dd");
}

function formatButtonDate(value: Date): string {
  return format(value, "PPP");
}

export function RoomsFiltersForm({
  defaultCheckInDate,
  defaultCheckOutDate,
  defaultGuests,
  defaultUnitTypeId,
  unitTypeOptions,
  hasActiveFilters,
}: RoomsFiltersFormProps) {
  const [checkInDate, setCheckInDate] = useState<Date>(() => parseDateInput(defaultCheckInDate));
  const [checkOutDate, setCheckOutDate] = useState<Date>(() => parseDateInput(defaultCheckOutDate));
  const [selectedUnitTypeId, setSelectedUnitTypeId] = useState<string>(() => {
    if (!defaultUnitTypeId) return "__all__";
    return unitTypeOptions.some((option) => option.id === defaultUnitTypeId)
      ? defaultUnitTypeId
      : "__all__";
  });

  const minCheckOutDate = useMemo(() => addDays(checkInDate, 1), [checkInDate]);

  return (
    <form action="/rooms" method="get" className="mt-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Check-in
          </span>
          <input type="hidden" name="checkInDate" value={toDateInputValue(checkInDate)} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "mt-1 w-full justify-start border-none bg-transparent px-0 text-left text-foreground shadow-none hover:bg-transparent"
                )}
              >
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {formatButtonDate(checkInDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={(date) => {
                  if (!date) return;

                  setCheckInDate(date);
                  if (checkOutDate <= date) {
                    setCheckOutDate(addDays(date, 1));
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </label>

        <label className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Check-out
          </span>
          <input type="hidden" name="checkOutDate" value={toDateInputValue(checkOutDate)} />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "mt-1 w-full justify-start border-none bg-transparent px-0 text-left text-foreground shadow-none hover:bg-transparent"
                )}
              >
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                {formatButtonDate(checkOutDate)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={(date) => {
                  if (!date) return;
                  if (date <= checkInDate) {
                    setCheckOutDate(addDays(checkInDate, 1));
                    return;
                  }

                  setCheckOutDate(date);
                }}
                disabled={(date) => date < minCheckOutDate}
              />
            </PopoverContent>
          </Popover>
        </label>

        <label className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Guests
          </span>
          <Input
            type="number"
            name="guests"
            min={1}
            max={12}
            defaultValue={defaultGuests}
            className="mt-1 h-auto border-none bg-transparent px-0 text-foreground shadow-none focus-visible:ring-0"
          />
        </label>

        <label className="rounded-md border border-input bg-background p-3 text-sm text-muted-foreground">
          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
            Unit Type
          </span>
          <input
            type="hidden"
            name="unitTypeId"
            value={selectedUnitTypeId === "__all__" ? "" : selectedUnitTypeId}
          />
          <Select value={selectedUnitTypeId} onValueChange={setSelectedUnitTypeId}>
            <SelectTrigger className="mt-1 h-auto border-none bg-transparent px-0 text-foreground shadow-none focus-visible:ring-0">
              <SelectValue placeholder="All room types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">All room types</SelectItem>
              {unitTypeOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto">
          Apply Filters
        </Button>
        {hasActiveFilters ? (
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/rooms">Clear Filters</Link>
          </Button>
        ) : null}
      </div>
    </form>
  );
}
