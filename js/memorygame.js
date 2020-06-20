$(function(){
  //カードのオモテ面のsrcの配列
  let imgSrc = [];
  for(var i = 1; i < 14; i++){
    if(i < 10){
      imgSrc.push("../images/d0" + i + ".png");
      imgSrc.push("../images/h0" + i + ".png");
      imgSrc.push("../images/c0" + i + ".png");
      imgSrc.push("../images/s0" + i + ".png");
    }else{
      imgSrc.push("../images/d" + i + ".png");
      imgSrc.push("../images/h" + i + ".png");
      imgSrc.push("../images/c" + i + ".png");
      imgSrc.push("../images/s" + i + ".png");
    }
  }

  let barNumber = 0;

  for(var i = 0; i < 52; i ++){

    if(i === 0 || (i % 13 === 0)){
      barNumber ++;
      var cardBar = document.createElement('div');
      cardBar.className = "bar" + " " + "bar" + barNumber;
      $(".field").append(cardBar);
    }
  
    var cardBack = document.createElement('div');
    cardBack.className = "card-back" + " " + "c" + i;
    $(`.bar${barNumber}`).append(cardBack);
  
    var card = document.createElement('img');
    card.src = "";
    card.alt = "";
    card.className = "card-front";
    card.id = "c" + i;
    card.addEventListener("click", cardClick, false);
    $(`.c${i}`).append(card);
  
  }

  let firstChoice;
  let secondChoice;
  let firstCardId;
  let secondCardId;
  let score = 0;
  let times = 0;
  
  for(var i = imgSrc.length - 1; i > 0; i--){                                             //上で定義した配列をランダムな順番にする
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = imgSrc[i];
    imgSrc[i] = imgSrc[r];
    imgSrc[r] = tmp;
  }

  for(var i = 0; i < 52; i++){
    $(`#c${i}`).attr("src", imgSrc[i]);
  }

  function cardClick(){

    if(!firstCardId){
      firstCardId = this.id;
      console.log("1つ目のidは"+firstCardId);
      $(`#${firstCardId}`).css("opacity", 1);                                                                 //1つ目に選択したカードを表示
      firstChoice = $(`#${firstCardId}`).attr("src").substr(-7 , 3);                                          //１つ目に選んだカードの画像のsrcを取得し、カードの種類を示す部分を切り出して代入
      console.log("1つ目のカードを選びました。値は"+firstChoice);
      $('#turnSound').get(0).play();
    }else if(!secondCardId && firstCardId != this.id){
      secondCardId = this.id;
      console.log("2つ目のidは"+secondCardId);
      $(`#${secondCardId}`).css("opacity", 1);                                                       //2つ目に選択したカードを表示
      secondChoice = $(`#${secondCardId}`).attr("src").substr(-7 , 3);                                         //２つ目に選んだカードの画像のsrcを取得し、カードの種類を示す部分を切り出して代入
      console.log("2つ目のカードを選びました。値は"+secondChoice);
      $('#turnSound').currentTime = 0;
      $('#turnSound').get(0).play();
      times ++;
      $("#times").html("challenge:"+times);
      judge();
    }
  
    // 当たり判定
    function judge(){
      if(firstChoice.slice(1)  === secondChoice.slice(1)){
        console.log("当たりです！");
        $('#correctSound').get(0).play();
        score ++;
        setTimeout(function(){                                                            //２秒後にカードを台から消す
          
          $(`.${firstCardId}`).css('visibility','hidden');
          $(`.${secondCardId}`).css('visibility','hidden');
          firstCardId = "";                                                                 //選択を初期化
          secondCardId = "";
          firstChoice = "";
          secondChoice = "";

        }, 2000);
        if(score === 26){
          $("#completeMessage").html("Congratulations! You win!!");
        }
      }else{
        setTimeout(function(){                                                            //２秒後にカードを裏に戻す
          $(`#${firstCardId}`).css("opacity", 0);
          $(`#${secondCardId}`).css("opacity", 0);
          firstCardId = "";                                                                 //選択を初期化
          secondCardId = "";
          firstChoice = "";
          secondChoice = "";
        }, 2000);
      }
    }
  }
  
  $("#retry").on('click', function(e) {
    location.reload();
  });

});