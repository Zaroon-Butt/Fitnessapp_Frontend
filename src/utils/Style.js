import { ExtraBold, Bold, Regular, Medium, Light } from './font';
import { RF } from './responsive';

const heading = {
  fontFamily: ExtraBold,
  fontSize: RF(50),
  lineHeight: RF(50),
  color: '#D0FD3E',
};

const normal = {
  fontFamily: Bold,
  fontSize: RF(20),
  lineHeight: RF(20),
  textAlign: 'center',
  color: '#FFFFFF',
};

const normal16 = {
  fontFamily: Bold,
  fontSize: RF(16),
  lineHeight: RF(16),
  textAlign: 'center',
  color: '#FFFFFF',
};
const medium = {
  //500
  fontFamily: Medium,
  lineHeight: RF(20),
  textAlign: 'center',
  fontSize: RF(20),
  color: '#FFFFFF',
};

const medium24 = {
  //500
  fontFamily: Medium,
  lineHeight: RF(24),
  textAlign: 'center',
  fontSize: RF(24),
  color: '#FFFFFF',
};

const regular = {
  //400
  fontFamily: Regular,
  fontSize: RF(10),
  textAlign: 'center',
  lineHeight: RF(10),
  color: '#FFFFFF',
};
const regular16 = {
  //400
  fontFamily: Regular,
  fontSize: RF(16),
  lineHeight: RF(16),
  color: '#FFFFFF',
};
const regular9 = {
  //400
  fontFamily: Regular,
  fontSize: RF(9),
  textAlign: 'center',
  lineHeight: RF(9),
  color: '#FFFFFF',
};

const light = {
  //300
  fontFamily: Light,
  color: '#FFFFFF',
};

export { heading, normal, regular, light, medium, regular9, normal16, medium24 , regular16 };
