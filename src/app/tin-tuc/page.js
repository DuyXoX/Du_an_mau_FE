'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/layouts/Navigation';
import Footer from '@/layouts/Footer';
import SliderMain from '../../components/sliders/SliderMain';
import './news.css';
import LoadTable from '@/components/loading/LoadTable';
const TinTuc = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const articlesPerPage = 6; 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/tintuc'); 
        if (!response.ok) {
          throw new Error('Lỗi !');
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Đang Tải Thông Tin...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Navigation />
      <SliderMain />
      <main className="container">
        <div className="tin-tuc">
          <div className="tin-tuc-list">
            <h1 className="tin-tuc-title">Tin Tức</h1>
            <div className="articles">
              {currentArticles.map((article) => (
                <div key={article.TinTucId} className="article">
                  <img
                    src={article.HinhAnh || 'https://i.pinimg.com/736x/3c/5b/b4/3c5bb492f362dea2637184cd07ee163e.jpg'}
                    alt={article.TieuDe}
                    className="article-image"
                  />
                  <div className="article-content">
                    <h2 className="article-title">{article.TieuDe}</h2>
                    <p className="article-date">{new Date(article.CreatedAt).toLocaleDateString()}</p>
                    <Link href={`/tin-tuc/${article.TinTucId}`} className="article-read-more">Xem chi tiết</Link> 
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {pageNumbers.map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`page-number ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          <div className="danh-muc-tin">
            <h2 className="danh-muc-title">Danh Mục Tin</h2>
            <ul className="danh-muc-list">
              {articles.slice(0, 4).map((article) => (
                <Link href={`/tin-tuc/${article.TinTucId}`} className="danh-muc-item">
                  <img
                    src={article.HinhAnh || 'https://i.pinimg.com/736x/3c/5b/b4/3c5bb492f362dea2637184cd07ee163e.jpg'}
                    alt={article.TieuDe}
                    className="article-image2"
                  />
                  <h3 className="danh-muc-title-item">{article.TieuDe}</h3>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TinTuc;
