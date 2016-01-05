var React = require('react');

var Test = React.createClass({
    render: function(){
        return (
            <h1>Hello, my front-end god!!</h1>
        );
    }
});

React.render(
    <Test />,
    document.body
);