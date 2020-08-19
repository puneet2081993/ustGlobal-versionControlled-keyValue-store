var assert = require('chai').assert
const {keyValueQuery} = require('../../database')
describe('Test Suite', ()=>{
  describe('Get Value By key Test', () => {
    it('it will return active key value', async() => {
      let res = await keyValueQuery.getKeyValue('e')
      document(res)
      assert.equal(res['value'],36);
    });
  });
  describe('Get Value By Key and Timestamp', () => {
    it('it will return nearest timestamp based active key value', async() => {
      let res = await keyValueQuery.getKeyValueByTimestamp('e',(1597793556*1000))
      assert.equal(res['value'],36);
    });
  });
  describe('Insert Or Update Key and Value', () => {
    it('it will object with key, value, timestamp', async () => {
      let res = await keyValueQuery.insertOrUpdate('e',37)
      let flag = ((res)&&(res!==null))?true:false
      assert.equal(flag,true)
    });
  });
});