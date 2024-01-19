import { Session } from "next-auth";
import { UserSecure } from "./types";

export type ItemProps = {
  user: UserSecure | null;
  session: Session | null;
};
