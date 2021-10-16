import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import asyncRoutesMock from "../mock/asyncRoutes";

export const mockModules = [...asyncRoutesMock];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
