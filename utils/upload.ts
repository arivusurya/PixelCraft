import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/**
 * Uploads an image to the `public/assets` directory and returns its public URL.
 * @param {File} image - The image file to upload.
 * @returns {Promise<string>} - The public URL of the uploaded image.
 */
export async function uploadImage(image: File): Promise<{ url: string }> {
  try {
    // Validate input
    if (!image || !image.name) {
      throw new Error("Invalid image file");
    }

    // Directory where files will be stored
    const assetsDirectory = path.join(process.cwd(), "public", "assets");
    await fs.mkdir(assetsDirectory, { recursive: true }); // Ensure the directory exists

    // Generate a unique filename
    const uniqueId = uuidv4();
    const fileExtension = path.extname(image.name); // Get the file extension
    const fileName = `${uniqueId}${fileExtension}`;
    const filePath = path.join(assetsDirectory, fileName);

    // Write the file to the assets folder
    await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));

    // Return the public URL
    return { url: `${process.env.BaseUrl}/assets/${fileName}` };
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Failed to upload image");
  }
}
