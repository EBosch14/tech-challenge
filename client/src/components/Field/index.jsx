export default function Field({
  item,
  handleInput = () => {},
  disabled = false,
  input,
}) {
  if (item.type === "select") {
    return (
      <>
        <span className="ml-5">
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </span>
        <select
          className="text-lg"
          name={item.name || "select_input"}
          onChange={() => handleInput(event, item._id)}
          value={input ? input.response : item.response}
          disabled={disabled}>
          {item.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  } else if (item.type === "radio") {
    return (
      <>
        <span className="ml-5">
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </span>
        <div className="flex items-center gap-x-10 gap-y-2 flex-wrap">
          {item.options?.map((option) => (
            <div
              key={option._id || option.value}
              className="flex items-center justify-center gap">
              <input
                checked={option.value === (input ? input.response : "")}
                className="m-0 text-lg"
                type="radio"
                id={option._id}
                value={option.value}
                name={item.name || "radio_input"}
                disabled={disabled}
                onChange={() => handleInput(event, item._id)}
              />
              <label className="cursor-pointer pl-2" htmlFor={option._id}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <span className="ml-5">
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </span>
        <input
          id={item._id}
          className="text-lg"
          type={item.type || "text"}
          name={item.name || "text_input"}
          onChange={() => handleInput(event, item._id)}
          value={input ? input.response : item?.response || ""}
          disabled={disabled}
        />
      </>
    );
  }
}
