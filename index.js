
// var Foo = React.createClass({ render() { return <div/>; } })


function createList(xs) {
  var div = document.createElement('div');
  div.innerHTML = xs.join('\n');
  return div;
}

function template(json, {getNext, getPrev, diaporama}) {
  const {id, kind, city, name, descr, other, imgs} = json;

  const createImg = ({url, x, y, height, width}) => {

    const style = [
      width && `width:${width}px`,
      height && `height:${height}px`,
      y && `top:${y}`,
      height && `left:${x}`,
    ].filter(x => x).join(";")

    const wrapper_style = [
      `width:${100 / imgs.length}%`,
    ].join(";")

    return `<div class="img-wrapper" style="${wrapper_style}"><img src="${url}" style="${style}"></img></div>`;
  }

  const imgs_html_1 = imgs.filter((x) => x.line == 1).map(createImg);
  const imgs_html_2 = imgs.filter((x) => x.line == 2).map(createImg);

  // const width = window.innerWidth * 0.4;
  // const data = `data-masonry='{ "itemSelector": ".img-wrapper", "columnWidth": ${width} }'`
  // const data = `data-masonry='{ "itemSelector": ".img-wrapper", "percentPosition": true }`

  const show_id = false;
  const id_str = show_id ? `(${id})` : '';

  return `
  <div class="slide" id="link-${id}">
    <div class="header">
      <div class="controls">
        <a href="#link-${id}">
          <i class="fas fa-link"></i>
        </a>
        <a href="#link-${getPrev(id)}">
          <i class="fas fa-arrow-circle-up"></i>
        </a>
        <a href="#link-${getNext(id)}">
          <i class="fas fa-arrow-circle-down"></i>
        </a>
        <i class="fas fa-play diaporama-toggle"></i>
        <i class="fas fa-stop diaporama-toggle"></i>
      </div>
      <div class="col2">
        <div class="col2-inner">
          <div class="logo-text">Ils l'utilisent !</div>
          <img src="static/img/logo_galleco.jpg"></img>
        </div>
      </div>
      <div class="col1">
        <div class="kind">${kind}</div>
        <div class="city">${city} ${id_str}</div>
        <div class="name">${name}</div>
      </div>
    </div>
    <div class="body">
      <div class="descr">
        ${descr}
      </div>
      <div class="imgs imgs-line1">
        ${imgs_html_1.join('\n')}
      </div>
      ${imgs_html_2.length ? '<div class="imgs imgs-line2">'+ imgs_html_2.join('\n') +'</div>' : ''}
    </div>
    <div class="footer-xxx">
    </div>
  </div>
  `;
}


// node container, ids (list of anchors, will be prefix by link-), interval for diapo
function createDiaporama(node, getNextId, interval = 1000) {
  var id_diapo = null;

  stop = () => {
    id_diapo && id_diapo();
    id_diapo = null
    node.classList.add("diaporama-off")
    node.classList.remove("diaporama-on")
  }

  start = (getNewNextId) => {
    id_diapo = startDiapo(getNewNextId || getNextId, interval);
    node.classList.add("diaporama-on")
    node.classList.remove("diaporama-off")
  }

  toggle = (getNewNextId) => {
    id_diapo === null ? start(getNewNextId) : stop()
  }


  function startDiapo(getNextId, interval) {
    const i = setInterval(() => {
      const e = document.getElementById(getNextId())
      // window.scrollTo(0, e.offsetTop);
      e.scrollIntoView();
    }, interval);

    return () => {
      clearInterval(i);
    }
  }


  return { start, stop, toggle }
}


function createAll(e, data, {autostart, interval}) {
  const ids = data.map(({id}) => id);

  const getNext = (id) => ids[(ids.indexOf(id) + 1) % ids.length]
  const getPrev = (id) => ids[(ids.indexOf(id) - 1 + ids.length) % ids.length]
  const actions = {getNext, getPrev};

  var xs = data.map((d) => template(d, actions))

  var l = createList(xs)

  var node = e.appendChild(l);

  var getNextElemId = (id) => () => { id = getNext(id); return `link-${id}`; }

  var starter = () => getNextElemId(ids[ids.length - 1])

  const {start, stop, toggle} = createDiaporama(node, starter(), interval)

  node.addEventListener("click", function(e) {
    if (e.target.className.indexOf("diaporama-toggle") != -1) {
      toggle(starter());
    }
  })

  autostart ? start() : stop();
}

