export function formatAmount(amount) {
  amount = String(amount);
  if (amount.length < 4) {
    return amount;
  }

  let temp = amount.slice(amount.length - 3, amount.length);
  amount = amount.slice(0, amount.length - 3);

  let moved = 1;
  for (let i = amount.length - 1; i >= 0; i--) {
    if (moved && moved % 2 === 0) {
      amount = `${amount.substring(0, i)},${amount.substring(
        i,
        amount.length
      )}`;
    }
    moved++;
  }
  if (amount[0] === ",") {
    amount = amount.substring(1, amount.length);
  }
  return amount + "," + temp;
}
