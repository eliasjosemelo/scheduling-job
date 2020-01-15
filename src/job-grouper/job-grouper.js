/*
 * 
 * Agrupamento de jobs
 * 
 * */
"use strict";

function group (jobs) {
  let sorted = [];
  
  try {
    sorted = sortByMaxConclusionDate(jobs);
  } catch (e) {
    throw "Parameter jobs needs to be an array of objects";
  }
  
  let groupment = [];
  let windowGroupment = [];
  let windowSize = 8;
  let windowSizeAux = 0;
  
  try {
    for (let i = 0, length = sorted.length; i < length; i++)
    {
      
      let job = sorted[i];
      
      if ((windowSizeAux + job.duration) > windowSize) {
        groupment.push(windowGroupment);
        windowGroupment = [];
        windowSizeAux = 0;
      }
      
      windowGroupment.push(job.id);
      windowSizeAux += job.duration;
    }
    
    if (windowGroupment.length > 0) {
        groupment.push(windowGroupment);
        windowGroupment = [];
        windowSizeAux = 0;
    }
  } catch (e) {
    throw "Parameter jobs needs to be an array of objects";
  }
  
  
  return groupment;
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