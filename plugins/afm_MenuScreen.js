/*:
 * @plugindesc Change Basic menu to a new basic menu =D.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 * @param indexVariableCardQuantity
 * @desc For setting which RPG Maker variable will be used for card quantity.
 * @default 1
 *
 */

(function () {
    function toNumber(str, def) {
        return isNaN(str) ? def : +(str || def);
    }

    var parameters = PluginManager.parameters('AfonsoMedeirosMenuScreen');
    var indexVariableCardQuantity = toNumber(parameters['indexVariableCardQuantity'], 1);

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        _Scene_Menu_create.call(this);
        this.createCardGameStatusWindow();
        this.createMapNameWindow()

        const Y = 10;
        const SMALL_WINDOW_HEIGHT = 61;

        this._commandWindow.width = 130;
        this._commandWindow.x = Graphics.boxWidth - this._commandWindow.width - Y;
        this._commandWindow.y = Y;
        this._statusWindow.width = 270;
        this._statusWindow.height = 380;
        this._statusWindow.x =
            Graphics.boxWidth -
            this._statusWindow.width -
            this._commandWindow.width -
            20;
        this._statusWindow.y = Y;

        this._goldWindow.width = this._commandWindow.width;
        this._goldWindow.height = SMALL_WINDOW_HEIGHT;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width - 10;
        this._goldWindow.y = this._commandWindow.height + Y;

        this._cardGameStatusWindow.height = SMALL_WINDOW_HEIGHT;
        this._cardGameStatusWindow.x =
            Graphics.boxWidth - this._cardGameStatusWindow.width - 10;
        this._cardGameStatusWindow.y =
            this._commandWindow.height + this._goldWindow.height + Y;

        this._mapNameWindow.height = SMALL_WINDOW_HEIGHT;
        this._mapNameWindow.x = Graphics.boxWidth - this._cardGameStatusWindow.width - 10;
        this._mapNameWindow.y = this._commandWindow.height + this._cardGameStatusWindow.height + this._goldWindow.height + Y;
    };

    Scene_Menu.prototype.createCardGameStatusWindow = function () {
        this._cardGameStatusWindow = new Window_CardGameStatus(0, 0);
        this.addWindow(this._cardGameStatusWindow);
    };

    Scene_Menu.prototype.createMapNameWindow = function () {
        this._mapNameWindow = new Window_MapName(0, 0);
        this.addWindow(this._mapNameWindow);
    }

    Window_MenuStatus.prototype.drawActorFace = function (
        actor,
        x,
        y,
        width,
        height,
        dw,
        dh
    ) {
        this.drawFace(
            actor.faceName(),
            actor.faceIndex(),
            x,
            y,
            width,
            height,
            dw,
            dh
        );
    };

    Window_MenuStatus.prototype.drawFace = function (
        faceName,
        faceIndex,
        x,
        y,
        width,
        height,
        dw,
        dh
    ) {
        width = width || Window_Base._faceWidth;
        height = height || Window_Base._faceHeight;
        var bitmap = ImageManager.loadFace(faceName);
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var w = Math.min(rect.width, 144);
        var h = Math.min(rect.height, 144);
        var lineHeight = this.lineHeight();
        var dw = 75;
        var dh = 75;
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x, rect.y, w, h, dw, dh);
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x + 80;
        var y = rect.y - 2;
        var width = 120;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y, 130);
        this.drawActorHp(actor, x, y + lineHeight * 1, width);
        this.drawActorMp(actor, x, y + lineHeight * 2, width);
        this.drawActorLevel(actor, x, y + lineHeight * 3, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    Window_MenuStatus.prototype.standardFontSize = function () {
        return 15;
    };

    Window_MenuStatus.prototype.lineHeight = function () {
        return 20;
    };

    Window_MenuStatus.prototype.drawActorHp = function (actor, x, y, width) {
        width = width || 186;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        this.drawCurrentAndMax(
            actor.hp,
            actor.mhp,
            x,
            y,
            width,
            this.hpColor(actor),
            this.normalColor()
        );
    };

    Window_MenuStatus.prototype.drawActorMp = function (actor, x, y, width) {
        width = width || 186;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        this.drawCurrentAndMax(
            actor.mp,
            actor.mmp,
            x,
            y,
            width,
            this.mpColor(actor),
            this.normalColor()
        );
    };

    Window_MenuCommand.prototype.standardFontSize = function () {
        return 15;
    };

    Window_MenuCommand.prototype.lineHeight = function () {
        return 20;
    };

    Window_Gold.prototype.standardFontSize = function () {
        return 15;
    };

    Window_Gold.prototype.textPadding = function () {
        return 0;
    };

    Window_Gold.prototype.refresh = function () {
        var x = this.textPadding();
        var width = 90;
        this.contents.clear();
        this.drawText("Saldo:", x, -5, width, "left");
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x, -5, width);
    };

    function Window_MapName() {
        this.initialize.apply(this, arguments);
    }

    /**
     * Window_MapName.
     */

    Window_MapName.prototype = Object.create(Window_Base.prototype);
    Window_MapName.prototype.constructor = Window_MapName;

    Window_MapName.prototype.initialize = function (x, y) {
        let width = this.windowWidth();
        let height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_MapName.prototype.windowWidth = function () {
        return 130;
    };

    Window_MapName.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };

    Window_MapName.prototype.standardFontSize = function () {
        return 15;
    };

    Window_MapName.prototype.textPadding = function () {
        return 0;
    };

    Window_MapName.prototype.refresh = function () {
        var x = this.textPadding();
        this.contents.clear();
        this.drawText($gameMap.displayName(), x, -5, 90, "center");
    };

    Window_MapName.prototype.open = function () {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

    function Window_CardGameStatus() {
        this.initialize.apply(this, arguments);
    }

    /**
     * Window_CardGameStatus.
     */

    Window_CardGameStatus.prototype = Object.create(Window_Base.prototype);
    Window_CardGameStatus.prototype.constructor = Window_CardGameStatus;

    Window_CardGameStatus.prototype.initialize = function (x, y) {
        let width = this.windowWidth();
        let height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_CardGameStatus.prototype.windowWidth = function () {
        return 130;
    };

    Window_CardGameStatus.prototype.windowHeight = function () {
        return this.fittingHeight(1);
    };

    Window_CardGameStatus.prototype.standardFontSize = function () {
        return 15;
    };

    Window_CardGameStatus.prototype.textPadding = function () {
        return 0;
    };

    Window_CardGameStatus.prototype.refresh = function () {
        var x = this.textPadding();
        var quantity = $gameVariables.value(indexVariableCardQuantity);
        this.contents.clear();
        this.drawText("Cartas", x, -5, 90, "left");
        this.drawText(quantity + "/52", x, -5, 90, "right");
    };

    Window_CardGameStatus.prototype.open = function () {
        this.refresh();
        Window_Base.prototype.open.call(this);
    };

})();
