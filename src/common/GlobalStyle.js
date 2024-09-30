import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


    /* color */
    :root {
      --primary-color: #0087ca;
      --primary-color-transparent: rgba(0, 135, 202, 0.5);
      --secondary-color: #bc1238;
      --teenagers-color: #ffafa3;
      --twenties-color: #ffc470;
      --thirties-color: #ffd966;
      --forties-color: #85e0a3;
      --fifties-color: #80caff;
      --sixties-color: #d9b8ff;
      --very-crowded-color: #dd1f3d;
      --crowded-color: #ff8040;
      --normal-color: #ffb100;
      --quiet-color: #00d369;
      --gray-color: #bdbdbd;
      --black-color: #333333;
      --white-color: #ffffff;
    }

    /* shadow */
    .box-shadow {
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
    }

    /* radius */
    .border-radius-default {
      border-radius: 20px;
    }

    .border-radius-thin {
      border-radius: 10px;
    }

    .border-radius-circle {
      border-radius: 50%;
    }

    /* padding, margin, gap */
    .padding-default {
      padding: 1rem;
    }

    .padding-thin {
      padding: 0.5rem;
    }

    .padding-thick {
      padding: 1.5rem;
    }

    .padding-thicker {
      padding: 2rem;
    }

    /* font-size */
    .font-size-max-extra-large {
      font-size: 36px;
    }

    .font-size-extra-large {
      font-size: 28px;
    }

    .font-size-large {
      font-size: 26px;
    }

    .font-size-medium {
      font-size: 16px;
    }

    .font-size-small {
      font-size: 14px;
    }

    .font-size-micro {
      font-size: 12px;
    }

    /* font-weight */
    .font-weight-bold {
      font-weight: 900;
    }

    .font-weight-regular {
      font-weight: 400;
    }

    .font-weight-thin {
      font-weight: 300;
    }

    /* font-family */
    h2 {
      font-family: "Nanum Gothic", sans-serif;
      font-size: 28px;
      font-weight: 900;
    }

    h3 {
      font-family: "Do Hyeon", sans-serif;
      font-size: 26px;
      font-weight: 400;
    }

    p, span {
      font-family: "Noto Sans KR", sans-serif;
      font-size: 16px;
      font-weight: 300;
    }

    strong {
      color: var(--primary-color);
      font-weight: 900;
    }
`;

export default GlobalStyle;
