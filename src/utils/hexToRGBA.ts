export const hexToRGBA = (hex: string): string => {
  let c: string[];
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = ['0x' + c[0] + c[1], '0x' + c[2] + c[3], '0x' + c[4] + c[5]];
    return `rgba(${parseInt(c[0])}, ${parseInt(c[1])}, ${parseInt(c[2])}, 0.1)`;
  }
  return 'rgba(42, 44, 54, 0.1)';
};
