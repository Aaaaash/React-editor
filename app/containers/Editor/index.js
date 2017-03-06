import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import classNames from 'classnames';
import hljs from 'highlight.js';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: (code) => hljs.highlightAuto(code).value,
});

import styles from './styles.css';

class Editor extends Component {
  state = {
    HTML: '',
    editMode: 0,
    fullScreen: false,
  }

  componentWillReceiveProps(nextProps) {
    hljs.initHighlightingOnLoad();
    if (nextProps.articleInfo.content !== this.props.articleInfo.content) {
      this.setState({
        HTML: marked(nextProps.articleInfo.content),
      });
    }
  }
  insertFlg = (str, flg, sn) => {
    let newstr = '';
    for (let i = 0; i < str.length; i += sn) {
      const tmp = str.substring(i, i + sn);
      newstr += tmp + flg;
    }
    return newstr;
  }
  insertFixedFormat = (start, template) => {
    const source = this.markInput.value;
    if (this.markInput.selectionStart !== this.markInput.selectionEnd) {
      const sta = this.markInput.selectionStart;
      const end = this.markInput.selectionEnd;
      const text = source.substring(sta, end);
      const prevTem = template.substr(0, start);
      const nextTem = template.slice(start);
      const newStr = prevTem + text + nextTem;
      const insertContent = source.replace(text, newStr);
      this.setState({ HTML: marked(insertContent) });
      this.props.onArticleInfoChange({ content: insertContent });
    }
  }

  handleChangeEditMode = (mode) => this.setState({ editMode: mode });

  handleChangeFullScreen = () => this.setState({ fullScreen: !this.state.fullScreen });

  handleTabsKeyDown = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
    }
  }

  insertTabs = (str, flg, sn) => {
    let newstr = '';
    for (let i = 0, v = str.length; i < v; i += sn) {
      const tmp = str.substring(i, i + sn);
      newstr += tmp + flg;
    }
    return newstr;
  }

  handlePushArticle = () => {
    this.props.onArticleInfoChange({ loading: true, published: true });
    this.props.onArticlePush();
  }

  handleSaveArticle = () => {
    this.props.onArticleInfoChange({ loading: true, published: false });
    this.props.onArticlePush();
  }

  render() {
    const { articleInfo } = this.props;
    return (
      <div className={styles.editor}>
        <div className={styles.editor_title}>
          <input
            type="text"
            className={styles.editor_input}
            placeholder="Title"
            value={articleInfo.title}
            onChange={(e) => this.props.onArticleInfoChange({ title: e.target.value })}
          />
        </div>
        <div className={styles.article_tag}>
          <input
            type="text"
            className={styles.editor_input}
            placeholder="Tags"
            value={articleInfo.tags}
            onChange={(e) => this.props.onArticleInfoChange({ tags: e.target.value })}
          />
        </div>
        <div
          className={
            classNames(
              styles.editor_area,
              this.state.fullScreen ? styles.editor_full : ''
            )
          }
        >
          <div className={styles.edirot_tool_bar}>
            <ul className={styles.input_btn}>
              <li title="加粗">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(2, '****')}>
                  <i className="fa fa-bold"></i>
                </button>
              </li>
              <li title="斜体">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(2, ' __ ')}>
                  <i className="fa fa-italic"></i>
                </button>
              </li>
              <li title="插入链接">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(1, '[](www.link.com)')}>
                  <i className="fa fa-link"></i>
                </button>
              </li>
              <li title="引用">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(2, '> ')}>
                  <i className="fa fa-indent"></i>
                </button>
              </li>
              <li title="插入代码">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(4, '```\n \n```')}>
                  <i className="fa fa-code"></i>
                </button>
              </li>
              <li title="插入图片">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(4, '![alt](www.imagelink.com)')}>
                  <i className="fa fa-image"></i>
                </button>
              </li>
              <li title="无序列表">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(2, '- \n- ')}>
                  <i className="fa fa-list-ul"></i>
                </button>
              </li>
              <li title="有序列表">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(3, '1. \n2. \n3. ')}>
                  <i className="fa fa-list-ol"></i>
                </button>
              </li>
              <li title="插入标题">
                <button className={styles.edit_btn} onTouchTap={() => this.insertFixedFormat(3, '## ')}>
                  <i className="fa fa-header"></i>
                </button>
              </li>
            </ul>
            <ul className={styles.editor_btn}>
              <li title="切换全屏">
                <button
                  className={styles.edit_btn}
                  onTouchTap={this.handleChangeFullScreen}
                >
                  <i
                    className={this.state.fullScreen ?
                      'fa fa-compress' :
                      'fa fa-arrows-alt'}
                  >
                  </i>
                </button>
              </li>
              <li title="源模式">
                <button
                  className={classNames(styles.edit_btn, this.state.editMode === 1 ? styles.active_btn : '')}
                  onTouchTap={() => this.handleChangeEditMode(1)}
                >
                  <i className="fa fa-pencil"></i>
                </button>
              </li>
              <li title="写作模式">
                <button
                  className={classNames(styles.edit_btn, this.state.editMode === 0 ? styles.active_btn : '')}
                  onTouchTap={() => this.handleChangeEditMode(0)}
                >
                  <i className="fa fa-columns"></i>
                </button>
              </li>
              <li title="预览模式">
                <button
                  className={classNames(styles.edit_btn, this.state.editMode === 2 ? styles.active_btn : '')}
                  onTouchTap={() => this.handleChangeEditMode(2)}
                >
                  <i className="fa fa-eye"></i>
                </button>
              </li>
              <li title="保存">
                <button
                  className={styles.edit_btn}
                  onTouchTap={this.handleSaveArticle}
                >
                  <i className="fa fa-save"></i>
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.text_output}>
            <div
              className={classNames(
                styles.text_input,
                this.state.editMode === 1 ? styles.text_mode : '',
                this.state.editMode === 2 ? styles.noShow : ''
              )}
            >
              <textarea
                className={styles.text}
                onChange={(e) => this.props.onArticleInfoChange({ content: e.target.value })}
                onKeyDown={this.handleTabsKeyDown}
                value={articleInfo.content}
                ref={(ref) => this.markInput = ref}         // eslint-disable-line  no-return-assign
              >
              </textarea>
            </div>
            <div
              className={classNames(
                styles.output,
                this.state.editMode === 1 ? styles.noShowOutPut : '',
                this.state.editMode === 2 ? styles.out_mode : ''
              )}
              dangerouslySetInnerHTML={{ __html: this.state.HTML }}
            >
            </div>
          </div>
        </div>
        <div className={styles.editor_footer}>
          <button
            className={styles.release}
            onTouchTap={this.handlePushArticle}
          >
            发布
          </button>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  onArticleInfoChange: PropTypes.func,
  articleInfo: PropTypes.object,
  onArticlePush: PropTypes.func,
};

export default Editor;
