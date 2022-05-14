import { Api } from "./modules/Api.js";
import { singInPage } from "./signInPage.js";

export function signUpPage() {
  setSignUpInnerHTML();
  const buttonSignUp = document.querySelector("#sign-up");
  buttonSignUp.addEventListener("click", async (e) => {
    e.preventDefault();
    const signUpData = {
      username: document.querySelector('[name="username"]').value,
      email: document.querySelector('[name="email"]').value,
      avatarUrl: document.querySelector('[name="avatarUrl"]').value,
      password: document.querySelector('[name="password"]').value,
    };
    const response = await Api.createUser(signUpData);
    if (response.status == "error") {
      let errorMessage = `<p class="text-red-500">Algo de errado não está certo</p>`;
      document.querySelector("footer").innerHTML += errorMessage;
      console.log(response);
    } else if (response.id != undefined) {
      singInPage();
    }
  });
  const buttonPageSignIn = document.querySelector("#sign-in-page");

  buttonPageSignIn.addEventListener("click", singInPage);
}

function setSignUpInnerHTML() {
  document.body.innerHTML = `  <form class="h-min w-min flex flex-col">
    <header class="text-lg">Create an account</header>
    <label for="username">Username:</label>
    <input type="text" name="username" maxlength="12" placeholder="Ex: juninho" style="text-transform: lowercase;"
      class="text-black outline-none">

    <label for="email">E-mail:</label>
    <input type="text" name="email" placeholder="ex: juninho@email.com" style="text-transform: lowercase;"
      class="text-black outline-none">

    <label for="avatarUrl">Avatar Url:</label>
    <input type="text" name="avatarUrl"
      placeholder="ex: http://4.bp.blogspot.com/-0Qq3uUwnkVU/TlWU419tL7I/AAAAAAAAAK0/BTBnZ69bDCU/s1600/Audioslave+Logo.jpg"
      class="text-black outline-none">

    <label for="password">Password:</label>
    <input type="password" name="password" placeholder="ex: 12345" class="text-black outline-none">

    <button type="submit" id="sign-up" class="bg-lime-900 p-1 my-5">Sign Up</button>
    <footer class="text-sm text-center">Already have an acconut? Click <button type="button" id="sign-in-page"
        class="text-blue-500 underline">here</button> to
      sign in</footer>
  </form>`;
}
