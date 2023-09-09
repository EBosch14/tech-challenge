import { useEffect, useState } from "react";
import { getAllAnswers, updateAnswer } from "../services/fetch-data";

export default function Answers({ answers, setAnswers }) {
  const [editFields, setEditFields] = useState({
    id: "",
    items: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    console.log(editFields);
  }, [editFields]);

  const handleEditClick = async (id) => {
    if (!isEditing && editFields.id === "") {
      const index = answers.findIndex((answer) => answer._id === id);
      console.log(index);
      setEditFields({
        id: id,
        items: answers[index].items.map((item) => ({
          name: item.label,
          value: item.value,
        })),
      });
      setIsEditing(true);
    }
    if (isEditing && editFields.id === id) {
      try {
        const response = await updateAnswer(editFields);
        const updatedData = await getAllAnswers();
        setAnswers(updatedData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      setEditFields({
        id: "",
        items: [],
      });
      setIsEditing(false);
    }
    if (isEditing && editFields.id !== id) {
      return;
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEditFields((prevEditFields) => {
      const updatedItems = prevEditFields.items.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            value: value,
          };
        }
        return item;
      });

      return {
        ...prevEditFields,
        items: updatedItems,
      };
    });
  };

  return (
    <main className="flex flex-col w-full">
      <h1 className="text-lg">See all the answers</h1>
      <section className="flex flex-col gap-10">
        {answers?.map((answer) => (
          <article
            key={answer._id}
            className="flex flex-col w-full rounded-md bg-slate-900 gap-4 p-10">
            <h2 className="m-0 mb-2">
              <span className="uppercase">Answer id: </span>
              {answer._id}
            </h2>
            {answer.items.map((item, index) => (
              <div
                key={index + answer._id}
                className="flex flex-col rounded overflow-hidden text-xl">
                <h3 className="bg-blue-200 m-0 p-4 text-black">
                  {item.label || "No item label"}
                </h3>
                <p className="bg-slate-600 m-0 p-4">
                  {editFields.id === answer._id ? (
                    <input
                      type="text"
                      value={
                        editFields.items.find(
                          (field) => field.name === item.label
                        ).value
                      }
                      onChange={(e) => handleChange(e, answer._id)}
                      name={item.label}
                    />
                  ) : (
                    item.value || "No response"
                  )}
                </p>
              </div>
            ))}
            <button
              onClick={() => handleEditClick(answer._id)}
              className="w-full bg-blue-700 rounded-t-none hover:bg-blue-800">
              {editFields.id === answer._id
                ? "Save changes"
                : "Edit this response"}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
