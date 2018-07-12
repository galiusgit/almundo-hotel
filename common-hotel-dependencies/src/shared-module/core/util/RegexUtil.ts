import { Constant } from '../extend/Constant';
const default_url_options = {
    protocols: ['http', 'https', 'ftp'],
    require_tld: true,
    require_protocol: false,
};
const flatten = (array: Array<any>, separator: string) => {
    if (!array) {
        return '';
    }
    let str = array[0];
    for (let i = 1; i < array.length; i++) {
        str += separator + array[i];
    }
    return str;
};

export class RegexUtil extends Constant<RegExp>{
    public static EMPTY: string = '';
    public static ALPHA = Constant.new<RegExp>(new RegExp('/^[a-zA-Z]+$/'));
    public static ALPHA_NUMERIC = Constant.new<RegExp>(new RegExp('/^[a-zA-Z0-9]+$/'));
    public static NUMERIC = Constant.new<RegExp>(new RegExp('/^-?[0-9]+$/'));
    public static INT = Constant.new<RegExp>(new RegExp('/^(?:-?(?:0|[1-9][0-9]*))$/'));
    public static FLOAT = Constant.new<RegExp>(new RegExp('/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/'));
    public static HEXADECIMAL = Constant.new<RegExp>(new RegExp('/^[0-9a-fA-F]+$/'));
    public static HEXCOLOR = Constant.new<RegExp>(new RegExp('/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/'));
    public static MULTIBYTE = Constant.new<RegExp>(new RegExp('/[^\x00-\x7F]/'));
    public static URL = Constant.new<RegExp>(new RegExp('^(?!mailto:)(?:(?:' +
        flatten(default_url_options.protocols, '|') + ')://)' +
        (default_url_options.require_protocol ? '' : '?') +
        '(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5]))' +
        '{2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(www.)?xn--)?(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*' +
        '[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
        (default_url_options.require_tld ? '' : '?') + ')|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$', 'i'));
}