/**
 * Created by zx on 17-8-19.
 */

$(document).ready(function () {
    var words = {};
    // window.added = [];

    $.ajax({
        url: '/rhyme/get?word=' + '兄弟',
        method: 'GET',
        success: function (data) {
            words['兄弟'] = data['兄弟'];
            // added.push('兄弟')
            // set_chart('兄弟', words['兄弟'])
        }
    });

    $('#search').click(function () {
        var ipt_w = $('#ipt').val();
        var cur_dt = words[ipt_w];
        if (!Boolean(cur_dt)){
            $.ajax({
                url: '/rhyme/get?word=' + ipt_w,
                method: 'GET',
                success: function (data) {
                    words[ipt_w] = data[ipt_w];
                    cur_dt = words[ipt_w];
                    // console.log(data);
                    // console.log('af ajax',cur_dt)
                    if (cur_dt.length === 0){
                        alert('未查询到结果')

                    } else {
                        // add_his(ipt_w);
                        // set_chart(ipt_w, cur_dt)
                        set_rhyme(cur_dt, cur_dt[0][1])
                    }
                }
            })
        } else {
            // add_his(ipt_w);
            set_rhyme(cur_dt, cur_dt[0][1])
            // set_chart(ipt_w, cur_dt)
        }
        // console.log(words)
    });

    $(document).on('click', '.history', function () {
        var choosed_word = this.text;
        var cur_dt = words[choosed_word];
        set_rhyme(cur_dt, cur_dt[0][1])
        // set_chart(choosed_word, cur_dt)

    })
});

function get_r (dt) {
    // console.log('input data',dt);
    var words_r = [];
    for (i in dt){
        var tem_dct = {};
        tem_dct['name'] = dt[i][0];
        tem_dct['value'] = dt[i][1];
        words_r.push(tem_dct)
    }
    // console.log(words_r);
    return words_r
}

function set_chart (title, cur_dt) {
    // console.log('chart in ',cur_dt);
    var mychart = echarts.init(document.getElementById('chart'));
    var option = {
    title:{
        text:"搜索关键词: " + title
        // link:'https://github.com/ecomfe/echarts-wordcloud',
        // subtext: 'data-visual.cn',
        // sublink:'http://data-visual.cn',
    },
    backgroundColor: '#fff',
    tooltip: {},
    series: [{
        type: 'wordCloud',
        gridSize: 20,
        sizeRange: [12, 50],
        rotationRange: [0, 0],
        shape: 'circle',
        textStyle: {
            normal: {
                color: function() {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }
            },
            emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: get_r(cur_dt)
    }]

};

  mychart.setOption(option)
}

// function add_his(his_word) {
//
//     if (!(his_word in added) && (added.length < 10)){
//
//         var add_str = '<li><a href="javascript:void(0);" class="history">'+ his_word +'</a></li>';
//         $('#rhymehistory').append(add_str)
//     }
//
//
// }



function set_rhyme(dt, max_c) {

    var prefix = '<div class="col-md-4 col-sm-12 col-xs-12">\
                        <div class="rhyme-row-container">\
                            <div class="rhyme-item">\
                        <div class="rhyme-item-text">\
                            {0}\
                        </div>\
                        <div class="rhyme-item-progress">\
                            <div class="progress">\
                            <div class="progress-bar progress-bar-success" role="progressbar" style="width: {1}%;">\
                            </div>\
                        </div>\
                        </div>\
                    </div>\
                        </div>\
                    </div>';

    var mark = '';
    for (i in dt){

        var percent = ((dt[i][1] / max_c).toFixed(2)) * 100;
        mark += prefix.format(dt[i][0],percent )
    }

//    填充 html

    $('#rhyme-item-con').html(mark);

}