import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

function Content({ title, children }) {
    return (
        <DocumentTitle title={ title }>
            <div className="content__in">
                { children }
            </div>
        </DocumentTitle>
    );
}

Content.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.element)
};

export default Content;