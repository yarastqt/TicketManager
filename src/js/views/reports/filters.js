import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { getFilters } from 'selectors/filters';
import { DateUtil } from 'utils';
import { Input, Button, Select, FormActions } from 'components/ui';
import { setFilter, removeFilter, removeAllFilters } from 'actions/filters';

class ReportsFilters extends Component {
    constructor() {
        super();
        this.target = 'statistics';
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
            }, this.target);
        } else {
            this.props.removeFilter(filter.name, this.target);
        }
    }

    removeAllFilters() {
        this.props.reset();
        this.props.removeAllFilters(this.target);
    }

    render() {
        return (
            <div className="filters filters_visible">
                <form className="form filters__form">
                    <Field name="startDate" type="date" label="Начальная дата"
                        component={ Input } onChange={ this.setFilter }
                    />
                    <Field name="endDate" type="date" label="Конечная дата"
                        component={ Input } onChange={ this.setFilter }
                    />
                    <Field name="source" label="Источник"
                        component={ Select } options={ this.props.filtersList.sources }
                        onChange={ this.setFilter } clearable
                    />
                    <Field name="createdBy" label="Менеджер"
                        component={ Select } options={ this.props.filtersList.managers }
                        onChange={ this.setFilter } clearable
                    />
                    <Field name="serviceType" label="Вид услуги"
                        component={ Select } options={ this.props.filtersList.serviceTypes }
                        onChange={ this.setFilter } clearable
                    />
                    <FormActions position="left">
                        <Button type="button" view="pseudo" icon="close"
                            // onClick={ this.removeAllFilters }
                            // disabled={ this.props.resetSubmitting }
                        />
                    </FormActions>
                </form>
            </div>
        );
    }
}

ReportsFilters = reduxForm({
    form: 'statistics/filters'
})(ReportsFilters);


export default connect(
    (state) => ({
        filtersList: getFilters(state)
    }),
    { setFilter, removeFilter, removeAllFilters }
)(ReportsFilters);