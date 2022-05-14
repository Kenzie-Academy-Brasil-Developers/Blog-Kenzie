import { mainPage } from "./mainPage.js";
import { Api } from "./modules/Api.js";

export function singInPage() {
  setInnerHTMLSignInPage();
  document.querySelector("title").textContent = "Sign In | M2";
  const buttonPageSignUp = document.querySelector("#sign-up-page");
  buttonPageSignUp.addEventListener("click", () => {
    document.location.reload();
  });
  const buttonSignIn = document.querySelector("#sign-in");
  buttonSignIn.addEventListener("click", async (e) => {
    e.preventDefault();
    const signInData = getSignInData();
    await Api.login(signInData);
    if (window.localStorage.getItem("token") != undefined) {
      mainPage();
    }
  });
}

function setInnerHTMLSignInPage() {
  document.body.innerHTML = `<form class="h-min w-min flex flex-col">
        <header class="text-lg">Sign in</header>

        <label for="email">E-mail:</label>
        <input type="text" name="email" placeholder="ex: juninho@email.com" style="text-transform: lowercase;"
            class="text-black outline-none">

        <label for="password">Password:</label>
        <input type="password" name="password" placeholder="ex: 12345" class="text-black outline-none">

        <button type="submit" id="sign-in" class="bg-lime-900 p-1 my-5">Sign In</button>

        <footer class="text-sm text-center">Don't have an account yet? Click <button type="button" id="sign-up-page"
                class="text-blue-500 underline">here</button> to sign up</footer>
    </form>`;
}

function getSignInData() {
  return {
    email: document.querySelector('[name="email"]').value,
    password: document.querySelector('[name="password"]').value,
  };
}
