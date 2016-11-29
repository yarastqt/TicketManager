import React from 'react';
import { Link } from 'react-router';
import DocumentTitle from 'react-document-title';

function NotFound() {
    return (
        <DocumentTitle title="404 Ошибка">
            <div className="error-container">
                <div className="error-container__code">404</div>
                <div className="error-container__text">О нет! Страница которую вы искали не существует</div>
                <div className="error-container__button">
                    <Link to="/" className="button button_type_link button_view_action">
                        <span className="button__in">
                            <span className="button__text">Вернуться на главную</span>
                        </span>
                    </Link>
                </div>
            </div>
        </DocumentTitle>
    );
}

export default NotFound;