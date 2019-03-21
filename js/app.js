console.log("Movie Info App Connected!");

$(document).ready(() => {
	$("#searchForm").on("submit", (event) => {
		let searchText = $("#searchText").val();
		getMovies(searchText);
		event.preventDefault();
	});
});

function getMovies(searchText){
	// console.log(searchText);
	axios.get("https://www.omdbapi.com/?s="+searchText+"&apikey=5af034cd")
		.then((response) => {
			console.log(response);
			let movies = response.data.Search;
			let output = "";
			$.each(movies, (index, movie) => {
				output += `
					<div class="col-md-3">
						<div class = "card text-center">
							<img src="${movie.Poster}" class="card-img-top"/>
							<h5 class="card-title">${movie.Title}</h5>
							<p class="card-text">${movie.Year}<p>
							<a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">More Info</a>
						</div>
						<br><br>
					</div>
				`;
			});
			$("#movies").html(output);
		})
		.catch((error) => {
			console.log(error);
		});
}

function movieSelected(id){
	sessionStorage.setItem("movieId", id);
	window.location = "movie.html";
	return false;
} 

function getMovie(){
	let movieId = sessionStorage.getItem("movieId");

	axios.get("https://www.omdbapi.com/?i="+movieId+"&apikey=5af034cd")
		.then((response) => {
			console.log(response);
			let movie = response.data;
			let output = `
							<div class="row card-body">
								<div class="col-md-4">
									<img src="${movie.Poster}" class="card-img-top"/>
								</div>
								<div class="col-md-8">
									<h2 class="card-title">${movie.Title}</h2>
									<ul class="list-group">
										<li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
										<li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
										<li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
										<li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
										<li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
										<li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
										<li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
									</ul>
								</div>
							</div>
							<div class="row card-body">
								<div class="col-md-12">
									<h3>Plot</h3>
									<p class="">${movie.Plot}</p>
									<hr>
									<a href="https://imdb.com/title/${movie.imdbID}" class="btn btn-primary">IMDB Info</a>
									<a href="index.html" class="btn btn-info">Go Back To Search</a>
								</div>
							</div>
			`;
			$("#movie").html(output);
			
		})
		.catch((error) => {
			console.log(error);
		});
};




//can also be written as
/* 
$(document).ready(function(){
	$("#searchForm").on("submit", function(event){
		var searchText = document.getElementById("searchText").value
		getMovies(searchText);
		console.log(searchText);
		event.preventDefault();
	});
});
*/