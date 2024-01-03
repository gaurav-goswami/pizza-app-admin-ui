import { AUTH_ROUTES } from "../constant";
import { TCredentials } from "../../utils/types";
import httpInstance from "../config/httpInstance";

export const login = (credentials: TCredentials) => httpInstance.post(AUTH_ROUTES.login, credentials);
export const self = () => httpInstance.get(AUTH_ROUTES.self);
export const logout = () => httpInstance.post(AUTH_ROUTES.logout);