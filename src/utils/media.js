import { css } from "styled-components";

const sizes = {
  phone: 600,
  tablet: 768,
  desktop: 1200,
};

export default function media(label) {
  return (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;
}
