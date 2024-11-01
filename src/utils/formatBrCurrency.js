export const formatBrCurrency = (value) => {
    if (!value) return value;
  
    // Remove non-numeric characters except for comma and period
    let formattedValue = value.replace(/[^0-9,]/g, '');
  
    // Replace commas with periods and periods with commas to handle decimal
    formattedValue = formattedValue.replace(/\./g, '');
    formattedValue = formattedValue.replace(/,/g, '.');
  
    // Convert the value to a number
    let numberValue = parseFloat(formattedValue);
    if (isNaN(numberValue)) return '';
  
    // Format the number as Brazilian currency
    return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };