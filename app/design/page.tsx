"use client";

import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DesignPreviewPage() {
  return (
    <main className="min-h-screen bg-background py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <section className="mb-10">
          <h1 className="text-4xl md:text-5xl">Design System Preview</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            T-003 visual checkpoint for shadcn primitives using semantic tokens only.
          </p>
        </section>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons and Badges</CardTitle>
              <CardDescription>
                Primary actions, secondary actions, and status treatments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form Controls</CardTitle>
              <CardDescription>
                Inputs with tokenized borders, focus rings, and surfaces.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="preview-name">Name</Label>
                <Input id="preview-name" placeholder="Oceanview Suite" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview-type">Studio Type</Label>
                <Select defaultValue="deluxe">
                  <SelectTrigger id="preview-type">
                    <SelectValue placeholder="Choose a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preview-notes">Notes</Label>
                <Textarea
                  id="preview-notes"
                  placeholder="Quiet corner unit with garden-facing windows."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dialog</CardTitle>
              <CardDescription>
                Modal shell for confirm flows and larger form interactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm reservation update</DialogTitle>
                    <DialogDescription>
                      This preview validates dialog composition, spacing, and focus treatment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-note">Internal note</Label>
                    <Input id="dialog-note" placeholder="Late check-in requested." />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toast (Sonner)</CardTitle>
              <CardDescription>
                Notification styling mapped to card/foreground token set.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() =>
                  toast.success("Booking updated", {
                    description: "Guest requested an early check-in window.",
                  })
                }
              >
                Show Success Toast
              </Button>
              <p className="text-sm text-muted-foreground">
                `Toaster` is mounted in the root layout.
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary">T-003.7 Preview</Badge>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
