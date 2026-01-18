import React, { useState, useEffect } from "react";

const Appp = () => {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [clas, setClass] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudent] = useState([]);
  const [edit, setEdit] = useState(null);
  const [isedit, setisEdit] = useState(false);
  useEffect(() => {
   getData()
  }, []);
  const getData=async()=>{
     await fetch("http://localhost:2600/")
      .then((res) => res.json())
      .then((data) => setStudent(data));
  }
  const addStudent = async (event) => {
    const student = { name, rollno, clas, address };
    try {
      const response = await fetch("http://localhost:2600/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(student),
      });
      const data = await response.json();
      console.log("data", data);
      setStudent((prev) => [...prev,data]);
       getData()
    } catch (error) {
      console.log("error occur:" + error);
    }
  };
  const submitbtn = async (e) => {
    e.preventDefault();

    if (isedit) {
      await updateStudent();
    } else {
      await addStudent();
    }

    btn(); 
  };
  const updateStudent = async () => {
  const student = { name, rollno, clas, address };

  await fetch(`http://localhost:2600/user/${edit}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  // ✅ Update table instantly using local data
  setStudent((prev) =>
    prev.map((s) =>
      s._id === edit ? { ...s, ...student } : s
    )
  );

  setisEdit(false);
  setEdit(null);
};


  const btn = () => {
    setName("");
    setClass("");
    setRollno("");
    setAddress("");
  };
  const handlebtn = async (id) => {
    try {
      await fetch(`http://localhost:2600/user/${id}`, {
        method: "DELETE",
      });
      setStudent((prev) =>
        prev.filter((s) => s._id!== id)
      );
    } catch (error) {
      console.log("error occur", error);
    }
  };
  const editStudent = (stud) => {
    setName(stud.name);
    setClass(stud.clas);
    setRollno(stud.rollno);
    setAddress(stud.address);
    setEdit(stud._id);
    setisEdit(true);
  };
  return (
    <div>
      <form onSubmit={submitbtn}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter rollno"
          name="rollno"
          value={rollno}
          onChange={(event) => setRollno(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter class"
          name="class"
          value={clas}
          onChange={(event) => setClass(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter address"
          name="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <button type="submit">{isedit ? "Update" : "Submit"}</button>
        <button onClick={btn} type="button">
          Reset
        </button>
      </form>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CLASS</th>
              <th>ROLLNO</th>
              <th>ADDRESS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stud) => (
              <tr key={stud._id}>
                <td>{stud.name}</td>
                <td>{stud.clas}</td>
                <td>{stud.rollno}</td>
                <td>{stud.address}</td>
                <td>
                  <button onClick={() => editStudent(stud)}>Edit</button>
                  <button onClick={() => handlebtn(stud._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Appp;
