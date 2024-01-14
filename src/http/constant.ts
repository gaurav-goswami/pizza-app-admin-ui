const AUTH_BASE = '/auth'
const USERS_BASE = '/users'
const TENANT_BASE = '/tenants'

export const AUTH_ROUTES = {
    login: `${AUTH_BASE}/login`,
    self: `${AUTH_BASE}/self`,
    logout: `${AUTH_BASE}/logout`
}

export const USERS_ROUTES = {
    allUsers: `${USERS_BASE}/`
}

export const TENANT_ROUTES = {
    allTenants: `${TENANT_BASE}/`
}