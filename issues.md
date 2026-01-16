# Issues

## Fixed
- [x] ProjectDetailsCardのヘッダー部分が右側にはみ出す - `shrink-1`を`shrink`に修正
- [x] DashboardPageでサイドバーを閉じると開けないものがある - SidebarToggleが常に表示されるように修正
- [x] NotFoundPageでボタンの文字が見えない - Linkコンポーネントにunstyledプロップを追加し、Button内で使用
- [x] ProductPageがエラー - ストーリーのデータ形式をコンポーネントの型に合わせて修正
- [x] ビルドエラー（CSS theme classes） - dark-themeをdarkに、light-themeを削除

## Needs Visual Verification (要視覚確認)
- [x] DashboardLayoutのSidebarで使われているボタンのアイコンのサイズが違うか位置がずれている。他にも同じパターンがあるかも - IconButtonに渡すアイコンからsize-5クラスを削除（IconButtonが自動でサイズを設定する）
- [x] DetachedSidebarがエラー - SidebarLogoの代わりにインライン実装を使用してSidebarContext依存を解消
- [ ] UserHeroCardがいろいろずれているので元のサンプルHTMLを確認して再調整 - コードは構造的に正しいが、元のデザインとの比較が必要
- [x] CheckoutPageがエラー - itemsプロップにデフォルト値（空配列）を追加
- [ ] DashboardPageでサイドバーのヘッダーとグローバルヘッダーの高さが違う - 視覚確認が必要
- [x] OnboardingPlansPageがエラー - plans/sources/rolesプロップにデフォルト値（空配列）を追加
