// !İmport Alanı:
// <---------------------Ara--------------------------->
// ?UI Classını İmport Etmek için:
import { UI } from "./ui.js";

// ?API Classını İmport Etmek için:
import { API } from "./api.js";

// <---------------------Ara--------------------------->
// !Örnek Alanı:

// UI classının örneğini almak için:
const ui = new UI();

// API classının örneğini almak için:
const api = new API();

// <---------------------Ara--------------------------->
// !Sayfa işlemleri sayfa yüklenildiğinde form gönderildiğinde Sayfanın durumları :
// 1.Sayfanın yüklenilidiği anı izlemek için:
// document.addEventListener("DOMContentLoaded", async()=>{
//      const data = await api.getPopular();
//      console.log(data);
// });

document.addEventListener("DOMContentLoaded", async () => {
  // Loader'ı render etmek için:
  ui.renderLoader();

  // Api'a istek at ve api'dan gelen veri ile arayüzü renderlamak için:
  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log(err);
    });
});

// <---------------------Ara--------------------------->
// 2.Form gönderildiğinde bunu izlicez ve bir fonksiyon çalıştırmış olucaz:
ui.form.addEventListener("submit", (e) => {
  // !Sayfa yenilemeyi engellemek için:
  e.preventDefault();
  // console.log(`Form Gönderildi..`);
  // console.log(e);

  // !form Gönderildiğinde input içerisindeki değere erişmek için:
  // console.log(e.target[0]);
  // console.log(e.target[0].value);
  const query = e.target[0].value;
  // console.log(query);

  // Aratılan kelimelerin başında ve sonundaki boşlukları kaldırmak içim trim methodunu kullanıcaz:
  // console.log(query.length);
  // console.log(query.trim().length);
  // Eğer query değeri yoksa uyarı vermeli:

  if (!query.trim()) {
    //console.log(`Geçerli Bir Arama Giriniz..`);
    return alert(`Lütfen Geçerli Bir Arama Giriniz..`);
  }

  // !api.getPopular();kesip aldım yukarıya sayfa yüklenilen kısma taşıdım!!!!(1) yazana!

  // <---------------------Ara--------------------------->

  // Loader'ı render et etmek için:
  ui.renderLoader();

  // Title'ı güncellemek için:

  ui.updateTitle(query + " için sonuçlar");

  // Aratılan kelimeyle birlikte api istek at sonrasında gelen veriyle ekrana cartları render etmek için:
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => alert(err));
});

// Liste kısmındaki play iconuna tıklayınca arayüzü bu şarkı verisine göre renderlayacak fonksiyon:

ui.list.addEventListener("click", (e) => {
  // console.log(`Tıklanıldı..`);
  // console.log(e);
  // console.log(e.target);
  //! List içerisinde tıklanılan elemanın play butonu olup olmadığını kontrol etmek için:
  if (e.target.className == "play") {
    // console.log(`Play butonuna tıklandı..`);

    // Todo:Play butonunun kapsayıcısına erişmek için:
    // const card = e.target.parentElement(".card");figüre çıktık
    // const card = e.target.parentElement.parentElement(".card");carda çıktık ama kullanışlı olsun dıye closest demek istiyoruz:
    const card = e.target.closest(".card");
    // console.log(card.dataset);
    // console.log(card.dataset.title);

    // Todo: Kapsayıcıya verilen dataset özelliklerini al(title,image,mp3)
    // const data = console.log(card.dataset);
    const data = card.dataset;

    //Todo:Player kısmını render et:
    ui.renderPlayer(data);
  }
});
