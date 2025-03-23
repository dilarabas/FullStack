# Phonebook Uygulaması

Bu proje, kullanıcıların telefon rehberine isim ve numara ekleyebileceği ve eklenen kişileri arayabileceği basit bir **telefon rehberi uygulamasıdır**. Uygulama, React kullanılarak geliştirilmiştir ve kullanıcı dostu bir arayüzle, kişileri kolayca ekleme, listeleme ve arama işlemleri yapılabilmektedir.

## Özellikler

- Kullanıcılar yeni kişiler ekleyebilir.
- Her kişi için bir isim ve telefon numarası eklenebilir.
- Kullanıcılar eklenen kişiler arasında arama yapabilir.
- Arama, büyük/küçük harfe duyarsızdır ve yazdığınız terime göre eşleşen isimleri listeler.
- React kullanarak geliştirilmiş modern bir kullanıcı arayüzü.

## Kullanım

Bu projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:



# Phonebook Uygulaması

Telefon rehberi uygulaması, kullanıcıların isim ve telefon numarası ekleyebileceği, mevcut kişileri listeleyebileceği ve arama yaparak kişiler arasında filtreleme yapabileceği basit bir uygulamadır. Bu proje, **React** kullanılarak geliştirilmiştir.

## Özellikler

- **Kişi Ekleme:** Kullanıcılar isim ve telefon numarasını girerek yeni kişiler ekleyebilir.
- **Kişi Arama:** Kullanıcılar arama kutusuna yazdıkları terime göre isimleri filtreleyebilir.
- **Telefon Numarası:** Her kişiye bir telefon numarası eklenebilir.
- **Arama Duyarsızlığı:** Arama, büyük/küçük harfe duyarsızdır (örneğin "Arto" ve "arto" aynı sonuçları döndürür).

## Başlangıç

Bu projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

### Gereksinimler

- Node.js ve npm (Node Package Manager) yüklü olmalıdır. [Node.js İndir](https://nodejs.org/)




### Özellikler
Kişi Ekleme: Yeni bir kişi, isim ve telefon numarası ile eklenebilir.
Kişi Arama: Telefon rehberindeki kişiler arama kutusuna yazılarak aranabilir.
Kişi Silme: Kişiler, her kişi için sağlanan silme düğmesi aracılığıyla silinebilir.
Kişi Düzenleme: Mevcut bir kişinin telefon numarasını güncellemek için, yeni numara girildiğinde eski numara yerine geçer.
JSON Server Entegrasyonu: Tüm veriler JSON Server’a kaydedilir ve bir arka uç ile senkronize edilir.
Duyarlı Tasarım: Uygulama, masaüstü ve mobil cihazlarda uyumlu şekilde çalışacak şekilde tasarlanmıştır.





### Kullanım
Telefon rehberi uygulamasının kullanımı oldukça basittir:

Yeni Kişi Ekleme: Sağ üst köşedeki "Ekle" butonuna tıklayarak yeni bir kişi ekleyebilirsiniz. İsim ve telefon numarası girmeniz gerekecek.
Arama: Kişileri aramak için, üstteki arama kutusuna kişi ismini girin. Kişi listesi, arama terimi ile eşleşen kişileri gösterecektir.
Kişi Silme: Her kişinin yanında bulunan çöp kutusu simgesine tıklayarak o kişiyi silebilirsiniz. Silme işlemi onay için window.confirm kullanılarak yapılır.
Kişi Düzenleme: Var olan bir kişiye yeni bir numara eklediğinizde, eski numara otomatik olarak yeni numara ile güncellenir.




### Teknolojiler
React: Uygulama arayüzü React kullanılarak geliştirilmiştir.
JSON Server: Verilerinizi saklamak için JSON Server kullanılmaktadır.
CSS: Uygulama arayüzü, modern ve profesyonel bir görünüm için sade ve şık bir CSS ile tasarlanmıştır.
Axios: API istekleri için Axios kütüphanesi kullanılmıştır.