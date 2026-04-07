import {authFetch} from '../services/api'


const API = process.env.API_URL ?? "http://localhost:5000/api";

interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export async function getPosts({ page = 1, limit = 10, search = "", category = "" }: GetPostsParams) {
  const offset = (page - 1) * limit;

  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    ...(search ? { search } : {}),
    ...(category ? { category } : {}),
  });

  const res = await fetch(`${API}/post?${params}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  // Returns { post, total, limit, offset }
  return res.json();
}

export async function getPost(id: string) {
  const res = await fetch(`${API}/post/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
}

export async function createPost(data: any, token: string) {
  const res = await authFetch(`${API}/post`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePost(id: string, data: any, token: string) {
  const res = await authFetch(`${API}/post/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function deletePost(id: string, token: string) {
  const res = await authFetch(`${API}/post/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete post: ${await res.text()}`);
};