import React, { PureComponent } from 'react';

class SnowFlakes extends PureComponent {
    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    createFlakes() {
        return [...Array(60).keys()].map((value) => {
            const cx = this.getRandom(1, 100);
            const cy = this.getRandom(1, 100);
            const r = this.getRandom(1, 3);

            return (
                <circle className="snow-flakes__flake" cx={ `${cx}%` } cy={ `-${cy}` } r={ r } key={ value }></circle>
            );
        });
    }

    render() {
        return (
            <svg className="snow-flakes" xmlns="http://www.w3.org/2000/svg">
                { this.createFlakes() }
            </svg>
        );
    }
}

export default SnowFlakes;