Chart.defaults.global.defaultFontColor = "rgba(0, 0, 0, 0.7)";
Chart.defaults.global.defaultFontFamily = "Noto Sans KR";
Chart.defaults.global.defaultFontSize = 13;

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
        .to(className, {opacity:0 , stagger: 0.01, duration: 1});
}

function visible(className) {
    gsap.timeline()
        .to(className, {opacity:1, stagger: 0.01, duration: 1});
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


class ChartUpdater {
    constructor(chart) {
        this.chart = chart;
        this.chartConfig = chart.getDatasetMeta(0).controller.chart;
        this.prevChartConfigs = []; 
        this.version = 0;
    }


    updateConfig(legendPosition, aspectRatio, fontSize) {
        let config = {};
        if(typeof legendPosition !== undefined && this.chartConfig.legend.options.position !== legendPosition) {
            config.legendPosition = this.chartConfig.legend.options.position;
            this.chartConfig.legend.options.position = legendPosition; 
        }
        if(typeof aspectRatio !== undefined && this.chartConfig.aspectRatio !== aspectRatio) {
            config.aspectRatio = this.chartConfig.aspectRatio;
            this.chartConfig.aspectRatio = aspectRatio;
        }
        if(typeof fontSize !== undefined && this.chartConfig.options.defaultFontSize !== fontSize) {
            config.defaultFontSize = this.chartConfig.options.defaultFontSize;
            this.chartConfig.options.defaultFontSize = fontSize;
        }
        if(config !== {}) {
            this.prevChartConfigs.push(config);
            this.version++;
        }
    }

    restoreConfig(version) {
        let config = this.prevChartConfigs[version];
        if(config){
            if(config.legendPosition){
                this.chartConfig.legend.options.position = config.legendPosition;
            }
            if(config.aspectRatio) {
                this.chartConfig.aspectRatio = config.aspectRatio;
            }
            if(config.defaultFontSize){
                this.chartConfig.options.defaultFontSize = config.defaultFontSize;
            }
        }
    }

    updateChart() {
        this.chart.update();
    }

}

let cu1 = new ChartUpdater(chart);
let cu2 = new ChartUpdater(chart2);
let cu3 = new ChartUpdater(chart3);
let cu4 = new ChartUpdater(chart4);

window.addEventListener('resize', e => {
    if(window.innerWidth <= 550 && window.innerWidth > 430) {
        cu1.updateConfig('top', 1.5, 12);
        cu1.updateChart();
        cu2.updateConfig('top', 1.5, 12);
        cu2.updateChart();
        cu3.updateConfig('top', 1, 12);
        cu3.updateChart();
        cu4.updateConfig('top', 1.5, 12);
        cu4.updateChart();
    } else {
        cu1.restoreConfig(0);
        cu1.updateChart();
        cu2.restoreConfig(0);
        cu2.updateChart();
        cu3.restoreConfig(0);
        cu3.updateChart();
        cu4.restoreConfig(0);
        cu4.updateChart();
    }
})

window.onload = () => {
    if(window.innerWidth <= 550) {
        cu1.updateConfig('top', 1.5, 12);
        cu1.updateChart();
        cu2.updateConfig('top', 1.5, 12);
        cu2.updateChart();
        cu3.updateConfig('top', 1, 12);
        cu3.updateChart();
        cu4.updateConfig('top', 1.5, 12);
        cu4.updateChart();
    } 
}