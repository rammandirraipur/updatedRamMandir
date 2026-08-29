import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
      const snapshot = await getDocs(q);
      setImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="gallery-section animate-left" id="gallery">
      <h2>Temple Gallery</h2>

      {loading ? (
        <p>Loading gallery...</p>
      ) : images.length === 0 ? (
        <p>No images added yet.</p>
      ) : (
        <div className="gallery-grid animate-right">
          {images.map((img) => (
            <div
              key={img.id}
              className="gallery-item"
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.imageUrl} alt={img.caption || "Temple view"} />
              <div className="zoom-hint">🔍</div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>
          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.caption || "Temple view"}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          {selectedImage.caption && (
            <p className="lightbox-caption">{selectedImage.caption}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Gallery;