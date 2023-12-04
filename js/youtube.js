

  // 2. This code loads the IFrame Player API code asynchronously.
  // Youtube IFrame API를 비동기로 로드합니다.
 const tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  function onYouTubeIframeAPIReady() {
    // <div id="player"></div>
    new YT.Player('player', {
      videoId: 'An6LvWQuj_8', //최초 재생할 유튜브 영상 ID
      playerVars: {
        autoplay: true, // 자동 재생 유무 
        loop: true, // 반복 재생 유무
        playList: 'An6LvWQuj_8' // 반복 재생할 유튜브 영상 ID 목록 
      },
      events: {
        onReady: function(event) {
          event.target.mute() // event라는 매개변수에는 target이라는 속성이 들어있다. target은 지금 재생되고있는 영상 자체를 의미한다.
        }
      }
    });
  }