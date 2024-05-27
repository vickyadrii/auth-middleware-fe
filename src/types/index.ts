import { User } from "./user";

export type LoginContext = {
  data?: User;
  isAuthenticated?: boolean;
};
