/*
 * 
 * Agrupamento de jobs
 * 
 * */
"use strict";

function prepare (jobs, windowStartDate, windowEndDate) {
  let windowSize = 8;
  
  try {
    
    let sorted = sortByMaxConclusionDate(jobs);
    
    return group(sorted, windowSize);
    
  } catch (e) {
    throw "Parameter jobs needs to be an array of objects";
  }
};

function group (jobs, windowSize) {
  let groupment = [];
  let windowGroupment = [];
  let windowSizeAux = 0;
  
  for (let i = 0, length = jobs.length; i < length; i++)
  {
    
    let job = jobs[i];
    
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
    prepare: prepare,
    group: group,
    sortByMaxConclusionDate: sortByMaxConclusionDate
};