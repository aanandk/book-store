import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

import { getBook, updateBook } from "../services/bookService";

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // book: {},
      book: {
        title: "",
        isbn: "",
        author: "",
        description: "",
        publishedDate: "",
        publisher: "",
      },
      errors: {},
      formattedDate: "",
    };
  }

  schema = {
    title: Joi.string().min(2).max(25).required().label("Title"),
    isbn: Joi.string().required().label("ISBN"),
    author: Joi.string().min(3).max(25).required().label("Author"),
    description: Joi.string().min(5).max(1000).required().label("Description"),
    publishedDate: Joi.string().required().label("Published Date"),
    publisher: Joi.string().min(3).max(25).required().label("Publisher"),
  };

  validate = () => {
    let options = { abortEarly: false };
    const { error } = Joi.validate(this.state.book, this.schema, options);

    // console.log(error.details);
    // for (let [i, item2] of error.details.entries()) {
    //   // console.log(item2.path[0], i);
    //   if (item2.path[0] === "_id") {
    //     error.details.splice(i, 1);
    //     // console.log(error.details);
    //   }
    // }
    // console.log(error.details);
    // if (item.path[0] === "__v" || item.path[0] === "_id") continue;

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    // delete errors["__v"];
    // delete errors["_id"];

    console.log(errors);
    return errors;
  };

  async componentDidMount() {
    try {
      const { data: book } = await getBook(this.props.match.params.id);
      delete book.__v;
      delete book._id;

      let formattedDate = book.publishedDate.split("T")[0];
      // book.publishedDate = book.publishedDate.split("T")[0];
      this.setState({ book, formattedDate });
      console.log(this.state.book);
    } catch (error) {
      console.log("Unable to find the book");
    }
  }

  onChange = ({ currentTarget: input }) => {
    // console.log(input.value);
    const book = { ...this.state.book };
    book[input.name] = input.value;
    this.setState({ book });
    console.log(this.state.book);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    console.log(errors);
    if (errors) return;
    console.log("77");
    const { book } = this.state;
    const data = {
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      description: book.description,
      publishedDate: book.publishedDate,
      publisher: book.publisher,
    };

    try {
      await updateBook(this.props.match.params.id, data);
      this.props.history.push("/show-book/" + this.props.match.params.id);
    } catch (error) {
      console.log("Error in UpdateBookInfo!");
    }
  };

  render() {
    const { book, errors } = this.state;

    return (
      <div className="UpdateBookInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Book</h1>
              <p className="lead text-center">Update Book's Info</p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={book.title || ""}
                  onChange={this.onChange}
                />
                {errors.title && (
                  <div className="alert alert-error">{errors.title}</div>
                )}
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="isbn">ISBN</label>
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={book.isbn || ""}
                  onChange={this.onChange}
                />
                {errors.isbn && (
                  <div className="alert alert-error">{errors.isbn}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={book.author || ""}
                  onChange={this.onChange}
                />
                {errors.author && (
                  <div className="alert alert-error">{errors.author}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={book.description || ""}
                  onChange={this.onChange}
                />
                {errors.description && (
                  <div className="alert alert-error">{errors.description}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="published_date">Published Date</label>
                <input
                  type="date"
                  placeholder="publishedDate"
                  name="publishedDate"
                  className="form-control"
                  value={this.state.formattedDate || ""}
                  // value={book.publishedDate || ""}
                  onChange={this.onChange}
                />
                {errors.publishedDate && (
                  <div className="alert alert-error">
                    {errors.publishedDate}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Publisher</label>
                <input
                  type="text"
                  placeholder="Publisher of this Book"
                  name="publisher"
                  className="form-control"
                  value={book.publisher || ""}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update Book
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBook;
