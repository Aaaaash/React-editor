
  // mediaState 0|上传中, 1处理中, 2 处理成功 , 3 失败
  // source_type: 0:上传, 1:youtube; 2:剪切; 3:直播;  4:直播切片; (5:广告)  6合集; 7直播回放
export const SOURCE_TYPE = {
  '-1': '类型',
  0: '视频',
  1: '视频',
  2: '剪切',
  3: '直播',
  4: '直播碎片',
  5: '广告',
  6: '合集',
  7: '直播回放',
};

export const MEDIA_SATUS = {
  '-1': '状态',
  0: '上传中',
  1: '处理中',
  2: '处理成功',
  3: '失败',
};

export const TIME_ORDER = {
  0: '最新',
  1: '最早',
};

export const LIVE_SATUS = {
  '-1': '状态',
  0: '回放',
  1: '直播',
};
