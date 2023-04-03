/*:
 * @plugindesc Change Basic Equip menu to a new basic Equip menu =D.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 */

(function () {

    var _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function () {
        _Scene_Equip_create.call(this);

        this._commandWindow.width = 200;
        this._commandWindow.height = 145;
        this._commandWindow.x = Graphics.boxWidth - this._commandWindow.width - 10;
        this._commandWindow.y = 10;

        this._commandWindow.refresh();
        this._commandWindow.select(0);

        this._slotWindow.width = 200;
        this._slotWindow.x = Graphics.boxWidth - this._commandWindow.width - 10;
        this._slotWindow.y = this._commandWindow.height + 10;

        this._itemWindow.width = 210;
        this._itemWindow.height = this._statusWindow.height;
        this._itemWindow.x = Graphics.boxWidth - this._itemWindow.width - this._commandWindow.width - 10;
        this._itemWindow.y = 10;

        this._statusWindow.width = 210;
        this._statusWindow.x = Graphics.boxWidth - this._statusWindow.width - this._itemWindow.width - this._commandWindow.width - 10;
        this._statusWindow.y = 10;

        this._helpWindow.x = Graphics.boxWidth - this._statusWindow.width - this._itemWindow.width - this._commandWindow.width - 10;
        this._helpWindow.y = this._statusWindow.height; //Graphics.boxHeight - this._helpWindow.height - 10;
        this._helpWindow.width = 420;
        this._helpWindow.height = this._helpWindow.height - 25;
    }

    Window_EquipItem.prototype.maxCols = function() {
        return 1;
    };

    Window_EquipCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_EquipCommand.prototype.maxRows = function() {
        return 3;
    };

    Window_EquipCommand.prototype.standardFontSize = function () {
        return 15;
    }

    Window_EquipStatus.prototype.standardFontSize = function () {
        return 15;
    }

    Window_EquipSlot.prototype.standardFontSize = function () {
        return 15;
    }

    Window_EquipSlot.prototype.drawItem = function(index) {
        if (this._actor) {
            var equip = this._actor.equips()[index];
            var slotName = this.slotName(index);

            var rect = this.itemRectForText(index);
            this.changeTextColor(this.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            if (equip == null) {
                this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
            } else {
                this.drawItemName(equip, rect.x, rect.y);    
            }
            this.changePaintOpacity(true);
        }
    };

    Window_EquipStatus.prototype.drawItem = function(x, y, paramId) {
        this.drawParamName(x + this.textPadding(), y, paramId);
        if (this._actor) {
            this.drawCurrentParam(x + 60, y, paramId);
        }
        this.drawRightArrow(x + 110, y);
        if (this._tempActor) {
            this.drawNewParam(x + 115, y, paramId);
        }
    };

})();
