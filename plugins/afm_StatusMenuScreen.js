 /*:
 * @plugindesc Change Basic Status menu to a new basic Status menu =D.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 */

 (function () {

    var _Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _Scene_Status_create.call(this);
        this._statusWindow.width = 600;
        this._statusWindow.height = 220;;
        this._statusWindow.x = Graphics.boxWidth - this._statusWindow.width - 10;
        this._statusWindow.y = 10;
        this._statusWindow.refresh();
    };

    Window_Status.prototype.standardFontSize = function() {
        return 15;
    }

    Window_Status.prototype.refresh = function() {
        this.contents.clear();
        if (this._actor) {
            var lineHeight = this.lineHeight();
            this.drawBlock1(lineHeight * 0);
            this.drawBlock2(lineHeight);
            this.drawBlock3(lineHeight * 0);
            this.drawBlock4(lineHeight * 14);
        }
    };

    Window_Status.prototype.drawBlock1 = function(y) {
        this.drawActorName(this._actor, 50, y);
    };
    
    Window_Status.prototype.drawBlock2 = function(y) {
        this.drawActorCharacter(this._actor, 20, (36 * 1.5));
        this.drawBasicInfo(50, y - 15);
        this.drawExpInfo(50, y + 65);
    };

    Window_Status.prototype.drawBlock3 = function(y) {
        this.drawParameters(280, y);
        this.drawEquipments(430, y);
    };

    Window_Status.prototype.drawParameters = function(x, y) {
        var lineHeight = this.lineHeight();
        for (var i = 0; i < 6; i++) {
            var paramId = i + 2;
            var y2 = y + lineHeight/1.5 * i;
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(paramId), x, y2, 160);
            this.resetTextColor();
            this.drawText(this._actor.param(paramId), x + 40, y2, 60, 'right');
        }
    };  

    Window_Status.prototype.drawBasicInfo = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorLevel(this._actor, x, y);
        this.drawActorIcons(this._actor, x, y + lineHeight * 1);
        this.drawActorHp(this._actor, x, y + lineHeight - 10);
        this.drawActorMp(this._actor, x, y + lineHeight + 18);
    };

    Window_Status.prototype.drawExpInfo = function(x, y) {
        var lineHeight = this.lineHeight();
        var expTotal = TextManager.expTotal.format(TextManager.exp);
        var expNext = TextManager.expNext.format(TextManager.level);
        var value1 = this._actor.currentExp();
        var value2 = this._actor.nextRequiredExp();
        if (this._actor.isMaxLevel()) {
            value1 = '-------';
            value2 = '-------';
        }
        this.changeTextColor(this.systemColor());
        this.drawText(expTotal, x, y + lineHeight * 0, 185);
        this.drawText(expNext, x, y + lineHeight - 10, 185);
        this.resetTextColor();
        this.drawText(value1, x, y + lineHeight * 0, 185, 'right');
        this.drawText(value2, x, y + lineHeight - 10, 185, 'right');
    };

    Window_Status.prototype.drawActorHp = function (actor, x, y, width) {
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

    Window_Status.prototype.drawActorMp = function (actor, x, y, width) {
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

    Window_Status.prototype.drawActorLevel = function(actor, x, y, width) {
        width = width || 186;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, width);
        this.resetTextColor();
        this.drawText(actor.level, x, y, width, 'right');
    };

})();
