import React, { useEffect, useState } from "react";
import Members from "./Members";

const Form = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  const hadleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newMember = {
      id: members.length + 1,
      name: form.name.value,
      email: form.email.value,
    };

    fetch("http://localhost:5000/addNew", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(newMember);
        setMembers([...members, newMember]);
        form.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={hadleSubmit}>
        <fieldset>
          <legend> Insert Your Entry Now</legend>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
          />{" "}
          <input type="email" name="email" placeholder="Email Id" required />{" "}
          <br /> <br />
          <button type="submit">Submit info</button>
        </fieldset>
      </form>
      <h2>Current Members - {members.length}</h2>

      <table
        border="3px"
        cellPadding="16px"
        style={{
          margin: "0 auto",
          border: "1px solid blue",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <Members data={m} key={m.id}></Members>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Form;
