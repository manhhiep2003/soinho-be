const authRoot = 'auth';
const userRoot = 'user';

const baseRoutes = (root: string) => {
  return {
    root,
    getOne: `/${root}/:id`,
    update: `/${root}/:id`,
    delete: `/${root}/:id`,
  };
};

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    register: `/${authRoot}/register`,
    login: `/${authRoot}/login`,
    logout: `/${authRoot}/logout`,
    refreshToken: `/${authRoot}/refresh-token`,
  },

  user: {
    ...baseRoutes(`${userRoot}/user`),
  },
};
