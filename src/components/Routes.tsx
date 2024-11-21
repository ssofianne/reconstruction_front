export const ROUTES = {
    HOME: "/",
    WORKS: "/works",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    WORKS: "Реконструкционные работы",
  };