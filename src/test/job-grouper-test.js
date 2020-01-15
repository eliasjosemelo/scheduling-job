/*
 * 
 * Teste do agrupamento de jobs
 * 
 * */
'use strict';

const chai = require('chai');
const jobGrouper = require('../job-grouper/job-grouper');

const assert = chai.assert;

it('Retorna um "Array"', () => {
  assert.isArray(jobGrouper.group());
});