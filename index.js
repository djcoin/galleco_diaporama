
// var Foo = React.createClass({ render() { return <div/>; } })


function createList(xs) {
  var div = document.createElement('div');
  div.innerHTML = xs.join('\n');
  return div;
}

function template(json) {
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

  return `
  <div class="slide" id="link-${id}">
    <div class="header">
      <div class="city">${city} (${id})</div>
      <div class="name">${name}</div>
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
    <div class="footer">
      <div class="kind">${kind}</div>
    </div>
  </div>
  `;
}


function createAll(e, data) {
  var xs = data.map(template);

  var l = createList(xs)


  var node = e.appendChild(l);

  const ids = data.map(({id}) => id);
  var idx = 0;

  // var interval = 1000;

  setInterval(() => {
    console.log("SCROLLING")
    const id = `link-${ids[idx]}`;
    const e = document.getElementById(id);
    // window.scrollTo(0, e.offsetTop);

    e.scrollIntoView();

    idx = (idx + 1) % ids.length;
  }, interval);

}

