import privateClient from "../client/privateClient";
import publicClient from "../client/publicClient";

const userEndpoints = {
  login: "user/login",
  register: "user/register",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.login, {
        username,
        password,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  register: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.register, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
