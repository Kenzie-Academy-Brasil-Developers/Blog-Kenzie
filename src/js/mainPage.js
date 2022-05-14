import { Api } from "./modules/Api.js";
class MainPage {
  static currentPage = 1;

  static setPage(page) {
    this.currentPage = page;
  }

  static async postsHTML() {
    return await setHTMLPosts();
  }
}

export async function mainPage() {
  await setMainPageInnerHTML();
}

async function setMainPageInnerHTML() {
  document.body.innerHTML = `<main id="posts" class="flex flex-col gap-2 max-w-[350px] min-w-[324px]">
                                  <form class="">
                                    <label for="create-post">Post something</label>
                                    <input type="text" name="create-post" class="rounded h-14 text-black w-4/5"/><button id="postButton" class="bg-green-900 p-1 rounded w-1/5">Post</button>
                                  </form>
                                  ${await MainPage.postsHTML()}
                                  <footer class="flex justify-evenly">
                                    <button class="setPage hover:text-neutral-400s">1</button>
                                    <button class="setPage hover:text-neutral-400s">2</button>
                                    <button class="setPage hover:text-neutral-400s">3</button>
                                    <button class="setPage hover:text-neutral-400s">4</button>
                                    <button class="setPage hover:text-neutral-400s">5</button>
                                  </footer>
                                </main>`;
  let buttonPost = document.querySelector("#postButton");
  let buttonSetPage = document.querySelectorAll(".setPage");
  let buttonEditArray = document.querySelectorAll(".edit-button");
  let buttonDeleteArray = document.querySelectorAll(".delete-button");
  buttonEditArray.forEach((button) => {
    button.addEventListener("click", () => {
      let formEditPost = document.createElement("form");
      formEditPost.innerHTML = `<input type="text" id="editedText" name="edit-post" placeholder="New content" class="rounded h-14 text-black w-4/5"/><button type="button" id="save-changes" class="bg-green-900 p-1 rounded">Save changes</button>`;
      button.parentNode.append(formEditPost);
      let buttonSaveChanges = document.querySelector("#save-changes");
      buttonSaveChanges.addEventListener("click", () => {
        const newContent = {
          newContent: document.querySelector("#editedText").value,
        };
        Api.editPost(newContent, button.id);
        mainPage();
      });
    });
  });
  buttonDeleteArray.forEach((button) => {
    button.addEventListener("click", () => {
      Api.deletePost(button.id);
      mainPage();
    });
  });
  buttonSetPage.forEach((button) =>
    button.addEventListener("click", () => {
      MainPage.setPage(Number(button.innerText));
      mainPage();
    })
  );
  buttonPost.addEventListener("click", (e) => {
    e.preventDefault();
    createAPost();
    mainPage();
  });
}

async function setHTMLPosts() {
  let posts = [];
  const response = await Api.getPage(MainPage.currentPage);
  for (let i = 0; i < response.length; i++) {
    const post = response[i];
    const user = await Api.getUser(post.owner.id);
    let deleteAndEditHTML = "";
    if (user.id == window.localStorage.getItem("id")) {
      deleteAndEditHTML = `<button id="${post.id}" type="button" class="delete-button hover:text-red-500 transition-colors text-sm">Delete</button>
          <button id="${post.id}" type="button" class="edit-button hover:text-neutral-400 transition-colors text-sm">Edit</button>`;
    }
    posts.push(
      `<div class="bg-neutral-900 p-2 border border-neutral-600 rounded flex items-center flex-wrap w-auto gap-2"><img class="w-10 h-10 rounded-full" src="${user.avatarUrl}"/><p>${post.post}</p>${deleteAndEditHTML}</div>`
    );
  }
  return posts.join(" ");
}

async function createAPost() {
  const post = {
    content: document.querySelector('[name="create-post"]').value,
  };
  await Api.createPost(post);
}

async function editPost(id) {
  console.log(id);
}
