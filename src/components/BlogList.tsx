import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { RootState } from '../store';
import { Spinner } from 'react-bootstrap';

const BlogList: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (visibleBlogs < blogs.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleBlogs((prev) => prev + 3);
        setLoading(false);
      }, 800);
    }
  }, [visibleBlogs, blogs.length]);

  useEffect(() => {
    if (!loaderRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        loadMore();
      }
    }, { threshold: 1.0 });

    observer.current.observe(loaderRef.current);

    return () => {
      observer.current?.disconnect();
    };
  }, [loadMore, loading]);

  useEffect(() => {
    const checkHeight = () => {
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      if (bodyHeight <= windowHeight && visibleBlogs < blogs.length) {
        loadMore();
      }
    };
    
    const timeout = setTimeout(checkHeight, 100);

    return () => clearTimeout(timeout);
  }, [visibleBlogs, blogs.length, loadMore]);

  return (
    <div className="container py-5">
      <div className="row">
        {blogs.slice(0, visibleBlogs).map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="text-center my-4" style={{ minHeight: '50px' }}>
        {loading && <Spinner animation="border" variant="primary" />}
      </div>
    </div>
  );
};

export default BlogList;
