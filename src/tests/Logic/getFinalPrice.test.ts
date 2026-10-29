import { getFinalPrice } from "@/utils/getFinalPrice";

describe("testing nearly everything related to geting the final price function", () => {
  test("geting final orice withour discount", () => {
    expect(getFinalPrice(100, 0)).toBe(100);
  });

  test("geting final price with normal discount", () => {
    expect(getFinalPrice(100, 20)).toBe(80);
  });

  test("getting final price with 100% discount",()=>{
    expect(getFinalPrice(100,100)).toBe(0)
  })

  test("getting final price with string data and float", ()=>{
    expect(getFinalPrice("99.99", 10)).toBeCloseTo(89.991)
  })
});
