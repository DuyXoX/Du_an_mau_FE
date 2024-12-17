'use client';
import React, { useEffect, useState } from 'react';
import Navigation from '@/layouts/Navigation';
import Footer from '@/layouts/Footer';
import SliderMain from '@/components/sliders/SliderMain';
import './vip.css';
const TinTucDetail = ({ params }) => {
  const { id } = params; // Lấy id từ params
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(3); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/tintuc/${id}`);
        if (!response.ok) {
          throw new Error('Lỗi khi tải bài viết!');
        }
        const data = await response.json();
        setArticle(data);
        setLoading(false);

        const relatedResponse = await fetch(`http://localhost:8000/api/tintuc`);
        if (!relatedResponse.ok) {
          throw new Error('Lỗi khi tải tin tức liên quan!');
        }
        const relatedData = await relatedResponse.json();
        setRelatedArticles(relatedData);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentRelatedArticles = relatedArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Đang tải dữ liệu chi tiết bài viết...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <>
      <Navigation />
      <SliderMain />
      <main className="container">
        <div className="tin-tuc-detail">
          <h1 className="article-title">{article.TieuDe}</h1>
          <p className="article-date">{new Date(article.CreatedAt).toLocaleDateString()}</p>
          <img
            src={article.HinhAnh}
            alt={article.TieuDe}
            className="article-image-detail"
          />
          <div className="article-content-detail">
            <p dangerouslySetInnerHTML={{ __html: article.MoTa }}></p>
            <p dangerouslySetInnerHTML={{ __html: article.NoiDung }}></p>
          </div>

          <section className="related-articles">
            <h2>Các tin tức khác</h2>
            <div className="related-articles-list">
              {currentRelatedArticles.length === 0 ? (
                <p>Không có tin tức khác</p>
              ) : (
                currentRelatedArticles.map((related) => (
                  <div key={related.TinTucId} className="related-article-item">
                    <h3>{related.TieuDe}</h3>
                    <p>{new Date(related.CreatedAt).toLocaleDateString()}</p>
                    <img
                      src={related.HinhAnh}
                      alt={related.TieuDe}
                      className="related-article-image"
                    />
                    <a href={`/tin-tuc/${related.TinTucId}`} className="related-article-link">
                      Đọc thêm
                    </a>
                  </div>
                ))
              )}
            </div>
            <div className="pagination">
              {Array.from({ length: Math.ceil(relatedArticles.length / articlesPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TinTucDetail;
