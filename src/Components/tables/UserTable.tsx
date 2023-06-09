import { user } from "../../interfaces";

interface Props {
  items: user[];
  heading: string;
  onDelete: (user: user) => void;
  onUpdate: (user: user) => void;
}

function UserTable({ heading, items, onDelete, onUpdate }: Props) {

  if(items.length == 0) return null;
  return (
    <>
      <h1>{heading}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">phone</th>
            <th scope="col">email</th>
            <th scope="col">username</th>
            <th scope="col">website</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item: user, index: number) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.website}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => onUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    type="button"
                    onClick={() => onDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
