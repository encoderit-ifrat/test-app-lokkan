export const formatBrazilianCurrency = (input) => {
  let value = String(input).replace(/\D/g, ""); // Remove all non-numeric characters
  value = (value / 100).toFixed(2) + ""; // Convert to a float and format to 2 decimal places
  value = value.replace(".", ","); // Replace decimal point with comma
  value = value.replace(/(\d)(?=(\d{3})+\,)/g, "$1."); // Add thousand separators

  return `R$ ${value}`;
};
