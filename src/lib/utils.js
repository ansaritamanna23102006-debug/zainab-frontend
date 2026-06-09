export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export function formatPhone(phone) {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+91 ${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
}
