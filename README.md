# Social Media App

Our Social Media App allows users to create and share posts and content with their friends and followers. It's a fun and engaging platform that enables users to interact with others through comments and various interactions.

[Social Media APP - live link](https://oubaida-social-media.netlify.app/)

## Table of contents

- [Technologies Used](#technologies-used)
- [User Stories](#user-stories)
- [Demo Video](#demo-video)
- [Setup](#setup)
- [Features to be Added](#features-to-be-added)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Technologies Used

- [React Library](https://reactjs.org) | A JavaScript library for building user interfaces.

- [React Hooks](https://reactjs.org/docs/hooks-intro.html) |
  [State Hook](https://reactjs.org/docs/hooks-state.html),
  [Effect Hook](https://reactjs.org/docs/hooks-effect.html), and
  [Refs Hook](https://reactjs.org/docs/refs-and-the-dom.html).

- [React Router Dom Library](https://reactrouter.com/en/main) |
  [BrowserRouter](https://reactrouter.com/en/main/router-components/browser-router),
  [Router](https://reactrouter.com/en/main/router-components/router),
  [Route](https://reactrouter.com/en/main/components/route),
  [Routes](https://reactrouter.com/en/main/components/routes),
  [Navigate](https://reactrouter.com/en/main/components/navigate), and
  [Outlet](https://reactrouter.com/en/main/components/outlet)

- [Axios](https://axios-http.com/docs/intro) | Axios is a popular JavaScript library used for making HTTP requests from web browsers or Node.js applications.

- [MongoDB](https://www.mongodb.com/) | MongoDB is a popular open-source NoSQL database management system.

- [Mongoose ](https://mongoosejs.com/) | To simplify the interaction with MongoDB databases.

- [HTML](https://www.w3schools.com/html/) |
  [CSS](https://www.w3schools.com/css/), [JSX](https://legacy.reactjs.org/docs/introducing-jsx.html), [Sass](https://sass-lang.com/)

## User Stories

- As a user is not able to create posts and share it, follow others, interacting with posts before sign in / sign up.
- As a user is able to create and upload image for the post and share it with others.
- As a user is able to delete his own posts and update it.
- As a user is able to follow his friends and vise versa.
- As a user is able to like his friends' posts.
- As a user is able to choose the light/dark mode that he prefers.

## Demo

Insert gif or link to demo

## Setup

```bash
$ git clone git@github.com:OubaidaAkilan/Social-Media-App.git
$ cd Social-Media-App
Social-Media-App git:(main)$ npm i
Social-Media-App git:(main)$ npm start
```

## Features to be Added

<!-- - Add pagination to the products and orders table or request data based on user scrolling. -->

- Add interactive styling and modern colors to the admin page.
- Add "Return to Top" button.
- Create loading component until fetching data.
- Create API errors handler.
  <!-- - Translate the API data to Arabic. -->
  <!-- - Create Dark mode button. -->

## Acknowledgements

- This project was inspired from the lama.dev channel on YouTube.
- This [Auth Page Example](https://mdbootstrap.com/docs/standard/extended/login) inspired me with the page layout and design.
- This [Stack Overflow Answer](https://stackoverflow.com/a/45905418) helped me how to navigate to the page end.
- This [W3School Tutorial](https://www.w3schools.com/js/js_cookies.asp) helped me how to manage the user session and cookies using Document object without 3rd parties.
- This [Tip](https://dev.to/rajeshroyal/page-not-found-error-on-netlify-reactjs-react-router-solved-43oa) for fixing the React Single Page Application deployed on Netlify.

- This [Stack Overflow Answer](https://stackoverflow.com/questions/65827305/passing-a-component-to-the-usestate-hook) helped me how to passing a component to the useState hook.

- This [Article](https://www.webnots.com/how-to-find-source-of-injected-stylesheets-in-chrome/) helped me how to Find Source of Injected Stylesheets in Chrome?

- I have faced an issue where the 'Create and share post' section disappeared from browser after deploying the app. I investigated this issue and I found the element is still exist, but there is a new CSS selector called 'injection style' was added, I didn't create. After researching this issue, I found the browser generates the 'injection style' when the users use adblockers extension, to handle this issue I found many ways, but I have tried to test my approach to change the name of the parent class and delete the 'share' word and everything began work correctly.

## Contact

Created by [Oubaida Akilan](https://github.com/OubaidaAkilan), feel free to contact me 😉!
