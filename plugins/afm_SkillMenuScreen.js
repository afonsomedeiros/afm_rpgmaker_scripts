/*:
 * @plugindesc Change Basic Skill menu to a new basic Skill menu =D.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 */

(function () {

    var _Scene_Skill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function () {
        _Scene_Skill_create.call(this);

        const Y = 10;

        this._skillTypeWindow.width = 150;
        this._skillTypeWindow.x = Graphics.boxWidth - this._skillTypeWindow.width - Y;
        this._skillTypeWindow.y = Y;
        this._skillTypeWindow.standardFontSize = standardFontSize;

        this._itemWindow.width = 270;
        this._itemWindow.x = Graphics.boxWidth - this._itemWindow.width - this._skillTypeWindow.width - Y;
        this._itemWindow.y = Y;
        this._itemWindow.height = 380;
        this._itemWindow.standardFontSize = standardFontSize;

        this._statusWindow.width = this._itemWindow.width;
        this._statusWindow.y = this._itemWindow.height + Y;
        this._statusWindow.x = Graphics.boxWidth - this._itemWindow.width - this._skillTypeWindow.width - Y;
        this._statusWindow.height = 115;

        this._itemWindow.maxCols = maxCols;
    }

    var maxCols = function () {
        return 1;
    };

    var standardFontSize = function () {
        return 15;
    };

    var lineHeight = function () {
        return 20;
    };

    Scene_Skill.prototype.createHelpWindow = function () {
        this._helpWindow = new Window_Help(5);
        this._helpWindow.setText(this.helpWindowText());
        this._helpWindow.close()
    };

    Scene_Skill.prototype.commandSkill = function () {
        this._itemWindow.activate();
        this._itemWindow.selectLast();
        this._helpWindow.open();
        this.addWindow(this._helpWindow);

        this._helpWindow.width = Graphics.boxWidth - this._itemWindow.width - this._skillTypeWindow.width - 20;
        this._helpWindow.x = 10;
        this._helpWindow.y = 10;
        this._helpWindow.height = 380;
    };

    Scene_Skill.prototype.onItemCancel = function () {
        this.removeChild(this._helpWindow);
        this._helpWindow.close()
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };

    Scene_Skill.prototype.helpWindowText = function () {
        return 'Descrição:';
    };

    Window_SkillStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            var w = this.width - this.padding * 2;
            var h = this.height - this.padding * 2;
            var y = h / 2 - this.lineHeight() * 1.5;
            var width = w - 90 - this.textPadding();
            var dw = 75;
            var dh = 75;
            this.drawActorFace(this._actor, 0, 0, 144, h, dw, dh);
            this.drawActorSimpleStatus(this._actor, 80, 0, width);
        }
    };

    Window_SkillStatus.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y);
        this.drawActorHp(actor, x, y + lineHeight * 1, width);
        this.drawActorMp(actor, x, y + lineHeight * 2, width);
        this.drawActorLevel(actor, x, y + lineHeight * 3, width);
        this.drawActorIcons(actor, x, y + lineHeight * 4, width);
    };

    Window_SkillStatus.prototype.drawActorLevel = function(actor, x, y, width) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + 84, y, 54, 'right');
    };

    Window_SkillStatus.prototype.drawActorFace = function (actor, x, y, width, height, dw, dh) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height, dw, dh);
    };

    Window_SkillStatus.prototype.drawFace = function (
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

    Window_SkillStatus.prototype.drawActorHp = function (actor, x, y, width) {
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

    Window_SkillStatus.prototype.standardFontSize = function () {
        return 15;
    };

    Window_SkillStatus.prototype.lineHeight = function () {
        return 20;
    };

    Window_SkillStatus.prototype.drawActorMp = function (actor, x, y, width) {
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

    Window_Base.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 10;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

})();
