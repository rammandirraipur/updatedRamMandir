import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query, doc, getDoc } from "firebase/firestore";
import "./Blog.css";

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAuthorInfo, setShowAuthorInfo] = useState(true);

  useEffect(() => {
    fetchBlogs();
    fetchSettings();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setBlogPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const snap = await getDoc(doc(db, "settings", "blogDisplay"));
      if (snap.exists()) {
        setShowAuthorInfo(snap.data().showAuthorInfo !== false);
      }
    } catch (error) {
      console.error("Error loading blog settings:", error);
    }
  };

  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  return (
    <section className="blog-section" id="blog">
      <h2 className="blog-title">Blogs</h2>

      {loading ? (
        <p>Loading blogs...</p>
      ) : blogPosts.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        <div className="blog-container">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card" onClick={() => openModal(post)}>
              <img src={post.imageUrl} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.description}</p>
            {showAuthorInfo && (
              <div className="extra-info">
                <p><strong>Author:</strong> {selectedPost.author}</p>
                <p><strong>Date:</strong> {selectedPost.date}</p>
                <p><strong>Category:</strong> {selectedPost.category}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;