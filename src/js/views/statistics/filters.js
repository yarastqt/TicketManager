import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { DateUtil } from 'utils';
import { Input, Button, Select, FormActions } from 'components/ui';
import { setFilter, removeFilter, removeAllFilters } from 'actions/filters';

class StatisticsFilters extends Component {
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
                </form>
            </div>
        );
    }
}

StatisticsFilters = reduxForm({
    form: 'statistics/filters'
})(StatisticsFilters);

function mapStateToprops(state) {
    // const endDate = DateUtil.fromTS().getDate();
    // const startDate = 


    return {
        initialValues: {

        }
    };
}

export default connect(
    (state) => ({

    }),
    { setFilter, removeFilter, removeAllFilters }
)(StatisticsFilters);