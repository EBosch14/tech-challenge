import { useEffect, useState } from "react";
import Field from "../components/Field";
import { createAnswer } from "../services/fetch-data";

export default function Home({ form }) {
  const transformData = {};
  form?.items?.forEach((item) => {
    if (item.name) {
      transformData[item.name] = "";
    }
  });
  const [inputs, setInputs] = useState(transformData);

  const handleInputs = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setInputs({ ...inputs, [name]: checked ? "yes" : "" });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await createAnswer(inputs);
      console.log(result);
      alert("answer sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => console.log(inputs), [inputs]);

  return (
    <main className="flex flex-col items-center gap-10">
      <h1 className="text-lg mt-6">Customs Forms</h1>
      <section className="p-4 bg-slate-600 rounded-lg w-2/3">
        <form
          className="w-full flex flex-col items-center gap-4"
          onSubmit={handleSubmit}>
          this is a form
          {form?.items?.map((item, index) => (
            <div key={index}>
              <Field
                item={item}
                handleInputs={handleInputs}
                handleSubmit={handleSubmit}
              />
            </div>
          ))}
        </form>
      </section>
    </main>
  );
}
