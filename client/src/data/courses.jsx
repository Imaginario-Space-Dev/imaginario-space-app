export const Listcourses = [
     {
        id: "67890",
        title: "Introduction to Python Programming",
        instructor: {
          name: "Jane Doe",
          bio: "Jane Doe is a seasoned software engineer with over 10 years of experience in Python development.",
          profile_image_url: "https://example.com/images/jane_doe.jpg"
        },
        publication_date: "2023-01-15",
        Promotion: 20,
        price: 49.99,
        currency: "USD",
        platform: "Udemy",
        language: "English",
        duration: "15 hours",
        level: "Beginner",
        categories: [
          "Programming",
          "Python",
          "Software Development"
        ],
        tags: [
          "Python",
          "Coding",
          "Programming",
          "Beginner"
        ],
        description: "This course is designed to introduce you to the basics of Python programming. By the end of the course, you will be able to write simple Python scripts and understand fundamental programming concepts.",
        cover_image_url: "https://example.com/images/python_course.jpg",
        rating: {
          average_rating: 4.7,
          total_reviews: 1520
        },
        availability: {
          status: "Available",
          enrollment: {
            total_students: 10234,
            current_students: 3456
          }
        },
        related_courses: [
          {
            id: "23456",
            title: "Advanced Python Programming",
            instructor: "John Smith"
          },
          {
            id: "34567",
            title: "Data Analysis with Python",
            instructor: "Alice Johnson"
          }
        ],
        links: {
          self: "/api/courses/67890",
          instructor: "/api/instructors/98765",
          platform: "/api/platforms/54321"
        }     
}
]