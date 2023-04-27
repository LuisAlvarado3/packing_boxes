class Box{
    #Id        = "";
    #typeBox   = "";
    #Status    = "inactive"
    #resultBox = Object();

    constructor( typeBox = "vertical", id = "" ){
        this.#Id        =         id;
        this.#typeBox   =    typeBox;
        this.#Status    = "inactive";
        this.#resultBox = document.createElement( "div" );
        this.#getIdentity();
    }

    get(){
        return this.#resultBox;
    }

    getId(){
        return this.#Id;
    }

    getStatus(){
        return this.#Status;
    }

    getTypeBox(){
        return this.#typeBox;
    }

    reverseStatus(){
        this.#resultBox = document.getElementById( this.#Id );
        this.#resultBox.className = "box " + this.#typeBox + " ";
        if( this.#Status == "inactive" ){
            this.#resultBox.className += "active";
            this.#Status = "active";

        }else{
            this.#resultBox.className += "inactive";
            this.#Status = "inactive";
        }
    }

    #getIdentity(){
        this.#resultBox.className = "box "+this.#typeBox + " " + " " +this.#Status;
        this.#resultBox.id        =        this.#Id;
    }

}