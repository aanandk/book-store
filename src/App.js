import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import createBook from "./components/createBook";
import updateBook from "./components/updateBook";
import booksList from "./components/booksList";
import bookDetails from "./components/bookDetails";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={booksList} />
          <Route path="/create-book" component={createBook} />
          <Route path="/edit-book/:id" component={updateBook} />
          <Route path="/show-book/:id" component={bookDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
