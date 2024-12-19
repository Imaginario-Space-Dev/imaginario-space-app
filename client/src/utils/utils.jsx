import {FaUsersCog, FaGlobe, FaUserEdit, FaHome, FaDatabase, FaUsers, FaHandshake, FaBug, FaPlay, FaSearch, FaFilter, FaShoppingCart, FaEye , FaBell, FaBars, FaLayerGroup, FaUser, FaMicroblog, FaBook, FaEdit  } from 'react-icons/fa'
import { BiSolidMessage } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { IoIosWarning, IoMdSettings  } from "react-icons/io";

export const menuLinks = [
    {
      id: 1,
      url: '/',
      text: 'home',
    },
    {
      id: 2,
      url: '/books',
      text: 'categories',
    }, 
    {
      id: 3,
      url: '/courses',
      text: 'create_a_space',
    },
    {
      id: 4,
      url: '/imaginario-spaces',
      text: 'Spaces',
    }
]

export const navbarSignedLinks = [
  {
    id: 1,
    icon: <FaSearch />,
    home: true
  },
  {
    id: 2,
    icon: <FaFilter />,
    home: true
  },
  {
    id: 3,
    url: 'cart',
    icon: <FaShoppingCart />,
    home: true,
    watch: true,
    myspace: true,
    me: true,
  },
  {
    id: 4,
    url: 'chat',
    icon: <BiSolidMessage />,
    watch: true,
    myspace: true,
    me: true,
  },
  {
    id: 5,
    url: 'notification',
    icon: <FaBell />,
    watch: true,
    myspace: true,
    me: true,
  },
  {
    id: 6,
    url: 'myspace/configurations',
    icon: <FaBars />,
    myspace: true,
    me: true,
  },
 
]
export const menuLinksMobile = [
  {
    id: 1,
    urlDashboard: '/dashboard/landing',
    url: '/',
    text: 'Home',
    icon: <AiFillHome />,
  },
  {
    id: 2,
    urlDashboard: '/dashboard/books',
    url: '/books',
    text: 'Books',
    icon: <FaBook />,
  },
  {
    id: 3,
    urlDashboard: '#',
    url: '#',
    text: 'Menu',
    icon: <FaLayerGroup />,
  },
  {
    id: 4,
    urlDashboard: '/dashboard/courses',
    url: '/courses',
    text: 'Courses',
    icon: <FaPlay />,
  }, 
  {
    id: 5,
    urlDashboard: '/dashboard/users-profile',
    url: '/imaginario-spaces',
    text: 'Spaces',
    icon: <FaMicroblog />,
  }, 

]


export const languages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'gb'
  },
  {
    code: 'fr',
    name: 'Français',
    country_code: 'fr'
  },
  {
    code: 'pt',
    name: 'Português',
    country_code: 'pt'
  },
  {
    code: 'es',
    name: 'Española',
    country_code: 'es'
  },
]


// SIDEBAR MOBILE AND LAPTOP
export const sidebarLinks = [
  {
    id: 1,
    group: [
      {
        id: 1,
        url: '/my-profile',
        text: 'My Profile',
        icon: <FaUser />,
      },
      {
        id: 2,
        url: '/my-space/',
        text: 'My Space',
        icon: <FaUser />,
      },
      {
        id: 3,
        url: '/dashboard/landing',
        text: 'Dashboard',
        icon: <FaUser />,
      },
    ]
  },
  {
    id: 2,
    group: [
      {
        id: 1,
        url: '/imaginario-spaces/',
        text: 'New Book',
        icon: <FaBook />,
      },
      {
        id: 2,
        url: '/imaginario-spaces/',
        text: 'New Course',
        icon: <FaPlay />,
      },
      {
        id: 3,
        url: '/imaginario-spaces/',
        text: 'New Blog',
        icon: <FaMicroblog />,
      },
      {
        id: 4,
        url: '/imaginario-spaces/',
        text: 'New Collaboration',
        icon: <FaHandshake />,
      },
    ]
  },
  {
    id: 3,
    group: [
      {
        id: 1,
        url: '/publishers',
        text: 'Publishers',
        icon: <FaUser />,
        // number: 6,
      },
      {
        id: 2,
        url: '/blogs',
        text: 'Blogs',
        icon: <FaMicroblog />,
        // number: 15,
      },
      {
        id: 4,
        url: '/collaborations',
        text: 'Collaborations',
        icon: <FaHandshake />,
        number: 2,
      }
    ]
  },
  {
    id: 4,
    group: [
      {
        id: 1,
        url: '/settings',
        text: 'Settings',
        icon: <FaUser />,
      },
      {
        id: 2,
       // url: 'language',
       text: 'Language',
       icon: <FaGlobe />,
       lgn: 'EN'
      },
    ]
  },
  {
    id: 6,
    group: [
      {
        id: 1,
        url: '/about-us',
        text: 'About Us',
        icon: <FaUser />,
      },
    ]
  }, 
]

// SIDEBAR DASHBOARD

export const sidebarDashboardLinks = [
  {
    id: 1,
    group: [
      {
        id: 1,
        url: 'dashboard/landing',
        text: 'Dashboard',
        icon: <MdDashboard />,
        displayOnMobile: false,
      },
      // {
      //   id: 2,
      //   url: 'dashboard/profile',
      //   text: 'Profile',
      //   icon: <FaUser />,
      // },
    ]
  },
  {
    id: 2,
    group: [
      {
        id: 1,
        url: 'dashboard/books',
        text: 'Books',
        icon: <FaBook />,
        number: 6,
      },
      {
        id: 2,
        url: 'dashboard/courses',
        text: 'Courses',
        icon: <FaPlay />,
        number: 6,
      },
      // {
      //   id: 3,
      //   url: 'dashboard/blogs',
      //   text: 'Blogs',
      //   icon: <FaMicroblog />,
      //   number: 6,
      // },
    ]
  },
  {
    id: 3,
    group: [
      {
        id: 1,
        url: 'dashboard/users',
        text: 'Users Spaces',
        icon: <FaUser />,
        number: 6,
      },
      // {
      //   id: 2,
      //   url: 'dashboard/publishers',
      //   text: 'Publishers',
      //   icon: <FaUserEdit />,
      //   number: 15,
      // },
      // {
      //   id: 3,
      //   url: 'dashboard/collaborators',
      //   text: 'Collaborators',
      //   icon: <FaUsersCog   />,
      //   number: 2,
      // },
      // {
      //   id: 4,
      //   url: 'dashboard/partners',
      //   text: 'Partners',
      //   icon: <FaUsers />,
      //   number: 2,
      // }
    ]
  },
  {
    id: 4,
    group: [
      {
        id: 1,
        url: 'dashboard/collaborations',
        text: 'Collaborations',
        icon: <FaHandshake />,
        number: 2,
      },
    ]
  },
  {
    id: 5,
    group: [
      {
        id: 1,
        url: 'dashboard/violations',
        text: 'Violation Reports',
        icon: <IoIosWarning  />,
        number: 2,
      },
      {
        id: 2,
        url: 'dashboard/incidents',
        text: 'Bug Reports',
        icon: <FaBug  />,
        number: 2,
      },
    ]
  },
  {
    id: 6,
    group: [
      {
        id: 1,
        url: 'dashboard/settings',
        text: 'Settings',
        icon: <IoMdSettings />,
      },
      {
        id: 2,
        // url: '/#/',
        text: 'Language',
        icon: <FaGlobe />,
        lgn: 'EN'
      },
    ]
  }, 
  {
    id: 7,
    group: [
      {
        id: 1,
        url: 'dashboard/platform-data/landing',
        text: 'Platform data',
        icon: <FaDatabase />,
      },
      {
        id: 2,
        url: '/',
        text: 'Back To Platform',
        icon: <FaHome  />,
      },
    ]
  },
]

export const successLinks = [
  {
    id: 1,
    icon: <FaEye  />,
    url: '#',
    text: 'Monthly Visits',
  },
  {
    id: 2,
    icon: <FaUser />,
    url: '#',
    text: 'Users',
  }, 
  {
    id: 3,
    icon: <FaBook />,
    url: '#',
    text: 'Books',
  },
  {
    id: 4,
    icon: <FaPlay />,
    url: '#',
    text: 'Courses',
  }
]


export const dashboardPlatformLinks = [
  {
    id: 1,
    icon: <FaHome />,
    url: 'landing',
    text: 'Landing',
  },
  {
    id: 2,
    icon: <FaBook />,
    url: 'books',
    text: 'Books',
  }, 
  {
    id: 3,
    icon: <FaPlay />,
    url: 'courses',
    text: 'Courses',
  },
  // {
  //   id: 4,
  //   icon: <FaMicroblog />,
  //   url: 'blogs',
  //   text: 'Blogs',
  // },
  // {
  //   id: 5,
  //   icon: <FaUserEdit />,
  //   url: 'publishers',
  //   text: 'Publishers',
  // },
  {
    id: 6,
    icon: <FaUsers/>,
    url: 'profiles',
    text: 'Profiles',
  }
]

export const genreList = [
  "Psychology",
  "Science",
  "Fantasy",
  "Mythology",
  "Historical Fiction",
  "Drama",
  "Adventure",
  "Finance",
  "Self-Help",
  "Science Fiction",
  "Business",
  "Management",
  "Technology",
  "Romance",
  "History",
  "Thriller",
  "Mystery",
  "Economics",
  "Horror",
  "Young Adult",
  "Children's Literature",
  "Dystopian",
  "Literary Fiction",
  "Poetry",
  "Graphic Novels",
  "Cookbooks",
  "True Crime",
  "Memoir",
  "Anthology",
  "Art",
  "Travel",
  "Spirituality",
  "Parenting",
  "Religion",
  "Self-Improvement",
  "Personal Finance",
  "Health & Wellness",
  "Sports",
  "Science & Nature",
  "Environmental Studies",
  "Cultural Studies",
  "Philosophy",
  "Western",
  "Urban Fantasy",
  "Cyberpunk",
  "Historical Romance",
  "Romantic Suspense",
  "New Adult"
]


export const targetAdienceList = [
  "Children",
  "Young Adults",
  "Adults",
  "Students",
  "Professionals",
  "Parents",
  "History Enthusiasts",
  "Fantasy Lovers",
  "Sci-Fi Fans",
  "Business Executives",
  "Self-Help Seekers",
  "Thriller Aficionados",
  "Romance Readers",
  "Health and Wellness Enthusiasts",
  "Technology Buffs",
  "Art and Culture Lovers",
  "Mystery Lovers",
  "Cookbook Enthusiasts",
  "Travel Enthusiasts",
  "Environmental Activists",
  "Pet Owners",
  "Sports Fans",
  "Poetry Readers",
  "Graphic Novel Fans",
  "Educational Professionals",
  "Hobbyists",
  "Personal Finance Seekers",
  "Philosophy Enthusiasts",
  "Classic Literature Fans",
  "Young Professionals",
  "Science Enthusiasts",
  "Parenting Seekers",
  "Cultural Studies Scholars",
  "Motivational Readers",
  "Crime Fiction Fans",
  "Historical Fiction Lovers",
  "Tech Start-up Founders",
  "Self-Improvement Seekers",
  "Nature Lovers",
  "Comic Book Readers",
  "Social Justice Advocates",
  "Fantasy Role-Playing Gamers",
  "Lifestyle Bloggers",
  "Digital Nomads",
  "International Relations Students",
  "Language Learners",
  "Spiritual Seekers"
]

export const userCategoryList = [
  "Finance",
  "IT",
  "Management",
  "Marketing",
  "Sales",
  "Entrepreneurship",
  "Business Strategy",
  "Project Management",
  "Personal Development",
  "Leadership",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Software Development",
  "Digital Marketing",
  "Accounting",
  "Human Resources",
  "Customer Service",
  "Healthcare",
  "Mental Health",
  "Creative Writing",
  "Graphic Design",
  "Photography",
  "Film and Video Production",
  "Music Production",
  "Art and Design",
  "Architecture",
  "Engineering",
  "Environmental Science",
  "Social Sciences",
  "Psychology",
  "Education",
  "Languages",
  "Public Speaking",
  "Social Media",
  "E-commerce",
  "Real Estate",
  "Legal Studies",
  "History",
  "Political Science",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Statistics",
  "Agriculture",
  "Culinary Arts",
  "Hospitality Management",
  "Public Relations",
  "Sports Science",
  "Ethics"
]

export const userInterestedAreasyList = [
  "Finance",
  "IT",
  "Management",
  "Marketing",
  "Sales",
  "Entrepreneurship",
  "Business Strategy",
  "Project Management",
  "Personal Development",
  "Leadership",
  "Data Science",
  "Machine Learning",
  "Cybersecurity",
  "Software Development",
  "Digital Marketing",
  "Accounting",
  "Human Resources",
  "Customer Service",
  "Healthcare",
  "Mental Health",
  "Creative Writing",
  "Graphic Design",
  "Photography",
  "Film and Video Production",
  "Music Production",
  "Art and Design",
  "Architecture",
  "Engineering",
  "Environmental Science",
  "Social Sciences",
  "Psychology",
  "Education",
  "Languages",
  "Public Speaking",
  "Social Media",
  "E-commerce",
  "Real Estate",
  "Legal Studies",
  "History",
  "Political Science",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Statistics",
  "Agriculture",
  "Culinary Arts",
  "Hospitality Management",
  "Public Relations",
  "Sports Science",
  "Ethics"
]

