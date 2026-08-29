import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const CLOUD_NAME = "rjv2oiiq";
const UPLOAD_PRESET = "ram_mandir_unsigned";

const emptyForm = {
  title: "",
  description: "",
  author: "admin",
  category: "Ram Mandir",
  date: new Date().toISOString().slice(0, 10),
};

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showAuthorInfo, setShowAuthorInfo] = useState(true);

  useEffect(() => {
    fetchPosts();
    fetchSettings();
  }, []);

  const fetchPosts = async () => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const fetchSettings = async () => {
    const snap = await getDoc(doc(db, "settings", "blogDisplay"));
    if (snap.exists()) {
      setShowAuthorInfo(snap.data().showAuthorInfo !== false);
    }
  };

  const toggleAuthorInfo = async () => {
    const newValue = !showAuthorInfo;
    setShowAuthorInfo(newValue);
    await setDoc(doc(db, "settings", "blogDisplay"), { showAuthorInfo: newValue });
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const resetForm = () => {
    setForm(emptyForm);
    setFile(null);
    setEditingId(null);
    setExistingImageUrl("");
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title || "",
      description: post.description || "",
      author: post.author || "admin",
      category: post.category || "Ram Mandir",
      date: post.date || new Date().toISOString().slice(0, 10),
    });
    setExistingImageUrl(post.imageUrl || "");
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "ram-mandir/blog");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    if (!data.secure_url) throw new Error("Cloudinary upload failed");
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    if (!editingId && !file) return;

    setUploading(true);
    try {
      let imageUrl = existingImageUrl;
      if (file) {
        imageUrl = await uploadToCloudinary();
      }

      const payload = {
        title: form.title,
        description: form.description,
        author: form.author || "admin",
        category: form.category || "Ram Mandir",
        date: form.date || new Date().toISOString().slice(0, 10),
        imageUrl,
      };

      if (editingId) {
        await updateDoc(doc(db, "blogs", editingId), payload);
      } else {
        await addDoc(collection(db, "blogs"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Blog save failed:", error);
      alert("Failed to save post. Check console.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    await deleteDoc(doc(db, "blogs", id));
    if (editingId === id) resetForm();
    fetchPosts();
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Manage Blogs</h1>

      <div
        style={{
          background: "#f0f0f0",
          padding: "12px 16px",
          borderRadius: "8px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          Show Author / Date / Category on website:{" "}
          <strong>{showAuthorInfo ? "ON" : "OFF"}</strong>
        </span>
        <button type="button" onClick={toggleAuthorInfo}>
          {showAuthorInfo ? "Hide from website" : "Show on website"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}
      >
        {editingId && (
          <div style={{ background: "#fff3cd", padding: "8px 12px", borderRadius: "6px" }}>
            Editing post — {existingImageUrl && (
              <img src={existingImageUrl} alt="current" style={{ height: "40px", verticalAlign: "middle", marginLeft: "8px" }} />
            )}
          </div>
        )}

        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        {editingId && <small>Leave file empty to keep the current image.</small>}

        <input type="text" placeholder="Title" value={form.title} onChange={handleChange("title")} required />
        <textarea placeholder="Description" value={form.description} onChange={handleChange("description")} rows={4} required />
        <input type="text" placeholder="Author" value={form.author} onChange={handleChange("author")} />
        <input type="text" placeholder="Category" value={form.category} onChange={handleChange("category")} />
        <input type="date" value={form.date} onChange={handleChange("date")} />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" disabled={uploading}>
            {uploading ? "Saving..." : editingId ? "Update Blog Post" : "Add Blog Post"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {posts.map((post) => (
        <div key={post.id} style={{ display: "flex", gap: "12px", borderBottom: "1px solid #eee", padding: "10px 0" }}>
          <img src={post.imageUrl} alt={post.title} style={{ width: "80px", height: "60px", objectFit: "cover" }} />
          <div style={{ flex: 1 }}>
            <strong>{post.title}</strong>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>{post.category} · {post.date}</p>
          </div>
          <button onClick={() => startEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AdminBlog;