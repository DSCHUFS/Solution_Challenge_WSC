function getChartArguments() {
    return [
        {
            chartConfig: {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [88.1, 11.9],
                        backgroundColor: [
                            "#FECE3E", "#8E8E8E"
                        ],
                        borderColor: "#FFFFFF00"
                    }],
                    labels: [
                        '후천적 장애', '선천적 장애'
                    ]
                },
                options: {
                    animation: {
                        duration: 1500
                    },
                    legend: {
                        position: 'left',
                        onHover: () => { document.getElementById("chart1").style.cursor = 'pointer' },
                        onLeave: () => { document.getElementById("chart1").style.cursor = 'default' }
                    },
                    aspectRatio: 2.5
                }
            }
        },

        {
            chartConfig: {
                type: 'bar',
                data: {
                    datasets: [{
                        data: [13.9, 25.3, 60.7],
                        backgroundColor: [
                            "#C1C1C1", "#C1C1C1", "#3BAAD8"
                        ],
                        label: "장애인차별금지법에 대한 인지여부(전체)"
                    }],
                    labels: [
                        '알고 있다', '들어본 적 있으나 내용에 대해서는 모른다', '모른다'
                    ]
                },
                options: {
                    animation: {
                        duration: 2000
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }]
                    },
                    aspectRatio: 1.5,
                    legend: {
                        onHover: () => { document.getElementById("chart2").style.cursor = 'pointer' },
                        onLeave: () => { document.getElementById("chart2").style.cursor = 'default' }
                    }
                }
            }
        },

        {
            chartConfig: {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [
                            48.9, 11.1, 10.2, 10.9, 7.6, 11.3
                        ],
                        backgroundColor: [
                            "#E07707", "#C1C1C1", "#C1C1C1", "#C1C1C1"
                        ]
                    }],
                    labels: [
                        '지체장애', '뇌병변장애', '시각장애', '청각장애',
                        '지적장애', '그 외[언어, 자폐성, 정신, 신장, 심장, 호흡기, 간, 안면, 장루 요루, 뇌전증(간질)]'
                    ]
                },
                options: {
                    circumference: Math.PI,
                    rotation: -Math.PI,
                    title: {
                        display: true,
                        text: "재가 장애인의 구성비(전체)"
                    },
                    gridLines: {
                        display: true,
                        drawTicks: false
                    },
                    animation: {
                        duration: 2000
                    },
                    ticks: {
                        display: false
                    },
                    aspectRatio: 2,
                    legend: {
                        position: 'top',
                        onHover: () => { document.getElementById("chart3").style.cursor = 'pointer' },
                        onLeave: () => { document.getElementById("chart3").style.cursor = 'default' }
                    }
                }
            }
        },


        {
            chartConfig: {
                type: 'bar',
                data: {
                    datasets: [{
                        data: [
                            1.2, 0.08
                        ],
                        backgroundColor: [
                            "#1B2B44", "#C1C1C1"
                        ],
                        label: '장애 유무에 따른 범죄율'
                    }],
                    labels: [
                        '비장애인 범죄율', '정신장애인 범죄율'
                    ]
                },
                options: {
                    gridLines: {
                        display: true,
                        drawTicks: false
                    },
                    animation: {
                        duration: 2000
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: false
                            }
                        }]
                    },
                    aspectRatio: 2,
                    legend: {
                        position: 'top',
                        onHover: () => { document.getElementById("chart4").style.cursor = 'pointer' },
                        onLeave: () => { document.getElementById("chart4").style.cursor = 'default' }
                    }
                }
            }
        }
    ]
}
let chartArguments = getChartArguments();