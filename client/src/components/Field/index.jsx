export default function Field({
  item,
  handleInput = () => {},
  disabled = false,
  input,
}) {
  if (item.type === "submit") {
    return <input type="submit" placeholder={item.label} disabled={disabled} />;
  } else if (item.type === "select") {
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
        <div className="flex items-center gap-10 flex-wrap">
          {item.options?.map((option) => (
            <div
              key={option._id}
              className="flex items-center justify-center gap"
              onChange={() => handleInput(event, item._id)}>
              <input
                checked={option.value === input?.response}
                className="m-0 text-lg"
                type="radio"
                id={option._id}
                value={option.value}
                name={item.name || "radio_input"}
                disabled={disabled}
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
          checked={input?.response || item.response}
          id={item._id}
          className="text-lg"
          type={item.type || "text"}
          name={item.name || "text_input"}
          onChange={() => handleInput(event, item._id)}
          value={input ? input.response : item.response}
          disabled={disabled}
        />
      </>
    );
  }
}
