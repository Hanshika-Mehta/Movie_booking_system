import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
// import Navbar from "../components/Navbar/Navbar";

interface Movie {
  movie_id: number;
  movie_name: string;
  image: string;
  year: string;
  duration: string;
}

const Movie = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/movies");
        const data = await response.json();
        setMovieData(Array.isArray(data.movies) ? data.movies : []);

        console.log(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/movies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMovieData((prevMovieData) =>
          prevMovieData.filter((movie) => movie.movie_id !== id)
        );
        alert("Movie deleted successfully");
      } else {
        alert("Failed to delete the movie");
      }
    } catch (error) {
      console.error("Error deleting the movie:", error);
      alert("An error occurred while deleting the movie");
    }
  };

  const handlePost = async () => {
    try {
      const movie_name = prompt("Enter movie name:");
      const duration = prompt("Enter movie duration:");
      const year = prompt("Enter release year:");

      if (movie_name && duration  && year) {
        const response = await fetch("http://localhost:3001/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie_name,
            duration,
            year,
          }),
        });

        if (response.ok) {
          const newMovie = await response.json();
          setMovieData((prevMovieData) => [...prevMovieData, newMovie.movie]);
          alert("Movie added successfully");
        } else {
          alert("Failed to add the movie");
        }
      } else {
        alert("Please provide all the movie details.");
      }
    } catch (error) {
      console.error("Error adding the movie:", error);
      alert("An error occurred while adding the movie");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const movieToUpdate = movieData.find((movie) => movie.movie_id === id);
      if (!movieToUpdate) {
        alert("Movie not found");
        return;
      }

      const movie_name = prompt(
        "Enter new movie name:",
        movieToUpdate.movie_name
      );
      const duration = prompt(
        "Enter new movie duration:",
        movieToUpdate.duration
      );

      if (movie_name !== null && duration !== null) {
        const response = await fetch(`http://localhost:3001/movies/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie_name,
            duration,
          }),
        });

        if (response) {
          setMovieData((prevMovieData) =>
            prevMovieData.map((movie) =>
              movie.movie_id === id ? { ...movie, movie_name, duration } : movie
            )
          );
          alert("Movie updated successfully");
        } else {
          alert("Failed to update the movie");
        }
      } else {
        alert("Please provide all the movie details.");
      }
    } catch (error) {
      console.error("Error updating the movie:", error);
      alert("An error occurred while updating the movie");
    }
  };

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css"
        rel="stylesheet"
      />
      <div>
        <Navbar />
      </div>
      <div className="bg-gray-900 text-white p-4">
        <h1 className="text-4xl mb-6">Movie Details</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-6"
          onClick={() => handlePost()}
        >
          Add Movie
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movieData.length
            ? movieData.map((movie, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-lg relative"
                >
                  <img
                    src={movie.image}
                    alt={movie.movie_name}
                    className="w-96 h-56 p-1 object-cover rounded-lg "
                  />
                  <h5 className="mt-4 text-xl font-bold">{movie.movie_name}</h5>
                  <p className="text-gray-400">{movie.year}</p>
                  <p className="text-gray-400">Duration: {movie.duration}</p>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleUpdate(movie.movie_id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(movie.movie_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Movie;
