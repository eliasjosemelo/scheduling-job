/*
 * 
 * Teste do agrupamento de jobs
 * 
 * */
'use strict';

const chai = require('chai');

const jobGrouper = require('../job-grouper/job-grouper');

const testData = [
    {
      "input": [
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 4,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 6,
        }
      ],
      "output" :[
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 6,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 4,
        }
      ]
    }
];


const assert = chai.assert;

describe('Validações de Ordenação', () => {
  
  it('Deve ordenar o array por maxConclusionDate crescente', () => {
    assert.deepEqual(jobGrouper.sortByMaxConclusionDate(testData[0].input), testData[0].output);
  });
  
});

describe('Validações de Retorno', () => {

  it('Retorna um "Array"', () => {
    assert.isArray(jobGrouper.group([]));
  });

});