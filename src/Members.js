import React from "react";

const Members = ({ data }) => {
  const { name, email } = data;
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
    </tr>
  );
};

export default Members;
