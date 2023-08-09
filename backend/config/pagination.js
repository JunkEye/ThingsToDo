/*findAndCountAll
The findAndCountAll method is a convenience method that combines findAll and count. This is useful when dealing with queries related to pagination where you want to retrieve data with a limit and offset but also need to know the total number of records that match the query.

When group is not provided, the findAndCountAll method returns an object with two properties:

count - an integer - the total number records matching the query
rows - an array of objects - the obtained records
When group is provided, the findAndCountAll method returns an object with two properties:

count - an array of objects - contains the count in each group and the projected attributes
rows - an array of objects - the obtained records*/


//This needs to be inserted such that a findAll is broken up into separate pages

const { count, rows } = await Project.findAndCountAll({
    where: {
      title: {
        [Op.like]: 'foo%'
      }
    },
    offset: 10,
    limit: 2
  });
  console.log(count);
  console.log(rows);

//Do: Look at postman

//Wherever user is, they can click next; store will go to server in URI to access backend. It will change a view variables

//Offset = page number
//Limit = items brought up at once

//? Page = _

//Response body will contain the returned information.

//1 endpoint where it's generic - send it back with whatever it finds