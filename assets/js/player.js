window.addEventListener("message", async e => {

  // Meta para testar o player APENAS em localhost
  const href = window.location.href
  if (href.startsWith("http://127.0.0.1") || href.startsWith("http://localhost")) {
    let meta = document.createElement('meta');
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = "upgrade-insecure-requests";
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

  console.log('[CR Premium] Player encontrado!')

  // Variáveis principais
  const promises=[], request = [];
  const r = { 0: '720p', 1: '1080p', 2: '480p', 3: '360p', 4: '240p' };
  for (let i in r) promises[i] = new Promise((resolve, reject) => request[i] = { resolve, reject });

  let rgx = /http.*$/gm;
  let is_beta = e.data.beta;
  let force_mp4 = e.data.force_mp4;
  let needproxy = !e.data.noproxy;
  let streamrgx = /_,(\d+.mp4),(\d+.mp4),(\d+.mp4),(\d+.mp4),(\d+.mp4),.*?m3u8/;
  let streamrgx_three = /_,(\d+.mp4),(\d+.mp4),(\d+.mp4),.*?m3u8/;
  let allorigins = "https://crp-proxy.herokuapp.com/get?url=";
  let video_config_media = await getConfigMedia(e.data.video_config_media, e.data.old_url);
  let video_id = video_config_media['metadata']['id'];
  let up_next_cooldown = e.data.up_next_cooldown;
  let up_next_enable = e.data.up_next_enable;
  let up_next = e.data.up_next;
  let version = e.data.version;
  let user_lang = e.data.lang;
  let series = e.data.series;
  let episode_translate = "";
  let video_stream_url = "";
  let video_m3u8_array = [];
  let video_mp4_array = [];
  let final_translate = "";
  let episode_title = "";
  let rows_number = 0;
  let sources = [];
  
  if (up_next && !video_config_media['metadata']['up_next']) up_next = false

  let dlSize = [];
  let dlUrl = [];
  for (let idx in r) {
    dlSize[idx] = document.getElementById(r[idx] + "_down_size");
    dlUrl[idx] = document.getElementById(r[idx] + "_down_url");
  }

  // Obter streams
  const streamlist = video_config_media['streams'];
  const hasUserLang = streamlist.find(stream => stream.hardsub_lang == user_lang);
  const search_lang = hasUserLang ? user_lang : null;

  for (let stream of streamlist) {
    // Premium
    if (stream.format == 'trailer_hls' && stream.hardsub_lang == search_lang)
      if (rows_number <= 4) {
        // video_m3u8_array.push(await getDirectStream(stream.url, rows_number));
        const arr_idx = (rows_number === 0 ? 2 : (rows_number === 2 ? 0 : rows_number));
        video_mp4_array[arr_idx] = getDirectFile(stream.url);
        rows_number++;
        // mp4 + resolve temporario até pegar link direto da m3u8
        if (rows_number > 4) {
          video_m3u8_array = video_mp4_array;
          for (let i in r) {
            const idx = i;
            setTimeout(() => request[idx].resolve(), 400);
          }
          break;
        }
      }
    // Padrão
    if (stream.format == 'adaptive_hls' && stream.hardsub_lang == search_lang) {
      video_stream_url = stream.url;
      video_m3u8_array = force_mp4 ? mp4ListFromStream(video_stream_url) : await m3u8ListFromStream(video_stream_url);
      video_mp4_array = mp4ListFromStream(video_stream_url);
      break;
    }
  }

  // Pega o numero e titulo do episodio
  const epLangs = { "ptBR": "Episódio", "enUS": "Episode", "enGB": "Episode", "esLA": "Episodio", "esES": "Episodio", "ptPT": "Episódio", "frFR": "Épisode", "deDE": "Folge", "arME": "الحلقة", "itIT": "Episodio", "ruRU": "Серия" };
  const fnLangs = { "ptBR": "FINAL", "enUS": "FINAL", "enGB": "FINAL", "esLA": "FINAL", "esES": "FINAL", "ptPT": "FINAL", "frFR": "FINALE", "deDE": "FINALE", "arME": "نهائي", "itIT": "FINALE", "ruRU": "ФИНАЛЬНЫЙ" };
  episode_translate = `${epLangs[user_lang[0]] ? epLangs[user_lang[0]] : "Episode"} `;
  final_translate   = ` (${fnLangs[user_lang[0]] ? fnLangs[user_lang[0]] : "FINAL"})`;

  if (series) {
    episode_title = series + ' - ' + episode_translate + video_config_media['metadata']['display_episode_number'];
  } else if (video_config_media['metadata']['up_next']) {
    let prox_ep_number = video_config_media['metadata']['up_next']['display_episode_number'];
    episode_title = video_config_media['metadata']['up_next']['series_title'] + ' - ' + prox_ep_number.replace(/\d+|OVA/g, '') + video_config_media['metadata']['display_episode_number'];
  } else
    episode_title = episode_translate + video_config_media['metadata']['display_episode_number'] + final_translate;

  // Checa se o URL do video_mp4_array[id] existe e calcula o tamanho p/ download
  function linkDownload(id, tentativas=0) {
    console.log('  - Baixando: ', r[id])
    let video_mp4_url = video_mp4_array[id];

    let fileSize = "";
    let http = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        fileSize = http.getResponseHeader('content-length');
        if (!fileSize)
          return setTimeout(() => linkDownload(id), 5000);
        else {
          let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
          if (fileSize == 0) return console.log('addSource#fileSize == 0');
          let i = parseInt(Math.floor(Math.log(fileSize) / Math.log(1024)));
          if (i == 0) return console.log('addSource#i == 0');
          let return_fileSize = (fileSize / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
          dlSize[id].innerText = return_fileSize;
          return console.log(`[CR Premium] Source adicionado: ${r[id]} (${return_fileSize})`);
        }
      } else if (http.readyState == 4 && tentativas < 3)
        return setTimeout(() => linkDownload(id, tentativas + 1), 5000);
    }
    http.open("HEAD", video_mp4_url, true);
    http.send(null);
  }

  // Carregar player assim que encontrar as URLs dos m3u8.
  Promise.all(promises).then(() => {
    for (let idx of [1, 0, 2, 3, 4])
      sources.push({ file: video_m3u8_array[idx], label: r[idx] + (idx<2 ? '<sup><sup>HD</sup></sup>' : '')});
    startPlayer();
  });

  const thumbs = up_next ? video_config_media['metadata']['up_next']['thumbnails'] : [];
  function startPlayer() {
    // Inicia o player
    let playerInstance = jwplayer("player_div")
    playerInstance.setup({
      "playlist": [
        { 
          "title": episode_title,
          "description": video_config_media['metadata']['title'],
          "image": video_config_media['thumbnail']['url'],
          "sources": sources,
        },
        up_next_enable && up_next ? {
          "autoplaytimer": 0,
                "title": video_config_media['metadata']['up_next']['display_episode_number'] + ' - ' + video_config_media['metadata']['up_next']['series_title'],
          "file": "https://i.imgur.com/8wEeX0R.mp4",
          "repeat": true,
                "image": thumbs[thumbs.length-1].url
        } : {}
      ],
      "related": {displayMode: 'none'},
      "nextupoffset": -up_next_cooldown,
      "width": "100%",
      "height": "100%",
      "autostart": false,
      "displayPlaybackLabel": true,
      "primary": "html5",
      "cast": {},
      "playbackRateControls": [0.5, 0.75, 1, 1.25, 1.5, 2]
    }).on('playlistItem', e => {
      // tocar próximo ep
      if (e.index > 0 && up_next_enable && up_next){
        jwplayer().setControls(false);
        jwplayer().setConfig({
          repeat: true
        });
        jwplayer().play();
        localStorage.setItem("next_up", true);
        localStorage.setItem("next_up_fullscreen", jwplayer().getFullscreen());
        window.top.location.href = up_next;
      }
    })

    // Variaveis para os botões.
    let update_iconPath = "assets/icon/update_icon.svg";
    let update_id = "update-video-button";
    let update_tooltipText = "Atualização Disponível";

    let rewind_iconPath = "assets/icon/replay-10s.svg";
    let rewind_id = "rewind-video-button";
    let rewind_tooltipText = "Voltar 10s";

    let forward_iconPath = "assets/icon/forward-30s.svg";
    let forward_id = "forward-video-button";
    let forward_tooltipText = "Avançar 30s";

    let download_iconPath = "assets/icon/download_icon.svg";
    let download_id = "download-video-button";
    let download_tooltipText = "Download";
    let didDownload = false;

    const rewind_ButtonClickAction = () => jwplayer().seek(jwplayer().getPosition()-10)
    const forward_ButtonClickAction = () => jwplayer().seek(jwplayer().getPosition()+30)

    // funcion ao clicar no botao de fechar o menu de download
    const downloadModal = document.querySelectorAll(".modal")[0];
    const updateModal = document.querySelectorAll(".modal")[1];
    document.querySelectorAll("button.close-modal")[0].onclick = () => downloadModal.style.visibility = "hidden";
    document.querySelectorAll("button.close-modal")[1].onclick = () => updateModal.style.visibility = "hidden";

    // function ao clicar no botao de baixar
    function download_ButtonClickAction() {
      // Se estiver no mobile, muda um pouco o design do menu
      if (jwplayer().getEnvironment().OS.mobile == true) {
        downloadModal.style.height = "170px";
        downloadModal.style.overflow = "auto";
      }
      
      // Mostra o menu de download
      downloadModal.style.visibility = downloadModal.style.visibility === "hidden" ? "visible" : "hidden";
      
      // Carrega os downloads
      if (!didDownload) {
        didDownload = true;
        console.log('[CR Premium] Baixando sources:')
        for (let id of [1,0,2,3,4])
          linkDownload(id);
      }
    }
    // function ao clicar no botao de update
    function update_ButtonClickAction() {
      if (jwplayer().getEnvironment().OS.mobile == true) {
        updateModal.style.height = "170px";
        updateModal.style.overflow = "auto";
      }
      updateModal.style.visibility = updateModal.style.visibility === "hidden" ? "visible" : "hidden";
    }

    playerInstance
      .addButton(forward_iconPath, forward_tooltipText, forward_ButtonClickAction, forward_id)
      .addButton(rewind_iconPath, rewind_tooltipText, rewind_ButtonClickAction, rewind_id)
      .addButton(download_iconPath, download_tooltipText, download_ButtonClickAction, download_id);

    if (version !== "1.1.0")
      playerInstance.addButton(update_iconPath, update_tooltipText, update_ButtonClickAction, update_id);

    // Definir URL e Tamanho na lista de download
    for (let id of [1,0,2,3,4]) {
      dlUrl[id].href = video_mp4_array[id];
      dlUrl[id].download = video_config_media['metadata']['title'];
    }

    // Funções para o player
    jwplayer().on('ready', e => {
      // Seta o tempo do video pro salvo no localStorage		
      if (localStorage.getItem(video_id) != null) {
        const t = localStorage.getItem(video_id);
        document.getElementsByTagName("video")[0].currentTime = t >= 5 ? t - 5 : t;
      }
      // Mantem fullscreen + autoplay caso tenha sido redirecionado usando a função "A seguir"/"Next up"
      if (localStorage.getItem("next_up") === "true") {
        localStorage.setItem("next_up", false)
        // jwplayer().setFullscreen(localStorage.getItem("next_up_fullscreen")); <- problemas com fullscreen automatico
        jwplayer().play();
      }

      document.body.querySelector(".loading_container").style.display = "none";
    });

    jwplayer().on('viewable', e => {
      const old = document.querySelector('.jw-button-container > .jw-icon-rewind')
      if (!old) return
      const btn = query => document.querySelector(`div[button="${query}"]`)
      const btnContainer = old.parentElement
      btnContainer.insertBefore(btn(rewind_id), old)
      btnContainer.insertBefore(btn(forward_id), old)
      btnContainer.removeChild(old)
      if (is_beta)
        document.getElementById('player_div').classList.add('beta-layout')
    })

    // Mostra uma tela de erro caso a legenda pedida não exista.
    jwplayer().on('error', e => {
      console.log(e)
      codes = { 232011: "https://i.imgur.com/OufoM33.mp4" };
      if (codes[e.code]) {
        jwplayer().load({
          file: codes[e.code]
        });
        jwplayer().setControls(false);
        jwplayer().setConfig({repeat: true});
        jwplayer().play();
      }
    });
    
    // Fica salvando o tempo do video a cada 7 segundos.
    setInterval(() => {
      if (jwplayer().getState() == "playing")
        localStorage.setItem(video_id, jwplayer().getPosition());
    }, 7000);
  }

  /* ~~~~~~~~~~ FUNÇÕES ~~~~~~~~~~ */
  function getAllOrigins(url) {
    return new Promise(async (resolve, reject) => {
      await $.ajax({
        async: true,
        type: "GET",
        url: needproxy ? allorigins + encodeURIComponent(url) : url,
        responseType: 'json'
      })
      .then(res=>{
        resolve(res.contents ?? res)
      })
      .catch(err=>reject(err));
    })
  }

  async function getConfigMedia(video_config_media, old_url) {
    if (video_config_media)
      return JSON.parse(video_config_media)
    else if (old_url) {
      const media_content = await getVilosMedia(old_url)
      return JSON.parse(media_content)
    } 
    else return {}
  }

  async function getVilosMedia(url) {
    const htmlPage = await getAllOrigins(url)
    if (!htmlPage) return '{}'

    const startIndex = htmlPage.indexOf('config.media =')
    const initialConfig = htmlPage.substr(startIndex + 15)

    const endIndex = initialConfig.indexOf('\n\n')
    const config = initialConfig.substr(0, endIndex - 1)
    return config || '{}'
  }

  // ---- MP4 ---- (baixar)
  // Obtem o link direto pelo trailer (premium)
  function getDirectFile(url) {
    return url.replace(/\/clipFrom.*?index.m3u8/, '').replace('_,', '_').replace(url.split("/")[2], "fy.v.vrv.co");
  }

  // Obtem o link direto pelo padrão (gratis)
  function mp4ListFromStream(url) {
    const cleanUrl = url.replace('evs1', 'evs').replace(url.split("/")[2], "fy.v.vrv.co");
    const res = [];
    for (let i in r)
      if (streamrgx_three.test(cleanUrl) && i <= 2) // por algum motivo alguns videos da CR tem apenas 3 resoluções
        res.push(cleanUrl.replace(streamrgx_three, `_$${(parseInt(i)+1)}`))
      else
        res.push(cleanUrl.replace(streamrgx, `_$${(parseInt(i)+1)}`))
    return res;
  }

  // ---- M3U8 ---- (assistir)
  // Obtem o link direto pelo trailer (premium) - to do
  function getDirectStream(url, idx) {
    setTimeout(() => request[idx].resolve(), 400);
  }

  // Obtem o link direto pelo padrão (gratis)
  async function m3u8ListFromStream(url) {
    let m3u8list = []
    const master_m3u8 = await getAllOrigins(url);

    if (master_m3u8) {
      streams = master_m3u8.match(rgx)
      m3u8list = streams.filter((el, idx) => idx%2===0) // %2 === 0 pois há cdns da akamai e da cloudflare
    } else {
      for (let i in r) {
        const idx = i;
        setTimeout(() => request[idx].reject('Manifest m3u8ListFromStream#master_m3u8.length === 0'), 400);
      }
      return [];
    }

    const res = [];
    for (let i in m3u8list) {
      const video_m3u8 = await getAllOrigins(m3u8list[i]);
      m3u8list[i] = blobStream(video_m3u8);
    }
    
    res.push(buildM3u8(m3u8list));
    for (let i in r) {
      const idx = i;
      setTimeout(() => request[idx].resolve(), 400);
    }

    return res;
  }

  function blobStream(stream) {
    const blob = new Blob([stream], {
      type: "text/plain; charset=utf-8"
    });
    return URL.createObjectURL(blob) + "#.m3u8";
  }

  function buildM3u8(m3u8list) {
    const video_m3u8 = '#EXTM3U' +
    '\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=4112345,RESOLUTION=1280x720,FRAME-RATE=23.974,CODECS="avc1.640028,mp4a.40.2"' +
    '\n' + m3u8list[0] +
    '\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=8098235,RESOLUTION=1920x1080,FRAME-RATE=23.974,CODECS="avc1.640028,mp4a.40.2"' +
    '\n' + m3u8list[1] +
    '\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=2087088,RESOLUTION=848x480,FRAME-RATE=23.974,CODECS="avc1.4d401f,mp4a.40.2"' +
    '\n' + m3u8list[2] +
    '\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1090461,RESOLUTION=640x360,FRAME-RATE=23.974,CODECS="avc1.4d401e,mp4a.40.2"' +
    '\n' + m3u8list[3] +
    '\n#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=559942,RESOLUTION=428x240,FRAME-RATE=23.974,CODECS="avc1.42c015,mp4a.40.2"' +
    '\n' + m3u8list[4];
    return blobStream(video_m3u8);
  }
});
