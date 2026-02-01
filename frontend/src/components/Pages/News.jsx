// components/Sections/NewsSection.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../Slices/sectionsSlice';

const News = () => {
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const defaultNews = [
    {
      id: 1,
      title: "Refer day talk to investors",
      excerpt: "The Best Colleges to Study... Supported by various sales force and fight costs...",
      author: "Editor",
      date: "Oct.12,2014"
    },
    {
      id: 2,
      title: "Why Designers Need Ma...",
      excerpt: "In particular, the initial state of the company's 18+s...",
      author: "Kelley",
      date: "Oct.12,2014"
    },
    {
      id: 3,
      title: "Create great WordPress ...",
      excerpt: "The team focused their efforts on a few of...",
      author: "Green",
      date: "Oct.12,2014"
    },
    {
      id: 4,
      title: "10 Ways To Design For T...",
      excerpt: "Sara Morgan Frazzi, the author of The Thinking Corporation...",
      author: "Kelley",
      date: "Oct.12,2014"
    }
  ];

  const displayNews = news.length > 0 ? news : defaultNews;

  return (
    <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            LATEST NEWS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayNews.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} loading={loading.news} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsCard = ({ item, index, loading }) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    {loading ? (
      <div className="animate-pulse p-6">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center mt-4 space-x-4">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    ) : (
      <div className="p-6">
        <div className="text-sm text-blue-600 font-medium mb-2">
          {item.category || "Business"}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>by {item.author}</span>
          <span>{item.date}</span>
        </div>
      </div>
    )}
  </div>
);

export default News;