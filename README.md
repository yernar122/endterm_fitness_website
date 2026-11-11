# IRONFIT - Fitness & Gym Website

## Project Topic

IRONFIT is a responsive and interactive multi-page website created for a modern fitness gym.

This project was originally developed as a Midterm Project and extended for the Endterm Project by adding JavaScript, jQuery, dynamic functionality, and interactive features.

## Group Members

- Yernar Kuanyshbek
- Ramazan Sailau
- Adilbek Nazhim

## Project Description

IRONFIT is a fitness and gym website where users can learn about the gym, explore available training programs, meet professional trainers, compare membership plans, register for membership, and view gym photos.

The website contains **6 responsive pages** and is designed to work on desktop, tablet, and mobile devices.

For the Endterm Project, we improved the existing website by implementing form validation, dynamic search and filtering, CRUD operations, an interactive image gallery, and light/dark mode.

## Features

### General Features

- 6 responsive and connected pages
- Navigation bar on every page
- Home page with main gym information
- Training programs section
- Trainer profiles
- Membership plans and comparison table
- Contact and registration form
- Interactive image gallery
- Responsive design for desktop, tablet, and mobile
- Hover effects on program and trainer cards
- Footer with contact information and social links
- Light and Dark Mode
- Theme preferences saved using localStorage

### JavaScript & jQuery Features

**1. Form Validation**

- Required field validation
- Email format validation using Regular Expressions (RegEx)
- Password strength indicator (Weak, Medium, Strong)
- Password confirmation validation
- Real-time error and success messages
- Prevention of invalid form submission

**2. Dynamic Search & Filter**

- Real-time search for training programs
- Category filtering using buttons
- Case-insensitive search
- Combined search and category filters
- Results update without page reloading

**3. Dynamic Table with CRUD Operations**

- Create new membership records
- Read and display membership records in a table
- Update existing membership information
- Delete records with confirmation
- Save membership records using localStorage

**4. Interactive Image Gallery**

- Responsive gallery grid
- Clickable images
- Lightbox for enlarged images
- Previous and Next navigation buttons
- Smooth fade-in and fade-out animations using jQuery

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- jQuery
- DOM Manipulation
- Regular Expressions (RegEx)
- localStorage
- Flexbox
- CSS Grid
- Media Queries
- Google Fonts

## Project Structure

```text
midterm_fitness_website/
│
├── index.html
├── programs.html
├── trainers.html
├── membership.html
├── contact.html
├── gallery.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── images/
│
└── README.md
```

## Pages

### 1. Home

The main page introduces the gym and highlights the main advantages of IRONFIT.

The page includes navigation, gym information, and links to training programs and membership plans.

The website also supports switching between Light and Dark Mode.

![Home Page](images/first_page.png)
![Home Page](images/first_page_2.png)

---

### 2. Programs

This page contains fitness programs such as strength training, cardio, CrossFit, yoga, personal training, and group training.

For the Endterm Project, we added a dynamic search bar and category filtering buttons.

Users can search for specific training programs and filter them without reloading the page.

![Programs Page](images/second_page.png)

---

### 3. Trainers

This page introduces the gym trainers and provides information about their specialization and experience.

Trainer cards include a responsive layout and hover effects.

![Trainers Page](images/third_page.png)

---

### 4. Membership

This page displays available membership plans and a comparison table.

For the Endterm Project, we added a dynamic membership management table with full CRUD functionality.

Users can add, view, edit, and delete membership records.

The records are stored using localStorage.

![Membership Page](images/fourth_page.png)
![Membership Comparison](images/fourth_page_2.png)

---

### 5. Contact

This page contains gym contact information and an interactive registration form.

For the Endterm Project, we implemented JavaScript form validation.

The form checks required fields, verifies the email format, evaluates password strength, and confirms that passwords match.

Error and success messages are displayed dynamically.

![Contact Page](images/fifth_page.png)

---

### 6. Gallery (New)

The Gallery page was added for the Endterm Project.

It contains a responsive grid of fitness and gym images.

Users can click on an image to open a lightbox, view an enlarged version, and navigate between images using Previous and Next buttons.

Smooth animations are implemented using jQuery.

## Individual Contribution

### Student 1 - Yernar Kuanyshbek

**Midterm Contribution:**

- Home page
- Header and navigation
- Footer
- General website styling

**Endterm Contribution:**

- Light and Dark Mode
- Theme persistence using localStorage
- JavaScript integration
- Navigation updates
- Responsive layout improvements

### Student 2 - Ramazan Sailau

**Midterm Contribution:**

- Programs page
- Trainers page
- Card design and hover effects

**Endterm Contribution:**

- Dynamic program search functionality
- Category filtering
- jQuery event handling
- Interactive Gallery page
- Lightbox and image navigation

### Student 3 - Adilbek Nazhim

**Midterm Contribution:**

- Membership page
- Contact page
- Membership table and contact form

**Endterm Contribution:**

- Form validation using JavaScript
- Email validation using RegEx
- Password strength indicator
- Password confirmation
- CRUD operations for membership records
- Membership data storage using localStorage

## Responsive Design

The website uses Bootstrap Grid, CSS Grid, Flexbox, and Media Queries to adapt the layout for different screen sizes.

On smaller screens, cards move into fewer columns, and the navigation layout changes to make the website easier to use.

All new interactive components, including the registration form, CRUD table, search filters, and image gallery, are designed to support different screen sizes.

## JavaScript and jQuery Implementation

The project uses JavaScript and jQuery to improve interactivity.

The main JavaScript file is located at:

`js/script.js`

It contains functionality for:

- Theme switching
- Form validation
- Dynamic searching and filtering
- Membership CRUD operations
- Image gallery interactions

JavaScript DOM manipulation and jQuery event handling are used to update content dynamically without reloading the page.

## How to Run the Project

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using a browser or the Live Server extension.
4. Navigate between the six pages.
5. Test the interactive JavaScript and jQuery functionality.

An internet connection is required to load external libraries and other CDN resources.


## Conclusion

The IRONFIT Endterm Project extends our original responsive fitness website by implementing JavaScript and jQuery functionality.

We improved the user experience by adding real-time form validation, dynamic search and filtering, CRUD operations, an interactive image gallery, and theme switching.

Through this project, we practiced working with HTML, CSS, Bootstrap, JavaScript, jQuery, DOM manipulation, event handling, and browser localStorage.
