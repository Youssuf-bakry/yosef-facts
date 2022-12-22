import { useState } from "react";
import { supabase } from "../supabase";
function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

const NewForm = ({ categories, setFacts, showForm }) => {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState();

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };
  const sourceChangeHandler = (e) => {
    setSource(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    //validation

    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      // // create new fact obj

      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //sending newFact to supabase & get it to the ui (state)
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      // console.log(newFact);
      if (!error) setFacts((prevFacts) => [newFact[0], ...prevFacts]);

      //reset input fields

      setText("");
      setSource("http://example.com");
      setCategory("");

      //close the form
      showForm();
    }
  };
  return (
    <form className="fact-form" onSubmit={submitFormHandler}>
      {" "}
      <input
        value={text}
        onChange={textChangeHandler}
        type="text"
        placeholder="Share a fact with the world..."
        disabled={isUploading}
      />
      <span>{200 - text.length}</span>
      <input
        value={source}
        onChange={sourceChangeHandler}
        type="text"
        placeholder="Trustworthy source..."
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={categoryChangeHandler}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
};

export default NewForm;
