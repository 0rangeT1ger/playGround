/**
 * Created by wujianbo on 15/12/4.
 */
var tidyDate = function (date){
    var tidy = function(dateDate){ //输入的是Date对象的实例
        var standardYear = dateDate.getFullYear();
        var standardMonth = dateDate.getMonth() + 1;
        standardMonth = standardMonth < 10 ? '0' + standardMonth : standardMonth;
        var standardDate = dateDate.getDate();
        standardDate = standardDate < 10 ? '0' + standardDate : standardDate;
        return [standardYear, standardMonth, standardDate].join('-');
    };
    if(date instanceof Date){ //输入的是Date对象字符串，不论是时间戳还是别的
        return tidy(date);
    }
    else{
        if(Object.prototype.toString.call(date) == '[object String]' ){
            return tidy(new Date(date));
        }
        else{
            return tidy(new Date(date));
        }
    }
};

module.exports = tidyDate;
export default tidyDate;