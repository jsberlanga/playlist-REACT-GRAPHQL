import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails = () => {
    if (this.props.data.loading) return <p>Loading...</p>;
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>Genre: {book.genre}</p>
          <p>Author: {book.author.name}</p>
          <br />
          <p>
            <strong>Other books reads from the same author:</strong>
          </p>
          <ul className="other books">
            {book.author.books.map(book => (
              <li style={{ fontStyle: "italic" }} key={book.id}>
                {book.name}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };
  render() {
    return <div id="book-details">{this.displayBookDetails()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
