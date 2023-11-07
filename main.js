alarm="";
status="";
objects=[];


function preload(){
    alarm=loadSound("alarm.mp3")
}

function setup(){
    canvas=createCanvas(400,400)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    objectDetector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="status : detecting object"
}


function modelLoaded(){
    console.log("model started loading")
    status=true

}

function gotResult(error,result){
    if(error){
        console.error(error)
    }
    else{
        console.log(result)
        objects=result
    }
}


function draw(){
    image(video, 0,0,400,400)
    if(status !=""){
        r=random(255)
        g=random(255)
        b=random(255)
        objectDetector.detect(video,gotResult)

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status : object detected"
            fill(r,g,b)
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
            if(objects[i].label=="person"){
                document.getElementById("person").innerHTML="person is found"
                alarm.play()
            }
            else{
                document.getElementById("person").innerHTML="person is not found"
                alarm.stop()
            }
            if(objects.length==0){
                document.getElementById("person").innerHTML="person was not found"
                alarm.stop()
            }
        }

    }
}