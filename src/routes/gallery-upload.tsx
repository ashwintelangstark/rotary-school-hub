import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { uploadImageToStorage, getPublicUrl, saveGalleryImage, isSupabaseConfigured } from "@/lib/supabase";
import { getCurrentUser, onAuthChange } from "@/lib/auth";

export const Route = createFileRoute("/gallery-upload")({
  head: () => ({
    meta: [
      { title: "Upload to Gallery | Rotary H P S English, Hubballi" },
      {
        name: "description",
        content: "Upload photos and memories to the Rotary H P S English gallery.",
      },
      { property: "og:title", content: "Upload to Gallery | Rotary H P S English" },
      {
        property: "og:description",
        content: "Share your school memories with our community.",
      },
    ],
  }),
  component: GalleryUpload,
});

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/raw"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function GalleryUpload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show configuration message if Supabase is not set up
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen pt-20">
        <SiteHeader />
        <PageHero
          eyebrow="Configuration Required"
          title="Upload to Gallery"
          subtitle="Please configure Supabase to enable gallery uploads."
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
                  The gallery upload feature requires Supabase credentials to be configured in your
                  environment variables.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-foreground">To set up Supabase:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Create a Supabase project at supabase.com</li>
                    <li>Add your credentials to the <code className="bg-muted px-1.5 py-0.5 rounded">.env</code> file</li>
                    <li>Follow the setup guide in SUPABASE_SETUP.md</li>
                  </ol>
                </div>
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

  const validateFile = (file: File): { valid: boolean; error: string } => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: "Invalid file type. Please upload PNG, JPEG, or RAW files only.",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: "File size exceeds 5MB limit. Please choose a smaller file.",
      };
    }

    return { valid: true, error: "" };
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadStatus({ type: "error", message: validation.error });
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setSelectedFile(file);
    setUploadStatus({ type: null, message: "" });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !title.trim()) {
      setUploadStatus({ type: "error", message: "Please select a file and provide a title." });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await uploadImageToStorage(selectedFile);

      if (uploadError || !uploadData) {
        throw new Error(uploadError?.message || "Failed to upload image");
      }

      // Get public URL
      const publicUrl = getPublicUrl(uploadData.path);

      // Save metadata to database
      const { data: saveData, error: saveError } = await saveGalleryImage(
        title.trim(),
        description.trim(),
        publicUrl,
        "School Life" // Default category, can be made dynamic
      );

      if (saveError || !saveData) {
        throw new Error(saveError?.message || "Failed to save image metadata");
      }

      setUploadStatus({
        type: "success",
        message: "Image uploaded successfully! Redirecting to gallery...",
      });

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Redirect to gallery after 2 seconds
      setTimeout(() => {
        navigate({ to: "/gallery" });
      }, 2000);

    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An unexpected error occurred during upload.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      const validation = validateFile(file);
      if (!validation.valid) {
        setUploadStatus({ type: "error", message: validation.error });
        return;
      }

      setSelectedFile(file);
      setUploadStatus({ type: null, message: "" });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <SiteHeader />
      <PageHero
        eyebrow="Share Your Memories"
        title="Upload to Gallery"
        subtitle="Add your photos and stories to our school gallery. Keep the memories alive!"
      />

      <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <Card className="border-2 border-gold/20">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-primary">
                Upload New Image
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill in the details below and upload your image. Accepted formats: PNG, JPEG, RAW (max 5MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Area */}
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    selectedFile
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-gold/50 hover:bg-muted/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png,.jpeg,.jpg,.raw"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />

                  {!previewUrl ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Upload className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPEG, RAW up to 5MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="aspect-video max-h-64 mx-auto overflow-hidden rounded-md">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-primary">
                        {selectedFile?.name}
                      </p>
                    </div>
                  )}
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
                    disabled={isUploading}
                    className="w-full"
                  />
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
                    disabled={isUploading}
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[80px] resize-y"
                  />
                </div>

                {/* Status Messages */}
                {uploadStatus.type && (
                  <div
                    className={`flex items-center gap-2 rounded-md p-3 ${
                      uploadStatus.type === "success"
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {uploadStatus.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span className="text-sm">{uploadStatus.message}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isUploading || !selectedFile || !title.trim()}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Upload to Gallery
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate({ to: "/gallery" })}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Instructions Card */}
          <Card className="mt-6 border-2 border-gold/10 bg-muted/50">
            <CardHeader>
              <CardTitle className="font-display text-lg text-primary">
                Upload Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong>File Types:</strong> Only PNG, JPEG, and RAW files are accepted.</p>
              <p>• <strong>File Size:</strong> Maximum file size is 5MB.</p>
              <p>• <strong>Content:</strong> Upload photos relevant to school activities and events.</p>
              <p>• <strong>Quality:</strong> Ensure good image quality for the best gallery experience.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
