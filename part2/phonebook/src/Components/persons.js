import React from "react";

const Persons = ({ filtered }) => {
  return (
    <div>
      {filtered.map((person) => (
        <p key={person.name} {...person}>
          {person.name} {person.number}{" "}
        </p>
      ))}
    </div>
  );
};

export default Persons;