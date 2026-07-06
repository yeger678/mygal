# 盛夏未命名

一个本地运行的校园恋爱 galgame 原型。

## 游玩方式

直接打开 `index.html` 即可游玩。

如果浏览器限制本地资源，也可以在当前文件夹运行：

```powershell
node dev-server.cjs
```

然后访问：

```text
http://localhost:4173/
```

## 角色路线

- 侯家义：主角，玩家操纵角色，使用 `1.jpg` 到 `5.jpg`
- 张博康：可攻略角色，使用 `6.jpg` 到 `8.jpg`
- 路一平：可攻略角色，使用 `9.jpg` 到 `12.jpg`
- 曹博洋：可攻略角色，使用 `13.jpg` 到 `15.jpg`
- 刘淙宁：可攻略角色，使用 `16.jpg` 到 `17.jpg`
- 张佩豪：客串角色，使用 `18.jpg` 到 `19.jpg`

## 当前内容

- 完整序章
- 四条可攻略路线
- 每条路线包含三次关键选择、其他角色串场、Good Ending 和 Normal Ending
- 保存、读取、重开按钮
- 自动适配桌面和手机屏幕

## 文件说明

- `index.html`：游戏页面入口
- `style.css`：界面与立绘布局
- `game.js`：剧情脚本、选择分支和存档逻辑
- `dev-server.cjs`：本地预览服务
- `assets/backgrounds/`：背景图和角色图素材
