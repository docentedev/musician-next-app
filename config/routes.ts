const routes = {
    home: () => '/',
    authLogin: () => '/auth/login',
    publicMusician: (id: string) => `/musicians/${id}`,
    adminMusicians: () => '/admin/musicians',
    adminMusician: (id: string) => `/admin/musicians/${id}`,
    adminMusicianCreate: () => '/admin/musicians/create',
    adminCities: () => '/admin/cities',
    adminCity: (id: string) => `/admin/cities/${id}`,
}

export default routes
