/*:
* @plugindesc Change Basic Battle manager menu to a new basic battle manager =D.
* @author Afonso Medeiros : https://github.com/afonsomedeiros
*
* @help https://github.com/afonsomedeiros
*
*/

(function () {

    BattleManager.displayStartMessages = function () { };

    Window_PartyCommand.prototype.initialize = function() {
        var y = Graphics.boxHeight - this.windowHeight();
        var x = Graphics.boxWidth - this.windowWidth();
        Window_Command.prototype.initialize.call(this, x, y);
        this.openness = 0;
        this.deactivate();
    };

    Window_ActorCommand.prototype.initialize = function() {
        var y = Graphics.boxHeight - this.windowHeight();
        var x = Graphics.boxWidth - this.windowWidth();
        Window_Command.prototype.initialize.call(this, x, y);
        this.openness = 0;
        this.deactivate();
        this._actor = null;
    };

    Window_BattleStatus.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        var y = Graphics.boxHeight - height;
        Window_Selectable.prototype.initialize.call(this, 0, y, width, height);
        this.refresh();
        this.openness = 0;
    };

    Scene_Battle.prototype.updateWindowPositions = function() {
        var statusX = 0;
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x += 16;
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x = statusX;
            }
        }
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x -= 16;
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x = statusX;
            }
        }
    };

    Window_BattleStatus.prototype.select = function(index) {
        this._index = index;
        this._stayCount = 0;
        this.callUpdateHelp();
    };

    Window_BattleStatus.prototype.standardFontSize = function() {
        return 20;
    }

    Window_BattleStatus.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    }

    Window_BattleStatus.prototype.numVisibleRows = function() {
        return 1;
    };

    Window_BattleStatus.prototype.numVisibleCols = function () {
        return 4;
    };

    Window_BattleStatus.prototype.drawBasicArea = function (rect, actor, index) {
        let deslocation = index * Window_Base._faceWidth + 10;
        this.drawActorFace(actor, rect.x + deslocation, 0, Window_Base._faceWidth, 100);
        this.drawActorIcons(actor, Window_Base._faceWidth - Window_Base._iconWidth + deslocation, 0, rect.width - 85);
    };

    Window_BattleStatus.prototype.drawItem = function (index) {
        var actor = $gameParty.battleMembers()[index];
        this.drawBasicArea(this.basicAreaRect(index), actor, index);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor, index);
    };

    Window_BattleStatus.prototype.drawGaugeArea = function(rect, actor, index) {
        if ($dataSystem.optDisplayTp) {
            this.drawGaugeAreaWithTp(rect, actor, index);
        } else {
            this.drawGaugeAreaWithoutTp(rect, actor, index);
        }
    };

    Window_BattleStatus.prototype.drawGaugeAreaWithoutTp = function(rect, actor, index) {
        let deslocation = (index * Window_Base._faceWidth + 10);
        this.drawActorHpMp(actor, ((Window_Base._faceWidth / 2) - 40) + deslocation, 110, 55)
    };

    Window_BattleStatus.prototype.drawActorHpMp = function (actor, x, y, width) {
        width = width || 186;
        var labelWidth = this.textWidth('/');
        var valueWidth = this.textWidth('0000');
        console.log(labelWidth, valueWidth)
        if ((100 * actor.hp) / actor.mhp >= 20){
            this.changeTextColor(this.tpGaugeColor1());
        } else {
            this.changeTextColor(this.crisisColor());
        } 
        this.drawText(actor.hp, x - labelWidth * 2, y, valueWidth, "right")
        this.changeTextColor(this.normalColor());
        this.drawText("/", x + valueWidth - labelWidth / 2, y, labelWidth)
        this.changeTextColor(this.mpGaugeColor1());
        this.drawText(actor.mp, x + valueWidth + labelWidth + 5, y, valueWidth)
    };

    
    Window_BattleSkill.prototype.standardFontSize = function() {
        return 15;
    }

    Window_BattleSkill.prototype.maxCols = function() {
        return 3;
    };

    Scene_Battle.prototype.createSkillWindow = function() {
        var x = this._statusWindow.x;
        var y = this._statusWindow.y;
        var w = this._statusWindow.windowWidth();
        var h = this._statusWindow.windowHeight();
        this._skillWindow = new Window_BattleSkill(x, y, w, h);
        this._skillWindow.setHelpWindow(this._helpWindow);
        this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
        this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
        this.addWindow(this._skillWindow);
    };

    Scene_Battle.prototype.createEnemyWindow = function() {
        this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
        this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
        this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
        this.addWindow(this._enemyWindow);
    };

    Window_BattleEnemy.prototype.standardFontSize = function() {
        return 15;
    }

    Window_BattleEnemy.prototype.maxCols = function() {
        return 3;
    };

    Scene_Battle.prototype.createItemWindow = function() {
        var x = this._statusWindow.x;
        var y = this._statusWindow.y;
        var w = this._statusWindow.windowWidth();
        var h = this._statusWindow.windowHeight();

        this._itemWindow = new Window_BattleItem(x, y, w, h);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
    };

    Window_BattleItem.prototype.maxCols = function() {
        return 3;
    };
    
})();
