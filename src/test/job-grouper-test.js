/*
 * 
 * Teste do agrupamento de jobs
 * 
 * */
"use strict";

const chai = require('chai');

const jobGrouper = require('../job-grouper/job-grouper');


const assert = chai.assert;

describe("Validações de Ordenação", () => {
  
  it("Deve ordenar o array por maxConclusionDate crescente", () => {
    assert.deepEqual(jobGrouper.sortByMaxConclusionDate(
      [
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 2
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 4
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 6
        }
      ]),
      [
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 2
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 6
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 4
        }
      ]
    );
    
  });
  
});

describe("Validações de Agrupamento", () => {

  it("Deve retornar um array de arrays de id\"s, agrupando os jobs de forma que a soma das horas de duração sejam no máximo 8 e respeitar a janela máxima de execução.", () => {
    assert.deepEqual(
      jobGrouper.group([
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
      ], 8),
      [
        [1, 2],
        [3]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 8,
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
      ], 8),
      [
        [1],
        [2],
        [3]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 4,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 8,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 4,
        }
      ], 8),
      [
        [1],
        [2],
        [3]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 1,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 4,
          "description": "Processamento de dados diários para relatório",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 1,
        }
      ], 8),
      [
        [1, 2, 3, 4]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 1,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 4,
          "description": "Processamento de dados diários para relatório",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 6,
        }
      ], 8),
      [
        [1, 2, 3],
        [4]
      ]
    );
      
  });
  
  it("Deve retornar um array de arrays de id\"s, agrupando os jobs de forma que a soma das horas de duração sejam no máximo 5 e respeitar a janela máxima de execução.", () => {
    assert.deepEqual(
      jobGrouper.group([
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
          "duration": 3,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 5,
        }
      ], 5, 10),
      [
        [1, 2],
        [3]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 5,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 3,
        }
      ], 5, 12)
      [
        [1],
        [2],
        [3]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 4,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 2,
        }
      ], 5, 8),
      [
        [1],
        [2, 3]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 1,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 4,
          "description": "Processamento de dados diários para relatório",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 4,
        }
      ], 5, 10),
      [
        [1, 2],
        [3],
        [4]
      ]
    );
      
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 1,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 4,
          "description": "Processamento de dados diários para relatório",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 4,
        }
      ], 5, 10),
      [
        [1, 2],
        [3],
        [4]
      ]
    );
    
  });
  
  it("Deve retornar um array de arrays de id\"s, agrupando os jobs de forma que a soma das horas de duração sejam no máximo 5 e respeitar a janela máxima de execução, deixando o último job fora da lista.", () => {
    assert.deepEqual(
      jobGrouper.group([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 10, 12, 0, 0, 0),
          "duration": 1,
        },
        {
          "id": 2,
          "description": "Importação de dados da Base Legada",
          "maxConclusionDate": new Date(2019, 11, 11, 12, 0, 0, 0),
          "duration": 2,
        },
        {
          "id": 3,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 4,
          "description": "Processamento de dados diários para relatório",
          "maxConclusionDate": new Date(2019, 11, 11, 08, 0, 0, 0),
          "duration": 4,
        }
      ], 5, 9),
      [
        [1, 2],
        [3]
      ]
    );
      
  });

});

describe("Validações de Retorno", () => {

  it("Deve retornar mensagem quando o input não for enviado", () => {
    assert.throws(function() {
      try {
        assert.isArray(jobGrouper.prepare());
      } catch (e) {
        throw e;
      }
    }, "Parameter jobs needs to be an array of objects");
  });
  
  it("Deve retornar mensagem quando o input não for apropriado", () => {
    assert.throws(function() {
      try {
        jobGrouper.prepare("non-array");
      } catch (e) {
        throw e;
      }
    }, "Parameter jobs needs to be an array of objects");
    
  });
  
  it("Retornar um \"Array\"", () => {
    assert.isArray(jobGrouper.prepare([]));
  });
  
  it("Deve retornar um array de arrays de id\"s, agrupando os jobs de forma que a soma das horas de duração sejam no máximo 8 e orderando por data máxima de conclusão e respeitando as datas de início e fim da janela de execução", () => {
    
    assert.deepEqual(
      jobGrouper.prepare([
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
      ], new Date(2019, 11, 10, 8, 0, 0, 0), new Date(2019, 11, 11, 16, 0, 0, 0)),
      [
        [1, 3],
        [2]
      ]
    );
    
    assert.deepEqual(
      jobGrouper.prepare([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 12, 12, 0, 0, 0),
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
          "maxConclusionDate": new Date(2019, 11, 10, 08, 0, 0, 0),
          "duration": 6,
        },
        {
          "id": 4,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 16, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 5,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 12, 08, 0, 0, 0),
          "duration": 5,
        }
      ], new Date(2019, 11, 10, 2, 0, 0, 0), new Date(2019, 11, 11, 6, 0, 0, 0)),
      [
        [3],
        [2, 4],
        [5, 1]
      ]
    );
    
    assert.deepEqual(
      jobGrouper.prepare([
        {
          "id": 1,
          "description": "Importação de arquivos de fundos",
          "maxConclusionDate": new Date(2019, 11, 12, 12, 0, 0, 0),
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
          "maxConclusionDate": new Date(2019, 11, 10, 08, 0, 0, 0),
          "duration": 6,
        },
        {
          "id": 4,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 11, 16, 0, 0, 0),
          "duration": 3,
        },
        {
          "id": 5,
          "description": "Importação de dados de integração",
          "maxConclusionDate": new Date(2019, 11, 12, 08, 0, 0, 0),
          "duration": 5,
        }
      ], new Date(2019, 11, 10, 2, 0, 0, 0), new Date(2019, 11, 10, 20, 0, 0, 0)),
      [
        [3],
        [2, 4],
        [5]
      ]
    );
    
  });

});