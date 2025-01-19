"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createFeed, FeedFormData } from "@/lib/actions/feed.actions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { z } from "zod";
import { getFormDataFromObject } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const imageSchemaZ = z
  .custom<FileList>(
    (fileList) => fileList instanceof FileList && fileList.length > 0,
    { message: "File is required" }
  )
  .refine((fileList) => fileList[0]?.type.startsWith("image/"), {
    message: "Selected Item is not an image!",
  })
  .refine((fileList) => fileList[0]?.size <= 5 * 1024 * 1024, {
    message: "Max file size is 5MB",
  });
const feedSchemaZ = z.object({
  image: imageSchemaZ,
  content: z.string().min(1, { message: "Required!" }),
  creatorId: z.coerce.number().min(1, { message: "creator Id is Required!" }),
});

export const CreateFeedForm = ({ creatorId }: { creatorId: number }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FeedFormData>({
    resolver: zodResolver(feedSchemaZ),
    defaultValues: {
      content: "",
      image: undefined,
      creatorId,
    },
  });

  const onSubmit: SubmitHandler<FeedFormData> = async (feedData) => {
    // console.log("FeedFormData ::", feedData);
    const feedFormData = getFormDataFromObject(feedData);
    try {
      const { success, error } = await createFeed(feedFormData);
      // console.log("success, error, data ::", success, error, data);
      if (success) {
        toast.success("Feed Created!", {
          position: "top-center",
          duration: 5000,
        });
        router.replace("/");
      } else {
        toast.error(JSON.stringify(error), {
          position: "top-right",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Failed to Create Feed!", {
        position: "top-right",
        duration: 5000,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("creatorId")} />
        <div className="relative mb-6">
          <Label htmlFor="image">Add Image</Label>
          <Input
            id="image"
            type="file"
            className={clsx(
              " focus-visible:ring-2 focus-visible:ring-offset-0",
              errors.image
                ? "ring-2 ring-red-600  focus-visible:ring-red-600"
                : ""
            )}
            {...register("image")}
          />
          {errors.image ? (
            <p className="absolute top-[105%] right-0 text-xs text-red-600">
              {errors.image.message}
            </p>
          ) : null}
        </div>
        <Controller
          name={"content"}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="relative mb-6">
              <Label htmlFor="content">Content</Label>
              <Textarea
                {...field}
                id="content"
                rows={10}
                placeholder="What's on your mind? Let the world know.."
                className={clsx(
                  " focus-visible:ring-2 focus-visible:ring-offset-0",
                  error ? "ring-2 ring-red-600  focus-visible:ring-red-600" : ""
                )}
              />
              {error ? (
                <p className="absolute top-[105%] right-0 text-xs text-red-600">
                  {error.message}
                </p>
              ) : null}
            </div>
          )}
        />
        <CreateFeedButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

const CreateFeedButton = ({ isSubmitting = false }) => {
  const content = isSubmitting ? (
    <>
      <LoaderCircle className="animate-spin" />
      &nbsp; Saving...
    </>
  ) : (
    "Save"
  );
  return (
    <Button type="submit" className="w-[10rem]" disabled={isSubmitting}>
      {content}
    </Button>
  );
};
