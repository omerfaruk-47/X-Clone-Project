<h1>X Clone Project</h1>

This project is a Twitter clone application developed using Firebase for backend services. The application includes features such as posting tweets, liking tweets, and deleting tweets. The frontend is built with React, and various components manage different aspects of the user interface.

<h2>Table of Contents</h2>

- Installation
- Configuration
- Features
- Usage
- Contributing
- License

<h2>Features</h2>

- User Authentication: Sign up and login functionality using Firebase Authentication.

- Post Tweets: Users can post new tweets.
- Like Tweets: Users can like or unlike tweets.
- Delete Tweets: Users can delete their own tweets.
- Edit Tweets: Users can edit their own tweets.

<h2>Usage</h2>

## Post Component

The Post component handles displaying individual tweets. It includes features such as liking, deleting, and editing tweets. Here is a breakdown of its functionalities:

- Date Formatting: The tweet's creation date is formatted using moment.
- Delete Tweet: The handleDelete function allows users to delete their tweets. It references the tweet document and deletes it from Firestore.
- Like Tweet: The handleLike function updates the tweet's likes array by either adding or removing the current user's ID.
- Edit Mode: The component conditionally renders either the tweet content or an edit form based on the isEditMode state.

<h2>Used Technologies</h2>

- React-router-dom
- React-toastify
- React-icons
- Moment
- uuid
- Firebase
- Tailwind-CSS

<h2>Screenshot</h2>

![](/public/X%20clone.gif)
# X-Clone-Project
