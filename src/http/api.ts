import { TCredentials } from "../types";
import httpInstance from "./client";

export const login = (credentials: TCredentials) => httpInstance.post('/auth/login', credentials);
export const self = () => httpInstance.get('/auth/self');
export const logout = () => httpInstance.post('/auth/logout');