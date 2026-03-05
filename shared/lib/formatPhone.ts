export const formatPhoneNumber = (value: string) => {
  const phone = value.replace(/\D/g, '');
  const len = phone.length;

  if (len <= 1) return phone.length ? '+7' : '';
  if (len <= 4) return `+7 (${phone.slice(1)}`;
  if (len <= 7) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4)}`;
  if (len <= 9) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
  return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
};