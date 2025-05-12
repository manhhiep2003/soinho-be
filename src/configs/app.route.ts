const authRoot = 'auth';
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
    ...baseRoutes(authRoot),
    login: `/${authRoot}/login`,
  },
};
