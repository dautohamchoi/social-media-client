export default function spanBetweenDays(dateFirst, dateLast) {
    const date1 = new Date(dateFirst);
    const date2 = new Date(dateLast);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)) - 1; 
    const diffMins = Math.ceil(diffTime / (1000 * 60)) - 1; 
    const diffSecs = Math.ceil(diffTime / (1000)); 
    if (diffDays >= 1) {
        return diffDays + " ngày";
    } else if (diffHours >= 1 && diffDays < 1) {
        return diffHours + " giờ";
    } else if (diffMins >= 1 && diffHours < 1) {
        return diffMins + " phút";
    } else {
        return diffSecs + " giây";
    }
}