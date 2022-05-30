import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBook, deleteBook } from "../services/bookService";

class bookDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      formattedDate: "",
    };
  }

  async componentDidMount() {
    const { data: book } = await getBook(this.props.match.params.id);

    if (!book) console.log("The book with the given ID was not found");

    let timestamp = book.publishedDate.split("T");
    let formattedDate = timestamp[0].split("-").reverse().join("/");

    this.setState({ book, formattedDate });
    console.log(book);
  }

  onDelete = async (id) => {
    console.log(id);
    try {
      const book = await deleteBook(id);
      this.props.history.push("/");
    } catch (error) {
      console.log("Unable to delete the book");
    }
  };

  // formattedDate(dt) {
  //   console.log(dt);
  //   let timestamp = dt.split("T");
  //   return timestamp[0].split("-").reverse().join("/");
  // }

  render() {
    const { book } = this.state;

    let BookItem = (
      <div>
        <table className="table table-hover table-dark">
          {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Author</td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>ISBN</td>
              <td>{book.isbn}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Publisher</td>
              <td>{book.publisher}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Published Date</td>
              <td>{this.state.formattedDate}</td>
              {/* <td>{book.publishedDate}</td> */}
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Description</td>
              <td>{book.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="ShowBookDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Book List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Book's Record</h1>
              <p className="lead text-center">View Book's Info</p>
              <hr /> <br />
            </div>
          </div>

          <div>{BookItem}</div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={() => this.onDelete(book._id)}
              >
                Delete Book
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-outline-info btn-lg btn-block"
              >
                Edit Book
              </Link>
              <br />
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default bookDetails;
