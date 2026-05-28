import { toolRoutes } from "./toolRoutes.js";
import { alternatives } from "./alternatives.js";
import { useCases } from "./useCases.js";
import { toolGroups } from "./toolGroups.js";

export const staticRoutes = ["", "/about", "/privacy"];

export const alternativeRoutes = alternatives.map(
  (item) => `/alternatives/${item.slug}`,
);

export const useCaseRoutes = useCases.map((item) => `/use-cases/${item.slug}`);

export const groupRoutes = toolGroups.map((item) => `/groups/${item.slug}`);

export const allRoutes = [
  ...staticRoutes,
  ...toolRoutes,
  ...alternativeRoutes,
  ...useCaseRoutes,
  ...groupRoutes,
];
