import { UserSecure } from "@/types";
import Link from "next/link";

type ModifyUserButtonProps = {
  activeAdmin: UserSecure | null;
  userToModify: UserSecure;
};
export default function ModifyUserButton({
  activeAdmin,
  userToModify,
}: ModifyUserButtonProps) {
  const areTheyTheSamePerson = activeAdmin?.id === userToModify.id;
  return (
    <Link
      href={
        !areTheyTheSamePerson ? `/user/${userToModify.id}` : "/user/list-all"
      }
      type="button"
      className={`btn btn-secondary ${areTheyTheSamePerson ? "disabled" : ""}`}
      aria-disabled={areTheyTheSamePerson}
    >
      Modifica
    </Link>
  );
}
