class BarStowage{
    constructor(){
        this.numberItems = 10
        this.arrItems    = [];
        this.idBarStowage = document.getElementById( "bar-stowage" );
        this.appendItems()
    }

    appendItems(){
        for( let item = 1; item <= this.numberItems; item++ ){
            let itemStoawage = document.createElement( "div" );
            itemStoawage.className =  "item-stowage inactive";
            itemStoawage.id        = "stowage"+String( item );

            this.arrItems.push( itemStoawage );
            this.idBarStowage.appendChild( itemStoawage );
        }
    }

    classNameAllInactive(){
        for(let item=0; item < this.arrItems.length; item++ ){
            this.arrItems[item].className = "item-stowage inactive";
        }
    }

    reverseStatus( item ){
        if (item<10 && item>=0){
            if( this.arrItems[item].className == "item-stowage inactive" ){
                this.arrItems[item].className = "item-stowage active";
            }else{
                this.arrItems[item].className = "item-stowage inactive"; 
            }
        }
    }
}