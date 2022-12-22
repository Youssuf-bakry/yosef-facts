import { Fragment, useEffect, useState } from "react";
import "./style.css";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import CategoryFilter from "./components/CategoryFilter";
import NewForm from "./components/NewForm";
import FactsList from "./components/FactsList";
import { supabase } from "./supabase";
// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];
function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    setIsLoading(true);

    let query = supabase.from("facts").select("*");

    if (currentCategory !== "all")
      query = query.eq("category", currentCategory);
    const getFacts = async () => {
      const { data: facts, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (!error) setFacts(facts);
      else alert("error in getting data");
      setIsLoading(false);
    };
    getFacts();
  }, [currentCategory]);

  const shareFactHandler = (e) => {
    setShowForm((show) => !show);
  };
  return (
    <Fragment>
      <Header isShown={showForm} showForm={shareFactHandler} />
      {showForm && (
        <NewForm
          showForm={shareFactHandler}
          setFacts={setFacts}
          categories={CATEGORIES}
        />
      )}
      <main className="main">
        <CategoryFilter
          setCategory={setCurrentCategory}
          categories={CATEGORIES}
        />
        {isLoading ? (
          <div className="centered">
            <LoadingSpinner />
          </div>
        ) : (
          <FactsList
            setFacts={setFacts}
            facts={facts}
            categories={CATEGORIES}
          />
        )}
      </main>
    </Fragment>
  );
}

export default App;
