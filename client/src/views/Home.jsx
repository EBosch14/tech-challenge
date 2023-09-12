import { useEffect, useState } from "react";
import Field from "../components/Field";
import { createAnswer, getAllAnswers } from "../services/fetch-data";

export default function Home({ form, setAnswers }) {
  const [inputs, setInputs] = useState([]);
  // console.log(form.items);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setInputs((prevState) => {
      return prevState.map((input) => {
        if (input.name === name) {
          if (type === "checkbox") {
            return {
              ...input,
              response: checked ? "yes" : "no",
            };
          } else {
            return {
              ...input,
              response: value,
            };
          }
        }
        return input;
      });
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createAnswer(inputs);
      if (result) {
        const dataAnswers = await getAllAnswers();
        setAnswers(dataAnswers);
        alert("answer sent successfully");
        event.target.reset();
        setInputs([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInputs(
      form?.items
        ?.map((item) => {
          return {
            ...item,
            response: "",
          };
        })
        .filter((item) => item.type !== "submit")
    );
  }, [form]);

  useEffect(() => {
    // console.log(inputs);
  }, [inputs]);

  return (
    <main className="flex flex-col w-full gap-5">
      <h1 className="text-3xl mt-10">Customs Forms</h1>
      <section className="flex flex-col gap-10 bg-zinc-900 p-4 rounded-3xl">
        <form
          className="flex flex-col justify-between items-center gap-10 bg-zinc-950 py-8 pb-4 rounded-2xl"
          onSubmit={handleSubmit}>
          {form?.items?.map((item) => (
            <div
              key={item?.name}
              className="w-2/3 flex flex-col text-xl gap-2 text-left">
              <Field
                item={item}
                handleInput={handleInput}
                handleSubmit={handleSubmit}
                input={inputs?.find(
                  (val) =>
                    val?.name?.toLowerCase() === item?.name?.toLowerCase()
                )}
              />
            </div>
          ))}
        </form>
      </section>
    </main>
  );
}
