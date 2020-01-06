const currency = num => (
  parseFloat(num, 10).toLocaleString(
    'de-DE',
    {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
);

export default currency;
