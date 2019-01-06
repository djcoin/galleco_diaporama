
const f = (url) => {
  return {
    url, x: null, y: null, height: null, width: null
  }
}

/*
var data = [{
  id: 1,
  kind: "BARS, RESTAURANTS, SALONS DE THÉ",
  city: "Redon",
  name: "Ciné Café",
  descr: "Bar et petite restauration",
  other: "12 quai Jean Bart – 02 99 72 41 68",
  imgs: []
}].map((x) => {
  x.imgs = x.imgs.map(f)
  return x;
});
*/

var d_imgs = {};

g_imgs.split("\n").forEach(line => {
  const [_a, res, id] = line.split('/')
  if (d_imgs[id]) {
    d_imgs[id].push(line)
  } else {
    d_imgs[id] = [line]
  }
})


var data = g_annuaire.split("\n")
  .filter(x => x.trim())
  .slice(1)
;
console.log(data)

data = data.map((line) => {
  const [_a,_b,id,kind,city,name,descr,other] = line.split(";")

  var imgs = (d_imgs[id] || []).map(f)

  return {id, kind, city, descr, name, other, imgs};
})



