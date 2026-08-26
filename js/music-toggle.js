// Music toggle widget — injected into every page that includes this script.
// Click-to-play only (no autoplay) to keep the site feeling professional for business visitors.
(function () {
  var sourceScript = document.currentScript;

  function init() {
    var audio = document.createElement('audio');
    audio.id = 'bgMusic';
    var siteRoot = sourceScript && sourceScript.src
      ? new URL('../', sourceScript.src)
      : new URL('/', window.location.origin);
    audio.src = new URL('audio/music.mp3', siteRoot).href;
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.28;

    var btn = document.createElement('button');
    btn.className = 'music-toggle';
    var vi = document.documentElement.lang === 'vi';
    btn.type = 'button';
    btn.setAttribute('aria-label', vi ? 'Phát nhạc nền' : 'Play background music');
    btn.setAttribute('title', vi ? 'Bật / tắt nhạc nền' : 'Background music on / off');
    btn.innerHTML =
      '<svg class="icon-note" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
      '<span class="bars"><span></span><span></span><span></span></span>';

    document.body.appendChild(audio);
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play().then(function () {
          btn.classList.add('playing');
          btn.setAttribute('aria-label', vi ? 'Tạm dừng nhạc nền' : 'Pause background music');
        }).catch(function () {});
      } else {
        audio.pause();
        btn.classList.remove('playing');
        btn.setAttribute('aria-label', vi ? 'Phát nhạc nền' : 'Play background music');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
