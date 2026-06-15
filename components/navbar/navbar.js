
import {
  getCurrentUser,
  login,
  logout,
} from "../../assets/js/auth.js";

async function renderNavbar() {
  const authArea =
    document.getElementById(
      "auth-area"
    );

  if (!authArea) {
    return;
  }

  authArea.innerHTML =
    "Loading...";

  try {
    const user =
      await getCurrentUser();

    if (!user) {
      authArea.innerHTML = `
        <button
          class="navbar-button"
          id="signin-btn"
        >
          Sign In
        </button>
      `;

      document
        .getElementById(
          "signin-btn"
        )
        ?.addEventListener(
          "click",
          login
        );

      return;
    }

    const initial =
      (
        user.email?.[0] || "U"
      ).toUpperCase();

    authArea.innerHTML = `
      <div class="navbar-user">

        <div class="navbar-avatar">
          ${initial}
        </div>

        <span>
          ${user.email}
        </span>

        <button
          class="navbar-button"
          id="logout-btn"
        >
          Logout
        </button>

      </div>
    `;

    document
      .getElementById(
        "logout-btn"
      )
      ?.addEventListener(
        "click",
        logout
      );
  } catch (error) {
    console.error(error);

    authArea.innerHTML = `
      <button
        class="navbar-button"
        id="signin-btn"
      >
        Sign In
      </button>
    `;

    document
      .getElementById(
        "signin-btn"
      )
      ?.addEventListener(
        "click",
        login
      );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  renderNavbar
);

