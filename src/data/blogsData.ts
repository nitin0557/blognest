import { Blog } from "../types/blog";

export const blogsData: Blog[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  title: `Blog Post #${index + 1}`,
  body: `This is the content for blog post number ${index + 1}.`,
  imageUrl: `https://picsum.photos/seed/${index + 1}/600/400`,
  likes: 0,
  views: 0, // 👈 added views
  comments: [`Nice blog #${index + 1}!`, `Really informative #${index + 1}!`],
}));
