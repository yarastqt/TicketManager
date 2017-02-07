import React, { Component } from 'react';
import CN from 'classnames';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            suggests: [],
            suggestsVisible: false,
            hoveredSuggests: false,
            focusedSuggest: -1,
            value: null,
            type: null
        };
        this.changeInputType = this.changeInputType.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.selectSuggest = this.selectSuggest.bind(this);
        this.setVisibleSuggest = this.setVisibleSuggest.bind(this);
        this.setInsivibleSuggest = this.setInsivibleSuggest.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.lockVisibleList = this.lockVisibleList.bind(this);
        this.unlockVisibleList = this.unlockVisibleList.bind(this);
    }

    componentDidMount() {
        if (this.props.suggests) {
            this.setState({ suggests: this.props.suggests, value: this.props.input.value, type: this.props.type });
        } else {
            this.setState({ value: this.props.input.value, type: this.props.type });
        }

        if (this.props.autofocus) {
            this.refs.input.focus();
        }

        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    setFocus() {
        setTimeout(() => this.refs.input.focus(), 0);
    }

    handleClickOutside(event) {
        if (!this.refs.input.contains(event.target)) {
            this.setInsivibleSuggest();
        }
    }

    lockVisibleList() {
        this.setState({ hoveredSuggests: true });
    }

    unlockVisibleList() {
        this.setState({ hoveredSuggests: false });
    }

    getFilteredSuggests(value) {
        if (this.props.suggests) {
            const filterValue = value.toLowerCase();
            return this.props.suggests.filter((suggest) => {
                return suggest.toLowerCase().includes(filterValue);
            });
        }

        return [];
    }

    selectSuggest(suggest) {
        return () => {
            this.setState({ suggestsVisible: false, focusedSuggest: -1, value: suggest });
            this.props.input.onChange(suggest);
        };
    }

    setVisibleSuggest() {
        const suggests = this.getFilteredSuggests(this.state.value);

        if (!suggests.length || suggests.length === 1 && suggests[0] === this.state.value) {
            this.setState({ suggests: [], suggestsVisible: false });
        } else {
            this.setState({ suggests, suggestsVisible: true });
        }

        this.props.input.onFocus();
    }

    setInsivibleSuggest(event) {
        if (!this.state.hoveredSuggests) {
            this.scrollList('top');
            this.setState({ suggestsVisible: false, focusedSuggest: -1 });
        }

        if (event) {
            this.props.input.onBlur();
        }
    }

    scrollList(direction) {
        const suggestHeight = 30;
        const offset = this.state.focusedSuggest * suggestHeight;
        const scrollTop = this.refs.wrapper && offset - this.refs.wrapper.scrollTop;

        switch (direction) {
            case 'up':
                if (scrollTop < 0 || offset === scrollTop) {
                    this.refs.wrapper.scrollTop = offset - suggestHeight;
                } else if (scrollTop === suggestHeight / 2) {
                    this.refs.wrapper.scrollTop -= suggestHeight / 2;
                } else if (scrollTop === 0) {
                    this.refs.wrapper.scrollTop -= suggestHeight;
                }
                break;

            case 'down':
                if (offset < this.refs.wrapper.scrollTop || scrollTop > suggestHeight * 4) {
                    if (this.state.focusedSuggest === -1) {
                        this.refs.wrapper.scrollTop = 0;
                    } else {
                        this.refs.wrapper.scrollTop = offset + suggestHeight;
                    }
                } else if ((this.state.focusedSuggest === 3 && scrollTop > suggestHeight * 2) || scrollTop === suggestHeight * 3) {
                    this.refs.wrapper.scrollTop += suggestHeight / 2;
                } else if (scrollTop > suggestHeight * 3) {
                    this.refs.wrapper.scrollTop += suggestHeight;
                }
                break;

            case 'top':
                if (this.refs.wrapper) {
                    this.refs.wrapper.scrollTop = 0;
                }
                break;
        }
    }

    handleKeyDown(event) {
        const prevState = { suggestsVisible: false, focusedSuggest: -1 };

        switch (event.keyCode) {
            case 9: // tab
            case 27: // escp
                this.scrollList('top');
                this.setState(prevState);
                break;

            case 38: // up
                event.preventDefault();
                if (this.state.focusedSuggest > 0) {
                    this.scrollList('up');
                    this.setState({ focusedSuggest: this.state.focusedSuggest - 1 });
                }
                break;

            case 40: // down
                event.preventDefault();
                if (!this.state.suggestsVisible) {
                    this.setVisibleSuggest();
                } else if (this.state.focusedSuggest < this.state.suggests.length - 1) {
                    this.scrollList('down');
                    this.setState({ focusedSuggest: this.state.focusedSuggest + 1 });
                }
                break;

            case 13: // enter
                if (this.state.focusedSuggest > -1) {
                    event.preventDefault();
                    const focusedSuggest = this.state.suggests[this.state.focusedSuggest];

                    this.setState({ ...prevState, value: focusedSuggest });
                    this.props.input.onChange(focusedSuggest);
                } else {
                    this.setState(prevState);
                }
                break;
        }
    }

    changeValue(event) {
        const suggests = this.getFilteredSuggests(event.target.value);
        const prevState = { focusedSuggest: -1, value: event.target.value };

        if (!suggests.length) {
            this.setState({ suggests: [], suggestsVisible: false, ...prevState });
        } else {
            this.setState({ suggests, suggestsVisible: true, ...prevState });
        }

        if (this.props._onChange) {
            this.props._onChange({ name: event.target.name, value: event.target.value });
        }

        this.scrollList('top');
        this.props.input.onChange(event.target.value);
    }

    changeInputType() {
        this.setState({ type: this.state.type === 'password' ? 'text' : 'password' });
        this.setFocus();
    }

    renderSecurityControl() {
        const iconClasses = CN({
            'icon': true,
            'icon_eye-close': this.state.type === 'password',
            'icon_eye-open': this.state.type !== 'password'
        });

        if (this.props.type === 'password') {
            return (
                <span className="input__security" onClick={ this.changeInputType }>
                    <i className={ iconClasses }></i>
                </span>
            );
        }
    }

    renderError() {
        if (this.props.meta.touched && this.props.meta.error) {
            return (
                <div className="input__error">
                    { this.props.meta.error }
                </div>
            );
        }
    }

    renderSuggestsList() {
        const list = this.state.suggests.map((suggest, key) => {
            const suggestItemClasses = CN({
                'input__suggest-item': true,
                'input__suggest-item_focused': this.state.focusedSuggest === key
            });

            return (
                <div className={ suggestItemClasses } onClick={ this.selectSuggest(suggest) } key={ key }>
                    { suggest }
                </div>
            );
        });
        const suggestClasses = CN({
            'input__suggest': true,
            'input__suggest_visible': this.state.suggestsVisible
        });

        if (list.length) {
            return (
                <div className={ suggestClasses } onMouseEnter={ this.lockVisibleList } onMouseLeave={ this.unlockVisibleList }>
                    <div className="input__suggest-in" ref="wrapper">
                        { list }
                    </div>
                </div>
            );
        }
    }

    render() {
        const { suggestsVisible, type } = this.state;
        const { input, label, placeholder, readonly, disabled, meta: { active } } = this.props;
        const inputClasses = CN({
            'input': true,
            'input_opened': suggestsVisible,
            'input_disabled': disabled
        });
        const labelClasses = CN({
            'label': true,
            'label_active': active,
            'label_disabled': disabled
        });

        return (
            <div className="form__field">
                <label htmlFor={ input.name } className={ labelClasses }>
                    { label }
                </label>
                <div className={ inputClasses }>
                    { this.renderSecurityControl() }
                    <input
                        ref="input"
                        id={ input.name }
                        type={ type }
                        placeholder={ placeholder }
                        className="input__control"
                        { ...input }
                        onChange={ this.changeValue }
                        onKeyDown={ this.handleKeyDown }
                        onFocus={ this.setVisibleSuggest }
                        onBlur={ this.setInsivibleSuggest }
                        readOnly={ readonly }
                        disabled={ disabled }
                    />
                    { this.renderError() }
                    { this.renderSuggestsList() }
                </div>
            </div>
        );
    }
}

export default Input;
