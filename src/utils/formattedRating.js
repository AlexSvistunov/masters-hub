export function getFormattedRating(reviews) {  
  const averageRating = reviews?.average_rating;  

  if (averageRating === undefined) {  
    return null; 
  }  

  return averageRating % 1 === 0 ? `${averageRating}.0` : averageRating.toString();  
}  

