import { useEffect, useState } from "react";
import "./App.css";
import Answers from "./views/Answers";
import Home from "./views/Home";
import { Routes, Route } from "react-router-dom";
import { getAllAnswers, getRandomForm } from "./services/fetch-data";
import Navbar from "./components/Navbar";

function App() {
  const [form, setForm] = useState({});
  const [answers, setAnswers] = useState([]);

  const handleForm = async () => {
    try {
      const response = await getRandomForm();
      setForm(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const dataForm = await getRandomForm();
      const dataAnswers = await getAllAnswers();
      setForm(dataForm);
      setAnswers(dataAnswers);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home form={form} setAnswers={setAnswers} handleForm={handleForm} />
          }
        />
        <Route
          exact
          path="/answers"
          element={<Answers answers={answers} setAnswers={setAnswers} />}
        />
      </Routes>
    </>
  );
}

export default App;
