import React, { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";
import "./App.css";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const Search_API_URL = "https://www.omdbapi.com/?apikey=4a3b711b&s=";

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
      break;
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
      break;
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
      break;
    default:
      break;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * 相当于 compenentDidMount componentDidUpdate componentWillUnmount 组合
   * 第二个参数数组 [] 的意思是：只有当数组中的值发生改变的时候再执行这个 effect
   */
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(json => {
        console.log("查询的返回数据：", json);

        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: json.Search
        });
      });
    /**
     * return () => {}
     * 返回的方法将会在清理时运行
     * 当组件卸载的时候，React将会执行清理工作
     */
  }, []);

  const search = value => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });
    fetch(`${Search_API_URL}${value}`)
      .then(res => res.json())
      .then(json => {
        console.log("搜索的返回数据：", json);

        if (json.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: json.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: json.Error
          });
        }
      });
  };

  const { loading, movies, errorMessage } = state;
  return (
    <div className="App">
      <Header text="HOOKED" />

      <Search search={search} />

      <p className="App-intro">sharing a few of our favourite movies</p>

      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading</span>
        ) : errorMessage ? (
          <div className="App-errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => {
            return <Movie key={index} movie={movie} />;
          })
        )}
      </div>
    </div>
  );
};

export default App;
