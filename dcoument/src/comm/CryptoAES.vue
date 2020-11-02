<script>
import CryptoJS from "crypto-js";
const AES = {
  //随机生成指定数量的16进制key
  generatekey: function(num) {
    var library =
      "zyxwvutsrqponlmkjihgfedcba123456";
    var key = "";
    for (var i = 0; i < num; i++) {
      var randomPoz = Math.floor(Math.random() * library.length);
      key += library.substring(randomPoz, randomPoz + 1);
    }
    return key;
  },
  //加密
  encrypt: function(word, keyStr) {
    keyStr = keyStr
      ? keyStr
      : "zyxwvutsrqponlmkjihgfedcba123456"; //判断是否存在ksy，不存在就用定义好的key
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  //解密
  decrypt: function(word, keyStr) {
    keyStr = keyStr
      ? keyStr
      : "zyxwvutsrqponlmkjihgfedcba123456";
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
};
export default AES
</script>
