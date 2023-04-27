class App{
    #numberBed       = 0;
    #boxesCounter    = 0;
    #stowageCounter  = 0;
    #batchCounter    = 0;
    #arrBoxes = [];
    #arrBeds  = []

    constructor( numberBeds = 0 ) {
        this.#numberBed      = numberBeds;
        this.#boxesCounter   = 0;
        this.#stowageCounter = 0;
        this.#batchCounter   = 0;
        this.#arrBoxes = [];
        this.#arrBeds  = [];
        this.timer     = Object();

        this.divBeds    = document.getElementById( "bed"            );
        this.divBoxes   = document.getElementById( "box-labels"     );
        this.divStowage = document.getElementById( "stowage-labels" );
        this.divBatch   = document.getElementById( "batch-labels"   );
        this.#getArrBedsAndBoxes();

        this.btnStart   = document.getElementById( "start"          );
        this.btnStop    = document.getElementById( "stop"           );
        this.btnStop.disabled = true;


        this.btnStart.addEventListener( "click", () => {
            this.#arrBoxes.forEach( (box)=>{
                if (box.getStatus() == "active" ){
                    box.reverseStatus();
                }
            });
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

    #clearPoints (){
        this.#boxesCounter   = 0;
        this.#stowageCounter = 0;
        this.#batchCounter   = 0;
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
        let end        = this.#arrBoxes.length;

        this.timer = setInterval( () => {
            if( item < end ){
                if( item == 0 ){ this.#arrBoxes[item].reverseStatus(); }
                else{
                    this.#arrBoxes[ item-1 ].reverseStatus();
                    this.#arrBoxes[ item   ].reverseStatus();
                }
                item += 1;
            }
            else{
                this.#arrBoxes[ item-1 ].reverseStatus();
                //clearInterval( timer );
                item = 0;
            }

            this.#updateDivs( itemGlobal );
            itemGlobal += 1;
        }, 100);

    }
    
    #updateDivs( itemGlobal = 0 ){
        this.#boxesCounter = itemGlobal;
        this.divBoxes.innerText =  this.#boxesCounter;

        if( this.#boxesCounter!=0 && (this.#boxesCounter%7) == 0 ){
            this.#stowageCounter +=1;
            this.divStowage.innerText = this.#stowageCounter;
            
            if( this.#stowageCounter !=0 && (( this.#stowageCounter%10 ) == 0) ){
                this.#batchCounter +=1;
                this.divBatch.innerText = this.#batchCounter;
            }
        }
        // console.log( this.#batchCounter );
    }


}