# Ülke Bilgileri Uygulaması
Bu proje, REST API aracılığıyla ülkelerin bilgilerini alarak kullanıcıya sunan bir React uygulamasıdır. Kullanıcılar, bir ülkenin adını arayarak o ülkenin başkenti, yüzölçümü, bayrağı, dilleri ve başkentinin hava durumu gibi bilgileri görüntüleyebilir.


## Özellikler

- **Arama Fonksiyonu**: Kullanıcılar, ülke adını girerek arama yapabilir ve ülkelerle ilgili bilgileri görüntüleyebilir.
- **Çoklu Ülke Sonuçları**: Eğer bir arama ile 10'dan fazla ülke sonuç dönerse, kullanıcıdan daha spesifik bir arama yapması istenir.
- **Ülke Bilgileri**: Arama sonucu sadece bir ülke varsa, o ülkenin başkenti, yüzölçümü, dilleri ve bayrağı gösterilir.
- **Başkent Hava Durumu**: Seçilen ülkenin başkentinin hava durumu, dış bir API aracılığıyla gösterilir.
- **Mobil Uyumlu Tasarım**: Uygulama mobil cihazlar için optimize edilmiştir ve farklı ekran boyutlarında düzgün çalışır.


## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü için React.js kütüphanesi kullanılmıştır.
- **CSS**: Sayfa stilizasyonu için temel CSS kullanılmıştır.
- **REST API**: Ülke verilerini almak için [restcountries.com](https://restcountries.com/) API'si kullanılmıştır.
- **OpenWeather API**: Başkentlerin hava durumu verilerini almak için OpenWeather API kullanılmıştır.

## Proje Yapısı

├── public/ # Uygulamanın genel statik dosyaları │ ├── index.html # Uygulamanın ana HTML dosyası │ └── ... ├── src/ # Kaynak dosyaları │ ├── App.js # Uygulamanın ana bileşeni │ ├── index.js # React uygulamasının giriş noktası │ ├── components/ # Uygulama bileşenleri (Arama, Ülke Bilgileri vb.) │ └── styles/ # CSS dosyaları ├── package.json # Proje bağımlılıkları ve betikler └── README.md #