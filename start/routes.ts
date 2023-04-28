/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';



//**** USER ROUTES ************************************************************************************************************************************************//



// USER SIGNUP //
Route.post('/user/signup', 'UserController.signup');


// USER LOGIN //
Route.post('/user/login', 'UserController.login');


// USER LOGOUT //
Route.delete('/user/logout', 'UserController.logout').middleware(['loginAuth']);


// USER ACCOUNT DEACTIVATE //
Route.delete('/user/deactivate', 'UserController.deactivate').middleware(['loginAuth']);


// USER CHANGE PASSWORD //
Route.patch('/user/change-password', 'UserController.change_password').middleware(['loginAuth']);






//**** POST ROUTES ************************************************************************************************************************************************//



// USER CREATE POST //
Route.post('/user/create-post', 'PostController.createPost').middleware(['loginAuth']);



// USER DELETE POST //
Route.delete('/user/delete-post', 'PostController.deletePost').middleware(['loginAuth']);


// USER ALL POSTS WITH COMMENTS //
Route.get('/user/get-all-posts', 'PostController.getAllPost').middleware(['loginAuth']);






//**** ALL POSTS LIVE **********************************************************************************************************************************************//



// SET POST LIVE //
Route.get('/upload/user/posts', 'PostController.setPostLive');






//**** POSTS COMMENTS ROUTES **************************************************************************************************************************************//



// SET POST LIVE //
Route.post('/user/create-comment', 'CommentController.createComment').middleware(['loginAuth']);






//**** SOCIAL AUTHENTICATION ROUTE **************************************************************************************************************************************//



// AUTHENTICATE WITH GOOGLE //
Route.post('/google/redirect', 'SocialController.googleAuthentication');



// GOOGLE REDIRECT //
Route.get('/google/callback', 'SocialController.googleRedirect');
  

