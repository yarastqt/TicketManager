import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { getFilters } from 'selectors/filters';
import { DateUtil } from 'utils';
import { Input, Button, Select, FormActions } from 'components/ui';
import { setFilter, removeFilter, removeAllFilters } from 'actions/filters';

const SOURCE = 'tickets';

class TicketsFilters extends Component {
    constructor() {
        super();
        this.setFilter = this.setFilter.bind(this);
        this.removeAllFilters = this.removeAllFilters.bind(this);
    }

    setFilter(filter) {
        if (filter.value) {
            if (['startDate', 'endDate'].indexOf(filter.name) !== -1) {
                filter.value = DateUtil.toTS(filter.value);
            }

            this.props.setFilter({
                [filter.name]: filter.value
            }, SOURCE);
        } else {
            this.props.removeFilter(filter.name, SOURCE);
        }
    }

    removeAllFilters() {
        this.props.reset();
        this.props.removeAllFilters(SOURCE);
    }

    render() {
        return (
            <div className={ this.props.visible ? 'filters filters_visible' : 'filters' }>
                <form className="form filters__form">
                    <Field name="startDate" type="date" label="Дата от"
                        component={ Input } xOnChange={ this.setFilter }
                    />
                    <Field name="endDate" type="date" label="Дата до"
                        component={ Input } xOnChange={ this.setFilter }
                    />
                    <Field name="source" label="Источник"
                        component={ Select } options={ this.props.filtersList.sources }
                        xOnChange={ this.setFilter } clearable
                    />
                    <Field name="status" label="Статус"
                        component={ Select } options={ this.props.filtersList.statuses }
                        xOnChange={ this.setFilter } clearable
                    />
                    <Field name="createdBy" label="Менеджер"
                        component={ Select } options={ this.props.filtersList.managers }
                        xOnChange={ this.setFilter } clearable
                    />
                    <Field name="serviceType" label="Вид услуги"
                        component={ Select } options={ this.props.filtersList.serviceTypes }
                        xOnChange={ this.setFilter } clearable
                    />
                    <FormActions position="left">
                        <Button type="button" view="pseudo" icon="close"
                            onClick={ this.removeAllFilters }
                            disabled={ this.props.disabledReset }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

TicketsFilters = reduxForm({
    form: 'ticketsFiltersForm',
    enableReinitialize: true
})(TicketsFilters);

function mapStateToprops(state) {
    const filters = state.filters[SOURCE].list;
    const startDate = filters.startDate && DateUtil.fromTS(filters.startDate).getDate();
    const endDate = filters.endDate && DateUtil.fromTS(filters.endDate).getDate();

    return {
        initialValues: {
            ...filters,
            startDate,
            endDate
        },
        disabledReset: Object.keys(filters).length ? false : true,
        filtersList: getFilters(state)
    };
}

export default connect(
    mapStateToprops,
    { setFilter, removeFilter, removeAllFilters }
)(TicketsFilters);