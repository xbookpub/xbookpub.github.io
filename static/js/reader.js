// PC
$(function () {
    // 响应键盘翻页
    $(document).keydown(function (e) {
        if (e.keyCode==37) {
            $('#pre')[0].click();
        } else if (e.keyCode==39) {
            $('#next')[0].click();
        }
    });
});

// MOBILE
$(function () {
    // 响应手势翻页
    $(document).hammer().on('swiperight', function () {
        $('#pre')[0].click();
    }).on('swipeleft', function () {
        $('#next')[0].click();
    });
});

// 通用
$(function () {

    store = $.AMUI.store;
    if (!store.enabled) {
        store = $.AMUI.utils.cookie;
        store.remove = store.unset;
    }

    // 侧边栏
    $('#content').on('click', function () {
        $('#sidebar').offCanvas('open');
        return false;
    });

    // 字体
    (function(){
        var sizelist = ['16', '20', '26'];
        var size = (store.get('fontsize')==null) ? 0 : store.get('fontsize');
        $('#content').css('font-size', sizelist[size]+'px');

        $('#increment').click(function () {
            size = size+1 > sizelist.length-1 ? sizelist.length-1 : size+1;
            store.set('fontsize', size);
            $('#content').css('font-size', sizelist[size]+'px');
        });

        $('#decrement').click(function () {
            size = size-1 < 0 ? 0 : size-1;
            store.set('fontsize', size);
            $('#content').css('font-size', sizelist[size]+'px');
        });
    })();

    // 阅读模式及配色
    (function(){

        var night = (store.get('reader.night')==null) ? false : store.get('reader.night');
        var style = (store.get('reader.style')==null) ? 1 : store.get('reader.style');

        // 阅读样式选择
        $('#style-1').click(function () {

            style = 1; store.set('reader.style', 1);

            if (night) {
                $('[name="day-night"]').bootstrapSwitch('state', false);
            }

            $('body').css({
                'background-color': '#FFF'
            });
            $('#content').css({
                'color' : '#000'
            });
        });
        $('#style-2').click(function () {

            style = 2; store.set('reader.style', 2);

            if (night) {
                $('[name="day-night"]').bootstrapSwitch('state', false);
            }

            $('body').css({
                'background-color': '#C7EDCC'
            });
            $('#content').css({
                'color' : '#000000'
            });
        });
        $('#style-3').click(function () {

            style = 3; store.set('reader.style', 3);

            if (night) {
                $('[name="day-night"]').bootstrapSwitch('state', false);
            }

            $('body').css({
                'background-color': '#FFF2E2'
            });
            $('#content').css({
                'color' : '#000000'
            });
        });

        // 阅读模式切换
        $('[name="day-night"]').bootstrapSwitch();
        $('[name="day-night"]').on('switchChange.bootstrapSwitch', function(event, state) {
            if (state) {
                // 夜间
                night = true; store.set('reader.night', true);

                $('body').css({
                    'background-color': '#222'
                });
                $('#content').css({
                    'color' : '#778899' // #F8F8FF
                });
            } else {
                // 白天
                night = false; store.set('reader.night', false);
                $('#style-'+style).click();
            }
        });

        // 初始化
        function styleinit() {
            if (night) {
                $('[name="day-night"]').bootstrapSwitch('state', true);
            } else {
                $('#style-'+style).click();
            }
        }

        styleinit();

    })();
});



// 扩展
$(function () {
  $('<ul class="am-nav"></ul>')
    .append('<li><a href="#">hello, 胖胖红</a></li>')
    .append('<li class="am-nav-header"></li>')
    .append('<li><a href="#">阿里巴巴是个快乐的青年</a></li>')
    .append('<li><a href="#">预备 唱~</a></li>')
    .append('<li><a href="#">胖胖</a></li>')
    .append('<li><a href="#">胖胖胖胖</a></li>')
    .append('<li><a href="#">胖胖胖胖胖胖胖胖红</a></li>')
    .appendTo($('#extendbar'));
});
