export const reverseBrCurrencyFormat = (formattedValue) => {
  console.log("🟥 ~ reverseBrCurrencyFormat ~ formattedValue:", formattedValue);
  if (!formattedValue) return formattedValue;
  // Remove the currency symbol and any non-numeric characters
  let value = formattedValue.replace(/[R$\s.]/g, "");
  // Replace comma with a period for decimal point
  value = value.replace(",", ".");
  return parseFloat(value);
};
