function scrollArguments() {
    return {
        statContainer: document.getElementsByClassName('statContainer'),
        firstEvent: {
            criterion: 0,
            unit: window.innerHeight*(0.8-0.3)/20,
            bottom: window.innerHeight* 0.8,
            top: window.innerHeight * 0.4,
            hide: -250,
            infoEvent: function(rect) {
                if(rect.top < this.bottom  && 
                    rect.top >= this.top) {
                    this.criterion = Math.ceil((this.bottom - rect.top) / this.unit);
                    deactivateAll();
                    activatePart(this.criterion);
                } else if(rect.top >= this.bottom || rect.top < this.hide) {
                    deactivateAll();
                } else {
                    activateAll();
                }
            }
        },

        secondEvent: {
            canvas: document.getElementById("chart1"),
            ctx: document.getElementById("chart1").getContext('2d'),
            top: window.innerHeight*2/3,
            bottom: -150,
            hideTop: window.innerHeight*0.75,
            hideBottom: -300,
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
            },
            // To generate event only once
            screenIn: true,

            clearCanvas: function() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },

            infoEvent: function(rect, chart) {
                if(rect.top < this.top && rect.top >= this.bottom) {
                    if(!this.screenIn){
                        chart.update();
                        this.screenIn = true;
                    }
                } else if (rect.top > this.hideTop || rect.top < this.hideBottom) {
                    if(this.screenIn) {
                        chart.reset();
                        this.screenIn = false;
                    }
                }
            }
        } ,

        thirdEvent: {
            canvas: document.getElementById("chart2"),
            ctx: document.getElementById("chart2").getContext('2d'),
            top: window.innerHeight*2/3,
            bottom: -150,
            hideTop: window.innerHeight*0.75,
            hideBottom: -300,
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
                    aspectRatio: 2
                }
            },
            // To generate event only once
            screenIn: true,

            clearCanvas: function() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },

            infoEvent: function(rect, chart) {
                if(rect.top < this.top && rect.top >= this.bottom) {
                    if(!this.screenIn){
                        chart.update();
                        this.screenIn = true;
                    }
                } else if (rect.top > this.hideTop || rect.top < this.hideBottom) {
                    if(this.screenIn) {
                        chart.reset();
                        this.screenIn = false;
                    }
                }
            }
        },
        
        fourthEvent: {
            canvas: document.getElementById("chart3"),
            ctx: document.getElementById("chart3").getContext('2d'),
            top: window.innerHeight*2/3,
            bottom: -150,
            hideTop: window.innerHeight*0.75,
            hideBottom: -290,
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
                    aspectRatio: 2
                }
            },
            // To generate event only once
            screenIn: true,

            clearCanvas: function() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },

            infoEvent: function(rect, chart) {
                if(rect.top < this.top && rect.top >= this.bottom) {
                    if(!this.screenIn){
                        chart.update();
                        this.screenIn = true;
                    }
                } else if (rect.top > this.hideTop || rect.top < this.hideBottom) {
                    if(this.screenIn) {
                        chart.reset();
                        this.screenIn = false;
                    }
                }
            }
        } 
    }
}

const people = [...(document.getElementsByClassName("img_person"))];
people.forEach((person, i) => {
    person.dataset.index = i;
});

function activate(i) {
    people[i].classList.add("visible");
}

function activateAll() {
    people.forEach((person, i) => {
        activate(i);
    });
}

function activatePart(criterion) {
    for(let i = 0; i<criterion; i++) {
        activate(i);
    }
}

function deactivate(person) {
    person.classList.remove("visible");
}

function deactivateAll() {
    people.forEach((person) => {
        deactivate(person);
    });
}