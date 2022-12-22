import { useState } from "react";
import { supabase } from "../supabase";

const SingleFact = ({ fact, categories, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const voteHandler = async (columnName) => {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    console.log(updatedFact);
  };

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: categories.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        setIsUpdating(false);
        <button
          onClick={() => voteHandler("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button onClick={() => voteHandler("votesMindBlowing")}>
          🤯 {fact.votesMindBlowing}
        </button>
        <button onClick={() => voteHandler("votesFalse")}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};
export default SingleFact;
