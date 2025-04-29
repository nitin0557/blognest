import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Blog } from "../types/blog";
import { AppDispatch } from "../store";
import { likeBlog, viewBlog } from "../store/reducers/blogSlice";
import "../style/BlogCard.css";
import ShareModal from "./Modal";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showTripleDot, setTripleDots] = useState(false);

  const blogUrl = `${window.location.origin}/blog/${blog.id}`;

  const handleLike = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(likeBlog(blog.id));
    },
    [dispatch, blog.id]
  );

  const handleCardClick = useCallback(() => {
    dispatch(viewBlog(blog.id));
    navigate(`/blog/${blog.id}`);
  }, [dispatch, navigate, blog.id]);

  const handleTripleDotClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setTripleDots((prevState) => !prevState); 
    },
    []
  );

  const handleShareClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setShowModal(true);
    },
    []
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(blogUrl);
    alert("Blog URL copied to clipboard!");
    setShowModal(false);
  };

  return (
    <>
      <Card
        className="mb-4 shadow-sm"
        onClick={handleCardClick}
        style={{ cursor: "pointer", position: "relative" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      >
        <Card.Img
          variant="top"
          src={blog.imageUrl}
          alt={blog.title}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="h5 d-flex justify-content-between">
            {blog.title}

            {/* Triple Dot for "Share" */}
            <div
              onClick={handleTripleDotClick}
              style={{ cursor: "pointer", position: "relative" }}
            >
              ⋮
              {showTripleDot && (
                <div onClick={handleShareClick} className="triple-dots">
                  <span className="share">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      viewBox="0 0 19 19"
                      role="img"
                      className="blog-icon-fill"
                    >
                      <path d="M16.9410444,8.39109677 C17.0195644,8.46818967 17.0195644,8.59371274 16.9410444,8.67080564 L11.9026789,13.6176004 C11.7063789,13.8103326 11.3872657,13.8103326 11.1909657,13.6176004 C11.096339,13.5246935 11.0429857,13.3991705 11.0429857,13.2677172 L11.0429857,11.0013834 C7.27402658,11.0013834 4.38690723,12.7339971 2.38263435,16.1972475 C2.27794104,16.3781194 1.99204777,16.3049799 2.0001011,16.0964337 C2.24975438,10.0357454 5.2637137,6.69011101 11.0429857,6.05953059 L11.0429857,3.79418524 C11.0429857,3.52040659 11.268479,3.29999995 11.5463189,3.29999995 C11.6802056,3.29999995 11.8080522,3.35139522 11.9026789,3.44430206 L16.9410444,8.39109677 Z M3.43409745,13.1243046 C5.43837033,11.0576217 7.98624309,10.0139024 11.0434891,10.0139024 L12.0501555,10.0139024 L12.0501555,12.0746551 L15.6600614,8.53035818 L12.0501555,4.98704968 L12.0501555,6.94501178 L11.1542224,7.0418721 C6.94635665,7.50146442 4.39949056,9.49994971 3.43409745,13.1243046 Z"></path>
                    </svg>
                    Share Post
                  </span>
                </div>
              )}
            </div>
          </Card.Title>

          <Card.Text>
            {blog.body.length > 100
              ? `${blog.body.slice(0, 100)}...`
              : blog.body}
          </Card.Text>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <span onClick={handleLike}>
              ❤️ {blog.likes}
            </span>
            <span>👁️ {blog.views}</span>
            <span>💬 {blog.comments.length}</span>
          </div>
        </Card.Body>
      </Card>
      
      <ShareModal
        show={showModal}
        onClose={() => setShowModal(false)}
        url={blogUrl}
      />
    </>
  );
};

export default React.memo(BlogCard);
