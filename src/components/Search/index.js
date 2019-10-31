import React, { useState } from "react";

const Search = props => {
  // [this.state, this.setState]
  const [searchValue, setSearchValue] = useState("");

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const doSubmit = e => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="App-search">
      <input value={searchValue} onChange={handleChange} type="text" />
      <input onClick={doSubmit} type="submit" value="搜索" />
    </form>
  );
};

export default Search;
