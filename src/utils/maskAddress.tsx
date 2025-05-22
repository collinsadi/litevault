export const maskAddress = (address: string) => {
  return address.slice(0, 5) + ".." + address.slice(-3);
};
