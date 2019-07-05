var heelSales = new Array();
heelSales[0] = "Jan, 170";
heelSales[1] = "Feb, 320";
heelSales[2] = "Mar, 432";
heelSales[3] = "Apr, 548";
heelSales[4] = "May, 342";
heelSales[5] = "Jun, 689";
heelSales[6] = "Jul, 344";
heelSales[7] = "Aug, 109";
heelSales[8] = "Sep, 655";
heelSales[9] = "Oct, 327";
heelSales[10] = "Nov, 109";
heelSales[11] = "Dec, 235";

function drawChart() {
    var canvas = document.getElementById('barChart');

    if (canvas && canvas.getContext) {
        var context = canvas.getContext('2d');
        createBarChart(context, heelSales, 30, 20, (canvas.height - 20), 50);
    }
}

function createBarChart(context, data, startX, barWidth, chartHeight, markDataIncrementsIn) {

    context.lineWidth = "1.2";
    var startY = 780;

    createAxis(context, startX, startY, startX, 30);//vertical axis
    createAxis(context, startX, startY, 650, startY);//horizontal axis

    context.lineWidth = "0.0";
    var maxValue = 0;
    for (var i = 0; i < data.length; i++) {

        var item = data[i].split(",");
        var itemName = item[0];
        var itemValue = parseInt(item[1]);
        if (parseInt(itemValue) > parseInt(maxValue)) maxValue = itemValue;

        context.fillStyle = "blue";
        createBar(context, 20 + startX + (i * barWidth) + i + (i * 30), (chartHeight - itemValue), barWidth, itemValue, true);

        context.textAlign = "left";
        context.fillStyle = "black";
        context.fillText(itemName, 20 + startX + (i * barWidth) + i + (i * 30), chartHeight + 15, 200);
    }
}

function createAxis(context, startx, starty, endx, endy) {
    context.beginPath();
    context.moveTo(startx, starty);
    context.lineTo(endx, endy);
    context.closePath();
    context.stroke();
}

function createBar(context, x, y, width, height, fill) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.closePath();
    context.stroke();
    context.fill();
}
