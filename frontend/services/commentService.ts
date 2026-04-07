import {authFetch} from '../services/api'


const API = process.env.API_URL ?? "http://localhost:5000/api";

export async function getCommentsByPost(postId: string, { limit = 50, offset = 0 } = {}) {
  const params = new URLSearchParams({
    post: postId,
    limit: String(limit),
    offset: String(offset),
  });
  const res = await fetch(`${API}/comment?${params}`);
  if (!res.ok) throw new Error("Failed to fetch comment");
  // Returns { comment, total, limit, offset }
  return res.json();
}

export async function createComment(data: { comment: string; post: string }, token: string) {
  const res = await authFetch(`${API}/comment`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create comment");
  return res.json();
}

export async function deleteComment(id: string, token: string) {
  const res = await authFetch(`${API}/comment/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
}
