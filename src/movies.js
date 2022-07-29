// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if(moviesArray.length===0)return 0;

    let sumOfScore = moviesArray.reduce( (prevValue,currValue)=>{
       
        if(currValue.score) {
            return prevValue+currValue.score
        }else{
            return prevValue;
        }
    } , 0);
    sumOfScore/=moviesArray.length;

    return Number(sumOfScore.toFixed(2));
}
 
// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    return scoresAverage(moviesArray.filter(movie => movie.genre.includes('Drama')));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let sortedMovie = moviesArray.map((x)=>x);
    
    sortedMovie.sort((movie1, movie2)=> {
        
        if(movie1.year - movie2.year===0){
            return movie1.title.localeCompare(movie2.title);
        }else{
            return movie1.year - movie2.year; 
        }

    })
    
    return sortedMovie;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    let sortedMovie = moviesArray.map((x)=>x.title);

    sortedMovie.sort((movie1, movie2)=>  movie1.localeCompare(movie2) );
    sortedMovie = sortedMovie.slice(0,20); 
   return sortedMovie;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    // let movieMinutes = [...moviesArray];
    let movieMinutes = structuredClone(moviesArray);
    // let movieMinutes = JSON.parse(JSON.stringify(moviesArray))

    movieMinutes.map(function (movie){
        const hours = Number(movie.duration.split("h")[0]*60)
        const minutes = Number(movie.duration.split("h")[1].split("min")[0])
        movie.duration= hours+minutes;
    })
    
    return movieMinutes;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    //two for each version
    // if(moviesArray.length===0)return null;
    // let getYears = moviesArray.map((x)=>x.year);
    // let bestScore='';
    // let bestYear='';
    // getYears.forEach(function (year){
    //     const tempArray = [];
    //     moviesArray.forEach(function (movie){
    //         if(movie.year === year){
    //             tempArray.push(movie);
    //         }
    //     });
    //     if (scoresAverage(tempArray)>=bestScore ) {
    //         bestScore=scoresAverage(tempArray);
    //         bestYear=year;
    //     }
    // })

    //single foreach version
    if(moviesArray.length===0)return null;

    //creation new array with object with only 2 param
    const getYearsScore = moviesArray.map((x)=>({'year': x.year, 'score': x.score}))
   
    let bestScore='';
    let bestYear='';

    //going through the new arry
    getYearsScore.forEach(function (element){
       
        //calculating the avg score for the year of the element
        const tempScore = scoresAverage(getYearsScore.filter(movie => movie.year===element.year));

        //updating result
        if (tempScore>=bestScore ) {
            bestScore=tempScore;
            bestYear=element.year;
        }

       // console.log(`The best year was ${bestYear} with an average score of ${bestScore}`);
        
    })

    return `The best year was ${bestYear} with an average score of ${bestScore}`;
}
