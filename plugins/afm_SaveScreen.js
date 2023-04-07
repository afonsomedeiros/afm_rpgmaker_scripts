/*:
 * @plugindesc Change Basic Save Screen to a new basic Save Screen.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 */

(function () {

    Window_SavefileList.prototype.standardFontSize = function () {
        return 15;
    }

    Window_SavefileList.prototype.drawItem = function(index) {
        var id = index + 1;
        var valid = DataManager.isThisGameFile(id);
        var info = DataManager.loadSavefileInfo(id);
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        if (this._mode === 'load') {
            this.changePaintOpacity(valid);
        }
        this.drawFileId(id, rect.x, rect.y);
        if (info) {
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid, index);
            this.changePaintOpacity(true);
        }
    };

    Window_SavefileList.prototype.drawFileId = function (id, x, y) {
        var width_file = this.textWidth(TextManager.file + ' ');
        this.drawText(TextManager.file + ' ' + id, x, y, width_file);
    };

    Window_SavefileList.prototype.drawContents = function (info, rect, valid, index) {
        var bottom = rect.y + rect.height;
        if (valid) {
            this.drawPartyCharacters(info, rect.x + 20, bottom - 4);
        }
        var lineHeight = this.lineHeight();
        var y2 = bottom - lineHeight;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };

    Window_SavefileList.prototype.maxVisibleItems = function() {
        return 3;
    };

    Scene_Save.prototype.createListWindow = function () {
        var width = 350;
        var height = 300;
        var x = Graphics.boxWidth - width;
        this._listWindow = new Window_SavefileList(x, 0, width, height);
        this._listWindow.setHandler('ok', this.onSavefileOk.bind(this));
        this._listWindow.setHandler('cancel', this.popScene.bind(this));
        this._listWindow.select(this.firstSavefileIndex());
        this._listWindow.setTopRow(this.firstSavefileIndex() - 2);
        this._listWindow.setMode(this.mode());
        this._listWindow.refresh();
        this.addWindow(this._listWindow);
    };
    Scene_Load.prototype.createListWindow = Scene_Save.prototype.createListWindow;

    Scene_Save.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_Help(1);
        this._helpWindow.setText(this.helpWindowText());
    };
    Scene_Load.prototype.createHelpWindow = Scene_Save.prototype.createHelpWindow;
})();
