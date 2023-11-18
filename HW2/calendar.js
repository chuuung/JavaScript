"use strict";

function get_space_day(month){
    let mf_day = new Date(2023, month-1, 1);
    return mf_day.getDay();
}

function get_month_days(month){
    let days;
    if (month == 2) days = 28;
    else if (month == 4 || month == 6 || month == 9 || month == 11) days = 30;
    else days = 31;

    return days;
}
let year = 2023, out = "";
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Juy', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
out += `<h1> 2023 年曆 </h1><hr>`;
out += `<div class = "container">`;
for (let month = 1; month <= 12; month++){

    let space_day = get_space_day(month);
    let days = get_month_days(month);
    let tr_class = 
    out += `<div class = ${months[month-1]}>
            <img src = picture/m${month}.png></img>
            <table>
            <tr><td colspan = "7"> ${year} 年 ${month} 月 </td></tr>
            <tr>`;

    for (let c of "日一二三四五六"){
        out += `<td> ${c} </td>`;
    }
    out += "</tr>";

    let counter = 0;

    out += `<tr>`;
    for (let i = 0; i < space_day; i++){
        out += `<td>&nbsp</td>`;
        counter++;
    }

    for (let i = 1; i <= days; i++){
        let put = `<td style =  "font-weight:bold; color:purple;">${i}</td>`;

        if (counter % 7 == 0){
            out += `</tr>`;
            out += `<tr>`;
            put = `<td style =  "font-weight:bold; color:red;">${i}</td>`;
        }
        else if (counter%7 == 6){
            put = `<td style =  "font-weight:bold; color:green;">${i}</td>`;
        }
        out += put;
        counter++;      
    }
    out += '</table></div>';

}
out += `</div>`
console.log(out);
document.write(out);