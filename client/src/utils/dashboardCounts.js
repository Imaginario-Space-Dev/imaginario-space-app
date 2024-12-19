import moment from 'moment';

//  Total number of data 
export const getLength = (thedata) => { return thedata?.length}

// 1. Filter books created this month
export const currentMonthProduct = (thedata) => {
  const result =  thedata?.filter(item => 
       moment(item.createdAt || item.visitedAt || item.likedAt || item.savedAt || item.addedAt || item.sharedAt || item.clickedAt || item.lastUpdatedAt).isSame(moment(), 'month')
    );
    return result?.length
}

// 2. Filter books created last month
export const lastMonthProducts = (thedata) => {
  const result = thedata?.filter(item => 
    moment(item.createdAt || item.visitedAt || item.likedAt || item.savedAt || item.addedAt || item.sharedAt || item.clickedAt || item.lastUpdatedAt).isSame(moment().subtract(1, 'month'), 'month')
  );
  return result?.length
}

// 3. Calculate the difference in book counts
export const productDifference = (curr, prev) => {
    const result =  curr - prev;
    return result
  } 
 
// 4. Calculate the difference in book counts in percentage
export const getDifferencePercentage = (curr, prev) => {
    const currentCount = curr;
    const lastCount = prev;
    
    let differencePercentage;
    
    if (lastCount > 0) {
      differencePercentage = ((currentCount - lastCount) / lastCount) * 100;
    } else if (currentCount > 0) {
      differencePercentage = 100; // All new books this month if no books last month
    } else {
      differencePercentage = 0; // No change if no books in either month
    }
  
    return differencePercentage.toFixed(2)
  }
  