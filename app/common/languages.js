export const langCode = ['zh', 'en'];
export const langZh = ['中文', '英语'];
export const langEn = ['Chinese', 'English'];

export const languageCode = [
  'en', 'en-gb', 'zh-cn', 'zh-tw', 'zh-hk', 'ja', 'ko', 'af', 'az',
  'id', 'ms', 'ca', 'cs', 'da', 'de', 'et', 'es', 'es-419', 'eu', 'fil', 'fr', 'fr-ca', 'gl',
  'hr', 'zu', 'is', 'it', 'sw', 'lv', 'lt', 'hu', 'nl', 'no', 'uz', 'pl', 'pt-pt', 'pt', 'ro',
  'sq', 'sk', 'sl', 'fi', 'sv', 'vi', 'tr', 'bg', 'ky', 'kk', 'mk', 'mn', 'ru', 'sr', 'uk', 'el',
  'hy', 'iw', 'ur', 'ar', 'fa', 'ne', 'mr', 'hi', 'bn', 'pa', 'gu', 'ta', 'te', 'kn', 'ml', 'si',
  'th', 'lo', 'my', 'ka', 'am', 'km', 'ug', 'bo',
];
export const languageZh = [
  '英文', '英文（英国）', '中文 (简体)', '中文（台湾）', '中文（香港）', '日文', '韩文', '南非荷兰文',
  '阿塞拜疆文', '印度尼西亚文', '马来文', '加泰罗尼亚文', '捷克文', '丹麦文', '德文', '爱沙尼亚文', '西班牙文（西班牙）',
  '西班牙文（拉丁美洲）', '巴斯克文', '菲律宾文', '法文', '法文（加拿大）', '加利西亚文', '克罗地亚文', '祖鲁文', '冰岛文', '意大利文',
  '斯瓦希里文', '拉脱维亚文', '立陶宛文', '匈牙利文', '荷兰文', '挪威语', '乌兹别克语', '波兰文', '葡萄牙文（葡萄牙）', '葡萄牙文（巴西）',
  '罗马尼亚文', '阿尔巴尼亚文', '斯洛伐克文', '斯洛文尼亚文', '芬兰文', '瑞典文', '越南文', '土耳其文', '保加利亚文', '吉尔吉斯文',
  '哈萨克文', '马其顿文', '蒙古文', '俄文', '塞尔维亚文', '乌克兰文', '希腊文', '亚美尼亚文', '希伯来文', '乌尔都文', '阿拉伯文',
  '波斯文', '尼泊尔文', '马拉地文', '印地文', '孟加拉文', '旁遮普文', '古吉拉特文', '泰米尔文', '泰卢固文', '卡纳达文', '马拉雅拉姆文',
  '僧伽罗文', '泰文', '老挝文', '缅甸语', '格鲁吉亚文', '阿姆哈拉文', '高棉文', '维吾尔语', '藏语',
];
export const languageEn = [
  'English', 'English(UK)', 'Chinese(简体)', 'Chinese(繁体)', 'Chinese(香港)', 'Japanese',
  'Korean', 'Afrikaans', 'Azerbaijani', 'Indonesian', 'Malay', 'Catalan', 'Czech', 'Danish',
  'German', 'Estonian', 'Spanish(Spain)', 'Spanish(LatinAmerica)', 'Basque', 'Filipino', 'French',
  'French(Canada)', 'Galician', 'Croatian', 'Zulu', 'Icelandic', 'Italian', 'Swahili', 'Latvian',
  'Lithuanian', 'Hungarian', 'NetherlandsWen', 'Norwegian', 'Uzbek', 'Polish',
  'Portuguese(Portugal)', 'Portuguese(Brazil)', 'Romanian', 'Albanian', 'Slovak', 'Slovenian',
  'Finnish', 'Swedish', 'Vietnamese', 'Turkish', 'Bulgarian', 'Kirghiz', 'Kazakh', 'Macedonian',
  'Mongolian', 'Russian', 'Serbian', 'Ukrainian', 'Greek', 'Armenian', 'Hebrew', 'Urdu', 'Arabic',
  'Persian', 'Nepali', 'Marathi', 'Hindi', 'Bengali', 'Punjabi', 'Gujarati', 'Tamil', 'Telugu',
  'Kannada', 'Malayalamtext', 'Sinhala', 'Thai', 'Lao', 'Burmese', 'Georgian', 'Amharic', 'Khmer',
  'Uyghur（维吾尔语）', 'Tibetan（藏语）',
];


export const codeToZh = (code) => {
  const index = languageCode.indexOf(code);
  if (index === -1) {
    return '';
  }
  return languageZh[index];
};
