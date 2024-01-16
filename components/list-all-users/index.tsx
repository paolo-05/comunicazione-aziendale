import { UserSecure } from "@/types/types";
import ModifyUserButton from "./modifyUserButton";
import DeleteUserButton from "./deleteUserButton";
import Tooltip from "../ui/tooltip";

type ListAllUsersProps = {
  users: UserSecure[] | null;
  currentUser: UserSecure | null;
  token: string;
};

export default function ListAllUsers({
  users,
  currentUser,
  token,
}: ListAllUsersProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Last Name</th>
          <th colSpan={2}>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {!users ? (
          <tr>
            <td colSpan={5}>Loading...</td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={index}>
              <td scope="row">{user.email}</td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>
                {user.id === currentUser?.id ? (
                  <Tooltip text="Non puoi modifcare te stesso.">
                    <ModifyUserButton
                      activeAdmin={currentUser}
                      userToModify={user}
                    />
                  </Tooltip>
                ) : (
                  <ModifyUserButton
                    activeAdmin={currentUser}
                    userToModify={user}
                  />
                )}
              </td>
              <td>
                {user.id === currentUser?.id ? (
                  <Tooltip text="Non puoi eliminare te stesso.">
                    <DeleteUserButton
                      token={token}
                      activeAdmin={currentUser}
                      userToDelete={user}
                    />
                  </Tooltip>
                ) : (
                  <DeleteUserButton
                    token={token}
                    activeAdmin={currentUser}
                    userToDelete={user}
                  />
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
