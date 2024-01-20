import { AUTH_ROUTES, TENANT_ROUTES, USERS_ROUTES } from "../constant";
import { TCredentials } from "../../utils/types";
import httpInstance from "../config/httpInstance";
import { IUser } from "../../pages/ProtectedRoutes/Users/types";

export const login = (credentials: TCredentials) => httpInstance.post(AUTH_ROUTES.login, credentials);
export const self = () => httpInstance.get(AUTH_ROUTES.self);
export const logout = () => httpInstance.post(AUTH_ROUTES.logout);
export const getUsers = () => httpInstance.get(USERS_ROUTES.user);
export const getTenants = () => httpInstance.get(TENANT_ROUTES.allTenants);
export const createUser = (user: IUser) => httpInstance.post(USERS_ROUTES.user, user);