import { useEffect, useState } from "react";
import { getAllAnswers, updateAnswer } from "../services/fetch-data";
import Field from "../components/Field";

export default function Answers({ answers, setAnswers }) {
  const [formIsEditing, setFormIsEditing] = useState({
    formId: "",
    state: false,
  });
  const [inputs, setInputs] = useState([]);

  const handleClick = (event, formId, items) => {
    if (!formIsEditing.state && formIsEditing.formId === "") {
      setFormIsEditing({
        formId: formId,
        state: true,
      });
      const transformInputs = items.map((item) => ({
        _id: item._id,
        response: item.response,
      }));
      setInputs(transformInputs);
    } else if (formIsEditing.state && formIsEditing.formId === formId) {
      setFormIsEditing({
        formId: "",
        state: false,
      });
      setInputs([]);
    }
  };

  const handleInput = (event, id) => {
    const { value, type, checked } = event.target;
    setInputs((prevState) => {
      return prevState.map((input) => {
        if (input._id === id) {
          if (type === "checkbox") {
            console.log(type, checked, value);
            return {
              ...input,
              response: checked ? "yes" : "no",
            };
          }
          return {
            ...input,
            response: value,
          };
        }
        return input;
      });
    });
  };

  const handleSubmit = async (formId, items) => {
    const itemsChanged = inputs.filter((input) => {
      const foundedItem = items.find((item) => item._id === input._id);
      return foundedItem.response !== input.response;
    });
    if (
      formIsEditing.formId === formId &&
      formIsEditing.state &&
      itemsChanged.length > 0
    ) {
      await updateAnswer(formId, itemsChanged);
      const updatedForms = await getAllAnswers();
      setAnswers(updatedForms);
      console.log("send!");
    }
    setFormIsEditing({
      formId: "",
      state: false,
    });
    setInputs([]);
  };

  useEffect(() => {}, [formIsEditing, inputs]);

  return (
    <main className="flex flex-col w-full gap-5">
      <h1 className="text-3xl mt-10">See all the answers</h1>
      <section className="flex flex-col-reverse gap-10 bg-zinc-900 p-4 rounded-3xl">
        {answers.map((answer) => (
          <article
            key={answer._id}
            className="flex flex-col justify-between items-center gap-10 bg-zinc-950 py-8 pb-4 rounded-2xl">
            {answer.items.map((item) => (
              <div
                key={item._id}
                className="w-2/3 flex flex-col text-xl gap-2 text-left">
                <Field
                  item={item}
                  disabled={
                    formIsEditing.formId !== answer._id ||
                    formIsEditing.state === false
                  }
                  input={inputs.find((val) => val._id === item._id)}
                  handleInput={handleInput}
                />
              </div>
            ))}
            <footer className="w-2/3 pt-8 flex flex-row gap-4 items-center justify-center">
              <button
                className="text-xl"
                disabled={
                  formIsEditing.formId !== answer._id &&
                  formIsEditing.state === true
                }
                onClick={(event) =>
                  handleClick(event, answer._id, answer.items)
                }>
                {formIsEditing.formId === answer._id &&
                formIsEditing.state === true
                  ? "Cancel"
                  : "Edit this from"}
              </button>
              {formIsEditing.formId === answer._id &&
                formIsEditing.state === true && (
                  <button
                    onClick={() => handleSubmit(answer._id, answer.items)}
                    className="text-xl">
                    Update
                  </button>
                )}
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
