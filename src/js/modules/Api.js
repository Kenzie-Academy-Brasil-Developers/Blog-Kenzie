export class Api {
  static async createUser(signUpData) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    };
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/user/register",
      requestOptions
    ).then((res) => res.json());
    return response;
  }

  static async login(loginData) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/user/login",
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("id", data.userId);
      });
    return response;
  }

  static async getPage(page) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(
      `https://api-blog-m2.herokuapp.com/post?page=${page}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => data.data);
    return response;
  }

  static async getUser(id) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(
      `https://api-blog-m2.herokuapp.com/user/${id}`,
      requestOptions
    ).then((res) => res.json());
    return response;
  }

  static async createPost(post) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    };
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/post",
      requestOptions
    ).then((res) => res.json());
    return response;
  }

  static async deletePost(id) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/post/" + id,
      requestOptions
    );
    return response;
  }

  static async editPost(newContent, id) {
    const requestOptions = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContent),
    };
    const response = await fetch(
      "https://api-blog-m2.herokuapp.com/post/" + id,
      requestOptions
    ).then((res) => res.json());
    return response;
  }
}
