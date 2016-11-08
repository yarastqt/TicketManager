import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getFormData, datez } from '../../utils';
import { Input, Button, Select } from '../../components/ui';
import { TableActions } from '../../actions';

const { addFilter, resetFilters } = TableActions;

class TaskTableFilters extends Component {
    constructor() {
        super();
        this.changeFilter = this.changeFilter.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    changeFilter(event) {
        const data = getFormData(this.refs.form, true);

        if (data.startDate) {
            data.startDate = datez.toTS(data.startDate);
        }

        if (data.endDate) {
            data.endDate = datez.toTS(data.endDate);
        }

        this.props.addFilter(data, 'tasks');
    }

    resetFilters(event) {
        event.preventDefault();
        this.refs.form.reset();
    }

    render() {
        const { source, status, manager, serviceType } = this.props.filters;
        const filtersClasses = classnames('filters', {
            'filters_visible': this.props.visible
        });

        return (
            <div className={ filtersClasses }>
                <form className="form filters__form" ref="form" onChange={ this.changeFilter }>
                    <Input type="date" name="startDate" label="Начальная дата" />
                    <Input type="date" name="endDate" label="Конечная дата" />
                    <Select name="source" label="Источник" value="">
                        <option value=""></option>
                        {
                            source.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                    <Select name="status" label="Статус" value="">
                        <option value=""></option>
                        {
                            status.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                    <Select name="createdBy" label="Менеджер" value="">
                        <option value=""></option>
                        {
                            manager.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                    <Select name="serviceType" label="Вид услуги" value="">
                        <option value=""></option>
                        {
                            serviceType.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                    <div className="form__actions">
                        <Button icon="close" view="pseudo" onClick={ this.resetFilters } />
                    </div>
                </form>
            </div>
        );
    }
}

function getFilters(list) {
    const filters = {
        source: [], status: [], manager: [], serviceType: []
    };

    list.map(({ source, status, createdBy, serviceType }) => {
        if (filters.source.indexOf(source) === -1) {
            filters.source.push(source);
        }

        if (filters.status.indexOf(status) === -1) {
            filters.status.push(status);
        }

        if (filters.manager.indexOf(createdBy.username) === -1) {
            filters.manager.push(createdBy.username);
        }

        if (filters.serviceType.indexOf(serviceType) === -1) {
            filters.serviceType.push(serviceType);
        }
    });

    return filters;
}

export default connect(
    (state) => ({
        filters: getFilters(state.tasks.list)
    }),
    { addFilter, resetFilters }
)(TaskTableFilters);