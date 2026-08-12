(function () {
  var tracks = [
    { title: 'MAKE IT MATTER · MASTER A', meta: 'Official Brand Here master · Final selected direction', file: 'audio/radio/make-it-matter-brand-here-master-a.mp3' },
    { title: 'Fast Performance', meta: '138 BPM · High-energy performance direction', file: 'audio/radio/make-it-matter-fast-performance.mp3' },
    { title: 'Global Male Group', meta: '142 BPM · Collective anthem direction', file: 'audio/radio/make-it-matter-global-male-group.mp3' },
    { title: 'World Stage Male', meta: '142 BPM · Arena-scale performance direction', file: 'audio/radio/make-it-matter-world-stage.mp3' },
    { title: 'US–UK Duet · Refined A1', meta: '118 BPM · Refined duet direction', file: 'audio/radio/make-it-matter-us-uk-duet-refined-a1.mp3' },
    { title: 'US–UK Duet · Refined A2', meta: '118 BPM · Alternate refined duet direction', file: 'audio/radio/make-it-matter-us-uk-duet-refined-a2.mp3' },
    { title: 'US–UK Duet · Demo A', meta: '116 BPM · Early duet exploration', file: 'audio/radio/make-it-matter-us-uk-duet-a.mp3' },
    { title: 'US–UK Duet · Demo B', meta: '116 BPM · Alternate early duet exploration', file: 'audio/radio/make-it-matter-us-uk-duet-b.mp3' }
  ];

  var masterLyrics = [
    [0, 'It starts with a spark…'], [3.5, 'A reason to believe.'], [7, 'Right here.'],
    [10, 'Every vision starts in the quiet,'], [13, 'A single spark, a different light.'], [16, 'Questions waiting to become clear,'], [19, 'A future calling, drawing near.'], [22, 'We find the truth beneath the noise,'], [25, 'Turn intention into a voice.'], [28, 'From what you know to what could be,'], [31.5, 'We shape the story people see.'],
    [35, 'Human insight, imagination,'], [38, 'Purpose into transformation.'], [41, 'When every word and action align,'], [44, 'An idea comes alive.'],
    [47, 'Bring your vision, make it clear,'], [50, 'The future starts with Brand Here.'], [53, 'More than a name, more than design,'], [56, 'Meaning made to stand the test of time.'], [59, 'Make it human, make it real,'], [62, 'Build a brand the world can feel.'], [65, 'Make it bold, make it sincere—'], [68, 'Make it matter. Brand Here.'],
    [71, 'Start with why,'], [73, 'Show them how.'], [75, 'Make it matter—'], [77, 'Here and now.'], [79, 'Brand Here.'],
    [81, 'We listen close and look ahead,'], [84, 'Find the words still left unsaid.'], [87, 'Technology can change the pace,'], [90, 'But human truth must lead the way.'], [93, 'When markets move and signals change,'], [96, 'We turn the complex into strength.'], [99, 'Built for today, prepared to grow,'], [102, 'A brand the future comes to know.'],
    [105, 'Strategy and imagination,'], [108, 'Moving into transformation.'], [111, 'When every word and action align,'], [114, 'A vision comes alive.'],
    [117, 'Bring your vision, make it clear,'], [120, 'The future starts with Brand Here.'], [123, 'More than a name, more than design,'], [126, 'Meaning made to stand the test of time.'], [129, 'Make it human, make it real,'], [132, 'Build a brand the world can feel.'], [135, 'Make it bold, make it sincere—'], [138, 'Make it matter. Brand Here.'],
    [141, 'Not just louder—something true.'], [144, 'Not just different—made for you.'], [147, 'Trends may turn and disappear,'], [150, 'What matters most remains right here.'],
    [153, 'Your story.'], [155, 'Your purpose.'], [157, 'Your impact.'], [159, 'It starts here.'],
    [161, 'Bring your vision, make it clear,'], [164, 'Shape the future—Brand Here.'], [167, 'Where human insight and AI align,'], [170, 'Where purpose leads and ideas come alive.'], [173, 'Make it human, make it real,'], [176, 'Build a brand the world can feel.'], [179, 'Make it bold, make it sincere—'], [182, 'Make it matter. Brand Here.'],
    [185, 'Start with why,'], [187, 'Show them how.'], [189, 'Make it matter—'], [191, 'Here and now.'],
    [193, 'Your vision.'], [194.5, 'Made visible.'], [196, 'Your meaning.'], [197.5, 'Made memorable.'], [199, 'Brand Here.']
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
    var lyrics = document.getElementById('radioLyrics');
    var lyricsScroll = document.getElementById('radioLyricsScroll');
    var lyricsNote = document.getElementById('radioLyricsNote');
    var lyricsToggle = document.getElementById('radioLyricsToggle');
    var player = document.querySelector('[data-radio-player]');
    var index = 0;
    var activeLyric = -1;

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

    function renderLyrics() {
      activeLyric = -1;
      if (index !== 0) {
        lyricsScroll.innerHTML = '<div class="radio-lyrics-empty">Lyrics are available on<br>MAKE IT MATTER · MASTER A.</div>';
        lyricsNote.textContent = 'Choose MASTER A from the playlist to follow the complete lyrics.';
        return;
      }
      lyricsScroll.innerHTML = masterLyrics.map(function (line, i) {
        return '<button class="radio-lyric-line" type="button" data-lyric="' + i + '" data-time="' + line[0] + '">' + line[1] + '</button>';
      }).join('');
      lyricsNote.textContent = 'Lyrics are synchronized with MASTER A. Select a line to jump to that moment.';
      updateLyrics(0);
    }

    function updateLyrics(time) {
      if (index !== 0) return;
      var next = 0;
      for (var i = 0; i < masterLyrics.length; i += 1) {
        if (masterLyrics[i][0] <= time) next = i; else break;
      }
      if (next === activeLyric) return;
      activeLyric = next;
      var lines = lyricsScroll.querySelectorAll('.radio-lyric-line');
      lines.forEach(function (line, i) {
        line.classList.toggle('is-active', i === next);
        line.classList.toggle('is-near', Math.abs(i - next) === 1);
      });
      if (lines[next]) lines[next].scrollIntoView({ block: 'center', behavior: 'smooth' });
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
      renderLyrics();
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
    lyricsScroll.addEventListener('click', function (event) {
      var line = event.target.closest('[data-time]');
      if (!line || index !== 0) return;
      audio.currentTime = Number(line.getAttribute('data-time'));
      updateLyrics(audio.currentTime);
      audio.play().catch(function () {});
    });
    lyricsToggle.addEventListener('click', function () {
      var collapsed = lyrics.classList.toggle('is-collapsed');
      lyricsToggle.textContent = collapsed ? 'Show lyrics' : 'Hide lyrics';
      lyricsToggle.setAttribute('aria-expanded', String(!collapsed));
    });
    seek.addEventListener('input', function () {
      if (Number.isFinite(audio.duration)) audio.currentTime = audio.duration * (Number(seek.value) / 100);
    });

    audio.addEventListener('loadedmetadata', function () { duration.textContent = formatTime(audio.duration); });
    audio.addEventListener('timeupdate', function () {
      current.textContent = formatTime(audio.currentTime);
      seek.value = Number.isFinite(audio.duration) && audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      updateLyrics(audio.currentTime);
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
    renderLyrics();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
