/**
 * Created by wujianbo on 15/12/4.
 */
    /*global __DEV__,__PRE_DEPLOY__*/
let u = "";
if(__DEV__){
    u = 'http://localhost:8080'
}
else if(__PRE_DEPLOY__){
    u = '';
}
else {
    u = '';
}
export default u;