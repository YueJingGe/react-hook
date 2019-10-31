This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## `create-react-app react-hook`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

> 参考地址: https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/

> react 官网：https://react.docschina.org/docs/hooks-overview.html

## 什么是 Hook?

可以在函数组件中使用 state 状态 以及 生命周期等特性

## 优势

- 不需要关注绑定
- 代码简洁

## State Hook —— useState

- useState 返回一个有两个元素的数组，一个存当前的 state，一个存更新 state 的函数

App.js

```js
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";
import "./App.css";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const Search_API_URL = "https://www.omdbapi.com/?apikey=4a3b711b&s=";

const App = () => {
  // 相当于 [this.state, this.setState]
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  /**
   * 相当于 compenentDidMount componentDidUpdate componentWillUnmount 组合
   * 第二个参数数组 [] 的意思是：只有当数组中的值发生改变的时候再执行这个 effect
   */
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(res => res.json())
      .then(json => {
        console.log("查询的返回数据：", json);

        setMovies(json.Search);
        setLoading(false);
      });
    /**
     * return () => {}
     * 返回的方法将会在清理时运行
     * 当组件卸载的时候，React将会执行清理工作
     */
  }, []);

  const search = value => {
    setLoading(true);
    setErrorMessage(null);
    fetch(`${Search_API_URL}${value}`)
      .then(res => res.json())
      .then(json => {
        console.log("搜索的返回数据：", json);

        if (json.Response === "True") {
          setMovies(json.Search);
          setLoading(false);
        } else {
          setErrorMessage(json.Error);
          setLoading(false);
        }
      });
  };
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
```

## Effect Hook —— useEffect

相当于 componentDidMount componentDidUpdate componentWillUnmount 的组合

- 在 DOM 更改后执行副作用函数
- 在组件渲染后调用副作用函数
- 通过返回函数指定如何清除副作用

### 在 effect 中返回一个函数？

这是 effect 的清除机制，在组件卸载时执行清除操作

### 优点

- 避免在 class 组件中因为没有处理更新逻辑而导致数据不同步
- 第二个参数性能优化，只有当参数变化时才会执行副作用函数

## Reducer Hook —— useReducer

```js
import React, { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";
import "./App.css";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const Search_API_URL = "https://www.omdbapi.com/?apikey=4a3b711b&s=";

const initialState = {
  // 重点
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  // 重点
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
  const [state, dispatch] = useReducer(reducer, initialState); // 重点

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
    // 重点
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

  const { loading, movies, errorMessage } = state; // 重点
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
```
