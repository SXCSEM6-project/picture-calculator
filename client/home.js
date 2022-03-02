function opennav() {
  			document.getElementById("navbar").style.width = "20%";
  			document.querySelector(".open").style.display= "none";
  			document.querySelector(".bgImage2").style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  			document.querySelector(".box1").style.display= "none";
  			document.querySelector(".box2").style.display= "block";
  			document.querySelector(".over").style.backgroundColor = "rgba(145, 209, 211, 0.8)";
  			document.getElementsByTagName('h1')[0].style.color="white";
}
function closenav() {
  			document.getElementById("navbar").style.width = "0%";
  			document.querySelector(".open").style.display= "block";
  			document.querySelector(".bgImage2").style.backgroundColor = "rgba(145, 209, 211, 0.8)";
  			document.querySelector(".bgImage3").style.left = "350px";
  			document.querySelector(".box1").style.display= "block";
  			document.querySelector(".box2").style.display= "none";
  			document.querySelector(".over").style.backgroundColor = "rgba(0,0,0, 0.8)";
  			document.getElementsByTagName('h1')[0].style.color="black";
}
function change_text1(){
  			document.querySelector(".box2").style.display= "none";
  			document.querySelector(".box3").style.display= "block";
  			document.querySelector(".bgImage3").style.backgroundImage= "url('./brush.jpg')";
  			document.querySelector(".bgImage3").style.animation ="fadeInAnimation2 2s ease";
}
function change_text2(){
  			document.querySelector(".box2").style.display= "none";
  			document.querySelector(".box4").style.display= "block";
  			document.querySelector(".bgImage3").style.backgroundImage= "url('./cam.jpg')";
  			document.querySelector(".bgImage3").style.animation ="fadeInAnimation2 2s ease";
}
function change_text3(){
  			document.querySelector(".box2").style.display= "none";
  			document.querySelector(".box5").style.display= "block";
  			document.querySelector(".bgImage3").style.backgroundImage= "url('./grp.png')";
  			document.querySelector(".bgImage3").style.animation ="fadeInAnimation2 2s ease";
}
function normal(){
			document.querySelector(".box2").style.display= "block";
  			document.querySelector(".box3").style.display= "none";
  			document.querySelector(".box4").style.display= "none";
  			document.querySelector(".box5").style.display= "none";
  			document.querySelector(".bgImage3").style.backgroundImage= "url('./calc.jpg')";
  			document.querySelector(".bgImage3").style.animation ="fadeInAnimation2 2s ease";
}