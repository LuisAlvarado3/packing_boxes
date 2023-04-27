class Bed{
    #Id        =        0;
    #typeBed   =       "";
    #boxes     =       [];
    #resultBed = Object();

    constructor( id = 1 ){
        this.#Id = id;
        this.#boxes = [];
        this.#resultBed = document.createElement( "div" );
        this.#resultBed.className = "bed";
        this.#getTypeBed( );
        this.#packBoxes(   );

    }

    get(){
        return this.#resultBed;
    }

    getArrBoxes(){
        return this.#boxes;
    }

    showBoxes(){
        this.#boxes.forEach( (element) => {
            console.log( element );
        });
        console.log();
    }

    lightBoxesOneByOne(){
        this.#boxes
        for( let itemBox=this.#boxes[0].getId(); itemBox < this.#boxes[0].getId()+6; itemBox++ ){
            let currentBox = this.#boxes[ itemBox   ];
            let nextBox    = this.#boxes[ itemBox+1 ];
            setTimeout( () => {
                currentBox.reverseStatus();
            }, 800);

            nextBox.reverseStatus();
            currentBox.reverseStatus();

        }
        this.#boxes[ this.#boxes.length - 1 ].reverseStatus()

    }

    #packBoxes(){
        if( this.#typeBed == "odd" ){
            let item = 0;
            for( let group = 1; group <= 2; group++ ){
                this.#getBoxes( "horizontal", item );
                item+=2;
            }
            this.#getBoxes( "vertical", item );

        }else{
            let item = 7;
            this.#getBoxes( "vertical", item );
            item += 3;
            for( let group = 1; group <= 2; group++ ){
                this.#getBoxes( "horizontal", item );
                item+=2;
            }

        }
    }

    #getBoxes( typeBox="horizontal", item=0 ){
        let divGroup       = document.createElement( "div" );
        divGroup.className = "group";
        let packing        =       0;
        let elements       =       0;

        if ( typeBox == "horizontal" ){
            elements = 2
        }else{
            elements = 3
        }

        let idItem = item;
        
        if( this.#Id > 2 && this.#typeBed=="odd" ){
            idItem += (7*( this.#Id-1) );
        }else if(  this.#Id > 2 && this.#typeBed=="pair" ){
            idItem += (7*( this.#Id-2 ) );
        }
        for( packing = 1; packing <= elements; packing++ ){
            let objBox = new Box( typeBox, ( idItem+packing ));
            this.#boxes.push( objBox );
            divGroup.appendChild( objBox.get() );
        }

        this.#resultBed.appendChild( divGroup );
    }

    #getTypeBed( ){
        if( (this.#Id%2) == 0 ){
            this.#typeBed = "pair";
        }else{
            this.#typeBed  = "odd";
        }
    }
}