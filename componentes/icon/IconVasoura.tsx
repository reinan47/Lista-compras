import React from 'react';
import { Svg, Path } from 'react-native-svg';

const IconVasoura = () => (
  <Svg height={20} width={13}>
    <Path d="M8.62688 11.5C8.62217 10.9727 8.48138 10.4555 8.21816 9.99861C7.95493 9.54169 7.57817 9.16047 7.12438 8.89187L11.75 0.875L10.6688 0.25L5.93313 8.45375C5.35194 8.32397 4.74749 8.34196 4.17504 8.50606C3.6026 8.67016 3.08042 8.97514 2.65625 9.39312C0.316253 11.65 0.497503 16.9263 0.506253 17.15C0.512714 17.3114 0.581403 17.464 0.697921 17.5759C0.814438 17.6877 0.969735 17.7501 1.13125 17.75H10.5006C10.6318 17.75 10.7597 17.7087 10.8661 17.632C10.9725 17.5553 11.0521 17.4471 11.0936 17.3226C11.135 17.1982 11.1363 17.0639 11.0972 16.9386C11.0581 16.8134 10.9806 16.7037 10.8756 16.625C8.66313 14.965 8.62688 11.5337 8.62688 11.5ZM5.45625 9.62313C5.95649 9.62862 6.43534 9.82677 6.79319 10.1764C7.15104 10.5259 7.36032 11 7.3775 11.5C7.3775 11.5238 7.37875 11.63 7.38813 11.7931L3.70063 10.1531C3.94353 9.95283 4.22383 9.80283 4.52522 9.71184C4.82662 9.62085 5.1431 9.59069 5.45625 9.62313ZM7.65625 16.5C7.15668 15.9913 6.83825 15.3325 6.75 14.625H5.5C5.54477 15.2902 5.75254 15.9341 6.105 16.5H4.71563C4.45849 15.6889 4.30211 14.8493 4.25 14H3C3.04007 14.8467 3.17957 15.6858 3.41563 16.5H1.75C1.76938 15.3525 1.93125 12.8175 2.87688 11.1544L7.585 13.2481C7.81072 14.4228 8.29303 15.5332 8.9975 16.5H7.65625Z" fill="#E4F0F0" />
  </Svg>
);

const IconDetalheBotao = () => (
  <Svg style={{ alignSelf: 'flex-end', right: 3 }} height={11} width={10}>
    <Path d="M4.25 1.5H0.5V0.25H4.25V1.5ZM6.75 6.5H3V5.25H6.75V6.5ZM5.5 4H1.75V2.75H5.5V4Z" fill="#E4F0F0" />
  </Svg>
);

export { IconVasoura, IconDetalheBotao };
