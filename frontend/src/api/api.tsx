const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function get(path: string) {
  const res = await fetch(`${BASE_URL}${path}`);
  return res.json();
}
