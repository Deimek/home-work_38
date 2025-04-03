
import React from "react";

class ErrorBoundery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOk: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ isOk: false });
    }

    render() {
        if (!this.state.isOk) {
            return <div>{this.props.errorText}</div>
        }
        return this.props.children
    }
}
export default ErrorBoundery;