export default function Field({ item, handleInputs }) {
  if (item.type === "select") {
    return (
      <>
        <span>
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </span>
        <select name={item.name || "select_input"} onChange={handleInputs}>
          {item.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  } else if (item.type === "submit") {
    return <input type="submit" placeholder={item.label} />;
  } else if (item.type === "radio") {
    return (
      <>
        <span>
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </span>
        {item.options?.map((option) => (
          <label key={option.value} className="inline-block">
            <input
              type="radio"
              name={item.name || "radio_input"}
              value={option.value}
              onChange={handleInputs}
            />
            {option.label}
          </label>
        ))}
      </>
    );
  } else {
    return (
      <>
        <span>
          {item.label || "fill the field: "}{" "}
          {item.required && <strong className="ml-2">(Is required)</strong>}
        </span>
        <input
          type={item.type || "text"}
          name={item.name || "text_input"}
          onChange={handleInputs}
        />
      </>
    );
  }
}
