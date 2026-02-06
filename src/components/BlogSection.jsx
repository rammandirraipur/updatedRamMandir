import { useState } from "react";
import React  from "react";
import "./Blog.css";

const blogPosts = [

  {
  id: 5,
  title: "राजस्थान के पत्थरों से तराशा जा रहा 108 फीट ऊँचा भव्य राम मंदिर",
  image: "../Assets/stone blog.jpeg", // अपनी image का सही path दें
  description:
    "रायपुर में भगवान श्रीराम को समर्पित 108 फीट ऊँचे भव्य राम मंदिर का निर्माण कार्य प्रगति पर है। राजस्थान के उत्कृष्ट पत्थरों से निर्मित यह मंदिर पारंपरिक भारतीय वास्तुकला का अद्भुत उदाहरण होगा। लगभग 15 करोड़ की लागत से बन रहे इस मंदिर में 90 से अधिक कुशल कारीगर कार्यरत हैं, जो इसे आस्था और संस्कृति का केंद्र बना रहे हैं।",
  extraInfo: {
    author: "admin",
    date: "2025-12-01",
    category: "Ram Mandir",
  },
},

{
  id: 6,
  title: "तीन घंटे की अखंड पूजा के बाद खुले राम मंदिर के पट",
  image: "../Assets/dance.jpeg", // image का सही path रखें
  description:
    "तीन घंटे की अखंड पूजा-अर्चना के बाद राम मंदिर के कपाट श्रद्धालुओं के लिए खोल दिए गए। इस पावन अवसर पर देशभर से प्रसिद्ध संत, साधु और धर्मगुरु उपस्थित रहे। पहले ही दिन एक लाख से अधिक भक्तों ने मंदिर में दर्शन किए। भजन-कीर्तन, सांस्कृतिक प्रस्तुतियों और दिव्य वातावरण के बीच राम दरबार की भव्य आरती सम्पन्न हुई।",
  extraInfo: {
    author: "admin",
    date: "2025-12-01",
    category: "Ram Mandir",
  },
},
   {
    id: 1,
    title: "छत्तीसगढ़ में भांजे के चरणस्पर्श की परंपरा – श्रीराम जी के प्रति अपार श्रद्धा",
    image: "../Assets/blog1.jpeg",
    description:
      "छत्तीसगढ़ में भगवान श्रीराम को ‘भांजा’ मानने की परंपरा प्राचीन कौशल प्रदेश और माता कौशल्या से जुड़ी है। त्योहारों पर भांजे का सम्मान करना इसी दिव्य संबंध की स्मृति है।",
    extraInfo: {
      author: "Yogesh Dandwate",
      date: "2025-12-01",
      category: "Culture",
    },
    },
  {
    id: 4,
    title: "A Spiritual Visit – Amit Shah at a Temple in Raipur",
    image: "../Assets/amit.jpeg",
    description:
      "A reflective spiritual moment as Home Minister Amit Shah visited a temple in Raipur, offering prayers and expressing reverence for the region’s deep cultural and devotional heritage",
        extraInfo: {
      author: "Author 1",
      date: "2025-12-01",
      category: "Culture",
    },
  },
  {
    id: 2,
    title: "A Spiritual Visit – Yogi Adityanath at Ram Mandir, Raipur",
    image: "../Assets/yogi.jpg",
    description:
      "A serene spiritual moment as Yogi Adityanath visited the Ram Mandir in Raipur, offering prayers and connecting with the deep devotion and cultural heritage of Chhattisgarh.",
        extraInfo: {
      author: "Author 1",
      date: "2025-12-01",
      category: "Culture",
    },

  },
  {
    id: 3,
    title: "A Spiritual Visit – Rajnath Singh at Ram Mandir, Raipur",
    image: "../Assets/Rajnathji.png",
    description:
      "A peaceful and devotional moment as Rajnath Singh visited the Ram Mandir in Raipur, offering prayers and experiencing the spiritual essence of Chhattisgarh’s cherished temple.",
        extraInfo: {
      author: "Author 1",
      date: "2025-12-01",
      category: "Culture",
    },
  },



];

const BlogSection = () => {
    const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };
  return (
    <section className="blog-section" id="blog">
      <h2 className="blog-title">Blogs</h2>

      <div className="blog-container">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />

            <div className="blog-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>

              {/* <button className="read-more-btn" onClick={() => openModal(post)}>
                Read More
              </button> */}
            </div>
          </div>
        ))}
      </div>

        {/* Modal */}
      {selectedPost && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.description}</p>
            <div className="extra-info">
              <p><strong>Author:</strong> {selectedPost.extraInfo.author}</p>
              <p><strong>Date:</strong> {selectedPost.extraInfo.date}</p>
              <p><strong>Category:</strong> {selectedPost.extraInfo.category}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
