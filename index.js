'use strict';

class ItmeAnimation {

	constructor(){
		this.animationSet = {
			0: {
				left:0,
				top:0,
				rotate: 0,
				scaleX: 1,
				scaleY: 1
			},
			1: {
				left: 500,
				top: 0,
				rotate: 360,
				scaleX: .5,
				scaleY: .4
			}
		};
		this.duration = 1000;
		this.startTimestamp;
		this.move = false;
		this.progress = 0;
		
		let btn = document.querySelector('.play');	
		btn.addEventListener('click', ()=> {	
			this.startTimestamp = Date.now() - Math.floor(this.duration*this.progress);
			if(!this.move){
				this.move = true;
				this.play((this.progress<1)?this.progress:0);
			}else{
				this.move = false;
			}
		
		});

		let input = document.querySelector('.input');
	    input.addEventListener('change', (event)=>{  
	    	let value = event.target.value;
	    	this.progress = value/10;
	    	this.render(this.getStyle(this.progress));
	    });

	}
	play(currentProgress){

		let input = document.querySelector('.input');
		let requestAnimationFrame = window.requestAnimationFrame ||
									window.mozRequestAnimationFrame ||
									window.webkitRequestAnimationFrame ||
									window.msRequestAnimationFrame;
		if(!this.move){
			return; 
		}else{		
			this.render(this.getStyle(currentProgress));	
			input.value = Math.round(currentProgress * 10);
			if (currentProgress < 1){
				requestAnimationFrame( ()=> {
					this.progress = (Date.now() - this.startTimestamp)/1000;				
					this.play((this.progress < 1) ? this.progress : 1);	

					if(this.progress >=1){
						console.log(this.progress, 'mtaaa');
						this.move = false;
						console.log(this.move , 'this.move ');
					}			
				});
			}
		}	
	}
	getStyle(currentProgress){
		let startPoint = this.animationSet[0];
		let endPoint = this.animationSet[1];
		let style = {};
		Object.keys(startPoint).forEach(function(key){
			style[key] = startPoint[key] + (endPoint[key] - startPoint[key])*currentProgress;
		})
		return style;
	}
	render(style){
		document.querySelector('.animated-item').style.left = style.left+'px';
		document.querySelector('.animated-item').style.top = style.top+'px';
		document.querySelector('.animated-item').style.transform = 'rotate('+style.rotate+'deg) scale('+style.scaleX+','+style.scaleY+')';
	}
}

new ItmeAnimation();