import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../services/bookService";
import BookCard from "./bookCard";

class booksList extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const { data: books } = await getBooks();
      this.setState({ books });
    } catch (error) {
      console.log("Error from ShowBookList");
    }
    // console.log(books);
  }

  render() {
    const { books } = this.state;
    let bookList;

    if (!books) bookList = "There is no book record!";
    else {
      bookList = books.map((book, k) => <BookCard book={book} key={k} />);
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Books List</h2>
            </div>

            <div className="col-md-11">
              <Link
                to="/create-book"
                className="btn btn-outline-warning float-right"
              >
                + Add New Book
              </Link>
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{bookList}</div>
        </div>
      </div>
    );
  }
}

export default booksList;
