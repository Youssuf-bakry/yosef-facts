const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I learned</h1>
      </div>

      <button onClick={props.showForm} className="btn btn-large btn-open">
        {props.isShown ? "Close" : "Share a fact"}
      </button>
    </header>
  );
};

export default Header;
