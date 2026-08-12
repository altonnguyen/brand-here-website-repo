(function () {
  var tracks = [
    { title: 'Fast Performance', meta: '138 BPM · High-energy performance direction', file: 'audio/radio/make-it-matter-fast-performance.mp3' },
    { title: 'Global Male Group', meta: '142 BPM · Collective anthem direction', file: 'audio/radio/make-it-matter-global-male-group.mp3' },
    { title: 'World Stage Male', meta: '142 BPM · Arena-scale performance direction', file: 'audio/radio/make-it-matter-world-stage.mp3' },
    { title: 'US–UK Duet · Refined A1', meta: '118 BPM · Refined duet direction', file: 'audio/radio/make-it-matter-us-uk-duet-refined-a1.mp3' },
    { title: 'US–UK Duet · Refined A2', meta: '118 BPM · Alternate refined duet direction', file: 'audio/radio/make-it-matter-us-uk-duet-refined-a2.mp3' },
    { title: 'US–UK Duet · Demo A', meta: '116 BPM · Early duet exploration', file: 'audio/radio/make-it-matter-us-uk-duet-a.mp3' },
    { title: 'US–UK Duet · Demo B', meta: '116 BPM · Alternate early duet exploration', file: 'audio/radio/make-it-matter-us-uk-duet-b.mp3' }
  ];

  function init() {
    var audio = document.getElementById('radioAudio');
    if (!audio) return;
    var play = document.getElementById('radioPlay');
    var prev = document.getElementById('radioPrev');
    var next = document.getElementById('radioNext');
    var seek = document.getElementById('radioSeek');
    var title = document.getElementById('radioTitle');
    var meta = document.getElementById('radioMeta');
    var num = document.getElementById('radioTrackNum');
    var current = document.getElementById('radioCurrent');
    var duration = document.getElementById('radioDuration');
    var status = document.getElementById('radioStatus');
    var playlist = document.getElementById('radioPlaylist');
    var player = document.querySelector('[data-radio-player]');
    var index = 0;

    function formatTime(value) {
      if (!Number.isFinite(value)) return '—:—';
      var minutes = Math.floor(value / 60);
      var seconds = Math.floor(value % 60);
      return minutes + ':' + String(seconds).padStart(2, '0');
    }

    function renderPlaylist() {
      playlist.innerHTML = tracks.map(function (track, i) {
        return '<button class="radio-track' + (i === index ? ' active' : '') + '" type="button" data-track="' + i + '" aria-label="Play ' + track.title + '">' +
          '<span class="radio-track-index">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span><strong>' + track.title + '</strong><small>' + track.meta + '</small></span>' +
          '<span class="radio-track-action">Play</span>' +
        '</button>';
      }).join('');
    }

    function loadTrack(nextIndex, shouldPlay) {
      index = (nextIndex + tracks.length) % tracks.length;
      var track = tracks[index];
      audio.src = track.file;
      title.textContent = track.title;
      meta.textContent = track.meta;
      num.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(tracks.length).padStart(2, '0');
      current.textContent = '0:00';
      duration.textContent = '—:—';
      seek.value = 0;
      play.setAttribute('aria-label', 'Play ' + track.title);
      status.textContent = shouldPlay ? 'Loading' : 'Ready to play';
      player.classList.remove('is-playing');
      renderPlaylist();
      if (shouldPlay) {
        audio.play().catch(function () { status.textContent = 'Ready to play'; });
      }
    }

    function toggle() {
      if (!audio.src) loadTrack(index, false);
      if (audio.paused) audio.play().catch(function () {}); else audio.pause();
    }

    play.addEventListener('click', toggle);
    prev.addEventListener('click', function () { loadTrack(index - 1, true); });
    next.addEventListener('click', function () { loadTrack(index + 1, true); });
    playlist.addEventListener('click', function (event) {
      var button = event.target.closest('[data-track]');
      if (button) loadTrack(Number(button.getAttribute('data-track')), true);
    });
    seek.addEventListener('input', function () {
      if (Number.isFinite(audio.duration)) audio.currentTime = audio.duration * (Number(seek.value) / 100);
    });

    audio.addEventListener('loadedmetadata', function () { duration.textContent = formatTime(audio.duration); });
    audio.addEventListener('timeupdate', function () {
      current.textContent = formatTime(audio.currentTime);
      seek.value = Number.isFinite(audio.duration) && audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    });
    audio.addEventListener('play', function () {
      player.classList.add('is-playing');
      status.textContent = 'Now playing';
      play.setAttribute('aria-label', 'Pause ' + tracks[index].title);
      var activeAction = playlist.querySelector('.radio-track.active .radio-track-action');
      if (activeAction) activeAction.textContent = 'Playing';
    });
    audio.addEventListener('pause', function () {
      player.classList.remove('is-playing');
      if (!audio.ended) status.textContent = audio.currentTime > 0 ? 'Paused' : 'Ready to play';
      play.setAttribute('aria-label', 'Play ' + tracks[index].title);
      var activeAction = playlist.querySelector('.radio-track.active .radio-track-action');
      if (activeAction) activeAction.textContent = 'Play';
    });
    audio.addEventListener('ended', function () { loadTrack(index + 1, true); });

    renderPlaylist();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
