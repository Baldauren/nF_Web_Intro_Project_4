import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Main.css";

import ActionRecord from "../ActionRecord/ActionRecord";

export default function Main() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [isModalVisibleForToDoList, setIsModalVisibleForToDoList] =
    useState(false);

  const [isModalVisibleForTrashList, setIsModalVisibleForTrashList] =
    useState(false);

  const INIT_ACTIONS_LIST = [
    { id: uuidv4(), name: "NF_wome_work_1", status: "Done" },
    { id: uuidv4(), name: "NF_wome_work_2", status: "Done" },
    { id: uuidv4(), name: "NF_wome_work_3", status: "Done" },
    { id: uuidv4(), name: "NF_wome_work_4", status: "To Do" },
    { id: uuidv4(), name: "NF_project_1", status: "To Do" },
    { id: uuidv4(), name: "NF_project_2", status: "To Do" },
    { id: uuidv4(), name: "NF_project_3", status: "Done" },
    { id: uuidv4(), name: "NF_project_4", status: "Trash" },
  ];

  const [actionsList, setActionsList] = useState(INIT_ACTIONS_LIST);
  const [statusValue, setStatusValue] = useState("All");

  const [actionName, setActionName] = useState("");

  const [itemToTrash, setItemToTrash] = useState(null);
  const [itemToMoveFromTrash, setItemToMoveFromTrash] = useState(null);

  const handleTypeStatus = (type) => {
    setStatusValue(type);
  };

  const filterActions = (status) => {
    if (status === "All") {
      return actionsList;
    }
    return actionsList.filter((item) => item.status === status);
  };

  const setStatusActionRecord = (id, statusValue) => {
    const itemToSet = actionsList.find((item) => item.id === id);
    itemToSet.status = statusValue;
    const newActionsListWithoutCurrent = actionsList.filter(
      (item) => item.id !== id
    );
    console.log(1, newActionsListWithoutCurrent);
    setActionsList([...newActionsListWithoutCurrent, itemToSet]);
  };

  const onChangeActionName = (e) => {
    console.log(e.target.value);
    setActionName(e.target.value);
  };

  const addAction = () => {
    const newAction = {
      id: uuidv4(),
      name: actionName,
      status: "To Do",
    };
    setActionsList([...actionsList, newAction]);
    setActionName("");
  };

  const handleClickOnActionButton = (item) => {
    console.log(item);
    if (statusValue === "To Do") {
      setItemToTrash(item);
      setIsModalVisibleForToDoList(true);
    } else if (statusValue === "Trash") {
      setItemToMoveFromTrash(item);
      setIsModalVisibleForTrashList(true);
    } else {
      alert("Эта кнопка доступна только для списков дел и мусора.");
    }
  };

  const moveToStatus = (item, newStatusValue) => {
    console.log(item);
    const oldStatusValue = item.status;
    item.status = newStatusValue;
    const newActionsListWithoutCurrent = actionsList.filter(
      (i) => i.id !== item.id
    );
    setActionsList([...newActionsListWithoutCurrent, item]);
    if (oldStatusValue === "To Do") {
      setIsModalVisibleForToDoList(false);
    } else if (oldStatusValue === "Trash") {
      setIsModalVisibleForTrashList(false);
    }
  };

  const deleteForever = (item) => {
    console.log(item, "удалить навсегда");
    const newActionsListWithoutCurrent = actionsList.filter(
      (i) => i.id !== item.id
    );
    setActionsList([...newActionsListWithoutCurrent]);
    setIsModalVisibleForTrashList(false);
  };

  return (
    <div className="Main">
      <div className="Action-buttons-container">
        <ul className="Buttons-list">
          <li className="Buttons-list-item">
            <button
              className={`Set-display-mode ${
                statusValue === "All" ? "Mode-selected" : ""
              }`}
              onClick={() => handleTypeStatus("All")}
            >
              All
            </button>
          </li>
          <li className="buttons-list-item">
            <button
              className={`Set-display-mode ${
                statusValue === "To Do" ? "Mode-selected" : ""
              }`}
              onClick={() => handleTypeStatus("To Do")}
            >
              ToDo
            </button>
          </li>
          <li className="buttons-list-item">
            <button
              className={`Set-display-mode ${
                statusValue === "Done" ? "Mode-selected" : ""
              }`}
              onClick={() => handleTypeStatus("Done")}
            >
              Done
            </button>
          </li>
          <li className="buttons-list-item">
            <button
              className={`Set-display-mode ${
                statusValue === "Trash" ? "Mode-selected" : ""
              }`}
              onClick={() => handleTypeStatus("Trash")}
            >
              Trash
            </button>
          </li>
        </ul>

        <button
          className="Button-add-action"
          onClick={() => setIsAddModalVisible(!isAddModalVisible)}
        ></button>
      </div>

      <p className="Display-status">{statusValue}</p>

      <hr color="gray" size="2" style={{ marginBottom: "24px" }} />

      <ul className="Actions-list">
        {filterActions(statusValue).map((item) => {
          return (
            <ActionRecord
              key={item.id}
              actionItem={item}
              setStatusActionRecord={setStatusActionRecord}
              actionNameValue={actionName}
              handleClick={handleClickOnActionButton}
              statusOfActionsInList={statusValue}
            />
          );
        })}
      </ul>

      {isAddModalVisible && (
        <div className="Modal-window-add-action">
          <p className="Modal-window-add-action-ception">Add new action</p>
          <textarea
            className="New-action-text"
            onChange={onChangeActionName}
            value={actionName}
          ></textarea>
          <button className="Add-new-action-to-list" onClick={addAction}>
            Add
          </button>
        </div>
      )}

      {isModalVisibleForToDoList && (
        <div className="Modal-window-for-todo-list">
          <div className="Move-to-trash-button-container">
            <button
              className="Move-to-trash-button"
              onClick={() => moveToStatus(itemToTrash, "Trash")}
            ></button>
            <span className="Move-to-trash-text">Переместить в корзину</span>
          </div>
        </div>
      )}

      {isModalVisibleForTrashList && (
        <div className="Modal-window-for-trash-list">
          <div className="Delete-forever-button-container">
            <button
              className="Delete-forever-button"
              onClick={() => deleteForever(itemToMoveFromTrash)}
            ></button>
            <span className="Delete-forever-text">удалить навсегда</span>
          </div>

          <div className="Move-to-todo-button-container">
            <button
              className="Move-to-todo-button"
              onClick={() => moveToStatus(itemToMoveFromTrash, "To Do")}
            ></button>
            <span className="Move-to-todo-text">Вернуть к списку дел</span>
          </div>
        </div>
      )}
    </div>
  );
}
