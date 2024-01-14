import { AUTH_ROUTES, TENANT_ROUTES, USERS_ROUTES } from "../constant";
import { TCredentials } from "../../utils/types";
import httpInstance from "../config/httpInstance";

export const login = (credentials: TCredentials) => httpInstance.post(AUTH_ROUTES.login, credentials);
export const self = () => httpInstance.get(AUTH_ROUTES.self);
export const logout = () => httpInstance.post(AUTH_ROUTES.logout);
export const getUsers = () => httpInstance.get(USERS_ROUTES.allUsers);
export const getTenants = () => httpInstance.get(TENANT_ROUTES.allTenants);