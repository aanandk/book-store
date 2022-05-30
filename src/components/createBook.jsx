import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { saveBook } from "../services/bookService";

class createBook extends Component {
  state = {
    data: {
      title: "",
      isbn: "",
      author: "",
      description: "",
      publishedDate: "",
      publisher: "",
    },
    errors: {},
  };

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
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;

    console.log(errors);
  };

  handleChange = ({ currentTarget: input }) => {
    // console.log(input.value);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    console.log(this.state.data);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(errors);
    if (errors) return;
    try {
      await saveBook(this.state.data);
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="CreateBook">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left ">
                Show Book List
              </Link>
            </div>

            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Book</h1>
              <p className="lead text-center">Create new book</p>

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title of Book"
                    autoComplete="off"
                    name="title"
                    className="form-control"
                    value={data["title"] || ""}
                    onChange={this.handleChange}
                  />
                  {errors.title && (
                    <div className="alert alert-error">{errors.title}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="ISBN"
                    autoComplete="off"
                    name="isbn"
                    className="form-control"
                    value={data["isbn"] || ""}
                    onChange={this.handleChange}
                  />
                  {errors.isbn && (
                    <div className="alert alert-error">{errors.isbn}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Author"
                    autoComplete="off"
                    name="author"
                    className="form-control"
                    value={data["author"] || ""}
                    onChange={this.handleChange}
                  />
                  {errors.author && (
                    <div className="alert alert-error">{errors.author}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Describe the Book"
                    autoComplete="off"
                    name="description"
                    className="form-control"
                    value={data["description"] || ""}
                    onChange={this.handleChange}
                  />
                  {errors.description && (
                    <div className="alert alert-error">
                      {errors.description}
                    </div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="date"
                    placeholder="publishedDate"
                    autoComplete="off"
                    name="publishedDate"
                    className="form-control"
                    value={data["publishedDate"] || ""}
                    onChange={this.handleChange}
                  />
                  {errors.publishedDate && (
                    <div className="alert alert-error">
                      {errors.publishedDate}
                    </div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Publisher"
                    autoComplete="off"
                    name="publisher"
                    className="form-control"
                    value={data["publisher"] || ""}
                    onChange={this.handleChange}
                  />
                  {errors.publisher && (
                    <div className="alert alert-error">{errors.publisher}</div>
                  )}
                </div>
                <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
                />
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createBook;
