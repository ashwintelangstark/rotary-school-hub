import { createClient } from '@supabase/supabase-js'

// Try multiple environment variable sources for flexibility
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ||
                     import.meta.env.SUPABASE_URL ||
                     import.meta.env.VITE_SUPABASE_PROJECT_ID ||
                     ''

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ||
                        import.meta.env.SUPABASE_PUBLISHABLE_KEY ||
                        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
                        ''

const bucketName = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'gallery-images'

// Validate Supabase URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Check if Supabase is configured and valid
export const isSupabaseConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  isValidUrl(supabaseUrl) &&
  supabaseUrl !== 'your-supabase-project-url' &&
  supabaseUrl !== 'lgh' &&
  supabaseUrl !== 'xyz' &&
  supabaseUrl !== 'adc' &&
  supabaseUrl !== 'efg'
)

// Only create Supabase client if credentials are valid
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

export const BUCKET_NAME = bucketName

// Gallery image types
export interface GalleryImage {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  created_at: string
}

// Helper function to upload image to Supabase Storage
export async function uploadImageToStorage(
  file: File
): Promise<{ data: { path: string } | null; error: Error | null }> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') }
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      throw error
    }

    return { data: { path: data.path }, error: null }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { data: null, error: error as Error }
  }
}

// Helper function to get public URL for an image
export function getPublicUrl(path: string): string {
  if (!supabase) {
    return ''
  }
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)
  return data.publicUrl
}

// Helper function to save gallery image metadata to database
export async function saveGalleryImage(
  title: string,
  description: string,
  imageUrl: string,
  category: string = 'School Life'
): Promise<{ data: GalleryImage | null; error: Error | null }> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') }
  }

  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([
        {
          title,
          description,
          image_url: imageUrl,
          category,
        },
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error saving gallery image:', error)
    return { data: null, error: error as Error }
  }
}

// Helper function to update gallery image metadata
export async function updateGalleryImage(
  id: string,
  title: string,
  description: string,
  category: string = 'School Life',
  imageUrl?: string
): Promise<{ data: GalleryImage | null; error: Error | null }> {
  if (!supabase) {
    return { data: null, error: new Error('Supabase is not configured') }
  }

  try {
    const updateData: any = {
      title,
      description,
      category,
      updated_at: new Date().toISOString()
    }

    // Only update image_url if provided
    if (imageUrl !== undefined) {
      updateData.image_url = imageUrl
    }

    const { data, error } = await supabase
      .from('gallery_images')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return { data: null, error: error as Error }
  }
}

// Helper function to delete file from Supabase Storage only (not database)
export async function deleteFromStorage(imageUrl: string): Promise<{ success: boolean; error: Error | null }> {
  if (!supabase) {
    return { success: false, error: new Error('Supabase is not configured') }
  }

  try {
    const url = new URL(imageUrl)
    const pathParts = url.pathname.split('/')
    const bucketIndex = pathParts.indexOf('gallery-images')

    if (bucketIndex !== -1 && bucketIndex + 1 < pathParts.length) {
      const filePath = pathParts.slice(bucketIndex + 1).join('/')

      const { error } = await supabase.storage
        .from('gallery-images')
        .remove([filePath])

      if (error) {
        throw error
      }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting from storage:', error)
    return { success: false, error: error as Error }
  }
}

// Helper function to delete gallery image
export async function deleteGalleryImage(
  id: string,
  imageUrl?: string
): Promise<{ success: boolean; error: Error | null }> {
  if (!supabase) {
    return { success: false, error: new Error('Supabase is not configured') }
  }

  try {
    // Delete from database
    const { error: dbError } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id)

    if (dbError) {
      throw dbError
    }

    // Delete from storage if URL provided
    if (imageUrl) {
      try {
        // Extract file path from URL
        const url = new URL(imageUrl)
        const pathParts = url.pathname.split('/')
        const bucketIndex = pathParts.indexOf('gallery-images')
        if (bucketIndex !== -1 && bucketIndex + 1 < pathParts.length) {
          const filePath = pathParts.slice(bucketIndex + 1).join('/')

          const { error: storageError } = await supabase.storage
            .from('gallery-images')
            .remove([filePath])

          if (storageError) {
            console.warn('Could not delete file from storage:', storageError)
            // Continue even if storage deletion fails
          }
        }
      } catch (urlError) {
        console.warn('Could not parse image URL for storage deletion:', urlError)
      }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return { success: false, error: error as Error }
  }
}

// Helper function to fetch all gallery images from database
export async function fetchGalleryImages(): Promise<{
  data: GalleryImage[] | null
  error: Error | null
}> {
  if (!supabase) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return { data: null, error: error as Error }
  }
}
