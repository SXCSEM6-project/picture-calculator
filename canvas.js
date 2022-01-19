// const imgSz = 64
// var xp = '' 	//stores expresion
// var thicc = 5		//canvas line thiccness (original: 5, dataset_creation: 7)
// const true_labels = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')','^']

const canvas = document.getElementById("c");
const context = canvas.getContext("2d");
let ln_color = "black";
let canvas_color = "#fafafa";

// const webcamElement = document.getElementById('webcam');
// const canvasElement = canvas;
// const webcam = new Webcam(webcamElement, 'enviroment', canvasElement);  //user or enviroment

//VIDEO REALTED OPERATIONS
// const start_vdo = function(){
// 	webcamElement.style.display = "block";
// 	webcam.start()
//    .then(result =>{
//       console.log("webcam started");
//    })
//    .catch(err => {
//        console.log(err);
//    });
// }

// const take_pic = function(){
// 	var picture = webcam.snap();
//   	context.drawImage(picture, 0, 0);
// }

// const flip_vdo = function(){
// 	webcam.flip();
// }

// const stop_vdo = function(){
// 	webcamElement.style.display = "none";
// 	webcam.stop();
// }





// //LOADING MODEL
// async function loadModel() {
//     model = undefined;
// 	url = "https://raw.githubusercontent.com/SXCSEM6-project/ModelStore/main/model.json"
//     model = await tf.loadLayersModel(url);
//     console.log("model loaded")
// 		// console.log(model.summary())

// 	document.getElementById('wait').style.display="none"
//   	document.getElementById('work').style.display="block"
// }
// loadModel()




//MOUSE EVENTS
context.fillStyle = canvas_color;
context.lineWidth = thicc;
context.fillRect(0, 0, canvas.width, canvas.height);
canvas.addEventListener("mousedown", (event)=>{
	context.beginPath();
	context.moveTo(event.offsetX, event.offsetY);
	canvas.addEventListener("mousemove",draw,false)
}, false)
canvas.addEventListener("mouseup", (event)=>{
	canvas.removeEventListener("mousemove",draw,false);
}, false);
document.body.addEventListener("mouseup", (event)=>{
	canvas.removeEventListener("mousemove",draw,false);
}, false);




//TOUCH EVENTS
// context.fillRect(0, 0, canvas.width, canvas.height);
// canvas.addEventListener("touchstart", (event)=>{
// 	context.beginPath();
// 	context.moveTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
// 	canvas.addEventListener("touchmove",draw_touch,false)
// }, false)
// canvas.addEventListener("touchend", (event)=>{
// 	canvas.removeEventListener("touchmove",draw_touch,false);
// }, false);
// document.body.addEventListener("touchend", (event)=>{
// 	canvas.removeEventListener("touchmove",draw_touch,false);
// }, false);
//
const draw = function(event){
	context.strokeStyle = ln_color;
	context.lineTo(event.offsetX, event.offsetY);
	context.moveTo(event.offsetX, event.offsetY);
	context.stroke();
}
//
// const draw_touch = function(event){
// 	context.strokeStyle = ln_color;
// 	context.lineTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
// 	context.moveTo(event.touches[0].clientX - canvas.offsetLeft, event.touches[0].clientY - canvas.offsetTop);
// 	context.stroke();
// }





//CLEARING THE CANVAS
function clrCnv(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = canvas_color;
	context.lineWidth = thicc;
	context.fillRect(0, 0, canvas.width, canvas.height);
	document.getElementById("xp").value= ''
}




//ERASER
const toggle = function(flag){
	let toggle_but = document.getElementById("mode")
	if(toggle_but.innerHTML == "ERASE" && flag){
		canvas.style.border = "2px solid red";
		ln_color = canvas_color;
		context.lineWidth = 30;
		toggle_but.innerHTML = "WRITE";
	}
	else if(toggle_but.innerHTML == "WRITE"){
		canvas.style.border = "0px solid black";
		ln_color = "black";
		context.lineWidth = thicc;
		toggle_but.innerHTML = "ERASE";
	}
}



//SERVER INTARACTION
// const convert = function(){
// 	return new Promise(function(resolve, reject){
// 		let png = canvas.toDataURL("image/png")
// 		var msg = JSON.stringify(png);
// 		//console.log(msg)
//   		var xhr = new XMLHttpRequest();
//   		// console.log(xhr.open('POST',"/convert",true));
// 		xhr.open('POST',"/convert",true)
// 		xhr.send(msg);
// 		xhr.onload = (res) => {
// 			// console.log(res['target']['response']);
//       		srvRes = res['target']['response'];
// 			resolve(srvRes)
// 		};
//   		//alert('file is saved');
// 	});
// }


// function  getResult(){	//reads image from canvas
// 	console.clear()
// 	toggle(false)
// 	document.getElementById("xp").value= 'Calculating...'

// 	convert().then(function(res) {
// 		//console.log(res)
// 		document.getElementById('imgRd').innerHTML = res
// 		var l = document.getElementById("imgRd").childElementCount;
// 		var img = document.getElementById(`img${l-1}`)
// 		img.onload = function() {
// 			xp = ''
// 			for(let i=0;i<l;i++) {
// 				var img = document.getElementById(`img${i}`)
// 				console.log(img.id);
// 				imgT = tf.browser.fromPixels(img,1); //reads image to be sent to model
// 				// console.log(imgT)
// 				ans(imgT,i)	//PREDICT
// 			}
// 			try{
// 				xp_res = Math.round((eval(xp.replaceAll("^","**")) + Number.EPSILON) * 10000) / 10000
// 				document.getElementById("xp").value= `${xp} = ${xp_res}`
// 			}
// 			catch(err){
// 				document.getElementById("xp").value= "Erroneous expression: " + xp
// 			}
// 		}
// 	}).catch (function(err) {
//    	console.error(err);
//   });
// }



// function ans(img, i){ //thickens img and predicts ans
// 	//pooling
// 	cnv = document.createElement("canvas")
// 	cnv.id = `cnv${i}`
// 	cnv.height = imgSz
// 	cnv.width = imgSz
// 	document.getElementById('imgRd').appendChild(cnv)
// 	temp = tf.pool(img, 3, 'max', 'same')		//pooling
// 	temp = temp.div(tf.scalar(255))
// 	tf.browser.toPixels(temp, document.getElementById(`cnv${i}`))		//visual analysis


// 	//prediction
// 	v = model.predict( tf.tensor( [ temp.arraySync() ] ) )
// 	res = tf.tensor( v.dataSync() ).argMax().dataSync()
// 	console.log( true_labels[ res[0] ] )
// 	console.log( v.arraySync()[0][ res[0] ] )
// 	console.log( v.arraySync()[0] )
// 	xp+=true_labels[ res[0] ];
// }
