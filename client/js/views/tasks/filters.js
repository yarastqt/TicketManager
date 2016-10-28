import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Select } from '../../components/ui';
import { TableActions } from '../../actions';

const { addFilter } = TableActions;

class TaskTableFilters extends Component {
    constructor() {
        super();
        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter(event) {
        this.props.addFilter(event.target.value, 'tasks');
    }

    render() {
        const { source, status, manager, serviceType } = this.props.filters;

        return (
            <div className="filters">
                <div className="filters__item">
                    <Select name="status" label="Источник" value="" onChange={ this.changeFilter }>
                        <option value="" disabled></option>
                        {
                            source.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                </div>
                <div className="filters__item">
                    <Select name="status" label="Статус" value="" onChange={ this.changeFilter }>
                        <option value="" disabled></option>
                        {
                            status.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                </div>
                <div className="filters__item">
                    <Select name="status" label="Менеджер" value="" onChange={ this.changeFilter }>
                        <option value="" disabled></option>
                        {
                            manager.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                </div>
                <div className="filters__item">
                    <Select name="status" label="Вид услуги" value="" onChange={ this.changeFilter }>
                        <option value="" disabled></option>
                        {
                            serviceType.map((item, key) =>
                                <option value={ item } key={ key }>{ item }</option>
                            )
                        }
                    </Select>
                </div>
                <div className="filters__item">
                    <Button icon="close" view="pseudo" />
                </div>
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
    { addFilter }
)(TaskTableFilters);