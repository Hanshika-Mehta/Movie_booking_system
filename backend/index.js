const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

const prisma = new PrismaClient();
const app = express();

app.use(cors())
app.use(express.json());


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// take data from json and post it in the database

app.post('/movies/upload', async (req, res) => {
    try {
      // Reading data from output.json file
      const data = await fs.readFile('output.json', 'utf-8');
      const jsonData = JSON.parse(data);
    //   // Create multiple movie entries based on the JSON data
      const createdMovies = await prisma.movie.createMany({
        data: jsonData.map(movie => ({
          movie_name: movie.name,
          year: movie.year,
          duration: movie.duration,
          image: movie.image,
        })),
      });
      res.status(201).json({ movies: createdMovies });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

 // GET /users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
  
    res.status(200).json({ users });
  });
// POST /users
app.post('/users', async (req, res) => {
    const id = req.params.id;

    try {
      await prisma.user.delete({
        where: {
          customer_id: Number(id)
        }
      });
    
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

//delete movie
// DELETE /movies/:id
app.delete('/movies/:id', async (req, res) => {
  const movieId = parseInt(req.params.id);

  try {
    const deletedMovie = await prisma.movie.delete({
      where: {
        movie_id: movieId,
      },
    });

    if (deletedMovie) {
      res.status(204).send(); // Movie deleted successfully
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




    
 // GET /movies
app.get('/movies', async (req, res) => {
    const movies = await prisma.movie.findMany();
  
    res.status(200).json({ movies });
  });

//get with title 
app.get('/movies/title/:title', async (req, res) => {
    const { title } = req.params;
  
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }
  
    try {
      const movies = await prisma.movie.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive', // This will make the search case-insensitive
          },
        },
      });
  
      if (movies.length > 0) {
        res.status(200).json({ movies });
      } else {
        res.status(404).json({ error: 'No movies found with the specified title' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// POST /movies
app.post('/movies', async (req, res) => {
    console.log(req.body)
  const { movie_name, duration, screens, release_date } = req.body;

  try {
    const newMovie = await prisma.movie.create({
      data: {
        movie_name,
        year,
        duration,
        image
      },
    });

    res.status(201).json({ movie: newMovie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//update
app.patch('/movie/:id' , async function(req, res){
  const movieId=parseInt(req.params.id);
  const { movie_name,duration} = req.body;

  try{
    const updateMovie = await prisma.movie.update({
      where:{
        movie_id:movieId,
      },
      data:{
        movie_name,
        duration
      },  
});
  res.status(200).json({movie:updateMovie});
}catch(error){
  res.status(500).json({error:error.message});
}
});
// // GET /bookings
// app.get('/bookings', async (req, res) => {
//     const bookings = await prisma.booking.findMany();
  
//     res.status(200).json({ bookings });
//   });
  
// // POST /bookings
// app.post('/bookings', async (req, res) => {
//   const { movieId, userId, price } = req.body;

//   try {
//     const newBooking = await prisma.booking.create({
//       data: {
//         movieId,
//         userId,
//         price,
//       },
//     });

//     res.status(201).json({ booking: newBooking });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


// app.delete('/users/:id', async (req, res) => {
//     const id = req.params.id;
  
//     try {
//       await prisma.user.delete({
//         where: {
//           customer_id: id
//         }
//       });
  
//       res.status(204).send();
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});