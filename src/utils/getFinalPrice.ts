/**
 * Calculates the final price of a product after applying discount.
 * @param price - Product price as string or number
 * @param discount - Discount percentage (e.g. 20 for 20%)
 * @returns Final price as number
 */
export const getFinalPrice = (
  price: number | string,
  discount: number = 0
): number => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numericPrice) || numericPrice < 0) {
    return 0;
  }

  if (discount <= 0) {
    return numericPrice;
  }

  if (discount >= 100) {
    return 0;
  }

  const finalPrice = numericPrice - (numericPrice * discount) / 100;
  return finalPrice;
};
