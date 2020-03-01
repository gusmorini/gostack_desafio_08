import {MaskService} from 'react-native-masked-text';

export const formatPrice = value => {
  return MaskService.toMask('money', value, {
    unit: 'R$',
    separator: ',',
    delimiter: '.',
  });
};
