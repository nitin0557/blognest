import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blog } from '../../types/blog';

interface BlogState {
  blogs: Blog[];
  allBlogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
  allBlogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action: PayloadAction<Blog[]>) {
      state.blogs = action.payload;
      state.allBlogs = action.payload;
    },
    likeBlog(state, action: PayloadAction<number>) {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) {
        blog.likes += 1;
      }
    },
    addComment(state, action: PayloadAction<{ id: number; comment: string }>) {
      const blog = state.blogs.find((b) => b.id === action.payload.id);
      if (blog) {
        blog.comments.push(action.payload.comment); // ✅ push a new comment string
      }
    },
    viewBlog(state, action: PayloadAction<number>) {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) {
        blog.views += 1;
      }
    },
    editComment: (state, action) => {
      const { id, index, updatedComment } = action.payload;
      const blog = state.blogs.find((b) => b.id === id);
      if (blog) {
        blog.comments[index] = updatedComment;
      }
    },
    deleteComment: (state, action) => {
      const { id, index } = action.payload;
      const blog = state.blogs.find((b) => b.id === id);
      if (blog) {
        blog.comments.splice(index, 1);
      }
    },
    filterBlogs(state, action: PayloadAction<string>) {
      const searchText = action.payload.toLowerCase();
      state.blogs = searchText
        ? state.allBlogs.filter(
            (blog) =>
              blog.title.toLowerCase().includes(searchText) ||
              blog.body.toLowerCase().includes(searchText)
          )
        : state.allBlogs;
    },
  },
});

export const { setBlogs, likeBlog, addComment, editComment, deleteComment,viewBlog, filterBlogs } = blogSlice.actions;
export default blogSlice.reducer;
