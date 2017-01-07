import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { getFilters } from 'selectors/filters';
import { DateUtil } from 'utils';
import { Input, Button, Select, FormActions } from 'components/ui';
import { setFilter, removeFilter, removeAllFilters } from 'actions/filters';

const SOURCE = 'statistics';

class StatisticsFilters extends Component {
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
                    <Field name="period" label="Период"
                        component={ Select } options={ this.props.filtersList.period }
                        xOnChange={ this.setFilter } clearable
                    />
                    <Field name="source" label="Источник"
                        component={ Select } options={ this.props.filtersList.sources }
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

StatisticsFilters = reduxForm({
    form: 'statisticsFiltersForm',
    enableReinitialize: true
})(StatisticsFilters);

export default connect(
    (state) => ({
        initialValues: state.filters[SOURCE].list,
        disabledReset: Object.keys(state.filters[SOURCE].list).length ? false : true,
        filtersList: getFilters(state)
    }),
    { setFilter, removeFilter, removeAllFilters }
)(StatisticsFilters);