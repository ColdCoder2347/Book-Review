const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async getFeaturedBooks() {
    return this.request('/books/featured');
  }

  async getBooks(search = '', genre = '', page = 1) {
    const params = new URLSearchParams({
      search,
      genre,
      page: page.toString(),
    });
    return this.request(`/books?${params}`);
  }

  async getBook(id) {
    return this.request(`/books/${id}`);
  }

  async submitReview(bookId, review) {
    return this.request(`/books/${bookId}/reviews`, {
      method: 'POST',
      body: review,
    });
  }

  async getReviews(bookId) {
    return this.request(`/books/${bookId}/reviews`);
  }

  async getUserProfile() {
    return this.request('/user/profile');
  }

  async updateUserProfile(data) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: data,
    });
  }
}

export const api = new ApiService();

export const mockApi = {
  async getFeaturedBooks() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", rating: 4.2, reviews: 156, cover: "📚", genre: "Classic" },
      { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", rating: 4.5, reviews: 243, cover: "📖", genre: "Classic" },
      { id: 3, title: "1984", author: "George Orwell", rating: 4.3, reviews: 189, cover: "📘", genre: "Dystopian" },
      { id: 4, title: "Pride and Prejudice", author: "Jane Austen", rating: 4.4, reviews: 201, cover: "📗", genre: "Romance" }
    ];
  },
};