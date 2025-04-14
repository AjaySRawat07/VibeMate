import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Home from "./components/Home";
import Feed from "./components/Feed";

function App() {
  return (
    <Fragment>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/home" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
