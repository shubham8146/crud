import React, { useEffect } from "react";
import Appp from "./register";
import { useState } from "react";
const App = () => {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [clas, setClass] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
   getData()
  }, []);
const getData = async () => {
    try {
      const res = await fetch("http://localhost:2100/");
      const students = await res.json();
      setData(students);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };
  const submitbtn = async (event) => {
    event.preventDefault();
    let StudentData = { name, rollno, clas };
    setData((event) => [...event, StudentData]);
    await post(StudentData);
    setName("");
    setClass("");
    setRollno("");
  };
  const post = async (StudentData) => {
    try {
      let api = await fetch("http://localhost:2100/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(StudentData),
      });
      let data = await api.json();
      console.log(data);
    } catch (error) {
      console.log("Error Occur", error);
    }
  };
  return (
    <div>
      {/* <Appp/> */}
      <form onSubmit={submitbtn}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
        <label htmlFor="">Class</label>
        <input
          type="text"
          name="Class"
          onChange={(event) => {
            setClass(event.target.value);
          }}
          value={clas}
        />
        <label htmlFor="">Name</label>
        <input
          type="text"
          name="rollno"
          onChange={(event) => {
            setRollno(event.target.value);
          }}
          value={rollno}
        />
        <button type="submit">Submit</button>
      </form>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>class</th>
            <th>rollno</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event, id) => (
            <tr key={id}>
              <td>{event.name}</td>
              <td>{event.clas}</td>
              <td>{event.rollno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;
