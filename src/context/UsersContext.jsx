import { createContext, useContext, useState } from "react";
import { initialUsers } from "../data/users";

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);

  const addUser    = (user)    => setUsers(prev => [...prev, user]);
  const updateUser = (updated) => setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  const deleteUser = (id)      => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsers must be used within UsersProvider");
  return ctx;
};