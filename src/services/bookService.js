import http from "../services/httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/books";

// Get books
export function getBooks() {
  return http.get(apiEndpoint);
}

// Save book
export function saveBook(book) {
  // if (movie._id) {
  //     // update
  //     const body = { ...movie };
  //     delete movie._id;
  //     return http.put(movieUrl(movie._id), body);
  //   }

  //   console.log(apiEndpoint);
  //   console.log(book);
  return http.post(apiEndpoint, book);
}

// Update book
export function updateBook(bookId, book) {
  const body = { ...book };
  //   delete book._id;
  return http.put(`${apiEndpoint}/${bookId}`, body);
}

// Get book
export function getBook(bookId) {
  return http.get(`${apiEndpoint}/${bookId}`);
}

// Delete book
export function deleteBook(bookId) {
  return http.delete(`${apiEndpoint}/${bookId}`);
}
