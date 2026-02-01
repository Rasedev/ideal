// components/Blog/BlogSection.jsx
import React, { useState, useEffect } from 'react';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([
        {
          id: 1,
          title: "The Best Colleges to Stu...",
          excerpt: "Supported by various sales force and fight costs...",
          author: "Editor",
          date: "Oct.12,2014",
          category: "Education"
        },
        {
          id: 2,
          title: "Why Designers Need Ma...",
          excerpt: "In particular, the initial state of the company's 18+s...",
          author: "Kelley",
          date: "Oct.12,2014",
          category: "Design"
        },
        {
          id: 3,
          title: "Create great WordPress ...",
          excerpt: "The team focused their efforts on a few of...",
          author: "Green",
          date: "Oct.12,2014",
          category: "Development"
        },
        {
          id: 4,
          title: "10 Ways To Design For T...",
          excerpt: "Sara Morgan Frazzi, the author of The Thinking Corporation...",
          author: "Kelley",
          date: "Oct.12,2014",
          category: "Design"
        }
      ]);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LATEST NEWS
          </h2>
          <p className="text-gray-600 text-lg">
            Refer day talk to investors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>by {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;