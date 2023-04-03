/*:
 * @plugindesc Change Basic item menu to a new basic item menu =D.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 */

(function () {

    var _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_create.call(this);

        const Y = 10;

        this._categoryWindow.width = 150;
        this._categoryWindow.x = Graphics.boxWidth - this._categoryWindow.width - Y;
        this._categoryWindow.y = Y;

        this._itemWindow.width = 270;
        this._itemWindow.height = 380;
        this._itemWindow.x = Graphics.boxWidth - this._itemWindow.width - this._categoryWindow.width - Y;
        this._itemWindow.y = Y;

        this._actorWindow.y = Y
    }

    Scene_Item.prototype.onCategoryOk = function () {
        this._helpWindow.open();
        this.addWindow(this._helpWindow);

        this._helpWindow.width = Graphics.boxWidth - this._itemWindow.width - this._categoryWindow.width - 20;
        this._helpWindow.x = 10;
        this._helpWindow.y = 10;
        this._helpWindow.height = 380;

        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    Scene_Item.prototype.onItemCancel = function () {
        this._helpWindow.close();
        this.removeChild(this._helpWindow);
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    };

    Scene_Item.prototype.createHelpWindow = function () {
        this._helpWindow = new Window_Help(5);
        this._helpWindow.setText(this.helpWindowText());
        this._helpWindow.close();
    };

    Scene_Item.prototype.helpWindowText = function () {
        return 'Descrição:';
    };

    Window_Help.prototype.setItem = function (item) {
        this.setText(item ? "Descrição: " + item.description : '');
    };

    Window_Help.prototype.standardFontSize = function () {
        return 15;
    }

    Window_ItemList.prototype.drawItemName = function (item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 8;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x, y);
            this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        }
    };

    Window_ItemList.prototype.standardFontSize = function () {
        return 15;
    }

    Window_ItemList.prototype.maxCols = function () {
        return 1;
    };

    Window_ItemCategory.prototype = Object.create(Window_MenuCommand.prototype);
    Window_ItemCategory.prototype.constructor = Window_ItemCategory;

    Window_ItemCategory.prototype.initialize = function () {
        Window_MenuCommand.prototype.initialize.call(this, 0, 0);
    };

    Window_ItemCategory.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_ItemCategory.prototype.maxCols = function () {
        return 1;
    };

    Window_ItemCategory.prototype.maxRows = function () {
        return 4;
    };

    Window_ItemCategory.prototype.update = function () {
        Window_MenuCommand.prototype.update.call(this);
        if (this._itemWindow) {
            this._itemWindow.setCategory(this.currentSymbol());
        }
    };

    Window_ItemCategory.prototype.makeCommandList = function () {
        this.addCommand(TextManager.item, 'item');
        this.addCommand(TextManager.weapon, 'weapon');
        this.addCommand(TextManager.armor, 'armor');
        this.addCommand(TextManager.keyItem, 'keyItem');
    };

    Window_ItemCategory.prototype.setItemWindow = function (itemWindow) {
        this._itemWindow = itemWindow;
    };

    Window_MenuActor.prototype.windowWidth = function () {
        return 270;
    };

    Window_MenuActor.prototype.windowHeight = function () {
        return 380;
    };

})();