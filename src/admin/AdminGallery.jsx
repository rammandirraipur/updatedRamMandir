import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const CLOUD_NAME = "rjv2oiiq";
const UPLOAD_PRESET = "ram_mandir_unsigned";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
    const snapshot = await getDocs(q);
    setImages(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    try {
      // 1. Upload the file to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "ram-mandir/gallery");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      // 2. Save the returned URL + info in Firestore
      await addDoc(collection(db, "gallery"), {
        imageUrl: data.secure_url,
        publicId: data.public_id, // needed to delete from Cloudinary later
        caption,
        uploadedAt: serverTimestamp(),
      });

      setFile(null);
      setCaption("");
      fetchImages();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      // Only removes the Firestore entry + hides it from the site.
      // Deleting the actual file from Cloudinary requires a signed
      // server-side request (can't be done safely from the browser),
      // so the file stays in your Cloudinary Media Library — you can
      // bulk-clean it there occasionally, well within the free 25GB.
      await deleteDoc(doc(db, "gallery", img.id));
      fetchImages();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Manage Gallery</h1>

      <form onSubmit={handleUpload} style={{ marginBottom: "30px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ margin: "0 10px", padding: "6px" }}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {images.map((img) => (
          <div key={img.id} style={{ border: "1px solid #ddd", padding: "8px" }}>
            <img src={img.imageUrl} alt={img.caption} style={{ width: "100%" }} />
            <p style={{ fontSize: "0.9rem" }}>{img.caption}</p>
            <button onClick={() => handleDelete(img)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;