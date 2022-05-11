async function cr() {
  const url = "https://www.pinterest.com/";
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
}
cr();
