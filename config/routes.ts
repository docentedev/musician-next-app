const routes = {
    home: () => '/',
    authLogin: () => '/auth/login',
    publicMusician: (id: string) => `/musicians/${id}`,
    adminMusicians: () => '/admin/musicians',
    profile: () => '/profile',
    adminMusician: (id: string) => `/admin/musicians/${id}`,
    adminMusicianCreate: () => '/admin/musicians/create',
    adminCities: () => '/admin/cities',
    adminCity: (id: string) => `/admin/cities/${id}`,
    adminUsers: () => '/admin/users',
    adminUser: (id: string) => `/admin/users/${id}`,
}

export default routes
