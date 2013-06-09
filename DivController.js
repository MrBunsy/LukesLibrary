/* 
 * Copyright Luke Wallin 2012
 * 
 * Written for the TrainGame, designed to take some of the repeative stuf always done to a DIV
 */


var DivController = function(div,canvases){
    var self=this;
    
    this.div=div;
    
    this.width=parseInt(this.div.style.width);
    this.height=parseInt(this.div.style.height);
    this.pos = new Vector(this.div.offsetLeft,this.div.offsetTop);
    
    this.mouseDownCallback=function(pos){
    }
    
    this.mouseMoveCallback=function(pos){
    }
    
    this.mouseUpCallback=function(pos){
    }
    
    this.setMouseDown=function(callback){
        this.mouseDownCallback=callback;
    }
    
    this.setMouseUp=function(callback){
        this.mouseUpCallback=callback;
    }
    
    this.setMouseMove=function(callback){
        this.mouseMoveCallback=callback;
    }
    
    this.canvases=[];
    //[background, entities, animations, hud]
    this.ctxs=[];
    
    for(var i=0;i<canvases;i++){
        this.canvases[i] = document.createElement("canvas");
        this.canvases[i].width=this.width+1;
        this.canvases[i].height=this.height+1;
        this.canvases[i].style.position="absolute";
        this.canvases[i].style.top=this.pos.y+1;
        this.canvases[i].style.left=this.pos.x+1;
        
        this.div.appendChild(this.canvases[i]);
        
        this.ctxs[i]=this.canvases[i].getContext("2d");
    }
    
    
    
    
    this.getMousePos=function(e){
        var x,y;
                
        if(e.pageX || e.pageY){
            x=e.pageX;
            y=e.pageY;
        }else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        
        var canvasPos = $("#"+self.div.id).offset();
        x-=canvasPos.left;
        y-=canvasPos.top;
        
        return new Vector(x,y);
    }
    
    
    
    this.mouseDown=function(e){
        var mousePos = self.getMousePos(e);
        self.mouseDownCallback(mousePos);
    }
    
    this.mouseMove=function(e){
        var mousePos = self.getMousePos(e);
        self.mouseMoveCallback(mousePos);
    }
    
    this.mouseUp=function(e){
        var mousePos = self.getMousePos(e);
        self.mouseUpCallback(mousePos);
    }
    
    //    //not sure if to use this or not
    //    this.assignEventHandler = function(event,handler){
    //        this.div.addEventListener(event, handler,false);
    //    }
    
    
    this.div.addEventListener("mousedown", this.mouseDown,false);
    this.div.addEventListener("mouseup", this.mouseUp,false);
    this.div.addEventListener("mousemove", this.mouseMove,false);
}