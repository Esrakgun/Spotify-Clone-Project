
export class UI {
  // !Kurucu Methot:Çekmek istediğimiz elemanlar iiçin yazıyoruz..
  constructor() {
    this.form = document.querySelector("form");
    this.list = document.querySelector(".list");
    this.title = document.querySelector("#title");
    this.player = document.querySelector(".player");
  }
  // Yazıları düzenleyen fonksiyon:
  sliceText(text) {
    // !Eğer text'in uzunluğu 15'den büyük ise ,15 karakteri alarak sonuna kadar '...' ekleyin.Bu,yazının kısa olmasını sağlıcaktır.15 karakterin altında kalan kısmı göstermeyece ve okunabilir haa getirmiş olucaktır..
    if (text.length > 15) {
      return text.slice(0, 15) + "...";
    }
    return text;
  }

  // Şarkı Verilerini Render Eden bir Fonksiyon yazmamız lazım:
  renderCards(songs) {
    // todo:Listeye yeni şarkı yüklemeden hemen önce verileri sıfırlamak için yaptık:
    this.list.innerHTML = "";

    songs.forEach((song) => {
      // console.log(song);
      // bir tane Div oluşturcaz:
      const card = document.createElement("div");
      // Oluşturulan bu elemana 'card' classı ekle:
      card.className = "card";

      // !Card elemanına şarkı ile ilgili değerleri atamak için:
      card.dataset.title = song.title;
      card.dataset.subtitle = song.subtitle;
      card.dataset.img = song.images.coverarthq;
      card.dataset.mp3 = song.hub.actions[1].uri;

      // Cardın htmlini belirlemek için:
      card.innerHTML = `<figure>
                            <!-- !İmg  -->
                                 <img src="${song.images.coverarthq}"
                                 alt="album-image">
                            <!-- !Play Btn -->
                                <div class="play">
                                    <i class="bi bi-play-fill"></i>
                               </div>
                        </figure>
                            <!-- İnfo -->
                                 <div class="card-info">
                                  <h4>${this.sliceText(song.title)}</h4>
                                  <h4>${song.subtitle}</h4>
                                </div>`;

      //Oluşturulan bu HTML'i arayüze aktar..
      this.list.appendChild(card);
      // Class Obje yapıları , içerisindeki bir değişkene bu yapılar içerisinde bukunan bir methodla erişmek istersek bunların başına this keywordu koymamaız gerekir. Bunun sebebi class ve obje yapılarının bu değeri kendi içerisinde olduğunu anlamasıdır.
    });
  }

  // Loader render eden fonksiyon :UİVERSE'den aldık..
  renderLoader() {
    this.list.innerHTML = `
<div class="loader">
  <div class="cell d-0"></div>
  <div class="cell d-1"></div>
  <div class="cell d-2"></div>

  <div class="cell d-1"></div>
  <div class="cell d-2"></div>
  
  
  <div class="cell d-2"></div>
  <div class="cell d-3"></div>
  
  
  <div class="cell d-3"></div>
  <div class="cell d-4"></div>
  
</div>`;
  }

  // Title'ı güncelleyen fonksiyon
  updateTitle(text) {
    this.title.textContent = text;
  }
  // Animasyon ayarlaması yapan fonksiyon

  toggleAnimation() {
    // console.log(this.player.querySelector(".info img"));

    // Player içerisindeki resime erişmek için:
    const image = document.querySelector(".info img");

    // Resime class ekle-çıkar

    image.classList.toggle("animate");
  }

  // Player kısmını dinamik şekilde renderlayacak fonksiyonumuz:
  renderPlayer(song) {
    // console.log(song);

    this.player.innerHTML = `
    <div class="info">
        <img
          src="${song.img}"
          alt="song-image"
        />
        <div>
          <h5>${song.title}</h5>
          <p>${song.subtitle}</p>
        </div>
      </div>

      <audio
        src="${song.mp3}"
        controls
        autoplay
      ></audio>

      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox"></i>
        <i class="bi bi-pc-display"></i>
      </div>`;

    // Şarkı oynatılıyorsa image'e bir animasyon ekle || durdurulursa bunu kaldırmak için:

    // i-) Audio elemanına erişmek için:
    // console.log(this.player.querySelector("audio"));
    const audio = this.player.querySelector("audio");

    // ii-) Audio elemanının oyantılam && durdurulma olaylarını izlemek için:
    audio.addEventListener("play", this.toggleAnimation);
    // console.log(`Şarkı Oynatılyor..`);
    audio.addEventListener("pause", this.toggleAnimation);
    // console.log(`Şarkı durduruluyor..`);

    //  this.toggleAnimation();
  }
}

