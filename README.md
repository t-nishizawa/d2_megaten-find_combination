# 説明書
## 欲しい悪魔の作り方を調べる
欲しい悪魔に名前を入れて召喚をクリックする。
合体支援パネルが表示される。

## 合体支援パネルの見方
上段には欲しい悪魔の名前が表示される。
下段は組み合わせリストが表示される。
欲しい悪魔の名前をクリックすると、
ページが読み込まれてから組み合わせリストを表示した悪魔の名前が表示される。

## 組み合わせリスト
欲しい悪魔が合体結果になる組み合わせが表示される。
悪魔の間は「×」（U+00D7）の両端を半角スペースで囲んだ文字列を置く。
リスト中の悪魔名をクリック、または、タップした場合は欲しい悪魔に設定される。

## バージョンについて
### v1.0
挙動に関する仕様を策定。
組み合わせの検索処理を最初に全て実行する方式はブラウザへの負担が高いため、
孫以降はクリック時に実行する方式に変更。

### v0.4
* GitHub管理にした
* 頑張り値を2ずつ変更しないと結果が変化しない不具合の修正
上記修正後、想定以上に頑張るようになってしまったため初期頑張り値を2に減少
* HTML負荷軽減のためリストをクリックするまで子要素を描画しないように修正
* 合体を検索していない悪魔を見た目でわかるようにした

### v0.3
組み合わせ中の最大グレード数が低い順になるソートを追加

#### v0.3.1
欲しい悪魔を入力しないで「召喚」ボタンを押すと
Javascriptエラーになる不具合の修正

#### v0.3.2
子の作成方法など、遅延表示が完了する前に
別の悪魔を欲しい悪魔に設定して「召喚」ボタンを押した場合に
Javascriptエラーになる不具合の修正

### v0.2
名前の横にグレードとレアリティを追加

### v0.1
限定公開開始

---

本ツールの利用は自己責任でお願いします。
