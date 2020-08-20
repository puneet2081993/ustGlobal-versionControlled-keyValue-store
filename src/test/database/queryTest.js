var assert = require('chai').assert
const {keyValueQuery} = require('../../database');
const { expect } = require('chai');
describe('Query Test Suite', ()=>{
  describe('Get Value By key Test', () => {
    it('it will return active key value', async() => {
      let res = await keyValueQuery.getKeyValue('pre')
      assert.equal(res['value'],101);
    });
  });
  describe('Get Value By Key and Timestamp', () => {
    it('it will return nearest timestamp based active key value', async() => {
      let res = await keyValueQuery.getKeyValueByTimestamp('pre',(1597829905*1000))
      assert.equal(res['value'],101);
    });
  });
  describe('Insert Or Update Key and Value', () => {
    it('it will return object with key, value, timestamp', async () => {
      let res = await keyValueQuery.insertOrUpdate('pre',37)
      expect(res.key)
      expect(res.value)
      expect(res.timestamp)
    });
  });
});