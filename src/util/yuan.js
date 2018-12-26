import React from 'react';
import numeral from 'numeral';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class Yuan extends React.PureComponent {
    componentDidMount() {
        this.renderToHtml()
    }

    componentDidUpdate() {
        this.renderToHtml()
    }

    renderToHtml = () => {
        const {children} = this.props;
        if (this.main) {
            this.main.innerHTML = yuan(children)
        }
    }

    render() {
        return (
            <span
                ref={ref => {
                    this.main = ref;
                }}
            />
        )
    }
}