import { useEffect, useState } from "react";
import "./App.css";
import Answers from "./views/Answers";
import Home from "./views/Home";
import { Routes, Route } from "react-router-dom";
import { getAllAnswers } from "./services/fetch-data";

function App() {
  const [form, setForm] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAnswers();
      console.log(data);
      setForm(data);
      setAnswers(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home form={form} />} />
        <Route exact path="/answers" element={<Answers answers={answers} />} />
      </Routes>
    </>
  );
}

export default App;
