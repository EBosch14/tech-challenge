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
          name={item.name}
          onChange={() => handleInput(event, item._id)}
          value={input ? input.response : item.response || undefined}
          placeholder="Select one choice..."
          disabled={disabled}>
          {item.options?.map((option) => (
            <option key={option._id} value={option.value}>
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
                name={item.name}
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
  } else if (item.type === "checkbox") {
    return (
      <div className="flex items-center justify-center">
        <input
          className="m-0 text-lg"
          type="checkbox"
          name={item.name}
          id={item._id}
          onChange={() => handleInput(event, item._id)}
          value={input ? input.response : item?.response || ""}
          disabled={disabled}
        />
        <label className="pl-2" htmlFor={item._id}>
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </label>
      </div>
    );
  } else if (item.type === "file") {
    return (
      <>
        <label className="ml-5">
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </label>
        <input
          id={item._id}
          className="text-lg"
          type={item.type}
          name={item.name}
          onChange={() => handleInput(event, item._id)}
          disabled={disabled}
        />
        <span className="text-base">
          Selected File:{" "}
          <strong>{input ? input.response : item?.response || "none"}</strong>
        </span>
      </>
    );
  } else {
    return (
      <>
        <label className="ml-5">
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </label>
        <input
          id={item._id}
          className="text-lg"
          type={item.type}
          name={item.name}
          onChange={() => handleInput(event, item._id)}
          value={input ? input.response : item?.response || ""}
          disabled={disabled}
        />
      </>
    );
  }
}
