/*
 * 
 * Agrupamento de jobs
 * 
 * */
'use strict';

function group (jobs) {
  
  let sorted = sortByMaxConclusionDate(jobs);
  
  return [];
};

function sortByMaxConclusionDate (jobs) {
  return jobs.sort((x, y) => {
    
    if (x.maxConclusionDate < y.maxConclusionDate) {
      return -1;
    }
    
    return 1;
  });
}

module.exports = {
    group: group,
    sortByMaxConclusionDate: sortByMaxConclusionDate
};