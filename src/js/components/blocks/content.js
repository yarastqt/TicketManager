import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

const Content = ({ title, children }) => (
    <DocumentTitle title={ title }>
        <div className="content__in">
            { children }
        </div>
    </DocumentTitle>
);

Content.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
};

export default Content;
