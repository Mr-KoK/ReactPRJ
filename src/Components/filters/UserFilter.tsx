import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  filterName: (name: string) => void;
  filerCity: (state: string) => void;
}

const UserFilter = ({ filerCity, filterName }: Props) => {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Name"
            aria-label="Search By Name"
            aria-describedby="button-addon2"
            onChange={(event) => filterName(event.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            title="search"
          >
            <AiOutlineSearch size={20} />
          </button>
        </div>
      </div>
      <div className="col-md-4">
        <select
          onChange={(event) => filerCity(event.target.value)}
          className="form-select form-select-md  mb-3"
          aria-label=".form-select-lg example"
          defaultValue=""
        >
          <option value="">
            Filter By State
          </option>
          <option value="US">US</option>
          <option value="IR">IR</option>
          <option value="ES">ES</option>
          <option value="EN">EN</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilter;
