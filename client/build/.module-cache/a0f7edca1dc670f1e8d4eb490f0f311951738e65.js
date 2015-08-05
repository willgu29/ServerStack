var Example = React.createClass({displayName: "Example",

  render: function() {

    return(
      React.createElement("div", null, 
        "Hello!"
      )
    );
  }
});

React.render(React.createElement(Example, null), documentGetElementById("example"));
