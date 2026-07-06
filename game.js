const asset = (name) => `assets/backgrounds/${name}`;

const backgrounds = {
  bedroom: asset("bg_01_bedroom_night.jpg"),
  classroom: asset("bg_02_classroom_day.jpg"),
  park: asset("bg_03_park_day_16x9.jpg"),
  city: asset("bg_04_city_street_dusk.jpg"),
  rooftop: asset("bg_05_school_rooftop.png"),
  station: asset("bg_06_train_station_evening.png"),
  shrine: asset("bg_13_bridge_night.jpg"),
  cafe: asset("bg_08_cafe_day.jpg"),
  hospital: asset("bg_09_hospital_room.jpg"),
  hallway: asset("bg_11_school_hallway.jpg"),
  mall: asset("bg_12_mall_night_16x9.jpeg"),
  bridge: asset("bg_13_bridge_night.jpg"),
  kitchen: asset("bg_14_kitchen_morning.jpg"),
  beach: asset("bg_15_beach_sunset.jpg"),
};

const characters = {
  hou: { name: "侯家义", sprites: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"] },
  zhang: { name: "张博康", sprites: ["6.jpg", "7.jpg", "8.jpg"] },
  lu: { name: "路一平", sprites: ["9.jpg", "10.jpg", "11.jpg", "12.jpg"] },
  cao: { name: "曹博洋", sprites: ["13.jpg", "14.jpg", "15.jpg"] },
  liu: { name: "刘淙宁", sprites: ["16.jpg", "17.jpg"] },
  guest: { name: "张佩豪", sprites: ["18.jpg", "19.jpg"] },
};

const state = {
  index: 0,
  route: null,
  points: { zhang: 0, lu: 0, cao: 0, liu: 0 },
  currentBg: backgrounds.classroom,
  currentChapter: "序章：未命名的夏天",
};

const labels = {};
const story = [
  { label: "start", chapter: "序章：未命名的夏天", bg: "classroom", show: [["hou", 0]], speaker: "侯家义", text: "高二的夏天像一张没写名字的试卷，摊在我面前，白得让人心慌。" },
  { speaker: "侯家义", text: "我叫侯家义。成绩不上不下，运动不算突出，唯一擅长的大概是把心里话拖到最后一秒。" },
  { bg: "hallway", show: [["zhang", 0], ["lu", 0], ["cao", 1], ["liu", 0]], speaker: "", text: "新学期第一周，学校宣布要举办一场名为“盛夏未命名”的联合迎新活动。每个社团都要出节目，每个班都要派人帮忙。" },
  { speaker: "张博康", focus: "zhang", text: "侯家义，篮球社要打表演赛。你来帮我练防守，我请你喝水。" },
  { speaker: "路一平", focus: "lu", text: "他上周借我的书还没还。按照先来后到，他今天应该归还图书馆债务。" },
  { speaker: "曹博洋", focus: "cao", text: "都先别抢人。学生会缺志愿者，他看起来像能搬桌子、贴海报、还不太会拒绝的类型。" },
  { speaker: "刘淙宁", focus: "liu", text: "广播站也缺人。活动当天要做校园点歌和现场播报，如果他愿意，可以先来试音。" },
  { show: [["guest", 1]], speaker: "张佩豪", focus: "guest", text: "我路过一下。班主任说，谁再把报名表画成漫画分镜，谁负责擦一个月黑板。客串完毕。" },
  { show: [["hou", 1]], speaker: "侯家义", text: "我忽然明白，所谓校园恋爱，大概不是突然被命运砸中，而是在很多个普通选择里，慢慢走近某个人。" },
  { choice: [
    { text: "去篮球场帮张博康试训", jump: "zhang_1", route: "zhang", points: { zhang: 2 } },
    { text: "去图书馆把书还给路一平", jump: "lu_1", route: "lu", points: { lu: 2 } },
    { text: "去学生会帮曹博洋布置迎新会", jump: "cao_1", route: "cao", points: { cao: 2 } },
    { text: "去广播站看看刘淙宁的工作", jump: "liu_1", route: "liu", points: { liu: 2 } },
  ] },

  { label: "zhang_1", chapter: "张博康线：奔跑的传球", bg: "park", show: [["zhang", 1], ["hou", 0]], speaker: "张博康", text: "篮球场边的风很热。张博康把校服外套挂在栏杆上，像把整个夏天都随手挂了起来。" },
  { speaker: "张博康", text: "我不是非要你打得多好。你只要站在我面前，别让我一个人对着篮筐较劲就行。" },
  { speaker: "侯家义", text: "听起来篮筐欠你一笔旧账。" },
  { speaker: "张博康", text: "上次比赛最后一球，我没传出去。输了。大家都说没关系，可我知道有关系。" },
  { bg: "hallway", show: [["cao", 0], ["zhang", 0]], speaker: "曹博洋", focus: "cao", text: "张博康，篮球社的节目报备表还没交。你们热血可以，但不要热到无视流程。" },
  { speaker: "张博康", focus: "zhang", text: "曹博洋，你说话真像会走路的文件夹。" },
  { speaker: "曹博洋", focus: "cao", text: "谢谢，至少文件夹不会在关键时刻丢球。" },
  { show: [["zhang", 2], ["hou", 1]], speaker: "张博康", focus: "zhang", text: "他笑了一下，但眼神明显沉了下去。" },
  { choice: [
    { text: "认真陪他练到天黑，再一起交表", points: { zhang: 2 }, jump: "zhang_2" },
    { text: "先劝他把表交了，训练明天再说", points: { zhang: 0 }, jump: "zhang_2" },
  ] },
  { label: "zhang_2", bg: "cafe", show: [["zhang", 0], ["lu", 1]], speaker: "路一平", focus: "lu", text: "第二天午休，路一平在咖啡厅角落看比赛录像。他推了推杯子，示意我们坐下。" },
  { speaker: "路一平", text: "张博康的问题不是技术，是选择。他总想自己承担全部风险。" },
  { speaker: "张博康", focus: "zhang", text: "你看录像就看录像，怎么还附带心理诊断？" },
  { speaker: "路一平", focus: "lu", text: "因为你每次被说中都会提高音量。" },
  { show: [["zhang", 1], ["hou", 0]], speaker: "张博康", focus: "zhang", text: "张博康低头搅着饮料，吸管碰到冰块，声音清脆得像一声很小的叹气。" },
  { choice: [
    { text: "告诉他：传球不是逃避，是信任", points: { zhang: 2 }, jump: "zhang_3" },
    { text: "告诉他：想自己投也没错，只要别后悔", points: { zhang: 0 }, jump: "zhang_3" },
  ] },
  { label: "zhang_3", bg: "station", show: [["liu", 0], ["zhang", 2]], speaker: "刘淙宁", focus: "liu", text: "友谊赛前一天，广播站要录篮球社宣传词。刘淙宁把麦克风推到张博康面前。" },
  { speaker: "刘淙宁", text: "请说一句能让大家想来看比赛的话。" },
  { speaker: "张博康", focus: "zhang", text: "来吧，最后一球这次会传出去。" },
  { speaker: "刘淙宁", focus: "liu", text: "很好。比你刚才那句'篮球社欢迎你'真诚很多。" },
  { show: [["zhang", 0], ["hou", 4]], speaker: "侯家义", text: "录音结束后，他没有立刻离开，只是看着站台方向。" },
  { speaker: "张博康", text: "侯家义，如果最后一球又到我手里，你会站在哪里？" },
  { choice: [
    { text: "站在你能看见的位置，等你传球", points: { zhang: 2 }, jump: "zhang_check" },
    { text: "站在观众席，为你喊最大声", points: { zhang: 0 }, jump: "zhang_check" },
  ] },
  { label: "zhang_check", cond: () => state.points.zhang >= 7, jump: "zhang_good", else: "zhang_normal" },
  { label: "zhang_good", chapter: "结局：同一侧的风", bg: "beach", show: [["zhang", 1], ["hou", 4]], speaker: "张博康", text: "决赛那天，最后十秒，球又一次到了张博康手里。他看见我，笑了一下，然后把球传了出来。" },
  { speaker: "侯家义", text: "球进了。哨声、掌声、尖叫声一起涌上来，而他第一个冲向的不是篮筐，是我。" },
  { speaker: "张博康", text: "这次我知道了。有人接得住，不是软弱，是幸运。" },
  { speaker: "侯家义", text: "那以后也传给我吧。不只是篮球。" },
  { speaker: "", text: "海边的晚风吹过来，我们并肩站着。夏天终于在记分牌之外，有了新的名字。张博康 Good Ending" },
  { end: true },
  { label: "zhang_normal", chapter: "结局：擦肩的哨声", bg: "city", show: [["zhang", 0]], speaker: "张博康", text: "比赛结束后，张博康还是笑着和每个人击掌。最后一球他投了，没进，但也没有逃走。" },
  { speaker: "张博康", text: "谢谢你陪我练。以后有空，还是来球场吧。" },
  { speaker: "", text: "有些喜欢停在了传球之前。它不坏，只是还没学会抵达。张博康 Normal Ending" },
  { end: true },

  { label: "lu_1", chapter: "路一平线：书页背面", bg: "cafe", show: [["lu", 1], ["hou", 0]], speaker: "路一平", text: "路一平把借书卡夹进书里，动作端正得像在封存证据。" },
  { speaker: "路一平", text: "你每次还书都会晚两天。很稳定，也很可疑。" },
  { speaker: "侯家义", text: "我这是尊重故事的余韵。" },
  { bg: "hallway", show: [["zhang", 0], ["lu", 0]], speaker: "张博康", focus: "zhang", text: "路一平，你别把侯家义扣在图书馆太久。晚上篮球社还借他当人墙。" },
  { speaker: "路一平", focus: "lu", text: "人墙可以移动，借阅记录不会自己消失。" },
  { speaker: "张博康", focus: "zhang", text: "你赢了。你们文化人吵架都带档案。" },
  { show: [["lu", 2], ["hou", 1]], speaker: "路一平", focus: "lu", text: "张博康走后，路一平把一本旧校刊推到我面前。封面边角发黄，像藏着不肯毕业的夏天。" },
  { choice: [
    { text: "邀请他一起调查旧校刊里的告白传闻", points: { lu: 2 }, jump: "lu_2" },
    { text: "说传闻只是无聊故事，别太认真", points: { lu: -1 }, jump: "lu_2" },
  ] },
  { label: "lu_2", bg: "bridge", show: [["lu", 2], ["liu", 0]], speaker: "刘淙宁", focus: "liu", text: "傍晚，我们在桥边找旧照片的拍摄地。刘淙宁刚好来录环境音，耳机线绕在指尖。" },
  { speaker: "刘淙宁", text: "这座桥的回声很好。适合说平时不敢说的话。" },
  { speaker: "路一平", focus: "lu", text: "从声学角度讲，它也适合制造误会。" },
  { speaker: "刘淙宁", focus: "liu", text: "从恋爱角度讲，误会有时比沉默好处理。" },
  { show: [["lu", 3], ["hou", 0]], speaker: "路一平", focus: "lu", text: "路一平翻开校刊。照片背面写着：毕业前，请把没说出口的话交给风。" },
  { speaker: "路一平", text: "我以前觉得这种话很矫情。但如果不说出口，确实会留下证据。比如遗憾。" },
  { choice: [
    { text: "安静等他把话说完", points: { lu: 2 }, jump: "lu_3" },
    { text: "开玩笑替他猜答案", points: { lu: 0 }, jump: "lu_3" },
  ] },
  { label: "lu_3", bg: "classroom", show: [["cao", 1], ["lu", 1]], speaker: "曹博洋", focus: "cao", text: "迎新会前，曹博洋临时征用教室排练朗读节目。路一平被推上台，手里的稿纸抖了一下。" },
  { speaker: "曹博洋", text: "路一平，你负责读开场文案。不要用像念死亡通知书一样的语气。" },
  { speaker: "路一平", focus: "lu", text: "我可以申请把这句话从排练记录里删除吗？" },
  { speaker: "侯家义", text: "我觉得你声音很好听。只是你总把认真藏得像注释。" },
  { speaker: "路一平", text: "那你读正文，我读注释。刚好一组。" },
  { choice: [
    { text: "接过稿纸，和他一起完成朗读", points: { lu: 2 }, jump: "lu_check" },
    { text: "让他一个人完成，自己在台下鼓掌", points: { lu: 0 }, jump: "lu_check" },
  ] },
  { label: "lu_check", cond: () => state.points.lu >= 7, jump: "lu_good", else: "lu_normal" },
  { label: "lu_good", chapter: "结局：借阅期限之外", bg: "rooftop", show: [["lu", 3], ["hou", 1]], speaker: "路一平", text: "迎新会结束后，路一平把一本空白笔记本递给我。" },
  { speaker: "路一平", text: "这次不设归还日期。我们一起写。" },
  { speaker: "侯家义", text: "第一页写什么？" },
  { speaker: "路一平", text: "写我喜欢你。不要改标点。" },
  { speaker: "", text: "楼顶的风翻过第一页。故事没有完结，只是终于开始署名。路一平 Good Ending" },
  { end: true },
  { label: "lu_normal", chapter: "结局：合上的书脊", bg: "hallway", show: [["lu", 0]], speaker: "路一平", text: "后来我们仍然在图书馆见面。他会提醒我还书，我会照旧晚两天。" },
  { speaker: "路一平", text: "你是很适合出现在故事里的人。只是这一次，我们停在朋友章节。" },
  { speaker: "", text: "故事停在最合适的页码，没有折角，也没有告白。路一平 Normal Ending" },
  { end: true },

  { label: "cao_1", chapter: "曹博洋线：灯光落点", bg: "hallway", show: [["cao", 1], ["hou", 2]], speaker: "曹博洋", text: "曹博洋的计划表密密麻麻，连胶带放在哪里都有编号。" },
  { speaker: "曹博洋", text: "侯家义，你负责舞台左侧。不要问为什么，问就是那里最容易出事故。" },
  { speaker: "侯家义", text: "你这样会不会太累？" },
  { speaker: "曹博洋", text: "活动会结束，人情会乱，只有流程能救命。" },
  { bg: "rooftop", show: [["liu", 0], ["cao", 0]], speaker: "刘淙宁", focus: "liu", text: "广播站排练时，刘淙宁拿着节目单走来。曹博洋在她递出的每一项后面都补了时间。" },
  { speaker: "刘淙宁", text: "你连掌声预计时长都写了。" },
  { speaker: "曹博洋", focus: "cao", text: "掌声如果不可控，至少退场要可控。" },
  { speaker: "刘淙宁", focus: "liu", text: "那侯家义呢？他在你的表格里是什么项目？" },
  { show: [["cao", 2], ["hou", 0]], speaker: "曹博洋", focus: "cao", text: "曹博洋停笔的那一秒，比他所有安排都更像答案。" },
  { choice: [
    { text: "默默接过他手里最重的工作", points: { cao: 2 }, jump: "cao_2" },
    { text: "提醒他放轻松，别什么都管", points: { cao: -1 }, jump: "cao_2" },
  ] },
  { label: "cao_2", bg: "mall", show: [["cao", 2], ["zhang", 1]], speaker: "张博康", focus: "zhang", text: "采购道具那晚，张博康也被抓来搬箱子。他把一箱彩带扛在肩上，表情像被学生会绑架。" },
  { speaker: "张博康", text: "曹博洋，你确定迎新会不是军事演习吗？" },
  { speaker: "曹博洋", focus: "cao", text: "如果大家都像你一样即兴发挥，它会变成灾难片。" },
  { speaker: "张博康", focus: "zhang", text: "侯家义，你管管他。他已经三小时没喝水了。" },
  { show: [["cao", 0], ["hou", 3]], speaker: "曹博洋", focus: "cao", text: "曹博洋想反驳，声音却比平时轻了。" },
  { speaker: "曹博洋", text: "我不是真的喜欢管人。我只是怕大家期待落空。" },
  { choice: [
    { text: "把自己的时间排给他：今晚我陪你收尾", points: { cao: 2 }, jump: "cao_3" },
    { text: "说活动结束后大家都会感谢他", points: { cao: 0 }, jump: "cao_3" },
  ] },
  { label: "cao_3", bg: "kitchen", show: [["cao", 1], ["lu", 0]], speaker: "路一平", focus: "lu", text: "周末清晨，志愿者在家政教室准备活动茶点。路一平负责核对名单，曹博洋负责把每个纸杯摆成直线。" },
  { speaker: "路一平", text: "曹博洋，你的直线有一种压迫感。" },
  { speaker: "曹博洋", focus: "cao", text: "你的吐槽也很稳定。" },
  { speaker: "侯家义", text: "我倒觉得这样挺好。至少有人把混乱挡在我们看不见的地方。" },
  { speaker: "曹博洋", text: "你这样说，我会误以为自己可以偶尔休息。" },
  { choice: [
    { text: "告诉他：可以，我会替你看着流程", points: { cao: 2 }, jump: "cao_check" },
    { text: "告诉他：坚持一下，马上就结束了", points: { cao: 0 }, jump: "cao_check" },
  ] },
  { label: "cao_check", cond: () => state.points.cao >= 7, jump: "cao_good", else: "cao_normal" },
  { label: "cao_good", chapter: "结局：备用方案是你", bg: "classroom", show: [["cao", 1], ["hou", 3]], speaker: "曹博洋", text: "迎新会停电三分钟。曹博洋没有慌，因为我已经按他说的准备好了手电和备用音箱。" },
  { speaker: "曹博洋", text: "你居然真的记住了。" },
  { speaker: "侯家义", text: "你的计划里缺一个陪你的人。我来补。" },
  { speaker: "曹博洋", text: "那从今天起，你是长期项目。" },
  { speaker: "", text: "掌声重新响起时，他握住我的手，没有再看流程表。曹博洋 Good Ending" },
  { end: true },
  { label: "cao_normal", chapter: "结局：完美流程", bg: "classroom", show: [["cao", 0]], speaker: "曹博洋", text: "迎新会很成功。曹博洋站在灯光之外，笑得礼貌又克制。" },
  { speaker: "曹博洋", text: "谢谢。没有你，今天会更麻烦。" },
  { speaker: "", text: "我们一起完成了一场完美活动，却没能成为彼此计划里的例外。曹博洋 Normal Ending" },
  { end: true },

  { label: "liu_1", chapter: "刘淙宁线：黄昏频率", bg: "rooftop", show: [["liu", 0], ["hou", 0]], speaker: "刘淙宁", text: "广播站在教学楼顶层，窗外能看见操场和远处的天。" },
  { speaker: "刘淙宁", text: "试音的时候不要离麦太近。情绪也是，太近会爆音。" },
  { speaker: "侯家义", text: "你说话一直这么像节目结语吗？" },
  { speaker: "刘淙宁", text: "不。我紧张的时候才这样。" },
  { bg: "hallway", show: [["guest", 0], ["liu", 0]], speaker: "张佩豪", focus: "guest", text: "我又客串一下。广播站门口有人把点歌箱当失物招领箱，里面有一只袜子。" },
  { speaker: "刘淙宁", focus: "liu", text: "谢谢。请把袜子交给真正的失物招领处，不要在广播里播报它。" },
  { speaker: "张佩豪", focus: "guest", text: "收到。我的戏份结束得很有尊严。" },
  { show: [["liu", 1], ["hou", 1]], speaker: "刘淙宁", focus: "liu", text: "她把点歌箱抱回桌上，里面有一张没有署名的纸条：给总是不敢告白的人。" },
  { choice: [
    { text: "认真听她准备的校园点歌节目", points: { liu: 2 }, jump: "liu_2" },
    { text: "打趣说广播没人会认真听", points: { liu: -1 }, jump: "liu_2" },
  ] },
  { label: "liu_2", bg: "cafe", show: [["liu", 1], ["cao", 1]], speaker: "曹博洋", focus: "cao", text: "为了核对节目时长，曹博洋把广播站叫到咖啡厅开会。他的表格上，每一首歌都有准确秒数。" },
  { speaker: "曹博洋", text: "匿名留言可以播，但不能影响流程。" },
  { speaker: "刘淙宁", focus: "liu", text: "如果一段话真的重要，它可能本来就会影响流程。" },
  { speaker: "曹博洋", focus: "cao", text: "这句话很危险，但我承认它适合作为节目标题。" },
  { show: [["liu", 0], ["hou", 0]], speaker: "刘淙宁", focus: "liu", text: "会后，她把耳机递给我。里面是她剪好的试播片段，声音很轻，却很清楚。" },
  { choice: [
    { text: "告诉她：你的声音会被认真听见", points: { liu: 2 }, jump: "liu_3" },
    { text: "告诉她：如果害怕，可以删掉匿名留言", points: { liu: 0 }, jump: "liu_3" },
  ] },
  { label: "liu_3", bg: "bridge", show: [["liu", 1], ["lu", 2]], speaker: "路一平", focus: "lu", text: "正式播出前夜，路一平在桥边帮她润色播音稿。他把'喜欢'两个字圈出来，又划掉。" },
  { speaker: "路一平", text: "太直接会像告白，太含蓄会像天气预报。" },
  { speaker: "刘淙宁", focus: "liu", text: "那你觉得我应该怎么说？" },
  { speaker: "路一平", focus: "lu", text: "问侯家义。他看起来像这份稿子的收信人。" },
  { show: [["liu", 1], ["hou", 4]], speaker: "刘淙宁", focus: "liu", text: "桥下的水声忽然变得很大。刘淙宁没有否认，只是把稿纸递给我。" },
  { choice: [
    { text: "鼓励她把自己的声音也放进去", points: { liu: 2 }, jump: "liu_check" },
    { text: "尊重她的犹豫，只陪她把节目播完", points: { liu: 0 }, jump: "liu_check" },
  ] },
  { label: "liu_check", cond: () => state.points.liu >= 7, jump: "liu_good", else: "liu_normal" },
  { label: "liu_good", chapter: "结局：只播给你的歌", bg: "station", show: [["liu", 1], ["hou", 4]], speaker: "刘淙宁", text: "迎新会最后，她没有念稿，只轻轻叫了我的名字。" },
  { speaker: "刘淙宁", text: "侯家义，今天的最后一首歌，只播给你。" },
  { speaker: "侯家义", text: "那我可以点一首回礼吗？" },
  { speaker: "刘淙宁", text: "可以。但你要当面唱。" },
  { speaker: "", text: "耳机里传来前奏，站台灯亮起。所有没说出口的话，都找到了频率。刘淙宁 Good Ending" },
  { end: true },
  { label: "liu_normal", chapter: "结局：错过的电波", bg: "bedroom", show: [["liu", 0]], speaker: "刘淙宁", text: "后来那首歌还是播了，只是没有留言，也没有名字。" },
  { speaker: "刘淙宁", text: "这样也好。至少它被听见了。" },
  { speaker: "", text: "我在夜里听见熟悉的旋律，却再也分不清它原本想送给谁。刘淙宁 Normal Ending" },
  { end: true },
];

const els = {
  game: document.getElementById("game"),
  bg: document.getElementById("bg"),
  title: document.getElementById("title-screen"),
  hud: document.getElementById("hud"),
  chapter: document.getElementById("chapter"),
  sprites: document.getElementById("sprites"),
  speaker: document.getElementById("speaker"),
  line: document.getElementById("line"),
  choices: document.getElementById("choice-panel"),
  start: document.getElementById("start-btn"),
  continue: document.getElementById("continue-btn"),
  save: document.getElementById("save-btn"),
  load: document.getElementById("load-btn"),
  restart: document.getElementById("restart-btn"),
};

story.forEach((step, index) => {
  if (step.label) labels[step.label] = index;
});

function sceneBg(key) {
  return backgrounds[key] || state.currentBg;
}

function spritePath(charId, index = 0) {
  const char = characters[charId];
  return asset(char.sprites[index] || char.sprites[0]);
}

function startGame() {
  Object.assign(state, {
    index: labels.start,
    route: null,
    points: { zhang: 0, lu: 0, cao: 0, liu: 0 },
    currentBg: backgrounds.classroom,
    currentChapter: "序章：未命名的夏天",
  });
  els.title.classList.add("hidden");
  els.hud.classList.remove("hidden");
  render();
}

function saveGame() {
  localStorage.setItem("summer-vn-save", JSON.stringify(state));
  flashHint("已保存");
}

function loadGame() {
  const data = localStorage.getItem("summer-vn-save");
  if (!data) {
    flashHint("暂无存档");
    return;
  }
  Object.assign(state, JSON.parse(data));
  els.title.classList.add("hidden");
  els.hud.classList.remove("hidden");
  render();
}

function flashHint(text) {
  const hint = document.getElementById("hint");
  const old = hint.textContent;
  hint.textContent = text;
  window.setTimeout(() => {
    hint.textContent = old;
  }, 900);
}

function applyChoice(choice) {
  if (choice.route) state.route = choice.route;
  if (choice.points) {
    Object.entries(choice.points).forEach(([key, value]) => {
      state.points[key] += value;
    });
  }
  jump(choice.jump);
}

function jump(label) {
  state.index = labels[label];
  render();
}

function continueStory() {
  const step = story[state.index];
  if (!step || step.choice || step.end) return;
  state.index += 1;
  render();
}

function renderSprites(show = [], focus) {
  els.sprites.innerHTML = "";
  show.forEach(([charId, expression]) => {
    const img = document.createElement("img");
    img.className = "sprite";
    if (focus && focus !== charId) img.classList.add("dim");
    img.src = spritePath(charId, expression);
    img.alt = characters[charId].name;
    els.sprites.appendChild(img);
  });
}

function renderChoices(choices) {
  els.choices.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      applyChoice(choice);
    });
    els.choices.appendChild(button);
  });
  els.choices.classList.remove("hidden");
}

function render() {
  let step = story[state.index];
  while (step && step.cond) {
    state.index = labels[step.cond() ? step.jump : step.else];
    step = story[state.index];
  }

  if (!step) return;
  if (step.chapter) state.currentChapter = step.chapter;
  if (step.bg) state.currentBg = sceneBg(step.bg);

  els.bg.src = state.currentBg;
  els.chapter.textContent = state.currentChapter;
  els.choices.classList.add("hidden");

  if (step.show) renderSprites(step.show, step.focus);
  els.speaker.textContent = step.speaker || "";
  els.line.textContent = step.text || "";

  if (step.choice) {
    els.speaker.textContent = "";
    els.line.textContent = "选择接下来要回应的心意。";
    renderChoices(step.choice);
  }

  if (step.end) {
    document.getElementById("hint").textContent = "故事结束，可重开体验其他路线";
  } else {
    document.getElementById("hint").textContent = step.choice ? "请选择" : "点击画面继续";
  }
}

els.start.addEventListener("click", (event) => {
  event.stopPropagation();
  startGame();
});
els.continue.addEventListener("click", (event) => {
  event.stopPropagation();
  loadGame();
});
els.save.addEventListener("click", (event) => {
  event.stopPropagation();
  saveGame();
});
els.load.addEventListener("click", (event) => {
  event.stopPropagation();
  loadGame();
});
els.restart.addEventListener("click", (event) => {
  event.stopPropagation();
  startGame();
});
els.game.addEventListener("click", continueStory);

els.bg.src = backgrounds.classroom;
