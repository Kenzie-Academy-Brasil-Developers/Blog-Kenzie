import { signUpPage } from "./signUpPage.js";
import { Api } from "./modules/Api.js";
import { mainPage } from "./mainPage.js";

if (window.localStorage.getItem("token") != null) {
  mainPage();
} else {
  signUpPage();
}
