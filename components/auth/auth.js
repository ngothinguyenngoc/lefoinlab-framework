
const AUTH_SERVER =
  "https://auth.lefoinlab.com";

async function getCurrentUser() {
  try {
    const response = await fetch(
      `${AUTH_SERVER}/api/me`,
      {
        credentials: "include",
      }
    );

    const result =
      await response.json();

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function login() {
  const callback =
    encodeURIComponent(
      window.location.href
    );

  window.location.href =
    `${AUTH_SERVER}/login?callback=${callback}`;
}

function logout() {
  window.location.href =
    `${AUTH_SERVER}/logout`;
}

async function renderAuth() {
  const loading =
    document.getElementById(
      "auth-loading"
    );

  const guest =
    document.getElementById(
      "auth-guest"
    );

  const userBox =
    document.getElementById(
      "auth-user"
    );

  if (
    !loading ||
    !guest ||
    !userBox
  ) {
    return;
  }

  loading.hidden = false;
  guest.hidden = true;
  userBox.hidden = true;

  const user =
    await getCurrentUser();

  loading.hidden = true;

  if (!user) {
    guest.hidden = false;

    document
      .getElementById(
        "auth-login-btn"
      )
      ?.addEventListener(
        "click",
        login
      );

    return;
  }

  userBox.hidden = false;

  document.getElementById(
    "auth-avatar"
  ).textContent =
    (
      user.email?.charAt(0) ||
      "U"
    ).toUpperCase();

  document.getElementById(
    "auth-name"
  ).textContent =
    user.displayName ||
    user.email.split("@")[0];

  document.getElementById(
    "auth-email"
  ).textContent =
    user.email;

  document
    .getElementById(
      "auth-logout-btn"
    )
    ?.addEventListener(
      "click",
      logout
    );
}

document.addEventListener(
  "DOMContentLoaded",
  renderAuth
);

export {
  getCurrentUser,
  login,
  logout,
  renderAuth,
};

