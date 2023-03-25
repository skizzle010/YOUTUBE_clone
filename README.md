# Welcome to Youtube clone Backend👋
[![Version](https://img.shields.io/npm/v/backend-template.svg)](https://www.npmjs.com/package/backend-template)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

### Backend Created Using 
* NodeJS
* ExpressJS
* MongoDB
* JWT

## Available Routes for Users 

* /api/users/:id to update or delete a existing user
* /api/users/find/:id to find a existing user
* /api/users/:id to view existing users 
* /api/users/sub/:id to subscribe users
* /api/users/unsub/:id to unsubscribe users
* /api/users/like/:videoId to like a video
* /api/users/dislike/:videoId to dislike a video


## Available Routes for Authentication

* /api/auth/register to register a user
* /api/auth/login to to login
* /api/auth/google for google login


## Available Routes for Videos
* /api/videos/ to create a video
* /api/videos/:id to update or delete a video
* /api/videos/find/:id to get a video
* /api/videos/view/:id to view a video
* /api/videos/trend for trending videos
* /api/videos/random for random videos
* /api/videos/tags to get a video by tag
* /api/videos/search to get a video by search


## Available Routes for comments
* /api/comments/ to create a comment
* /api/comments/:id to delete a exsting comment
* /api/comments/:videoId to find a existing comments


## Install

```sh
npm install
```

## Usage

```sh
npm app.js
```

## Author

👤 **Utkarsh Rai**

* Github: [@skizzle010](https://github.com/skizzle010)
