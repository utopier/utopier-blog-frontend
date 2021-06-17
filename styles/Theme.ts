// 공통 Color
// - dark mode : https://colorhunt.co/palette/118962

export interface themeProps {
  bgColor: String;
  bgColor2: String;
  blueGreen: String;
  blueGreenLight: String;
  redColor: String;
  borderBottom: String;
  focusBoxShadows: String;
}

// blueGreen : #00818a
const theme: themeProps = {
  bgColor: '#283149',
  bgColor2: '#404b69',
  blueGreen: '#00818a',
  blueGreenLight: '#dbedf3',
  redColor: '#e94560',
  borderBottom: '1px solid #00818a',
  focusBoxShadows: '0 0 20px #00818a inset, 0 0 20px #00818a',
};

export default theme;
