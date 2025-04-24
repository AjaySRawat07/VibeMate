import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Home from "./components/Home";
import Feed from "./components/Feed";
import Login from "./components/Login";

function App() {
  return (
    <Fragment>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
