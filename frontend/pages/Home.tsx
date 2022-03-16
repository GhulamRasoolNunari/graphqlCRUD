import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IUser } from "../../src/types/IUsers";
import { ADD_USER, DELETE_USER, GET_USERS } from "../apollo/gql/User";
import { Modal } from "../components/Modal";
import { Paginate } from "../components/Paginate";
import { Sortable } from "../components/Sortable";
import "../css/home.css";
import { EditIcon } from "../icons/EditIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { SortType } from "../types/Sort";
export const Home = () => {
  //state
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(1);
  const [id, setId] = useState<string | undefined>(undefined);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState<SortType | undefined>(undefined);
  const [search,setSearch]= useState("")

  // queries
  const userGraph = useQuery<{
    users: { docs: IUser[]; count: number };
  }>(GET_USERS, {
    variables: {
      take: limit,
      skip: skip,
      sort: sort?.name,
      order: sort?.order,
      search
    },
  });
  useEffect(() => {
    if (userGraph.data) {
      setUserList(userGraph.data.users.docs);
      setCount(userGraph.data.users.count);
    }
  }, [userGraph.data]);

  //mutations
  const [addUser] = useMutation(ADD_USER, {
    variables: {
      input: {
        email,
        type,
        name,
        _id: id,
      },
    },
  });

  const [deleteUser] = useMutation(DELETE_USER);

  //Effects
  useEffect(() => {
    if (!modal) {
      setName("");
      setEmail("");
      setType(1);
      setId(undefined);
    } else if (id) {
      const user = userGraph.data?.users.docs.find((item) => item._id == id)!;
      setName(user.name);
      setEmail(user.email);
      setType(user.type);
    }
  }, [modal]);

  // Functions
  const addUserData = async () => {
    try {
      await addUser();
      setModal(false);
      Swal.fire("User Created!", undefined, "success");
      userGraph.refetch();
    } catch (error) {
      Swal.fire("User Creation Failed!", undefined, "error");
    }
  };

  const deleteUserData = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser({
          variables: {
            input: id,
          },
        });
        userGraph.refetch();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <h1>Home page</h1>
      <div className="header">
        <b className="header-item">
          Users ( {count} ){" "}
          <select
            onChange={(e) => setLimit(parseInt(e.currentTarget.value))}
            value={limit}
          >
            <option value="5">5</option> <option value="10">10</option>
            <option value="25">25</option> <option value="50">50</option>
          </select>
          <input onInput={e=>setSearch(e.currentTarget.value)} placeholder="search" type="text" />
        </b>
        <button onClick={() => setModal(!modal)} className="btn">
          Add User
        </button>
        <button onClick={() => ""} className="btn">
          Login
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="column">id</th>
              <th className="column">
                <Sortable setSort={setSort} state={sort} name="name">
                  name
                </Sortable>
              </th>
              <th className="column">
                <Sortable setSort={setSort} state={sort} name="email">
                  email
                </Sortable>
              </th>
              <th className="column">
                <Sortable setSort={setSort} state={sort} name="type">
                  type
                </Sortable>
              </th>
              <th className="column">action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item) => (
              <tr key={item._id}>
                <td className="column">{item._id}</td>
                <td className="column">{item.name}</td>
                <td className="column">{item.email}</td>
                <td className="column">{item.type}</td>
                <td className="column">
                  <span
                    onClick={() => deleteUserData(item._id!)}
                    className="trash"
                  >
                    <TrashIcon />
                  </span>
                  <span
                    onClick={() => {
                      setId(item._id), setModal(true);
                    }}
                    className="edit"
                  >
                    <EditIcon />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Paginate
          limit={limit}
          setData={userGraph.refetch}
          total={count}
          setLimit={setLimit}
          setSkip={setSkip}
          skip={skip}
        ></Paginate>
      </div>
      <Modal
        title={id ? "Edit User" : "Add User"}
        onClose={() => setModal(false)}
        state={modal}
      >
        <div className="form-group">
          <label>
            <span className="title-input">Name: </span>
            <input
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
              type="text"
            />
          </label>
          <label>
            <span className="title-input"> Email: </span>
            <input
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              type="text"
            />
          </label>

          <label>
            <span className="title-input"> Type: </span>
            <input
              type="number"
              value={type}
              onInput={(e) => setType(e.currentTarget.valueAsNumber)}
            />
          </label>
        </div>
        <button onClick={addUserData} className="btn w-full">
          Save
        </button>
      </Modal>
    </>
  );
};
