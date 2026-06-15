const AUTH_URL =
  "https://auth.lefoinlab.com";

export async function getCurrentUser() {
  try {
    const res = await fetch(
      `${AUTH_URL}/api/me`,
      {
        credentials: "include",
      }
    );

    const result = await res.json();

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch {
    return null;
  }
}

export function login() {
  window.location.href =
    `${AUTH_URL}/login?callback=` +
    encodeURIComponent(
      window.location.href
    );
}

export function logout() {
  window.location.href =
    `${AUTH_URL}/logout`;
}