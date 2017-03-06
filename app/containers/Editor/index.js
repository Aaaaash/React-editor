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
    articleInfo: {
      title: '',
      tags: '',
      content: "> 译者序：本文是 React 核心开发者、有 React API 终结者之称的 Sebastian Markbåge 撰写，阐述了他设计 React 的初衷。阅读此文，你能站在更高的高度思考 React 的过去、现在和未来。原文地址：https://github.com/reactjs/react-basic\n\n我写此文是想正式地阐述我心中 React 的[心智模型](http://baike.baidu.com/view/2333986.htm)。目的是解释为什么我们会这样设计 React，同时你也可以根据这些论点反推出 React。\n\n不可否认，此文中的部分论据或前提尚存争议，而且部分示例的设计可能存在 bug 或疏忽。这只是正式确定它的最初阶段。如果你有更好的完善它的想法可以随时提交 pull request。本文不会介绍框架细节中的奇技淫巧，相信这样能提纲挈领，让你看清 React 由简单到复杂的设计过程。\nReact.js 的真实实现中充满了具体问题的解决方案，渐进式的解法，算法优化，历史遗留代码，debug 工具以及其他一些可以让它真的具有高可用性的内容。这些代码可能并不稳定，因为未来浏览器的变化和功能权重的变化随时面临改变。所以具体的代码很难彻底解释清楚。\n\n我偏向于选择一种我能完全 hold 住的简洁的心智模型来作介绍。\n\n## 变换（Transformation）\n\n设计 React 的核心前提是认为 UI 只是把数据通过映射关系变换成另一种形式的数据。同样的输入必会有同样的输出。这恰好就是纯函数。\n\n```js\nfunction NameBox(name) {\n  return { fontWeight: 'bold', labelContent: name };\n}\n```\n\n```\n'Sebastian Markbåge' ->\n{ fontWeight: 'bold', labelContent: 'Sebastian Markbåge' };\n```\n\n## 抽象（Abstraction）\n\n你不可能仅用一个函数就能实现复杂的 UI。重要的是，你需要把 UI 抽象成多个隐藏内部细节，又可复用的函数。通过在一个函数中调用另一个函数来实现复杂的 UI，这就是抽象。\n\n```js\nfunction FancyUserBox(user) {\n  return {\n    borderStyle: '1px solid blue',\n    childContent: [\n      'Name: ',\n      NameBox(user.firstName + ' ' + user.lastName)\n    ]\n  };\n}\n```\n\n```\n{ firstName: 'Sebastian', lastName: 'Markbåge' } ->\n{\n  borderStyle: '1px solid blue',\n  childContent: [\n    'Name: ',\n    { fontWeight: 'bold', labelContent: 'Sebastian Markbåge' }\n  ]\n};\n```\n\n## 组合（Composition）\n\n为了真正达到重用的特性，只重用叶子然后每次都为他们创建一个新的容器是不够的。你还需要可以包含其他抽象的容器再次进行组合。我理解的“组合”就是将两个或者多个不同的抽象合并为一个。\n\n```js\nfunction FancyBox(children) {\n  return {\n    borderStyle: '1px solid blue',\n    children: children\n  };\n}\n\nfunction UserBox(user) {\n  return FancyBox([\n    'Name: ',\n    NameBox(user.firstName + ' ' + user.lastName)\n  ]);\n}\n```\n\n## 状态（State）\n\nUI 不单单是对服务器端或业务逻辑状态的复制。实际上还有很多状态是针对具体的渲染目标。举个例子，举个例子，在一个 text field 中打字。它不一定要复制到其他页面或者你的手机设备。滚动位置这个状态是一个典型的你几乎不会复制到多个渲染目标的。\n\n我们倾向于使用不可变的数据模型。我们把可以改变 state 的函数串联起来作为原点放置在顶层。\n\n```js\nfunction FancyNameBox(user, likes, onClick) {\n  return FancyBox([\n    'Name: ', NameBox(user.firstName + ' ' + user.lastName),\n    'Likes: ', LikeBox(likes),\n    LikeButton(onClick)\n  ]);\n}\n\n// 实现细节\n\nvar likes = 0;\nfunction addOneMoreLike() {\n  likes++;\n  rerender();\n}\n\n// 初始化\n\nFancyNameBox(\n  { firstName: 'Sebastian', lastName: 'Markbåge' },\n  likes,\n  addOneMoreLike\n);\n```\n\n*注意：本例更新状态时会带来副作用（addOneMoreLike 函数中）。我实际的想法是当一个“update”传入时我们返回下一个版本的状态，但那样会比较复杂。此示例待更新*\n\n## Memoization\n\n对于纯函数，使用相同的参数一次次调用未免太浪费资源。我们可以创建一个函数的 memorized 版本，用来追踪最后一个参数和结果。这样如果我们继续使用同样的值，就不需要反复执行它了。\n\n```js\nfunction memoize(fn) {\n  var cachedArg;\n  var cachedResult;\n  return function(arg) {\n    if (cachedArg === arg) {\n      return cachedResult;\n    }\n    cachedArg = arg;\n    cachedResult = fn(arg);\n    return cachedResult;\n  };\n}\n\nvar MemoizedNameBox = memoize(NameBox);\n\nfunction NameAndAgeBox(user, currentTime) {\n  return FancyBox([\n    'Name: ',\n    MemoizedNameBox(user.firstName + ' ' + user.lastName),\n    'Age in milliseconds: ',\n    currentTime - user.dateOfBirth\n  ]);\n}\n```\n\n## 列表（Lists）\n\n大部分 UI 都是展示列表数据中不同 item 的列表结构。这是一个天然的层级。\n\n为了管理列表中的每一个 item 的 state ，我们可以创造一个 Map 容纳具体 item 的 state。\n\n```js\nfunction UserList(users, likesPerUser, updateUserLikes) {\n  return users.map(user => FancyNameBox(\n    user,\n    likesPerUser.get(user.id),\n    () => updateUserLikes(user.id, likesPerUser.get(user.id) + 1)\n  ));\n}\n\nvar likesPerUser = new Map();\nfunction updateUserLikes(id, likeCount) {\n  likesPerUser.set(id, likeCount);\n  rerender();\n}\n\nUserList(data.users, likesPerUser, updateUserLikes);\n```\n\n*注意：现在我们向 FancyNameBox 传了多个不同的参数。这打破了我们的 memoization 因为我们每次只能存储一个值。更多相关内容在下面。*\n\n## 连续性（Continuations）\n\n不幸的是，自从 UI 中有太多的列表，明确的管理就需要大量的重复性样板代码。\n\n我们可以通过推迟一些函数的执行，进而把一些模板移出业务逻辑。比如，使用“柯里化”（JavaScript 中的 [`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)）。然后我们可以从核心的函数外面传递 state，这样就没有样板代码了。\n\n下面这样并没有减少样板代码，但至少把它从关键业务逻辑中剥离。\n\n```js\nfunction FancyUserList(users) {\n  return FancyBox(\n    UserList.bind(null, users)\n  );\n}\n\nconst box = FancyUserList(data.users);\nconst resolvedChildren = box.children(likesPerUser, updateUserLikes);\nconst resolvedBox = {\n  ...box,\n  children: resolvedChildren\n};\n```\n\n## State Map\n\n之前我们知道可以使用组合避免重复执行相同的东西这样一种重复模式。我们可以把执行和传递 state 逻辑挪动到被复用很多的低层级的函数中去。\n\n```js\nfunction FancyBoxWithState(\n  children,\n  stateMap,\n  updateState\n) {\n  return FancyBox(\n    children.map(child => child.continuation(\n      stateMap.get(child.key),\n      updateState\n    ))\n  );\n}\n\nfunction UserList(users) {\n  return users.map(user => {\n    continuation: FancyNameBox.bind(null, user),\n    key: user.id\n  });\n}\n\nfunction FancyUserList(users) {\n  return FancyBoxWithState.bind(null,\n    UserList(users)\n  );\n}\n\nconst continuation = FancyUserList(data.users);\ncontinuation(likesPerUser, updateUserLikes);\n```\n\n## Memoization Map\n\n一旦我们想在一个 memoization 列表中 memoize 多个 item 就会变得很困难。因为你需要制定复杂的缓存算法来平衡调用频率和内存占有率。\n\n还好 UI 在同一个位置会相对的稳定。相同的位置一般每次都会接受相同的参数。这样以来，使用一个集合来做 memoization 是一个非常好用的策略。\n\n我们可以用对待 state 同样的方式，在组合的函数中传递一个 memoization 缓存。\n\n```js\nfunction memoize(fn) {\n  return function(arg, memoizationCache) {\n    if (memoizationCache.arg === arg) {\n      return memoizationCache.result;\n    }\n    const result = fn(arg);\n    memoizationCache.arg = arg;\n    memoizationCache.result = result;\n    return result;\n  };\n}\n\nfunction FancyBoxWithState(\n  children,\n  stateMap,\n  updateState,\n  memoizationCache\n) {\n  return FancyBox(\n    children.map(child => child.continuation(\n      stateMap.get(child.key),\n      updateState,\n      memoizationCache.get(child.key)\n    ))\n  );\n}\n\nconst MemoizedFancyNameBox = memoize(FancyNameBox);\n```\n\n## 代数效应（Algebraic Effects）\n\n多层抽象需要共享琐碎数据时，一层层传递数据非常麻烦。如果能有一种方式可以在多层抽象中快捷地传递数据，同时又不需要牵涉到中间层级，那该有多好。React 中我们把它叫做“context”。\n\n有时候数据依赖并不是严格按照抽象树自上而下进行。举个例子，在布局算法中，你需要在实现他们的位置之前了解子节点的大小。\n\n现在，这个例子有一点超纲。我会使用 [代数效应](http://math.andrej.com/eff/) 这个由我发起的 [ECMAScript 新特性提议](https://esdiscuss.org/topic/one-shot-delimited-continuations-with-effect-handlers)。如果你对函数式编程很熟悉，它们 在避免由 monad 强制引入的仪式一样的编码。\n\n```js\nfunction ThemeBorderColorRequest() { }\n\nfunction FancyBox(children) {\n  const color = raise new ThemeBorderColorRequest();\n  return {\n    borderWidth: '1px',\n    borderColor: color,\n    children: children\n  };\n}\n\nfunction BlueTheme(children) {\n  return try {\n    children();\n  } catch effect ThemeBorderColorRequest -> [, continuation] {\n    continuation('blue');\n  }\n}\n\nfunction App(data) {\n  return BlueTheme(\n    FancyUserList.bind(null, data.users)\n  );\n}\n```",
    },
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
    const { articleInfo } = this.state;
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
