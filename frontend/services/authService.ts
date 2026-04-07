import {authFetch} from '../services/api'
const API_URL = process.env.AUTH_API_URL ?? "http://localhost:5000/api/auth";

export const register = async (data: any) => {
  const res = await authFetch(`${API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};

export const login = async (data: any) => {
  const res = await authFetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return res.json();
};