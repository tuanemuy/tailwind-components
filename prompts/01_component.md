# テンプレートのコンポーネント化

## 背景

- `src/stories/${ComponentName}/*.html` にUI部品のテンプレートを作成した

## タスク

- `src/stories/**` から、 `*.tsx` と `*.stories.tsx` が存在しないディレクトリを探す
- 見つかったディレクトリの `index.html` を以下のルールでコンポーネント化する
    - ファイル名はそれぞれ `index.tsx` と `index.stories.tsx` とする
    - コンポーネント名はディレクトリ名と同一とする
    - 外部から渡すべきパラメータをpropsとして受け取るようにし、できるだけ汎用的にする
        - 文言
        - variant
        - オプショナルなボタン等のコンポーネント
        - svgアイコン
        - その他
    - 成功や失敗等の意味を持たない色は、 `src/styles/theme.css` に定義された色をTailwind CSS経由で使用する
        - primary
        - secondary
        - accent
        - muted
        - chart-1〜5
        - その他

## 条件

- 複数のhtmlファイルを読み込まず、ひとつずつ処理する
- 繰り返す部分はリストで渡す、アクションやオプションの部分はコンポーネントとして渡すといったレベルで汎用化する
