import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Edit, Trash2, Plus, LogOut, Image as ImageIcon, Loader2, Replace, Save as SaveIcon, AlertTriangle } from "lucide-react";
import { fetchGalleryImages, deleteGalleryImage, deleteFromStorage, type GalleryImage, uploadImageToStorage, getPublicUrl, updateGalleryImage } from "@/lib/supabase";
import { logoutUser, getCurrentUser, onAuthChange, type User } from "@/lib/auth";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery-manage")({
  head: () => ({
    meta: [
      { title: "Gallery Management | Rotary H P S English, Hubballi" },
      {
        name: "description",
        content: "Manage gallery images - upload, edit, or delete at Rotary H P S English, Hubballi.",
      },
      { property: "og:title", content: "Gallery Management" },
      {
        property: "og:description",
        content: "Secure access to manage your school gallery.",
      },
    ],
  }),
  component: GalleryManage,
});

// Types for pending changes
type PendingChange = {
  type: 'delete' | 'update' | 'replace';
  image: GalleryImage;
  newData?: Partial<GalleryImage>;
  replaceFile?: File;
  timestamp: number;
};

function GalleryManage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [originalImages, setOriginalImages] = useState<GalleryImage[]>([]); // Store original data
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: 'School Life'
  });
  const [replacingId, setReplacingId] = useState<string | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);

  // Pending changes state
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  useEffect(() => {
    // Check authentication
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate({ to: "/login" });
      return;
    }

    setUser(currentUser);

    // Subscribe to auth changes
    const unsubscribe = onAuthChange((user) => {
      if (!user) {
        navigate({ to: "/login" });
      } else {
        setUser(user);
      }
    });

    // Load images
    loadGalleryImages();

    return unsubscribe;
  }, [navigate]);

  const loadGalleryImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await fetchGalleryImages();
      if (data && !error) {
        setImages(data);
        setOriginalImages(data); // Store original for comparison
      }
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasUnsavedChanges = () => {
    return pendingChanges.size > 0;
  };

  const handleLogout = () => {
    if (hasUnsavedChanges()) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to logout without saving? All changes will be lost."
      );
      if (!confirmed) return;
    }

    logoutUser();
    navigate({ to: "/gallery" });
  };

  // Track pending delete
  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(
      `Mark "${title}" for deletion? It will be permanently deleted when you click "Save Changes" at the bottom.`
    );

    if (!confirmed) return;

    const image = images.find(img => img.id === id);
    if (!image) return;

    // Add to pending changes
    setPendingChanges(prev => {
      const newMap = new Map(prev);
      newMap.set(id, {
        type: 'delete',
        image,
        timestamp: Date.now()
      });
      return newMap;
    });

    // Remove from visible list immediately
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Track pending edit
  const handleStartEdit = (image: GalleryImage) => {
    setEditingId(image.id);
    setEditForm({
      title: image.title,
      description: image.description,
      category: image.category
    });
  };

  const handleCancelEdit = () => {
    // Check if there are pending changes for this image
    const pendingChange = pendingChanges.get(editingId || '');
    if (pendingChange) {
      // Revert to original
      const original = originalImages.find(img => img.id === editingId);
      if (original) {
        setImages(prev => prev.map(img =>
          img.id === editingId ? original : img
        ));
      }
      // Remove from pending
      setPendingChanges(prev => {
        const newMap = new Map(prev);
        newMap.delete(editingId || '');
        return newMap;
      });
    }

    setEditingId(null);
    setEditForm({ title: '', description: '', category: 'School Life' });
  };

  // Track pending edit changes locally
  const handleEditChange = (field: 'title' | 'description' | 'category', value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));

    // Update visible list immediately (local only)
    if (editingId) {
      setImages(prev => prev.map(img =>
        img.id === editingId
          ? { ...img, [field]: value }
          : img
      ));
    }
  };

  // Save the edit to pending changes
  const handleSaveEdit = (id: string) => {
    if (!editForm.title.trim()) {
      alert('Please provide a title');
      return;
    }

    const image = images.find(img => img.id === id);
    if (!image) return;

    // Add to pending changes
    setPendingChanges(prev => {
      const newMap = new Map(prev);
      newMap.set(id, {
        type: 'update',
        image: originalImages.find(img => img.id === id) || image,
        newData: {
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          category: editForm.category
        },
        timestamp: Date.now()
      });
      return newMap;
    });

    setEditingId(null);
    setEditForm({ title: '', description: '', category: 'School Life' });
  };

  // Track pending replace
  const handleStartReplace = (image: GalleryImage) => {
    setReplacingId(image.id);
    setReplaceFile(null);
  };

  const handleReplaceFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
      const MAX_FILE_SIZE = 5 * 1024 * 1024;

      if (!ALLOWED_TYPES.includes(file.type)) {
        alert('Only PNG, JPEG, and WEBP files are allowed.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert('File size must be less than 5MB.');
        return;
      }

      setReplaceFile(file);
    }
  };

  const handleCancelReplace = () => {
    // Revert if there was a pending preview
    if (replacingId) {
      const original = originalImages.find(img => img.id === replacingId);
      if (original) {
        setImages(prev => prev.map(img =>
          img.id === replacingId ? original : img
        ));
      }
      // Remove from pending
      setPendingChanges(prev => {
        const newMap = new Map(prev);
        newMap.delete(replacingId);
        return newMap;
      });
    }

    setReplacingId(null);
    setReplaceFile(null);
  };

  // Preview the replacement locally
  const handlePreviewReplace = (id: string) => {
    if (!replaceFile) {
      alert('Please select a file to replace with.');
      return;
    }

    // Create local preview URL (stored in a separate map to avoid type issues)
    const localPreview = URL.createObjectURL(replaceFile);

    // Add to pending changes with preview URL
    const image = originalImages.find(img => img.id === id) || images.find(img => img.id === id);
    if (image) {
      setPendingChanges(prev => {
        const newMap = new Map(prev);
        newMap.set(id, {
          type: 'replace',
          image,
          replaceFile,
          timestamp: Date.now()
        });
        return newMap;
      });
    }

    // Update images with a modified version that includes preview URL
    setImages(prev => prev.map(img =>
      img.id === id
        ? { ...img, image_url: localPreview }
        : img
    ));

    setReplacingId(null);
    setReplaceFile(null);
  };

  // Save all pending changes to Supabase
  const handleSaveAllChanges = async () => {
    if (pendingChanges.size === 0) {
      alert("No changes to save.");
      return;
    }

    const confirmed = window.confirm(
      `Save ${pendingChanges.size} change(s) to Supabase? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsSaving(true);
    let successCount = 0;
    let failCount = 0;
    const failedChanges: string[] = [];

    try {
      // Process changes in order: deletes first, then replaces, then updates
      const sortedChanges = Array.from(pendingChanges.values()).sort((a, b) => {
        const order = { delete: 0, replace: 1, update: 2 };
        return order[a.type] - order[b.type];
      });

      for (const change of sortedChanges) {
        try {
          if (change.type === 'delete') {
            console.log(`Deleting image: ${change.image.id} - ${change.image.title}`);
            const { success, error } = await deleteGalleryImage(change.image.id, change.image.image_url);

            if (success) {
              // Verify deletion by trying to fetch the image again
              const { data: remainingImages } = await fetchGalleryImages();
              const wasDeleted = !remainingImages?.some(img => img.id === change.image.id);

              if (wasDeleted) {
                successCount++;
                console.log(`Successfully deleted and verified: ${change.image.title}`);
              } else {
                console.error(`Delete appeared successful but image still exists: ${change.image.title}`);
                failCount++;
                failedChanges.push(`${change.image.title} (delete: Image still exists in Supabase - check RLS policies)`);
              }
            } else {
              console.error(`Delete failed for ${change.image.title}:`, error);
              failCount++;
              failedChanges.push(`${change.image.title} (delete: ${error?.message || 'Unknown error - check Supabase permissions'})`);
            }
          }
          else if (change.type === 'update' && change.newData) {
            console.log(`Updating image: ${change.image.id}`);
            const { data, error } = await updateGalleryImage(
              change.image.id,
              change.newData.title!,
              change.newData.description!,
              change.newData.category!
            );
            if (data && !error) {
              successCount++;
              console.log(`Successfully updated: ${change.image.title}`);
            } else {
              console.error(`Update failed for ${change.image.title}:`, error);
              failCount++;
              failedChanges.push(`${change.image.title} (update: ${error?.message || 'Unknown error'})`);
            }
          }
          else if (change.type === 'replace' && change.replaceFile) {
            console.log(`Replacing image: ${change.image.id}`);
            // Delete old image from storage
            if (change.image.image_url) {
              await deleteFromStorage(change.image.image_url);
            }

            // Upload new image
            const { data: uploadData, error: uploadError } = await uploadImageToStorage(change.replaceFile);
            if (uploadError || !uploadData) {
              console.error(`Upload failed for ${change.image.title}:`, uploadError);
              failCount++;
              failedChanges.push(`${change.image.title} (upload: ${uploadError?.message || 'Unknown error'})`);
              continue;
            }

            const newImageUrl = getPublicUrl(uploadData.path);

            // Update database
            const { data: updateData, error: updateError } = await updateGalleryImage(
              change.image.id,
              change.image.title,
              change.image.description,
              change.image.category,
              newImageUrl
            );

            if (updateData && !updateError) {
              successCount++;
              console.log(`Successfully replaced: ${change.image.title}`);
            } else {
              console.error(`Update after replace failed for ${change.image.title}:`, updateError);
              failCount++;
              failedChanges.push(`${change.image.title} (replace update: ${updateError?.message || 'Unknown error'})`);
            }
          }
        } catch (error) {
          console.error('Error processing change:', error);
          failCount++;
          failedChanges.push(`${change.image.title} (${error instanceof Error ? error.message : 'Unknown error'})`);
        }
      }

      // Reload images from Supabase to get fresh state
      await loadGalleryImages();

      // Clear pending changes only if all succeeded
      if (failCount === 0) {
        setPendingChanges(new Map());
        alert(`All ${successCount} change(s) saved successfully!`);
      } else {
        // Show detailed error message
        const errorDetails = failedChanges.length > 0
          ? `\n\nFailed changes:\n${failedChanges.join('\n')}`
          : '';
        alert(`Some changes failed:\nSuccess: ${successCount}\nFailed: ${failCount}${errorDetails}\n\nPlease check console for details.`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert(`An error occurred while saving changes: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col">
      <SiteHeader />
      <PageHero
        eyebrow="Welcome back"
        title={`Gallery Management ${user.name ? `- ${user.name}` : ""}`}
        subtitle="Upload, edit, or delete gallery images. Manage your school's visual memories."
      />

      {/* User info and logout bar */}
      <div className="bg-muted border-b sticky top-20 z-10">
        <div className="mx-auto max-w-[90vw] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{user.name || user.email}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges() && (
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                {pendingChanges.size} unsaved change(s)
              </span>
            )}
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[90vw] px-4 py-12 md:py-16 flex-grow">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary">Gallery Images</h2>
            <p className="text-muted-foreground mt-1">
              {images.length} {images.length === 1 ? 'image' : 'images'} in your gallery
              {hasUnsavedChanges() && ` (${pendingChanges.size} unsaved change(s))`}
            </p>
          </div>

          <Link to="/gallery-upload">
            <Button className="btn-primary gap-2">
              <Upload className="h-4 w-4" />
              Upload New Image
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 && !hasUnsavedChanges() ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No images yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Start building your gallery by uploading your first image.
                </p>
                <Link to="/gallery-upload">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Upload First Image
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => {
              const isPending = pendingChanges.has(image.id);
              const pendingChange = pendingChanges.get(image.id);

              return (
                <Card
                  key={image.id}
                  className={`card-elegant overflow-hidden ${isPending ? 'ring-2 ring-amber-500' : ''}`}
                >
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="h-full w-full object-cover"
                    />
                    {isPending && (
                      <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Pending
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-accent">
                      {image.category}
                    </p>
                    <h3 className="font-display text-base font-bold text-primary mt-1 line-clamp-1">
                      {image.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {image.description}
                    </p>

                    {editingId === image.id ? (
                      <div className="space-y-3 mt-4">
                        <div>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => handleEditChange('title', e.target.value)}
                            placeholder="Title"
                            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background"
                          />
                        </div>
                        <div>
                          <textarea
                            value={editForm.description}
                            onChange={(e) => handleEditChange('description', e.target.value)}
                            placeholder="Description"
                            rows={2}
                            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background resize-y"
                          />
                        </div>
                        <div>
                          <select
                            value={editForm.category}
                            onChange={(e) => handleEditChange('category', e.target.value)}
                            className="w-full px-2 py-1.5 text-sm border border-input rounded-md bg-background"
                          >
                            <option>School Life</option>
                            <option>Celebrations</option>
                            <option>Literary Club</option>
                            <option>Academics</option>
                            <option>Library Club</option>
                            <option>Music Club</option>
                            <option>Art & Craft</option>
                            <option>Achievements</option>
                            <option>Cultural Heritage</option>
                            <option>Sports Club</option>
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(image.id)}
                            className="flex-1 bg-primary text-primary-foreground"
                          >
                            Save Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : replacingId === image.id ? (
                      <div className="space-y-3 mt-4">
                        <div className="text-sm font-medium text-foreground">Replace Image</div>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleReplaceFile}
                          className="w-full text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                        {replaceFile && (
                          <div className="text-xs text-muted-foreground">
                            Selected: {replaceFile.name}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handlePreviewReplace(image.id)}
                            disabled={!replaceFile}
                            className="flex-1 bg-primary text-primary-foreground"
                          >
                            Preview Replace
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelReplace}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 mt-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartEdit(image)}
                            className="flex-1 gap-1.5"
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStartReplace(image)}
                            className="flex-1 gap-1.5"
                          >
                            <Replace className="h-3.5 w-3.5" />
                            Replace
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(image.id, image.title)}
                          disabled={isDeleting === image.id}
                          className="w-full gap-1.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Fixed bottom save bar */}
      {hasUnsavedChanges() && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
          <div className="mx-auto max-w-[90vw] px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  You have {pendingChanges.size} unsaved change(s)
                </p>
                <p className="text-xs text-muted-foreground">
                  Changes will be lost if you logout without saving
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm('Discard all unsaved changes?')) {
                    setImages([...originalImages]);
                    setPendingChanges(new Map());
                    setEditingId(null);
                    setReplacingId(null);
                  }
                }}
              >
                Discard
              </Button>
              <Button
                onClick={handleSaveAllChanges}
                disabled={isSaving}
                className="gap-2 bg-primary text-primary-foreground"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4" />
                    Save Changes ({pendingChanges.size})
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

// Simple User component for the avatar
function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
