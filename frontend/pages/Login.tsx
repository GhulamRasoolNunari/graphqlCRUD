import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IUser } from "../../src/types/IUsers";
import { ADD_USER, DELETE_USER, GET_USERS } from "../apollo/gql/User";
import "../css/login.css";

export const Home = () => {
  //state
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState<string | undefined>(undefined);

  //mutations
  const [addUser] = useMutation(ADD_USER, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  const [deleteUser] = useMutation(DELETE_USER);

  //Effects
  useEffect(() => {
    if (!modal) {
      setEmail("");
      setPassword("");
      setId(undefined);
    } else if (id) {
      setEmail(email);
      setPassword(password);
    }
  }, [modal]);

  // Functions
  const addUserData = async () => {
    try {
      await addUser();
      setModal(false);
      Swal.fire("User Created!", undefined, "success");
    } catch (error) {
      Swal.fire("User Creation Failed!", undefined, "error");
    }
  };

  return (
    <>
      <h1>Login</h1>

      <div className={"root"}>
        <div className="form-group">
          <label>
            <span className="title-input"> Email: </span>
            <input
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              type="text"
            />
          </label>

          <label>
            <span className="title-input"> Password: </span>
            <input
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
              type="password"
            />
          </label>
        </div>
        <button onClick={addUserData} className="btn w-20">
          Login
        </button>
      </div>
    </>
  );
};
