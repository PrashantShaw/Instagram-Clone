"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { createFeed } from "@/lib/actions/feed.actions";

export const CreateFeedForm = () => {
  const [fieldErrors, formAction] = useFormState(createFeed, {});
  return (
    <div>
      <form action={formAction}>
        <div className="mb-6">
          <Label htmlFor="image">Add Image</Label>
          <Input id="image" type="file" name="image" className="mt-2" />
        </div>
        <div className="mb-6">
          <Label htmlFor="content">Write feed content</Label>
          <Textarea
            id="content"
            rows={10}
            name="content"
            className="mt-2"
            placeholder="What's on your mind? Let the world know.."
          />
        </div>
        <Button className="w-[8rem]">Done</Button>
      </form>
    </div>
  );
};
