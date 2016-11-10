import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getFilters } from '../../selectors/filters';
import { getFormData, datez } from '../../utils';
import { Input, Button, Select } from '../../components/ui';
import { TableActions } from '../../actions';

const { addFilter, removeFilter } = TableActions;

class TaskTableFilters extends Component {
    constructor() {
        super();
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    addFilter(event) {
        const data = getFormData(this.refs.form, true);

        if (data.startDate) {
            data.startDate = datez.toTS(data.startDate);
        }

        if (data.endDate) {
            data.endDate = datez.toTS(data.endDate);
        }

        this.props.addFilter(data, 'tasks');
    }

    removeFilter(filterName) {
        this.props.removeFilter(filterName, 'tasks');
    }

    render() {
        const { sources, statuses, managers, serviceTypes } = this.props.filters;
        const filtersClasses = classnames('filters', {
            'filters_visible': this.props.visible
        });

        return (
            <div className={ filtersClasses }>
                <form className="form filters__form" ref="form" onChange={ this.addFilter }>
                    <Input type="date" name="startDate" label="Начальная дата" />
                    <Input type="date" name="endDate" label="Конечная дата" />
                    <Select name="source" label="Источник" onClear={ this.removeFilter } options={ sources } clearable />
                    <Select name="status" label="Статус" onClear={ this.removeFilter } options={ statuses } clearable />
                    <Select name="createdBy" label="Менеджер" onClear={ this.removeFilter } options={ managers } clearable />
                    <Select name="serviceType" label="Вид услуги" onClear={ this.removeFilter } options={ serviceTypes } clearable />
                    <div className="form__actions">
                        <Button icon="close" view="pseudo" />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        filters: getFilters(state.tasks.list)
    }),
    { addFilter, removeFilter }
)(TaskTableFilters);