const UPDATE = "UPDATE";

const updateHTML = html => {
  return {
    type: UPDATE,
    html: html };

};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE:
      return [...state, action.message];
    default:
      return state;}

};

const store = Redux.createStore(messageReducer);

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "" };

    this.handleChange = this.handleChange.bind(this);
    this.updateHTML = this.updateHTML.bind(this);
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      html: marked.parse(event.target.value) });

  }
  updateHTML() {
    this.props.updateHTML(this.state.html);
    this.setState({
      html: "" });

  }
  render() {
    return /*#__PURE__*/(
      React.createElement("h1", {id: "title"}, "HTML Markdown"),
      React.createElement("div", { id: "flex" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("textarea", { onChange: this.handleChange, name: "box", id: "editor" })), /*#__PURE__*/
      React.createElement("div", { name: "preview", id: "preview", dangerouslySetInnerHTML: { __html: this.state.html } })));




  }}


// React-Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = state => {
  return { html: state };
};
const mapDispatchToProps = dispatch => {
  return {
    updateHTML: html => {
      dispatch(updateHTML(html));
    } };

};

const Container = connect(mapDispatchToProps, mapStateToProps)(Presentational);
class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById('root'));
