Chart.defaults.global.defaultFontColor = "#FFF";
Chart.defaults.global.defaultFontFamily = "Noto Sans KR";
Chart.defaults.global.defaultFontSize = 15;

function getChartArguments() {
    return [
        {
            canvas: document.getElementById("chart1"),
            ctx: document.getElementById("chart1").getContext('2d'),
            chartConfig: {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [88.1, 11.9],
                        backgroundColor: [
                            "#C1C1C1", "#8E8E8E"
                        ],
                        borderColor: "#FFFFFF00"
                    }],
                    labels: [
                        '후천적 원인(사고, 질환)', '선천적 원인'
                    ]
                },
                options: {
                    animation: {
                        duration: 1500
                    },
                    legend : {
                        position: 'left'
                    },
                    aspectRatio: 2.5
                }
            }
        } ,

        {
            canvas: document.getElementById("chart2"),
            ctx: document.getElementById("chart2").getContext('2d'),
            chartConfig: {
                type: 'bar',
                data: {
                    datasets: [{
                        data: [1.8, 18.3, 46.0, 33.9],
                        backgroundColor: [
                            "#C1C1C1", "#C1C1C1", "#C1C1C1", "#C1C1C1"
                        ],
                        label: "우리나라의 장애인에 대한 차별 인식(전체)"
                    }],
                    labels: [
                        '전혀 없다', '별로 없다', '약간 있다', '매우 있다'
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
                    aspectRatio: 2.5
                }
            }
        },
        
        {
            canvas: document.getElementById("chart3"),
            ctx: document.getElementById("chart3").getContext('2d'),
            chartConfig: {
                type: 'bar',
                data: {
                    datasets: [{
                        data: [2.5, 33.3, 54.3, 9.9],
                        backgroundColor: [
                            "#C1C1C1", "#C1C1C1", "#C1C1C1", "#C1C1C1"
                        ],
                        label: "장애등록 후 국가나 사회로부터의 지원에 대한 인식(전체)"
                    }],
                    labels: [
                        '매우 많음.', '약간 받고 있음.', '별로 받지 못하고 있음', '전혀 받지 못하고 있음.'
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
                    aspectRatio: 2.5
                }
            }
        } 
    ]
}

function makeChart(ctx, config) {
    let chart = new Chart(ctx, config);
    return chart;
}

function getCharts() {
    let chartArgs = getChartArguments();
    let chart1 = makeChart(chartArgs[0].ctx, chartArgs[0].chartConfig);
    let chart2 = makeChart(chartArgs[1].ctx, chartArgs[1].chartConfig);
    let chart3 = makeChart(chartArgs[2].ctx, chartArgs[2].chartConfig);

    return [chart1, chart2, chart3];
}

const people = [...(document.getElementsByClassName("img_person"))];

const control = Array.from(document.getElementsByClassName("control"));
let isClick = [false, false];
let className = [".img_person1", ".img_person2"]
function click() {
    control.forEach((c, i) => {
        c.addEventListener("click", e => {
            if(!isClick[i]) {
                c.lastElementChild.style.textDecoration = 'line-through';
                hide(className[i]);
            } else {
                c.lastElementChild.style.textDecoration = 'none';
                visible(className[i]);
            }
            isClick[i] = !isClick[i];
        })
    })
}

click();

function hide(className) {
    gsap.timeline()
        .to(className, {opacity:0 , stagger: 0.01, duration: 0.5});
}

function visible(className) {
    gsap.timeline()
        .to(className, {opacity:1, stagger: 0.01, duration: 0.5});
}

function hover() {
    people.forEach((person, i) => {
        if(i == 0) {
            addHoverEvent(person, '#hover_icon1');
            addLeaveEvent(person, '#hover_icon1');
        } else {
            addHoverEvent(person, '#hover_icon2');
            addLeaveEvent(person, '#hover_icon2');
        }
    })
}

function addHoverEvent(elem, anime) {
    elem.addEventListener("mouseover", e => {
        gsap.to(anime, {opacity: 1,  duration: 0.5});
    })
}

function addLeaveEvent(elem, anime) {
    elem.addEventListener("mouseleave", e => {
        gsap.to(anime, {opacity: 0,  duration: 0.5});
    })
}

hover();