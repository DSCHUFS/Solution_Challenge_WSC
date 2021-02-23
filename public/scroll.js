Chart.defaults.global.defaultFontColor = "#FFF";
Chart.defaults.global.defaultFontFamily = "Noto Sans KR";
Chart.defaults.global.defaultFontSize = 15;

function makeChart(ctx, config) {
    let chart = new Chart(ctx, config);
    return chart;
}


function scrollEvent() {
    let scrollArg = scrollArguments();
    let chart1 = makeChart(scrollArg.secondEvent.ctx, scrollArg.secondEvent.chartConfig);
    let chart2 = makeChart(scrollArg.thirdEvent.ctx, scrollArg.thirdEvent.chartConfig);
    let chart3 = makeChart(scrollArg.fourthEvent.ctx, scrollArg.fourthEvent.chartConfig);

    return [chart1, chart2, chart3];
}