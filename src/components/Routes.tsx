export const ROUTES = {
    HOME: "/",
    WORKS: "/works",
    RECONSTRUCTIONS: "/reconstructions",
    LOGIN: "/login",
    REGISTER: "register",
    USER_PROFILE: "/profile",
    WORKS_TABLE: "/works-table",
  }
  export type RouteKeyType = keyof typeof ROUTES;
  export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
    HOME: "Главная",
    WORKS: "Реконструкционные работы",
    RECONSTRUCTIONS: "Заявки на руконструкцию",
    LOGIN: "Вход",
    REGISTER: "Регистрация",
    USER_PROFILE: "Профиль",
    WORKS_TABLE: "Таблица работ",
  };