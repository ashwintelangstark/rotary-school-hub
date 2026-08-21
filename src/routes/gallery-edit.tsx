import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, XCircle, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { updateGalleryImage, deleteGalleryImage, type GalleryImage, isSupabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/gallery-edit")({
  head: () => ({
    meta: [
      { title: "Edit Gallery Image | Rotary H P S English, Hubballi" },
      {
        name: "description",
        content: "Edit or delete gallery image at Rotary H P S English, Hubballi.",
      },
      { property: "og:title", content: "Edit Gallery Image | Rotary H P S English" },
      {
        property: "og:description",
        content: "Manage your gallery images - edit details or remove.",
      },
    ],
  }),
  component: GalleryEdit,
});

function GalleryEdit() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/gallery-edit" });
  const imageId = search.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("School Life");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [imageNotFound, setImageNotFound] = useState(false);

  const categories = [
    "All",
    "School Life",
    "Celebrations",
    "Literary Club",
    "Academics",
    "Library Club",
    "Music Club",
    "Art & Craft",
    "Achievements",
    "Cultural Heritage",
    "Sports Club",
  ];

  useEffect(() => {
    const loadImage = async () => {
      if (!imageId) {
        setImageNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        // For demo purposes, we'll use the imageId as a reference
        // In production, you'd fetch the actual image data from Supabase
        setImageUrl(`/gallery/${imageId}.webp`); // This would be the actual Supabase URL
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading image:", error);
        setImageNotFound(true);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [imageId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setStatus({ type: "error", message: "Please provide a title." });
      return;
    }

    setIsSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const { data, error } = await updateGalleryImage(
        imageId,
        title.trim(),
        description.trim(),
        category
      );

      if (error || !data) {
        throw new Error(error?.message || "Failed to update image");
      }

      setStatus({
        type: "success",
        message: "Image updated successfully! Redirecting to gallery...",
      });

      setTimeout(() => {
        navigate({ to: "/gallery" });
      }, 1500);

    } catch (error) {
      console.error("Update error:", error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An unexpected error occurred during update.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setStatus({ type: null, message: "" });

    try {
      const { success, error } = await deleteGalleryImage(imageId, imageUrl);

      if (error || !success) {
        throw new Error(error?.message || "Failed to delete image");
      }

      setStatus({
        type: "success",
        message: "Image deleted successfully! Redirecting to gallery...",
      });

      setTimeout(() => {
        navigate({ to: "/gallery" });
      }, 1500);

    } catch (error) {
      console.error("Delete error:", error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An unexpected error occurred during deletion.",
      });
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  // Show configuration message if Supabase isn't set up
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen pt-20">
        <SiteHeader />
        <PageHero
          eyebrow="Configuration Required"
          title="Edit Gallery Image"
          subtitle="Please configure Supabase to enable gallery editing."
        />

        <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-6 w-6" />
                  Supabase Not Configured
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The gallery edit feature requires Supabase credentials to be configured.
                </p>
                <Button onClick={() => navigate({ to: "/gallery" })} variant="outline">
                  Return to Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <SiteFooter />
      </div>
    );
  }

  if (imageNotFound) {
    return (
      <div className="min-h-screen pt-20">
        <SiteHeader />
        <PageHero
          eyebrow="Image Not Found"
          title="Edit Gallery Image"
          subtitle="The requested image could not be found."
        />

        <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-warning/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="h-6 w-6" />
                  Image Not Found
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The image you're trying to edit doesn't exist or has been deleted.
                </p>
                <Button onClick={() => navigate({ to: "/gallery" })} variant="outline">
                  Return to Gallery
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <SiteFooter />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <SiteHeader />
        <PageHero
          eyebrow="Manage Your Memories"
          title="Edit Gallery Image"
          subtitle="Update image details or remove from gallery."
        />

        <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </section>

        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Manage Your Memories"
        title="Edit Gallery Image"
        subtitle="Update image details or remove from gallery."
      />

      <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <Card className="border-2 border-gold/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-primary">
                Edit Image Details
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Update the title, description, or category of this image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                {/* Image Preview */}
                <div className="aspect-video max-h-64 mx-auto overflow-hidden rounded-lg bg-muted">
                  <img
                    src={imageUrl}
                    alt="Current image"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-foreground">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter image title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isSaving || isDeleting}
                    className="w-full"
                  />
                </div>

                {/* Category Select */}
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium text-foreground">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={isSaving || isDeleting}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description Input */}
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter image description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSaving || isDeleting}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[80px] resize-y"
                  />
                </div>

                {/* Status Messages */}
                {status.type && (
                  <div
                    className={`flex items-center gap-2 rounded-md p-3 ${
                      status.type === "success"
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span className="text-sm">{status.message}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  {!showDeleteConfirm ? (
                    <>
                      <div className="flex gap-4">
                        <Button
                          type="submit"
                          disabled={isSaving || isDeleting || !title.trim()}
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => navigate({ to: "/gallery" })}
                          disabled={isSaving || isDeleting}
                        >
                          Cancel
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={isSaving || isDeleting}
                        className="w-full"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Delete Image
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
                        <p className="text-sm font-medium text-destructive">
                          ⚠️ Are you sure you want to delete this image?
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          This action cannot be undone. The image will be permanently removed from the gallery.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="flex-1"
                        >
                          {isDeleting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Yes, Delete Image"
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={isDeleting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
