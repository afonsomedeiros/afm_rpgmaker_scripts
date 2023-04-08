/*:
 * @plugindesc Change Basic item menu to a new basic item menu =D.
 * @author Afonso Medeiros : https://github.com/afonsomedeiros
 *
 * @help https://github.com/afonsomedeiros
 *
 */

(function () {

    var _scene_Shop_create = Scene_Shop.prototype.create
    Scene_Shop.prototype.create = function() {
        _scene_Shop_create.call(this)
        
        var diff = 10;
        this._commandWindow.x = Graphics.boxWidth - this._commandWindow.width - diff;
        this._commandWindow.y = diff;

        this._goldWindow.x = this._commandWindow.x;
        this._goldWindow.y = this._commandWindow.height + diff;
        this._goldWindow.width = this._commandWindow.width;

        this._categoryWindow.x = this._commandWindow.x;
        this._categoryWindow.y = this._commandWindow.y;
        this._categoryWindow.width = this._commandWindow.width;
        this._categoryWindow.height = this._commandWindow.height;

        this._sellWindow.width = 270;
        this._sellWindow.x = Graphics.boxWidth - this._commandWindow.width - this._sellWindow.width - diff;
        this._sellWindow.y = diff;
        this._sellWindow.height = this._buyWindow.height;

        this._buyWindow.width = this._sellWindow.width;
        this._buyWindow.x = Graphics.boxWidth - this._commandWindow.width - this._sellWindow.width - diff;
        this._buyWindow.y = diff

        this._helpWindow.width = this._buyWindow.width;
        this._helpWindow.x = this._buyWindow.x;
        this._helpWindow.y = this._buyWindow.height + diff;

        this._statusWindow.width = this._sellWindow.width;
        this._statusWindow.x = Graphics.boxWidth - this._commandWindow.width - this._sellWindow.width - this._statusWindow.width - diff;
        this._statusWindow.y = diff
        this._statusWindow.height = this._buyWindow.height + this._helpWindow.height;

        this._numberWindow.width = this._buyWindow.width;
        this._numberWindow.height = 100;

        this.replaceOrder();
    };

    Scene_Shop.prototype.replaceOrder = function(){
         this._windowLayer.removeChild(this._buyWindow);
         this._windowLayer.removeChild(this._numberWindow);
         this.addWindow(this._buyWindow)
         this.addWindow(this._numberWindow)

    }

    Scene_Shop.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this._helpWindow.hide();
        this.addWindow(this._helpWindow);
    };

    Scene_Shop.prototype.createDummyWindow = function() {
        var wy = this._commandWindow.y + this._commandWindow.height;
        var wh = Graphics.boxHeight - wy;
        this._dummyWindow = new Window_Base(0, wy, Graphics.boxWidth, wh);
    };

    Window_ShopCommand.prototype = Object.create(Window_Command.prototype);
    Window_ShopCommand.prototype.constructor = Window_ShopCommand;

    Window_ShopCommand.prototype.initialize = function (width, purchaseOnly) {
        this._purchaseOnly = purchaseOnly;
        Window_Command.prototype.initialize.call(this, 0, 0);
    };

    Window_ShopCommand.prototype.maxRows = function () {
        return 3;
    };

    Window_ShopCommand.prototype.maxCols = function() {
        return 1;
    };

    Window_ShopCommand.prototype.standardFontSize = function () {
        return 15;
    }

    Window_ShopSell.prototype.standardFontSize = function () {
        return 15;
    }
    
    Window_ShopBuy.prototype.standardFontSize = function () {
        return 15;
    }

    Window_ShopStatus.prototype.standardFontSize = function () {
        return 15;
    }

    Window_ShopNumber.prototype.standardFontSize = function () {
        return 15;
    }

    Window_ShopCommand.prototype.windowWidth = function() {
        return 150;
    };

    Window_ShopCommand.prototype.makeCommandList = function() {
        this.addCommand(TextManager.buy,    'buy');
        this.addCommand(TextManager.sell,   'sell',   !this._purchaseOnly);
        this.addCommand(TextManager.cancel, 'cancel');
    };

    Window_ShopStatus.prototype.drawPossession = function(x, y) {
        var width = this.contents.width - this.textPadding() - x - 50;
        var possessionWidth = this.textWidth('0000');
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.possession, x, y, width - possessionWidth);
        this.resetTextColor();
        this.drawText($gameParty.numItems(this._item), x, y, width - possessionWidth, 'right');
    };

    Window_ShopStatus.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            var x = this.textPadding();
            this.drawPossession(x, 0);
            if (this.isEquipItem()) {
                this.drawEquipInfo(x, this.lineHeight() * 1.5);
            }
        }
    };

    Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
        var members = this.statusMembers();
        this.drawText("Personagens Equipados:", x, y - 25, 168);
        this.drawHorzLine(y - 10);
        for (var i = 0; i < members.length; i++) {
            this.drawActorEquipInfo(x, y + this.lineHeight() * (i * 2.4) + 10, members[i]);
        }
        this.changePaintOpacity(true);
    };

    Window_ShopStatus.prototype.drawActorEquipInfo = function(x, y, actor) {
        var enabled = actor.canEquip(this._item);
        var item1 = this.currentEquippedItem(actor, this._item.etypeId);
        this.changePaintOpacity(enabled);
        if (this._item == item1){
            this.drawText(actor.name(), x, y, 168);
            if (enabled) {
                this.drawActorParamChange(x, y, actor, item1);
            }
            this.drawItemName(item1, x, y + this.lineHeight());
        }
    };

    Window_ShopStatus.prototype.drawHorzLine = function(y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
        this.contents.paintOpacity = 255;
    };

    Window_ShopNumber.prototype.itemY = function() {
        return Math.round(this.contentsHeight() / 2 - this.lineHeight() * 1.5) + 30;
    };

    Window_ShopNumber.prototype.drawMultiplicationSign = function() {
        var sign = '\u00d7';
        var width = this.textWidth(sign);
        var x = this.cursorX() - width * 2;
        var y = this.itemY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };

    Window_ShopNumber.prototype.drawNumber = function() {
        var x = this.cursorX();
        var y = this.itemY();
        var width = this.cursorWidth() - this.textPadding();
        this.resetTextColor();
        this.drawText(this._number, x, y, width, 'right');
    };
    
    Window_ShopNumber.prototype.drawTotalPrice = function() {
        var total = this._price * this._number;
        var width = this.contentsWidth() - this.textPadding();
        this.drawCurrencyValue(total, this._currencyUnit, 0, this.priceY() - 12, width);
    };

    Window_ShopBuy.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setItem(this.item());
        }
        console.log(this.item());
        this._helpWindow.show();
    };

    Window_ShopBuy.prototype.hide = function() {
        this.visible = false;
        this._helpWindow.hide();
    };

    Scene_Shop.prototype.onBuyOk = function() {
        this._item = this._buyWindow.item();
        var index = this._buyWindow.index();
        var rect = this._buyWindow.itemRect(index);
        this._numberWindow.x = (Graphics.boxWidth - this._commandWindow.width - this._sellWindow.width - 10) + (this._buyWindow.width / 2);
        this._numberWindow.y = rect.y + 40;
        this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
    };

    Scene_Shop.prototype.onSellOk = function() {
        this._item = this._sellWindow.item();
        var index = this._sellWindow.index();
        var rect = this._sellWindow.itemRect(index);
        this._numberWindow.x = (Graphics.boxWidth - this._commandWindow.width - this._sellWindow.width - 10) + (this._sellWindow.width / 2);
        this._numberWindow.y = rect.y + 40;
        this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
        this._numberWindow.setCurrencyUnit(this.currencyUnit());
        this._numberWindow.show();
        this._numberWindow.activate();
        this._statusWindow.setItem(this._item);
        this._statusWindow.show();
    };

    Scene_Shop.prototype.createNumberWindow = function() {
        var wy = this._dummyWindow.y;
        var wh = this._dummyWindow.height;
        this._numberWindow = new Window_ShopNumber(0, wy, wh);
        this._numberWindow.hide();
        this._numberWindow.setHandler('ok',     this.onNumberOk.bind(this));
        this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
        this.addWindow(this._numberWindow);
    };

})();