/*
 * 
 * Agrupamento de jobs
 * 
 * */
"use strict";

function prepare (jobs, windowStartDate, windowEndDate) {
  // cálculo do tamanho da janela em horas
  let windowSize = (windowEndDate - windowStartDate) / 1000 / 60 / 60;
  // tamanho da janela de agrupamento
  let groupWindowSize = 8;
  
  try {
    
    let sorted = sortByMaxConclusionDate(jobs);
    
    return group(sorted, groupWindowSize, windowSize);
    
  } catch (e) {
    throw "Parameter jobs needs to be an array of objects";
  }
};

function group (jobs, groupWindowSize, windowSize) {
  //objeto a ser retornado
  let groupment = [];
  //array utiizado para o agrupamento
  let windowGroupment = [];
  //controle para quebrar o agrupamento
  let windowGroupmentSizeAux = 0;
  //controle para não ultrapassar o tamanho máximo da janela
  let windowSizeAux = 0;
  
  for (let i = 0, length = jobs.length; i < length; i++)
  {
    
    let job = jobs[i];
    
    //se for ultrapassar tamanho da janela interrompe o laço
    if ((windowSizeAux + job.duration) > windowSize) {
      break;
    }
    
    //se for ultrapassar o tamanho  do agrupamento realiza a quebra
    if ((windowGroupmentSizeAux + job.duration) > groupWindowSize) {
      groupment.push(windowGroupment);
      windowGroupment = [];
      windowGroupmentSizeAux = 0;
    }
    
    //adiciona o job ao agrupamento e soma os tempos de duração aos controles
    windowGroupment.push(job.id);
    windowGroupmentSizeAux += job.duration;
    windowSizeAux += job.duration;
  }
  
  //adiciona o último agrupamento, caso exista
  if (windowGroupment.length > 0) {
      groupment.push(windowGroupment);
      windowGroupment = [];
      windowGroupmentSizeAux = 0;
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