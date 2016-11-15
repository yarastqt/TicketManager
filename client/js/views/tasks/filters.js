import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getFilters } from 'selectors/filters';
import { getFormData, YDate, debounce, compareObject } from 'utils';
import { Input, Button, Select } from 'components/ui';
import { TableActions } from 'actions';

const TABLE_NAME = 'tasks';
const { addFilter, removeFilter, removeAllFilters } = TableActions;

class TaskTableFilters extends Component {
    constructor() {
        super();
        this.addFilter = debounce(this.addFilter.bind(this), 500);
        this.removeFilter = this.removeFilter.bind(this);
        this.removeAllFilters = this.removeAllFilters.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return compareObject(this.props.activeFilters, nextProps.activeFilters)
            || compareObject(this.props.filtersList, nextProps.filtersList)
            || this.props.visible !== nextProps.visible;
    }

    addFilter(event) {
        const data = getFormData(this.refs.form, true);

        if (data.startDate) {
            data.startDate = YDate.toTS(data.startDate);
        }

        if (data.endDate) {
            data.endDate = YDate.toTS(data.endDate);
        }

        this.props.addFilter(data, TABLE_NAME);
    }

    removeFilter(filterName) {
        this.props.removeFilter(filterName, TABLE_NAME);
    }

    removeAllFilters(event) {
        event.preventDefault();
        this.refs.form.reset();
        this.props.removeAllFilters(TABLE_NAME);
    }

    render() {
        const { visible, filtersList, activeFilters } = this.props;

        return (
            <div className={ visible ? 'filters filters_visible' : 'filters' }>
                <form className="form filters__form" ref="form" onChange={ this.addFilter }>
                    <Input
                        type="date"
                        name="startDate"
                        label="Начальная дата"
                        value={ activeFilters.startDate ? YDate.fromTS(activeFilters.startDate).date() : '' }
                    />
                    <Input
                        type="date"
                        name="endDate"
                        label="Конечная дата"
                        value={ activeFilters.endDate ? YDate.fromTS(activeFilters.endDate).date() : '' }
                    />
                    <Select
                        name="source"
                        label="Источник"
                        onClear={ this.removeFilter }
                        value={ activeFilters.source }
                        options={ filtersList.sources }
                        clearable
                    />
                    <Select
                        name="status"
                        label="Статус"
                        onClear={ this.removeFilter }
                        value={ activeFilters.status }
                        options={ filtersList.statuses }
                        clearable
                    />
                    <Select
                        name="createdBy"
                        label="Менеджер"
                        onClear={ this.removeFilter }
                        value={ activeFilters.createdBy }
                        options={ filtersList.managers }
                        clearable
                    />
                    <Select
                        name="serviceType"
                        label="Вид услуги"
                        onClear={ this.removeFilter }
                        value={ activeFilters.serviceType }
                        options={ filtersList.serviceTypes }
                        clearable
                    />
                    <div className="form__actions">
                        <Button
                            icon="close"
                            view="pseudo"
                            onClick={ this.removeAllFilters }
                            disabled={ Object.keys(activeFilters).length > 0 ? false : true }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        activeFilters: state.table[TABLE_NAME].filters,
        filtersList: getFilters(state.tasks.list)
    }),
    { addFilter, removeFilter, removeAllFilters }
)(TaskTableFilters);