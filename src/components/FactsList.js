import { useState } from "react";
import SingleFact from "./SingleFact";

const FactsList = ({ categories, facts, setFacts }) => {
  if (facts.length === 0) {
    return (
      <p className="message">
        No Facts in this category ! Create the first one 😍
      </p>
    );
  }
  return (
    <section>
      {" "}
      <ul className="facts-List">
        {facts.map((fact) => (
          <SingleFact
            setFacts={setFacts}
            categories={categories}
            key={fact.id}
            fact={fact}
          />
        ))}
      </ul>
      <p>There are {facts.length} facts, You can add your own fact.</p>
    </section>
  );
};

export default FactsList;
