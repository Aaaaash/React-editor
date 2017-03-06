import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 14px;
  }

  body {
    font-family: 'Helvetica','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Arial,sans-serif';
  }

  body.fontLoaded {
    font-family: 'Helvetica','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Arial,sans-serif';
  }

  #app {
    min-height: 100%;
    min-width: 100%;
    background-color: #EBEFF2;
  }
  body,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  form {
    margin: 0;
  }
  ol, li, ul {
    margin: 0;
    padding: 0;
  }
  input,
  button {
    outline: none;
  }
  hr {
    display: none;
  }
  span {
    -webkit-appearance: none !important;
  }
`;
