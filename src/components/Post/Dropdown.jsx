import { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";

const Dropdown = ({ handleDelete, handleEdit }) => {
  const inputRef = useRef();
  return (
    <label className="popup">
      <input ref={inputRef} type="checkbox" />
      <div className="burger" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Aksiyonlar</legend>
        <ul>
          <li>
            <button
              onClick={() => {
                handleEdit();
                inputRef.current.checked = false;
              }}
            >
              <FiEdit2 />
              <span>Düzenle</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              <FaTrashAlt />
              <span>Kaldır</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default Dropdown;
