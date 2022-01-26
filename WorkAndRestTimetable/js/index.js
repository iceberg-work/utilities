let now;
let hour;
let minute;
let second;
let minutes;
let minutesJudgment = [
    [6 * 60 + 30, "睡觉", 0],
    [6 * 60 + 40, "起床", 1],
    [7 * 60 + 40, "锻炼+吃早饭", 2],
    [8 * 60 + 20, "背单词", 3],
    [8 * 60 + 30, "休息", 4],
    [11 * 60 + 40, "数学 注重书本基础知识", 5],
    [11 * 60 + 50, "准备吃午饭", 6],
    [12 * 60 + 20, "吃午饭", 7],
    [13 * 60 + 20, "午睡，不可超过一小时", 8],
    [13 * 60 + 30, "准备复习英语", 9],
    [17 * 60, "复习英语、重词汇、阅读", 10],
    [18 * 60, "吃晚饭，休息", 11],
    [22 * 60, "专业课，理解掌握基础知识", 12],
    [23 * 60, "洗漱 回顾今日重点", 13],
    [23 * 60 + 30, "背单词", 14],
    [24 * 60, "睡觉", 15]
];
let timeIndex;//储存当前时间区间右临界点
let show = () => {
    /**
     * 获取当前时间
     * @type {number}
     */
    now = new Date();
    hour = now.getHours();//得到小时数
    minute = now.getMinutes();//得到分钟数
    second = now.getSeconds();//得到秒数
    minutes = hour * 60 + minute;//计算总时长
}
let judgment = () => {
    /**
     * 判断时点位于那个区间
     * @type {number}
     */
    let index = 0;
    show();
    while (index < minutesJudgment.length) {
        if (minutes < minutesJudgment[index][0]) {//判断右零界点
            change(minutesJudgment[index][2]);//将右零界点传入更新页面方法
            //console.log(second);
            break;
        }
        index++;
    }
}

function change(timeIndex) {
    /**
     * 依据当前所处时间区间，更新页面
     */
    if (timeIndex !== this.timeIndex) {
        this.timeIndex = timeIndex;
        //console.log(minutesJudgment[timeIndex][1]);
        document.getElementById("today").innerHTML = packageDiv(timeIndex, minutesJudgment.length - 1);
        document.getElementById("tomorrow").innerHTML = packageDiv(0, timeIndex - 1);
        if (timeIndex !== 0 && minutes === minutesJudgment[timeIndex - 1][0]) {
            audioPlay(timeIndex);
        }
    }
}

let audioPlay = (timeIndex) => document.getElementById("music").innerHTML = "" +
    "<audio autoplay  controls=\"controls\">\n" +
    "        <source src=\"./music/" + timeIndex + ".mp3\" type=\"audio/mp3\" />\n" +
    "</audio>";

let packageDiv = (from, to) => {
    /**
     * 封装div
     */
    let div = "";
    while (from <= to) {
        div = div + "<div>" + minutesJudgment[from][1] + "</div>";
        from++;
    }
    return div;
}
setInterval(judgment, 1000);//定时器一直调用judgment()函数