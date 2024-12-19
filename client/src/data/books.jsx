export const ListBooks = [
    {id: "12345",
    title: "The Great Gatsby",
    author: {
      name: "F. Scott Fitzgerald",
      birth_date: "1896-09-24",
      death_date: "1940-12-21"
    },
    publication_date: "1925-04-10",
    Promotion: 20,
    isbn: "9780743273565",
    price: 10.99,
    currency: "USD",
    publisher: "Scribner",
    genre: "Fiction",
    language: "English",
    page_count: 180,
    format: "Hardcover",
    dimensions: {
      width: "5.5 inches",
      height: "8.2 inches",
      depth: "0.9 inches"
    },
    weight: "0.8 pounds",
    description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the Jazz Age.",
    cover_image_url: "https://example.com/images/great_gatsby.jpg",
    ratings: {
      average_rating: 4.3,
      total_reviews: 8532
    },
    availability: {
      in_stock: true,
      stock_quantity: 120
    },
    categories: [
      "Classics",
      "Novels",
      "Literature"
    ],
    tags: [
      "American literature",
      "1920s",
      "Jazz Age"
    ],
    related_books: [
      {
        id: "67890",
        title: "To Kill a Mockingbird",
        author: "Harper Lee"
      },
      {
        id: "11223",
        title: "1984",
        author: "George Orwell"
      }
    ],
    links: {
      self: "/api/books/12345",
      author: "/api/authors/54321",
      publisher: "/api/publishers/98765"
    }
  }

] 



books = {
  "id": "12345",
  "title": "The Great Gatsby",
  "author": {
    "name": "F. Scott Fitzgerald",
    "birth_date": "1896-09-24",
    "death_date": "1940-12-21"
  },
  "publication_date": "1925-04-10",
  "isbn": "9780743273565",
  "price": 10.99,
  "currency": "USD",
  "publisher": "Scribner",
  "genre": "Fiction",
  "language": "English",
  "page_count": 180,
  "format": "Hardcover",
  "dimensions": {
    "width": "5.5 inches",
    "height": "8.2 inches",
    "depth": "0.9 inches"
  },
  "weight": "0.8 pounds",
  "description": "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the Jazz Age.",
  "cover_image_url": "https://example.com/images/great_gatsby.jpg",
  "ratings": {
    "average_rating": 4.3,
    "total_reviews": 8532
  },
  "availability": {
    "in_stock": true,
    "stock_quantity": 120
  },
  "categories": [
    "Classics",
    "Novels",
    "Literature"
  ],
  "tags": [
    "American literature",
    "1920s",
    "Jazz Age"
  ],
  "related_books": [
    {
      "id": "67890",
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee"
    },
    {
      "id": "11223",
      "title": "1984",
      "author": "George Orwell"
    }
  ],
  "links": {
    "self": "/api/books/12345",
    "author": "/api/authors/54321",
    "publisher": "/api/publishers/98765"
  }
}

