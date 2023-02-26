/*------------------------------
 * ソート機能
 *
 * how to use:
 * <tbody id="sortable">
 * 	___LIST___
 * </tbody>
 * <tr data-id='xx' data-sort='xx'>
 * <td class='sortable'><img src='/images/sort.png'></td>
 * http://cly7796.net/wp/javascript/try-the-sortable-of-jquery-ui/
 * https://stacktrace.jp/jquery/ui/interaction/sortable.html
 */
function updateSort(callback = null, url_param = "") {
  if ($("#list_table > #sortable").length) {
    $("#list_table > #sortable").sortable({
      cursor: "move",
      opacity: 0.8,
      helper: sortable_helper, // td幅を維持する
      cancel: "td:not(.sortable)", // .sortableのtd以外はドラッグさせない
      stop: function (event, ui) {
        let tr = ui.item;
        // param
        let sort = tr.data("sort");
        let sort_to = 1;
        if (typeof tr.prev("tr").data("sort") != "undefined") {
          sort_to = tr.prev("tr").data("sort");
          if (sort > sort_to) {
            sort_to = sort_to + 1;
          }
        }
        let url = getUrlParam();
        url += "action=updateSort&id=" + tr.data("id") + "&sort=" + sort + "&sort_to=" + sort_to;
        if (url_param != "") {
          url += "&" + url_param;
        }
        $.get(url, function () {
          // 更新
          if ($.isFunction(callback)) {
            callback();
          }
        });
      },
    });
    $("#sortable").disableSelection();
  }
}
// 幅を維持する
function sortable_helper(e, tr) {
  let $originals = tr.children();
  let $helper = tr.clone();
  $helper.children().each(function (index) {
    $(this).width($originals.eq(index).width());
  });
  return $helper;
}
