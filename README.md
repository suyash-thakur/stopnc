# Stopnc

This is a social media blogging platform where user can follow other bloggers to be updated about latest fashion trends and can share their fashion sense to others.

## How to run the app

1. Either fork or download the app and open the folder in CLI.
2. Install all the dependencies using `npm i` command.
3. Start the front-end server using `ng serve` command. Front-end will be served at http://localhost:4200
4. Initialize the database server using mongocli at  http://localhost:27017
5. Initialize elasticSearch Client.
6. Initialize Redis Client.
7. Start the back-end server using `node server` command. Back-end will be served at http://localhost:3000
8. Go to http://localhost:4200 using a web browser

## How to write a blog

1. Signup/Login to the app using your credentials or using your google account.
2. Open the dropdown by clicking on the profile icon at top right of the navigation bar.
3. Select `become a blogger`
4. Write your blog using the editor
5. Upload some relevant images or videos
6. Click on `save` to publish your blog.

## How to edit your profile
1. Open the dropdown 
2. Click on your name. you will be navigated to the profile page
3. Click on `edit profile` button
4. Do the required editts and click on `save`

## User Stories
- A user can create new blogs.
- A user can like other user's blogs.
- A user can comment on the blogs.
- A user can bookmark any blog.
- A user can edit their profile.
- A user can follow/unfollow other users.
- A user can search other users and blogs.
- A user can upload image or video in the blog.
- A user can sort blog according to the categories.


## Features
-Notification
  - Every notification is a seperate entity with following schema:
  ```javascript
      {
    message: {
        type: String,
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    refId: {
        type: Schema.Types.ObjectId,
        refPath: 'type'
    },
    type: {
        type: String,
        required: true,
        enum: ['User', 'Post']
    },
    isRead: {
        type: Boolean,
        default: false
    }
}
```
  - Once the notification is read `isread` is assigned value false.
  - `Refid` contains id of Object to which user will be redirected to according to the type of the source of notification.
  
-Comment
  - Every comment is a seperate entity with following schema:
   ```javascript
    {
    body: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]

}
```
- Every comment have a time-stamp automatically applied by the database.
- Comment have an array of likes as attribute which stores user-id corresponding to every like on the comment.

 
## Future Features
- Personalized feed according the the user's interest.

## What the app looks like 
![Home Page](https://github.com/suyash-thakur/stopnc/blob/master/homepage.png)

![Home Page Mobile](https://github.com/suyash-thakur/stopnc/blob/master/Screenshot%20(904).png)
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
