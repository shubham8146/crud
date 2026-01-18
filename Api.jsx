import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Api = () => {
  const [name, setName] = useState([]);
  useEffect(() => {
    async function result() {
      let ans = await fetch("https://jsonplaceholder.typicode.com/users");
      let answer = await ans.json();
      console.log(answer);
      setName(answer);
    }
    result();
  }, []);
  return (
    <div style={{ border: "1px solid black", backgroundColor: "lightgray" }}>
      {name
        .filter((_, index) => index < 5)
        .map((user) => {
          return (
            <h1 key={user.id} style={{ border: "5px solid black",width:"300px" }}>
              {user.name}
            </h1>
          );
        })}
    </div>
  );
};

export default Api;
