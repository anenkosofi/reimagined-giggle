import { hexToRGBA } from './hexToRGBA';

interface CarColors {
  [key: string]: string;
}

const carColors: CarColors = {
  Yellow: '#fdbc15',
  Maroon: '#800000',
  Red: '#FF0000',
  Violet: '#bf8bff',
  Purple: '#800080',
  Indigo: '#4B0082',
  Teal: '#008080',
  Pink: '#FFC0CB',
  Aquamarine: '#7FFFD4',
  Green: '#008000',
  Mauv: '#BB85AB',
  Turquoise: '#40E0D0',
  Blue: '#0000FF',
  Puce: '#cc8899',
  Orange: '#e6704b',
  Khaki: '#c3b091',
  Fuscia: '#ff5733',
  Goldenrod: '#DAA520',
  Crimson: '#dc143c',
};

export const getTagStyle = (color: string) => {
  const carHexColor = carColors[color[0].toUpperCase() + color.slice(1)];
  const carRGBAColor = hexToRGBA(carHexColor);

  const styles: { [key: string]: string } = {
    color: carHexColor,
    backgroundColor: carRGBAColor,
    borderColor: carHexColor,
  };

  const inlineStyles = Object.entries(styles).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: string });

  return {
    style: inlineStyles,
  };
};
