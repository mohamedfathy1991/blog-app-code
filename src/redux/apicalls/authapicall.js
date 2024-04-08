import { authAction } from "../clics/authslics";
// login user
export function loginuser(user) {
  console.log(user)
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),

        headers: {
          "content-type": "apllication/json",
        },
      });

      const data= await response.json()
      dispatch(authAction.login(data))

    } catch (err) {
      console.log(err);
    }
  };
}
