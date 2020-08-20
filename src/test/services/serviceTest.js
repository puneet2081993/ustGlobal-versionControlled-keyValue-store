const {keyValueService} = require('../../services')
const { expect,assert } = require('chai');
let str = '102'
describe('Key Value Service Test Suite', ()=>{
  describe('Get value by key', () => {
    it('it will return last updated value of provided key', async() => {
      let res = await keyValueService.getKeyValue('pre')
      expect(res.value)
      assert.equal(res['value'],str);
    });
  });
  describe('Get value by key and timestamp', () => {
    it('it will return recent value based on timestamp and key provided', async() => {
      let res = await keyValueService.getKeyValueByTimestamp('pre',1597829905)
      expect(res.value)
      assert.equal(res['value'],str);
    });
  });
  describe('Insert OR Update value for respective key', () => {
    it('it will return a key value and timestamp', async () => {
      let res = await keyValueService.insertOrUpdateKey('pre',104)
      expect(res.key)
      expect(res.value)
      expect(res.timestamp)
    });
  });
});