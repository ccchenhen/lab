/**
 * Created by zx on 17-8-25.
 */

$(document).ready(function () {

  var temwords = '';
  var temchapter = 1;
  var count = 0;
  //  --------------------------------
  //   sidebar
  //  -------------------------------
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });

    // --------------------------------
  //   sidebar
  //  -------------------------------

    // 添加单元列表
    $('.dropdown-menu').html(set_list());

    // 选择某单元,开始背单词
    $(document).on('click', '.chapter', function () {

      // console.log(this.value)
        var chap = this.value;
        $.ajax({
        url: '/recite/chap?c='+ chap,
        method: 'GET',
        success: function (ajax_dt) {
            temwords = ajax_dt['voca'];
            temchapter = ajax_dt['chap'];
            r = startwords(temwords[0], chap);
            $('.recite-content').html(r);
            count = 1

        }

    });

    });
    // 下一词
    $(document).on('click', '.next', function () {

      if (temwords.length < count){

        var chap = temchapter + 1;
        $.ajax({
        url: '/recite/chap?c='+ chap,
        method: 'GET',
        success: function (ajax_dt) {
            temwords = ajax_dt['voca'];
            temchapter = ajax_dt['chap'];
            r = startwords(temwords[0], chap);
            $('.recite-content').html(r);
            count = 0

        }

    });
      } else {
        count += 1;
        var tem = temwords[count];
        r = startwords(tem, temchapter);
        $('.recite-content').html(r);


      }

    });
  // 上一词
  $(document).on('click', '.back', function () {

    if (count >= 1){
        count -= 1;
        var tem = temwords[count];
        r = startwords(tem, temchapter);
        $('.recite-content').html(r);

    } else {
      alert('向前点不动啦!!!')
    }
  });

  // 提交自定义解释
  $(document).on('click', '#recite-btn', function () {
      var ipt = $.trim($('#recite-ipt').val());
      var wid = $('.wid').text();
      if (ipt.length < 1){
        alert('恕我不能接受空白解释')
      } else {
         $.ajax({
            url: '/recite/exp?text={0}&wid={1}'.format(ipt, wid),
             method: 'GET',
             success: function (status) {
                 if (status['code'] === 1){
                   $('#recite-not').hide();
                   $('#recite-ipt').val('');
                   $('#recite-self').append('<p>{0}</p>'.format(ipt))
                 } else {
                   alert('异常错误,请稍后再试')
                 }
             }
      })
      }
      // console.log(ipt, wid);
      // $.ajax({
      //     url: '/recite/exp?text={0}&wid={1}'
      // })
  })


});

function set_list () {
    var prefix = '<li value="{0}" class="chapter"><a href="javascript:void(0);">第{1}单元</a></li>';
    var res = '';
    for (var i=1; i<41; i++){
      res += prefix.format(i,i)
    }

    return res

}

function startwords (word, chap) {

    var prefix = '<p>\
                    <span class="h1">{0}</span>\
                    <span class="hidden wid">{5}</span>\
                    <span class="pull-right">第{1}单元</span>\
                </p>\
                <hr>\
                <p>音标: <span>{2}</span></p>\
                <br><br>\
                <p>词典解释:</p>\
                <p>{3}</p>\
                <br>\
                <p>自定义解释:</p>\
                <div id="recite-self">\
                {4}\
                </div>\
                <br>\
                <div class="input-group">\
                  <input type="text" class="form-control" placeholder="自定义解释..." id="recite-ipt">\
                  <span class="input-group-btn">\
                    <button class="btn btn-success" type="button" id="recite-btn">确认提交</button>\
                  </span>\
                </div>\
                <br>\
                <hr>\
                <div class="recite-btn-group">\
                <button class="btn btn-success back btn-lg">上一个</button>\
                <button class="btn btn-success pull-right next btn-lg">下一个</button>\
                </div>';

    var w = word['word'];
    var wid = word['id'];
    var exp = word['explansion'];
    var expand = word['expand'];
    var pho = word['phonogram'];
    var exp_str = '';
    var exp_tem = '<p>{0}</p>';

    if (expand.length > 0){
      for (i in expand){
        exp_str += exp_tem.format(expand[i]['explansion'])
      }
    } else {
      exp_str = '<p id="recite-not">{0}</p>'.format('还没有自定义解释,自定义添加一个?')
    }

    prefix = prefix.format(w, chap, pho, exp, exp_str, wid);
    return prefix

}
