import { useEffect, useState } from "react";

import { UserTable } from "./Components/tables";
import { UserForm } from "./Components/forms";
import { user } from "./interfaces";
import UserFilter from "./Components/filters/UserFilter";
import axios from "axios";
import apiClient from "./services/api-client";
import Swal from "sweetalert2";
import userService from "./services/user-service";

function App() {
  document.title = "React Test";
  const [users, setUsers] = useState<user[]>([]);
  const [selectdUser, setSelectedUser] = useState<user | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res: any) => {
        console.log("res", res.data);
        setUsers(res.data);
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) return;
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => cancel();
  }, []);

  const addUser = (user: user) => {
    console.log("in add method");
    const originalUsers = [...users];
    setIsLoading(true);
    setUsers(() => [...users, { ...user, id: users.length + 1 }]);

    userService
      .addNewUser(user)
      .then((res: any) => {
        console.log("res", res);
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) return;
        setUsers(originalUsers);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const editeUser = (user: user) => {
    const originalUsers = [...users];
    setIsLoading(true);
    setUsers(() => users.map((item) => (item.id == user.id ? user : item)));
    setSelectedUser(undefined);
    setModeForm("add");
    userService
      .updateUser(user)
      .then((res: any) => {
        console.log("res", res);
      })
      .catch((error: any) => {
        if (axios.isCancel(error)) return;
        setUsers(originalUsers);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const showEditeUser = (user: user) => {
    setModeForm("update");
    setSelectedUser(user);
    console.log("user", user);
    return;
  };

  const deleteUser = (user: user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        setUsers(() => users.filter((item: user) => item != user));
        const originalUsers = [...users];
        userService
          .deleteUser(user)
          .then((res: any) => {
            console.log("res", res);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((error: any) => {
            if (axios.isCancel(error)) return;
            setUsers(originalUsers);
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    });
  };

  const [filterState, setFIlterState] = useState<string>("");
  const [filterName, setFIlterName] = useState<string>("");
  const [modeForm, setModeForm] = useState<"add" | "update">("add");

  let visibleUsers = users;
  visibleUsers = filterName
    ? visibleUsers.filter((user) => user.name.includes(filterName))
    : visibleUsers;

  return (
    <>
      <div className="container">
        <UserForm
          user={selectdUser}
          mode={modeForm}
          onSubmit={modeForm == "add" ? addUser : editeUser}
        />

        <div className="my-2">
          <UserFilter
            filterName={(name) => setFIlterName(name)}
            filerCity={(state) => setFIlterState(state)}
          />
        </div>
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <UserTable
            heading="users"
            items={visibleUsers}
            onDelete={deleteUser}
            onUpdate={showEditeUser}
          ></UserTable>
        )}
      </div>
    </>
  );
}

export default App;
