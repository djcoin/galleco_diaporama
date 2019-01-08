
const f = (url) => {
  const [fname] = url.split('/').reverse();
  const line = fname[0] == "v" ? 2 : 1;

  return {
    url, x: null, y: null, height: null, width: null, line
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
  var [_a, res, id] = line.split('/')
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
  var [_a,_b,id,kind,city,name,descr,other] = line.split(";")

  // names are sorted alpha + x should be ignored
  var imgs = (d_imgs[id] || [])
    .filter(x => {
      var [fname] = x.split('/').reverse();
      // accept extra v to say it goes on next line
      fname = fname[0] == "v" ? fname.slice(1) : fname;

      return fname.slice(1,3) === "__" && fname.slice(0,3) !== "x__";
    })
    .sort()
    .map(f);


  return {id, kind, city, descr, name, other, imgs};
})



