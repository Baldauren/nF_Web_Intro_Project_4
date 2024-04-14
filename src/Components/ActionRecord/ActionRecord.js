import "./ActionRecord.css";

export default function ActionRecord({
  actionItem,
  setStatusActionRecord,
  actionNameValue,
  handleClick,
  statusOfActionsInList,
}) {
  const changeStatusTo = () => {
    if (actionItem.status !== "Trash") {
      if (actionItem.status === "Done") {
        setStatusActionRecord(actionItem.id, "To Do");
      } else {
        setStatusActionRecord(actionItem.id, "Done");
      }
    }
  };

  return (
    <li className="Actions-list-item">
      <button
        className="Call-modal-window"
        onClick={() => handleClick(actionItem)}
      ></button>

      <input
        type="checkbox"
        className="Action-checkbox"
        checked={actionItem.status === "Done"}
        onChange={changeStatusTo}
      ></input>

      <span
        className="Action-title"
        style={{
          textDecoration:
            actionItem.status === "Done" ? "line-through" : "none",
        }}
        value={actionNameValue}
      >
        {actionItem.name}{" "}
        <strong>
          {statusOfActionsInList === "All" && actionItem.status === "Trash"
            ? " - Status of action : Trash"
            : ""}
        </strong>
      </span>
    </li>
  );
}
