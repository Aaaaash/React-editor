import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
  }

  html {
    font-size: 625%;
  }

  body {
    font-size: 14px;
    color: #31424E;
    background-color: #F7F8FA;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, SimSun, 宋体, Heiti, 黑体, sans-serif;
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

  a {
    text-decoration: none;
    color: #2E94B9;
  }

  a:hover {
    text-decoration: underline;
  }

  p {
    margin: 0;
    padding: 0;
    word-break: break-all;
    word-wrap: break-word;
    box-sizing: border-box;
  }

  div {
    margin: 0;
    padding: 0;
    word-break: break-all;
    word-wrap: break-word;
    box-sizing: border-box;
  }

  button {
    text-transform: none !important;
    margin: 0;
    padding: 0;
    word-break: break-all;
    word-wrap: break-word;
    box-sizing: border-box;
  }

  input {
    margin: 0;
    padding: 0;
    word-break: break-all;
    word-wrap: break-word;
    box-sizing: border-box;
    outline: none;
  }

  button {
    outline: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    html {
      font-size: 525%;
    }
  }

  .container {
    display: block;
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #EFE9E7;
  }

  ::-webkit-scrollbar-track {
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #747475;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }
`;
