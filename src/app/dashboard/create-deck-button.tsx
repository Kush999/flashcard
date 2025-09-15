"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateDeckButtonProps {
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children?: React.ReactNode;
}

export function CreateDeckButton({ 
  size = "lg", 
  variant = "default",
  children 
}: CreateDeckButtonProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    try {
      // TODO: Implement server action for creating deck
      console.log("Creating deck:", { name, description, category });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOpen(false);
      // Reset form
      event.currentTarget.reset();
    } catch (error) {
      console.error("Failed to create deck:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={size} variant={variant} className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          {children || "Create New Deck"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Deck</DialogTitle>
          <DialogDescription>
            Create a new flashcard deck to start organizing your learning materials.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deck Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Spanish Vocabulary"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of what this deck covers..."
              disabled={isLoading}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Input
              id="category"
              name="category"
              placeholder="e.g., Languages, Science, History"
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Deck"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
