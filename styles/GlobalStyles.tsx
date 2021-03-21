// css reset : emotion-reset

// 공통 Design 적용
// font
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/core';

const GlobalStyles = () => {
	return (
		<>
			<Global
				styles={css`
					${emotionReset}
					*, *::after, *::before {
						box-sizing: border-box;
						-moz-osx-font-smoothing: grayscale;
						-webkit-font-smoothing: antialiased;
						font-smoothing: antialiased;
					}
					body {
						background-color: #283149;
						color: white;
						font-family: 'Noto Sans KR', sans-serif;
					}
					a {
						color: white;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					a:link {
						text-decoration: none;
					}
					input,
					textarea {
						-webkit-transition: all 0.3s ease-in-out;
						-moz-transition: all 0.3s ease-in-out;
						-ms-transition: all 0.3s ease-in-out;
						-o-transition: all 0.3s ease-in-out;
						outline: none;
						border-radius: 5px;
						padding: 3px 0px 3px 3px;
						margin: 5px 1px 3px 0px;
						border: 1px solid #00818a;
					}
					input:focus,
					textarea:focus {
						box-shadow: 0 0 20px #00818a;
						padding: 3px 0px 3px 3px;
						margin: 5px 1px 3px 0px;
						border: 1px solid #00818a;
					}
					a {
						outline: none;
						cursor: pointer;
					}
				`}
			/>
		</>
	);
};

export default GlobalStyles;
