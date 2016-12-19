const graphicsBaseSettings = {
    lineTension: 0.2,
    borderWidth: 1,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 2,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 2,
    pointRadius: 2,
    pointHitRadius: 4
};

export const defaultSettings = {
    defaultFontColor: '#4b606b',
    defaultFontFamily: 'Roboto, Arial, sans-serif',
    tooltips: {
        enabled: false
    }
};

export const chartOptions = {
    // animation: false,
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Заявки'
            }
        }],
        xAxes: [{
            ticks: {
                beginAtZero:true,
            },
            gridLines: {
                drawOnChartArea: false
            },
            type: 'time',
            time: {
                displayFormats: {
                    'millisecond': 'DD.MM.YY',
                    'second': 'DD.MM.YY',
                    'minute': 'DD.MM.YY',
                    'hour': 'DD.MM.YY',
                    'day': 'DD.MM.YY',
                    'week': 'DD.MM.YY',
                    'month': 'DD.MM.YY',
                    'quarter': 'DD.MM.YY',
                    'year': 'DD.MM.YY'
                },
            },
      }]
    }
};

export const graphics = {
    pending: {
        ...graphicsBaseSettings,
        label: 'Заявки в процессе',
        backgroundColor: 'rgba(0, 105, 255, 0.1)',
        borderColor: 'rgba(0, 105, 255, 1)',
        pointBorderColor: 'rgba(0, 105, 255, 1)',
        pointHoverBackgroundColor: 'rgba(0, 105, 255, 1)',
        pointHoverBorderColor: 'rgba(0, 105, 255, 1)'
    },
    failure: {
        ...graphicsBaseSettings,
        label: 'Заявки отказанные',
        backgroundColor: 'rgba(239, 71, 111, 0.1)',
        borderColor: 'rgba(239, 71, 111, 1)',
        pointBorderColor: 'rgba(239, 71, 111, 1)',
        pointHoverBackgroundColor: 'rgba(239, 71, 111, 1)',
        pointHoverBorderColor: 'rgba(239, 71, 111, 1)'
    },
    done: {
        ...graphicsBaseSettings,
        label: 'Заявки выполненные',
        backgroundColor: 'rgba(25, 196, 172, 0.1)',
        borderColor: 'rgba(25, 196, 172, 1)',
        pointBorderColor: 'rgba(25, 196, 172, 1)',
        pointHoverBackgroundColor: 'rgba(25, 196, 172, 1)',
        pointHoverBorderColor: 'rgba(25, 196, 172, 1)'
    },
    canceled: {
        ...graphicsBaseSettings,
        label: 'Заявки отмененные',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        borderColor: 'rgba(255, 193, 7, 1)',
        pointBorderColor: 'rgba(255, 193, 7, 1)',
        pointHoverBackgroundColor: 'rgba(255, 193, 7, 1)',
        pointHoverBorderColor: 'rgba(255, 193, 7, 1)'
    }
};