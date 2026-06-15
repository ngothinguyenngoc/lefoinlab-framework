import {
  getCurrentUser,
  login,
} from "../../assets/js/auth.js";

async function renderNavbar() {
  const authArea =
    document.getElementById(
      "auth-area"
    );

  const user =
    await getCurrentUser();

  if (!user) {
    authArea.innerHTML = `
      <button id="signin-btn">
        Sign In
      </button>
    `;

    document
      .getElementById(
        "signin-btn"
      )
      .addEventListener(
        "click",
        login
      );

    return;
  }

  authArea.innerHTML = `
    <div class="user">
      👤 ${user.email}
    </div>
  `;
}

renderNavbar();