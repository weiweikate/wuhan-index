/**
 * Created by chenweiwei on 2020/2/19.
 */

export const isWeixin = ()=> {
    const ua = navigator.userAgent.toLowerCase();
    const isWeixin = ua.indexOf('micromessenger') != -1;
    return isWeixin
}