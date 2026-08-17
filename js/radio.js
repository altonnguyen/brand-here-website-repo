(function () {
  var vi = document.documentElement.lang === 'vi';
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
  if (vi) {
    var viTrackText = [
      ['MAKE IT MATTER · MASTER A', 'Bản hoàn chỉnh chính thức của Brand Here · Phương án được lựa chọn'],
      ['Trình diễn nhanh', '138 BPM · Định hướng trình diễn giàu năng lượng'],
      ['Nhóm nam quốc tế', '142 BPM · Định hướng hợp ca tập thể'],
      ['Nam ca sĩ sân khấu quốc tế', '142 BPM · Định hướng trình diễn quy mô sân vận động'],
      ['Song ca Mỹ–Anh · Tinh chỉnh A1', '118 BPM · Định hướng song ca tinh chỉnh'],
      ['Song ca Mỹ–Anh · Tinh chỉnh A2', '118 BPM · Phương án song ca tinh chỉnh khác'],
      ['Song ca Mỹ–Anh · Bản thử A', '116 BPM · Khám phá song ca ban đầu'],
      ['Song ca Mỹ–Anh · Bản thử B', '116 BPM · Phương án khám phá song ca ban đầu khác']
    ];
    tracks.forEach(function (track, i) { track.title = viTrackText[i][0]; track.meta = viTrackText[i][1]; });
  }

  var masterLyrics = [
    [3.3, 'It starts with a spark…'], [7.98, 'A reason to believe.'], [9.52, 'Right here.'],
    [21.9, 'Every vision starts in the quiet,'], [23.82, 'A single spark, a different light.'], [26.02, 'Questions waiting to become clear,'], [28.08, 'A future calling, drawing near.'], [30.14, 'We find the truth beneath the noise,'], [32.34, 'Turn intention into a voice.'], [34.48, 'From what you know to what could be,'], [36.32, 'We shape the story people see.'],
    [38.54, 'Human insight, imagination,'], [40.62, 'Purpose into transformation.'], [42.7, 'When every word and action align,'], [44.92, 'An idea comes alive.'],
    [46.58, 'Bring your vision, make it clear,'], [48.7, 'The future starts with Brand — Here.'], [50.92, 'More than a name, more than design,'], [52.9, 'Meaning made to stand the test of time.'], [55.54, 'Make it human, make it real,'], [57.2, 'Build a brand the world can feel.'], [59.28, 'Make it bold, make it sincere—'], [61.4, 'Make it matter. Brand — Here.'],
    [63.44, 'Start with why,'], [64.68, 'Show them how.'], [67.56, 'Make it matter, matter, matter—'], [70.04, 'Here and now.'], [71.02, 'Brand — Here.'],
    [72.26, 'We listen close and look ahead,'], [74.76, 'Find the words still left unsaid.'], [77.02, 'Technology can change the pace,'], [78.92, 'But human truth must lead the way.'], [80.96, 'When markets move and signals change,'], [83.28, 'We turn the complex into strength.'], [85.34, 'Built for today, prepared to grow,'], [87.4, 'A brand the future comes to know.'],
    [89.6, 'Strategy and imagination,'], [91.56, 'Moving into transformation.'], [93.64, 'When every word and action align,'], [95.92, 'A vision comes alive.'],
    [97.6, 'Bring your vision, make it clear,'], [99.66, 'The future starts with Brand — Here.'], [101.78, 'More than a name, more than design,'], [103.94, 'Meaning made to stand the test of time.'], [106.52, 'Make it human, make it real,'], [108.16, 'Build a brand the world can feel.'], [110.22, 'Make it bold, make it sincere—'], [112.38, 'Make it matter. Brand — Here.'],
    [115.22, 'Not just louder—something true.'], [118.68, 'Not just different—made for you.'], [123.42, 'Trends may turn and disappear,'], [127.18, 'What matters most remains right here.'],
    [133.24, 'Your story.'], [134.94, 'Your purpose.'], [136.96, 'Your impact.'], [139.2, 'It starts here.'],
    [141.94, 'Bring your vision, make it clear,'], [144.36, 'Shape the future—Brand — Here.'], [150, 'Where human insight and AI align,'], [153.72, 'Where purpose leads and ideas come alive.'], [159.18, 'Make it human, make it real,'], [161.26, 'Build a brand the world can feel.'], [163.38, 'Make it bold, make it sincere—'], [165.42, 'Make it matter. Brand — Here.'],
    [167.54, 'Start with why,'], [168.76, 'Show them how.'], [170.9, 'Make it matter—'], [173.08, 'Here and now.'],
    [177.08, 'Your vision.'], [178.46, 'Made visible.'], [180.52, 'Your meaning.'], [183.28, 'Made memorable.'], [187.02, 'Brand — Here.'], [198.74, 'Brand — Here.']
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
        return '<button class="radio-track' + (i === index ? ' active' : '') + '" type="button" data-track="' + i + '" aria-label="' + (vi ? 'Phát ' : 'Play ') + track.title + '">' +
          '<span class="radio-track-index">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<span><strong>' + track.title + '</strong><small>' + track.meta + '</small></span>' +
          '<span class="radio-track-action">' + (vi ? 'Phát' : 'Play') + '</span>' +
        '</button>';
      }).join('');
    }

    function renderLyrics() {
      activeLyric = -1;
      if (index !== 0) {
        lyricsScroll.innerHTML = '<div class="radio-lyrics-empty">' + (vi ? 'Lời bài hát có trên<br>MAKE IT MATTER · MASTER A.' : 'Lyrics are available on<br>MAKE IT MATTER · MASTER A.') + '</div>';
        lyricsNote.textContent = vi ? 'Chọn MASTER A trong danh sách phát để theo dõi toàn bộ lời bài hát.' : 'Choose MASTER A from the playlist to follow the complete lyrics.';
        return;
      }
      lyricsScroll.innerHTML = masterLyrics.map(function (line, i) {
        return '<button class="radio-lyric-line" type="button" data-lyric="' + i + '" data-time="' + line[0] + '">' + line[1] + '</button>';
      }).join('');
      lyricsNote.textContent = vi ? 'Lời bài hát được đồng bộ với MASTER A. Chọn một dòng để chuyển đến thời điểm tương ứng.' : 'Lyrics are synchronized with MASTER A. Select a line to jump to that moment.';
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
      play.setAttribute('aria-label', (vi ? 'Phát ' : 'Play ') + track.title);
      status.textContent = shouldPlay ? (vi ? 'Đang tải' : 'Loading') : (vi ? 'Sẵn sàng phát' : 'Ready to play');
      player.classList.remove('is-playing');
      renderPlaylist();
      renderLyrics();
      if (shouldPlay) {
        audio.play().catch(function () { status.textContent = vi ? 'Sẵn sàng phát' : 'Ready to play'; });
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
      lyricsToggle.textContent = collapsed ? (vi ? 'Hiện lời bài hát' : 'Show lyrics') : (vi ? 'Ẩn lời bài hát' : 'Hide lyrics');
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
      status.textContent = vi ? 'Đang phát' : 'Now playing';
      play.setAttribute('aria-label', (vi ? 'Tạm dừng ' : 'Pause ') + tracks[index].title);
      var activeAction = playlist.querySelector('.radio-track.active .radio-track-action');
      if (activeAction) activeAction.textContent = vi ? 'Đang phát' : 'Playing';
    });
    audio.addEventListener('pause', function () {
      player.classList.remove('is-playing');
      if (!audio.ended) status.textContent = audio.currentTime > 0 ? (vi ? 'Đã tạm dừng' : 'Paused') : (vi ? 'Sẵn sàng phát' : 'Ready to play');
      play.setAttribute('aria-label', (vi ? 'Phát ' : 'Play ') + tracks[index].title);
      var activeAction = playlist.querySelector('.radio-track.active .radio-track-action');
      if (activeAction) activeAction.textContent = vi ? 'Phát' : 'Play';
    });
    audio.addEventListener('ended', function () { loadTrack(index + 1, true); });

    renderPlaylist();
    renderLyrics();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
