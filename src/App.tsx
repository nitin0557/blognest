import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppDispatch } from './store';
import { setBlogs } from './store/reducers/blogSlice';
import { blogsData } from './data/blogsData';
import Header from './components/Header';


const BlogList = lazy(() => import('./components/BlogList'));
const BlogDetail = lazy(() => import('./components/BlogDetail'));

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setBlogs(blogsData));
  }, [dispatch]);

  return (
    <Router>
      <div className="container my-5">
        <Header />
      
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/blognest" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
