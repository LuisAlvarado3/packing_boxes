class App{
    #numberBed       =  0;
    #boxesCounter    =  0;
    #stowageCounter  =  0;
    #batchCounter    =  0;
    #itemStoawage    =  9;
    #arrBoxes = [];
    #arrBeds  = [];

    constructor( numberBeds = 2 ) {
        this.#numberBed      = numberBeds;
        this.#boxesCounter   =  0;
        this.#stowageCounter =  0;
        this.#batchCounter   =  0;
        this.#itemStoawage   =  9;
        this.#arrBoxes = [];
        this.#arrBeds  = [];
        this.timer     = Object();

        this.#getDivsFromForm();
        this.#getArrBedsAndBoxes();
        this.#applyAllEvents();

    }

    #getDivsFromForm(){
        this.objStowage = new BarStowage();
        this.divBeds        = document.getElementById( "bed"              );
        this.divBoxes       = document.getElementById( "box-labels"       );
        this.divStowage     = document.getElementById( "stowage-labels"   );
        this.divBatch       = document.getElementById( "batch-labels"     );
        this.divNumberBoxes = document.getElementById( "number-boxes" );
        this.btnStart       = document.getElementById( "start"        );
        this.btnStop        = document.getElementById( "stop"         );
        this.btnStop.disabled = true;
    }

    #applyAllEvents(){
        // ----- Boxes ----- //
        this.divNumberBoxes.addEventListener( "change", () => {
            this.btnStart.disabled = false;
            this.btnStop.disabled  =  true;
            clearInterval( this.timer );
            this.objStowage.classNameAllInactive();

            this.#initParams();
            this.#clearAllBoxesInHTML();
            let number = parseInt( this.divNumberBoxes.value );
            if(number != NaN && number >1 ){
                    this.#numberBed = number;
                    this.#getArrBedsAndBoxes();
            }else{
                this.divNumberBoxes.value = 2;
                this.#numberBed           = 2;
                this.#getArrBedsAndBoxes( );
            }
        });

        // ----- Buttons ----- //
        this.btnStart.addEventListener( "click", () => {
            this.#arrBoxes.forEach( (box)=>{
                if (box.getStatus() == "active" ){
                    box.reverseStatus();
                }
            });

            this.objStowage.classNameAllInactive();

            this.btnStart.disabled =  true;
            this.btnStop.disabled  = false;
            this.#clearPoints( );
            this.#mainloop   ( );
        });
        this.btnStop.addEventListener( "click", () => {
            this.btnStart.disabled = false;
            this.btnStop.disabled  =  true;
            clearInterval( this.timer );
        });
    }

    #clearAllBoxesInHTML(){
        while( this.divBeds.hasChildNodes() ){
            this.divBeds.removeChild( this.divBeds.firstChild );
        }
    }

    #clearPoints (){
        this.#boxesCounter   =  0;
        this.#stowageCounter =  0;
        this.#batchCounter   =  0;
        this.#itemStoawage   =  9;
        this.divBoxes  .innerText =   this.#boxesCounter;
        this.divStowage.innerText = this.#stowageCounter;
        this.divBatch  .innerText =   this.#batchCounter;
    }

    #getArrBedsAndBoxes(){
        for( let item=1; item<=this.#numberBed; item++){
            let objBed = new Bed( item );
            this.#arrBeds.push( objBed );
            this.divBeds.appendChild( objBed.get() );

            objBed.getArrBoxes().forEach( (box) => {
                this.#arrBoxes.push( box );
            });
        }
    }

    #mainloop( ){
        // console.log( this.#arrBoxes.length );
        let item       = 0;
        let itemGlobal = 1;
        let end        = this.#arrBoxes.length-1;

        this.timer = setInterval( () => {
            if( item < end ){
                if( item == 0 && this.#arrBoxes[0].getStatus()=="inactive" ){ 
                    this.#arrBoxes[  0  ].reverseStatus();
                    if( this.#arrBoxes[ end ].getStatus() == "active" ){
                        this.#arrBoxes[ end ].reverseStatus();
                    }
                }else{
                    this.#arrBoxes[ item-1 ].reverseStatus();
                    this.#arrBoxes[ item   ].reverseStatus();
                }
                console.log( itemGlobal );
                item += 1;
            }else{
                this.#arrBoxes[ item-1 ].reverseStatus();
                this.#arrBoxes[ item   ].reverseStatus();
                item = 0;
            }
            this.#updateDivs( itemGlobal );

            itemGlobal += 1;
        }, 700);

    }

    #updateDivs( itemGlobal = 0 ){
        this.#boxesCounter = itemGlobal;
        this.divBoxes.innerText =  this.#boxesCounter;

        // if(itemGlobal % 10 == 0  ){}

        if( this.#boxesCounter!=0 && (this.#boxesCounter%7) == 0 ){


            if( this.#itemStoawage >= 0 ){
                this.objStowage.reverseStatus( this.#itemStoawage );
                this.#itemStoawage -= 1;
            }else{
                this.objStowage.classNameAllInactive();
                this.#itemStoawage = 9;
                this.objStowage.reverseStatus( this.#itemStoawage );
                this.#itemStoawage -= 1;
            }


            this.#stowageCounter +=1;
            this.divStowage.innerText = this.#stowageCounter;

            if( this.#stowageCounter !=0 && (( this.#stowageCounter%10 ) == 0) ){
                this.#batchCounter +=1;
                // this.#stowageCounter
                this.divBatch.innerText = this.#batchCounter;
            }
        }
        // console.log( this.#batchCounter );
    }

    #initParams(){
        this.#numberBed      = 0;
        this.#boxesCounter   = 0;
        this.#stowageCounter = 0;
        this.#batchCounter   = 0;
        this.#arrBoxes = [];
        this.#arrBeds  = [];
        this.timer     = Object();
    }
}