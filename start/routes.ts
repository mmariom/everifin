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

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {

  Route.post('/create', 'ControllerFiles.create').as('create_file');

  Route.get('/getAll', 'ControllerFiles.getAll').as('get_all_files');

  Route.get('/getFile/:I', 'ControllerFiles.getFile')
    .where('I', {
    match: /^[0-9]+$/,
    cast: (I) => Number(I),
  }).as('get_file')



}).prefix('/api')