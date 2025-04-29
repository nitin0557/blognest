import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Form } from 'react-bootstrap';
import { addComment, editComment, deleteComment } from '../store/reducers/blogSlice'; // ⬅️ Import actions
import { AppDispatch, RootState } from '../store';
import ShareModal from '../components/Modal';
import "../style/BlogDetail.css";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = useSelector((state: RootState) =>
    state.blog.blogs.find((b) => b.id === Number(id))
  );
  const dispatch = useDispatch<AppDispatch>();

  const [newComment, setNewComment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState('');

  const handleAddComment = useCallback(() => {
    if (!blog) return;
    const trimmedComment = newComment.trim();
    if (trimmedComment) {
      dispatch(addComment({ id: blog.id, comment: trimmedComment }));
      setNewComment('');
    }
  }, [dispatch, blog, newComment]);

  const handleEdit = (index: number, comment: string) => {
    setEditingIndex(index);
    setEditedComment(comment);
  };

  const handleUpdateComment = () => {
    if (blog && editedComment.trim() && editingIndex !== null) {
      dispatch(editComment({ id: blog.id, index: editingIndex, updatedComment: editedComment }));
      setEditingIndex(null);
      setEditedComment('');
    }
  };

  const handleDeleteComment = (index: number) => {
    if (blog) {
      dispatch(deleteComment({ id: blog.id, index }));
    }
  };

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setShowModal(true))
      .catch(() => alert('Failed to copy URL.'));
  }, []);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  if (!blog) {
    return <p className="text-center my-5">Blog not found</p>;
  }

  return (
    <>
      <Card className="my-4 shadow-sm">
        <div className="d-flex justify-content-center align-items-center p-3">
          <Card.Img
            variant="top"
            src={blog.imageUrl}
            alt={blog.title}
            className="image-container"
          />
        </div>
        <Card.Body>
          <Card.Title className="h4">{blog.title}</Card.Title>
          <Card.Text>{blog.body}</Card.Text>

          <Button variant="success" onClick={handleShare}>Share</Button>

          <hr className="my-4" />

          <h5>Comments</h5>
          <div className="mb-3">
            {blog.comments.length > 0 ? (
              blog.comments.map((comment, idx) => (
                <div key={idx} className="border rounded p-2 my-2 bg-light position-relative">
                  {editingIndex === idx ? (
                    <>
                      <Form.Control
                        type="text"
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleUpdateComment();
                          }
                        }}
                      />
                      <div className="mt-2 d-flex gap-2">
                        <Button variant="success" size="sm" onClick={handleUpdateComment}>Save</Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditingIndex(null)}>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mb-1">{comment}</p>
                      <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(idx, comment)}>Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(idx)}>Delete</Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted">No comments yet.</p>
            )}
          </div>

          <Form className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <Button variant="primary" onClick={handleAddComment}>
              Post
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <ShareModal show={showModal} onClose={handleCloseModal} url={window.location.href} />
    </>
  );
};

export default BlogDetail;
