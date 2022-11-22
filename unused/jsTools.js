export function changeTier() {

    var whatTier =  window.prompt('what tier?');
   
    var patern = /tier-/
   
    switch(whatTier) {
   
     case '1': if(patern.test(this.classList)) break; this.classList.add('tier-1'); break;
     case '2': if(patern.test(this.classList)) break; this.classList.add('tier-2'); break;
     case '3': if(patern.test(this.classList)) break; this.classList.add('tier-3'); break;
     case '4': if(patern.test(this.classList)) break; this.classList.add('tier-4'); break;
     case '5': if(patern.test(this.classList)) break; this.classList.add('tier-5'); break;
     case '6': if(patern.test(this.classList)) break; this.classList.add('tier-6'); break;
     case '0':  this.classList.remove('tier-1');
                this.classList.remove('tier-2'); 
                this.classList.remove('tier-3'); 
                this.classList.remove('tier-4'); 
                this.classList.remove('tier-5'); 
                this.classList.remove('tier-6'); break;
     
     default: alert('default');
     
    }
   
    this.querySelector('div').innerHTML = this.classList ;
    report();
   
   }