import { formatCurrenty } from "../scripts/utils/money.js";

describe('test suite: formatCurrency',()=>{
  it('convert cents into dollars ',()=>{
    expect(formatCurrenty(2095)).toEqual('20.95');
  });
  it('work with 0',()=>{

    expect(formatCurrenty(0)).toEqual('0.00');
  });
  it('round up to the nearest cent',()=>{
    expect(formatCurrenty(2000.5)).toEqual('20.01');
  })
});